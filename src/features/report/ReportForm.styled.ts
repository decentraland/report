import { Box, Button, Typography, styled } from 'decentraland-ui2'

const FormBackground = styled(Box)({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: 'url(/background.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  padding: '48px 16px'
})

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
      borderColor: 'rgba(255, 255, 255, 0.15)'
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main
    }
  }
}))

const LogoWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px'
})

const FormTitle = styled(Typography)({
  fontWeight: 700,
  textAlign: 'center'
})

const SubmitButton = styled(Button)({
  alignSelf: 'flex-start'
})

const FooterText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  marginTop: theme.spacing(2),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& a': {
    color: '#FF2D55',
    textDecoration: 'none',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

const WalletMismatchAlert = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 45, 85, 0.1)',
  border: `1px solid ${theme.palette.error.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.error.main,
  fontSize: '0.8125rem'
}))

export { FooterText, FormBackground, FormCard, FormTitle, LogoWrapper, SubmitButton, WalletMismatchAlert }
