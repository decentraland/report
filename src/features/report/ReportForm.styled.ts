import { Box, Button, Checkbox, FormControlLabel, Typography, styled } from 'decentraland-ui2'

const FormBackground = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: 'url(/background.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  padding: theme.spacing(12, 4)
}))

const FormCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(22, 7, 35, 0.92)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(5, 4),
  maxWidth: 560,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& .MuiOutlinedInput-root': {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.action.hover
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.action.selected
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main
    }
  }
}))

const FooterText = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  marginTop: theme.spacing(2),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

const FormTitle = styled(Typography)({
  fontWeight: 700,
  textAlign: 'center'
})

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4)
}))

const SubmitButton = styled(Button)({
  alignSelf: 'flex-start'
})

const WalletMismatchAlert = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(251, 59, 59, 0.16)',
  border: `1px solid ${theme.palette.error.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.error.main,
  ...theme.typography.body2
}))

const ConfirmCheckbox = styled(Checkbox)<{ showError: boolean }>(({ theme, showError }) => ({
  color: showError ? theme.palette.error.main : undefined
}))

const ConfirmLabel = styled(FormControlLabel)(({ theme }) => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& .MuiTypography-root': {
    ...theme.typography.body2
  }
}))

export { ConfirmCheckbox, ConfirmLabel, FooterText, FormBackground, FormCard, FormTitle, LogoWrapper, SubmitButton, WalletMismatchAlert }
