enum ReportReason {
  HARASSMENT = 'harassment',
  HATE_SPEECH = 'hate_speech',
  SPAM = 'spam',
  IMPERSONATION = 'impersonation',
  INAPPROPRIATE_CONTENT = 'inappropriate_content',
  CHEATING = 'cheating',
  OTHER = 'other'
}

const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  [ReportReason.HARASSMENT]: 'Harassment or Abuse',
  [ReportReason.HATE_SPEECH]: 'Hate Speech',
  [ReportReason.SPAM]: 'Spam',
  [ReportReason.IMPERSONATION]: 'Impersonation',
  [ReportReason.INAPPROPRIATE_CONTENT]: 'Inappropriate Content',
  [ReportReason.CHEATING]: 'Cheating',
  [ReportReason.OTHER]: 'Other'
}

import type { UploadedFile } from '../../components/FileUpload'

interface ReportFormState {
  walletAddress: string
  reportedWallet: string
  reason: ReportReason | ''
  description: string
  evidence: UploadedFile[]
  additionalComments: string
  confirmAccuracy: boolean
}

interface ReportFormErrors {
  walletAddress: string
  reportedWallet: string
  reason: string
  description: string
  evidence: string
  confirmAccuracy: string
}

export { ReportReason, REPORT_REASON_LABELS }
export type { ReportFormErrors, ReportFormState }
export type { UploadedFile } from '../../components/FileUpload'
