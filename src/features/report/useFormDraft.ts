import { useCallback } from 'react'
import type { ReportFormState } from './ReportForm.types'

const FORM_DRAFT_STORAGE_KEY = 'report_form_draft'
const FORM_DRAFT_TTL_MS = 15 * 60 * 1000 // 15 minutes

type FormDraft = {
  searchParams: string
  reason: ReportFormState['reason']
  description: string
  additionalComments: string
  savedAt: number
}

function useFormDraft() {
  const saveDraft = useCallback((formState: ReportFormState, searchParams: string) => {
    const draft: FormDraft = {
      searchParams,
      reason: formState.reason,
      description: formState.description,
      additionalComments: formState.additionalComments,
      savedAt: Date.now()
    }
    sessionStorage.setItem(FORM_DRAFT_STORAGE_KEY, JSON.stringify(draft))
  }, [])

  const restoreDraft = useCallback((): FormDraft | null => {
    const stored = sessionStorage.getItem(FORM_DRAFT_STORAGE_KEY)
    sessionStorage.removeItem(FORM_DRAFT_STORAGE_KEY)

    if (!stored) return null

    try {
      const draft: FormDraft = JSON.parse(stored)
      if (Date.now() - draft.savedAt > FORM_DRAFT_TTL_MS) return null
      return draft
    } catch {
      return null
    }
  }, [])

  const clearDraft = useCallback(() => {
    sessionStorage.removeItem(FORM_DRAFT_STORAGE_KEY)
  }, [])

  return { saveDraft, restoreDraft, clearDraft }
}

export { useFormDraft }
export type { FormDraft }
