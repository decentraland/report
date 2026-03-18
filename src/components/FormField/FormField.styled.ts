import { Box, Typography, styled } from 'decentraland-ui2'

const FieldHelper = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary
}))

const FieldLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& .required-mark': {
    color: theme.palette.error.main
  }
}))

const FieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5)
}))

export { FieldHelper, FieldLabel, FieldWrapper }
