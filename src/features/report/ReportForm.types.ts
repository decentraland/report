enum ReportReason {
  SCAM_PHISHING = 'scam_phishing',
  ILLEGAL_CONTENT = 'illegal_content',
  HARASSMENT = 'harassment',
  CHEATING = 'cheating',
  IMPERSONATION = 'impersonation'
}

const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  [ReportReason.SCAM_PHISHING]: 'Scam/Phishing',
  [ReportReason.ILLEGAL_CONTENT]: 'Illegal Content',
  [ReportReason.HARASSMENT]: 'Harassment',
  [ReportReason.CHEATING]: 'Cheating',
  [ReportReason.IMPERSONATION]: 'Impersonation'
}

import type { UploadedFile } from '../../components/FileUpload'

interface ReportFormState {
  playerAddress: string
  reportedAddress: string
  reason: ReportReason | ''
  description: string
  evidence: UploadedFile[]
  additionalComments: string
  confirmAccuracy: boolean
}

interface ReportFormErrors {
  playerAddress: string
  reportedAddress: string
  reason: string
  description: string
  evidence: string
  confirmAccuracy: string
}

export { ReportReason, REPORT_REASON_LABELS }
export type { ReportFormErrors, ReportFormState }
export type { UploadedFile } from '../../components/FileUpload'
