import { Typography } from 'decentraland-ui2'
import { NumberBullet } from '../NumberBullet'
import type { FormFieldProps } from './FormField.types'
import { FieldHelper, FieldLabel, FieldWrapper } from './FormField.styled'

function FormField({ number, label, required = false, helper, error, children }: FormFieldProps) {
  return (
    <FieldWrapper>
      <FieldLabel>
        <NumberBullet number={number} /> {label} {required && <span className="required-mark">*</span>}
      </FieldLabel>
      <FieldHelper>{helper}</FieldHelper>
      {children}
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </FieldWrapper>
  )
}

export { FormField }
