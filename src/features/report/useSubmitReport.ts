import { useCallback, useState } from 'react'
import { signedFetchFactory } from 'decentraland-crypto-fetch'
import { getEnv } from '../../config'
import { useAuthIdentity } from '../../hooks/useAuthIdentity'
import { REPORT_REASON_LABELS, type ReportFormState } from './ReportForm.types'

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
        const signedFetch = signedFetchFactory()
        const reportApiUrl = getEnv('REPORT_API_URL')

        const formData = new FormData()
        formData.append('playerAddress', formState.playerAddress)
        formData.append('reportedAddress', formState.reportedAddress)
        formData.append('reason', formState.reason ? REPORT_REASON_LABELS[formState.reason] : '')
        formData.append('description', formState.description)
        formData.append('additionalComments', formState.additionalComments)
        formData.append('confirmAccuracy', String(formState.confirmAccuracy))
        for (const evidence of formState.evidence) {
          formData.append('evidence', evidence.file)
        }

        const response = await signedFetch(`${reportApiUrl}/api/reports/players`, {
          method: 'POST',
          body: formData,
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
