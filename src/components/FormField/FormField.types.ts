import type { ReactNode } from 'react'

interface FormFieldProps {
  number: number
  label: string
  optional?: boolean
  required?: boolean
  helper: string
  error?: string
  children: ReactNode
}

export type { FormFieldProps }
