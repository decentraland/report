import { Box, styled } from 'decentraland-ui2'

const BulletCircle = styled(Box)(({ theme }) => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  flexShrink: 0
}))

export { BulletCircle }
