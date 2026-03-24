import { Typography } from 'decentraland-ui2'
import { FormBackground, FormLogo, FormTitle, LogoWrapper, SuccessCard, SuccessTextGroup } from './ReportForm.styled'

function ReportSuccess() {
  return (
    <FormBackground justifyContent="center">
      <SuccessCard>
        <LogoWrapper>
          <FormLogo size="large" />
          <FormTitle variant="h3">Report Submitted</FormTitle>
        </LogoWrapper>

        <SuccessTextGroup>
          <Typography variant="body1">Your report has been received and will be reviewed shortly.</Typography>
          <Typography variant="body2" color="text.secondary">
            You can close this window now.
          </Typography>
        </SuccessTextGroup>
      </SuccessCard>
    </FormBackground>
  )
}

export { ReportSuccess }
