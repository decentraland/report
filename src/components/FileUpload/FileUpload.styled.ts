import { Box, Button, styled } from 'decentraland-ui2'

const FileUploadContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
})

const FileChipsContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px'
})

const FileChip = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  borderRadius: '16px',
  padding: '4px 12px',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '& .remove-btn': {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&:hover': {
      color: theme.palette.text.primary
    }
  }
}))

const AddFileButton = styled(Button)({
  alignSelf: 'flex-start'
  // borderColor: 'rgba(255, 255, 255, 0.7)',
  // color: '#FFFFFF',
  // fontWeight: 700,
  // fontSize: '0.75rem',
  // textTransform: 'uppercase',
  // padding: '4px 16px',
  // minHeight: 0,
  // // eslint-disable-next-line @typescript-eslint/naming-convention
  // '&:hover': {
  //   borderColor: '#FFFFFF'
  // }
})

export { AddFileButton, FileChip, FileChipsContainer, FileUploadContainer }
