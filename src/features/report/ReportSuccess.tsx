import { Logo, Typography } from 'decentraland-ui2'
import { FormBackground, FormCard, FormTitle, LogoWrapper } from './ReportForm.styled'

function ReportSuccess() {
  return (
    <FormBackground justifyContent="center">
      <FormCard>
        <LogoWrapper>
          <Logo size="large" />
          <FormTitle variant="h4">Report Submitted</FormTitle>
        </LogoWrapper>
        <Typography variant="body1" textAlign="center">
          Your report has been received and will be reviewed shortly.
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          You can close this window now.
        </Typography>
      </FormCard>
    </FormBackground>
  )
}

export { ReportSuccess }
