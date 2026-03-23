import type { ReactNode } from 'react'

type FormFieldBaseProps = {
  number: number
  label: string
  helper: string
  error?: string
  children: ReactNode
}

type FormFieldProps = FormFieldBaseProps & ({ optional: true; required?: never } | { optional?: false; required?: boolean })

export type { FormFieldProps }
