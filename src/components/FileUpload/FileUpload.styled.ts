import { Box, Button, styled } from 'decentraland-ui2'

const AddFileButton = styled(Button)({
  alignSelf: 'flex-start'
})

const FileChip = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.spacing(4),
  padding: theme.spacing(1, 3),
  ...theme.typography.caption,
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

const FileChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2)
}))

const FileUploadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}))

export { AddFileButton, FileChip, FileChipsContainer, FileUploadContainer }
