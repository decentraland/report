import { Box, styled } from 'decentraland-ui2'

const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '66px'
})

const ContentWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
})

export { ContentWrapper, PageContainer }
