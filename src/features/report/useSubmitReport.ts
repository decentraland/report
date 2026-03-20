import { useCallback, useState } from 'react'
import { signedFetchFactory } from 'decentraland-crypto-fetch'
import { getEnv } from '../../config'
import { useAuthIdentity } from '../../hooks/useAuthIdentity'
import { REPORT_REASON_LABELS, type ReportFormState } from './ReportForm.types'

type PresignFile = { filename: string; contentType: string; fileSize: number }
type PresignResponseFile = { uploadUrl: string; key: string; publicUrl: string }
type PresignResponse = { reportId: string; files: PresignResponseFile[] }

type UseSubmitReportResult = {
  submitReport: (formState: ReportFormState) => Promise<boolean>
  isSubmitting: boolean
  error: string | null
}

function useSubmitReport(): UseSubmitReportResult {
  const { identity } = useAuthIdentity()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitReport = useCallback(
    async (formState: ReportFormState): Promise<boolean> => {
      setIsSubmitting(true)
      setError(null)

      try {
        if (!identity) {
          throw new Error('You must be authenticated to submit a report')
        }

        const signedFetch = signedFetchFactory()
        const reportApiUrl = getEnv('REPORT_API_URL')

        // Step 1: Get presigned URLs
        const presignBody: { files: PresignFile[] } = {
          files: formState.evidence.map(evidence => ({
            filename: evidence.name.replace(/[^a-zA-Z0-9._-]/g, '-'),
            contentType: evidence.file.type,
            fileSize: evidence.size
          }))
        }

        const jsonHeaders = new Headers()
        jsonHeaders.set('Content-Type', 'application/json')

        const presignResponse = await signedFetch(`${reportApiUrl}/api/reports/players/presign`, {
          method: 'POST',
          headers: jsonHeaders,
          body: JSON.stringify(presignBody),
          identity
        })

        if (!presignResponse.ok) {
          throw new Error(`Failed to get upload URLs (${presignResponse.status})`)
        }

        const presignData: PresignResponse = await presignResponse.json()

        // Step 2: Upload files directly to S3
        await Promise.all(
          presignData.files.map((presignedFile, index) => {
            const evidence = formState.evidence[index]
            const uploadHeaders = new Headers()
            uploadHeaders.set('Content-Type', evidence.file.type)
            return fetch(presignedFile.uploadUrl, {
              method: 'PUT',
              headers: uploadHeaders,
              body: evidence.file
            }).then(res => {
              if (!res.ok) {
                throw new Error(`Failed to upload ${evidence.name} (${res.status})`)
              }
            })
          })
        )

        // Step 3: Submit the report with evidence keys
        const reportBody = {
          reportId: presignData.reportId,
          playerAddress: formState.playerAddress,
          reportedAddress: formState.reportedAddress,
          reason: formState.reason ? REPORT_REASON_LABELS[formState.reason] : '',
          description: formState.description,
          additionalComments: formState.additionalComments,
          confirmAccuracy: formState.confirmAccuracy,
          evidenceKeys: presignData.files.map(f => f.key)
        }

        const response = await signedFetch(`${reportApiUrl}/api/reports/players`, {
          method: 'POST',
          headers: jsonHeaders,
          body: JSON.stringify(reportBody),
          identity
        })

        if (!response.ok) {
          throw new Error(`Failed to submit report (${response.status})`)
        }

        return true
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        return false
      } finally {
        setIsSubmitting(false)
      }
    },
    [identity]
  )

  return { submitReport, isSubmitting, error }
}

export { useSubmitReport }
