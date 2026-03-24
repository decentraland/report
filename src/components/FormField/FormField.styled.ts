import { Box, Typography, dclColors, styled } from 'decentraland-ui2'

const FieldHelper = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: dclColors.neutral.gray3
}))

const FieldLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& .required-mark': {
    color: theme.palette.error.main
  }
}))

const FieldOptionalMark = styled('span')({
  color: dclColors.neutral.gray3
})

const FieldInputGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px'
})

const FieldInputHint = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: dclColors.neutral.gray3,
  fontSize: '12px',
  marginLeft: '14px',
  marginRight: '14px'
}))

const FieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5)
}))

export { FieldHelper, FieldInputGroup, FieldInputHint, FieldLabel, FieldOptionalMark, FieldWrapper }
