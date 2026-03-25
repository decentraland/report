import { Box, Button, Checkbox, FormControlLabel, Logo, Typography, styled } from 'decentraland-ui2'

// eslint-disable-next-line import/no-unresolved
import backgroundUrl from '/background.webp?url'

const FormBackground = styled(Box)(({ theme }) => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: `url(${backgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  padding: theme.spacing(12, 4)
}))

const FormCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(22, 7, 35, 0.92)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(6, 8),
  maxWidth: 608,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
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

const FormLogo = styled(Logo)({
  height: 64,
  width: 64
})

const FormTitle = styled(Typography)({
  fontWeight: 600,
  textAlign: 'center'
})

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2)
}))

const SubmitButton = styled(Button)({
  alignSelf: 'flex-start'
})

const SuccessCard = styled(FormCard)(({ theme }) => ({
  padding: theme.spacing(7, 9),
  gap: theme.spacing(3)
}))

const SuccessTextGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  textAlign: 'center'
}))

const WalletMismatchAlert = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(251, 59, 59, 0.16)',
  border: `1px solid ${theme.palette.error.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.error.main,
  ...theme.typography.body2
}))

const SignInAlert = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(237, 108, 2, 0.12)',
  border: `1px solid ${theme.palette.warning.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.warning.main,
  ...theme.typography.body2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2)
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

export {
  ConfirmCheckbox,
  ConfirmLabel,
  FooterText,
  FormBackground,
  FormCard,
  FormLogo,
  FormTitle,
  LogoWrapper,
  SignInAlert,
  SuccessCard,
  SubmitButton,
  SuccessTextGroup,
  WalletMismatchAlert
}
