import { Box, Typography, styled } from 'decentraland-ui2'

const FieldWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
})

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& .required-mark': {
    color: theme.palette.error.main
  }
}))

const FieldHelper = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary
}))

export { FieldHelper, FieldLabel, FieldWrapper }
