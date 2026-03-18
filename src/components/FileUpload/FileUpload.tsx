import { useCallback, useRef } from 'react'
import { Typography } from 'decentraland-ui2'
import type { FileUploadProps, UploadedFile } from './FileUpload.types'
import { AddFileButton, FileChip, FileChipsContainer, FileUploadContainer } from './FileUpload.styled'

const MAX_FILES = 5

function FileUpload({ files, onFilesChange, error }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files
      if (!selectedFiles) return

      const remaining = MAX_FILES - files.length
      const newFiles: UploadedFile[] = Array.from(selectedFiles)
        .slice(0, remaining)
        .map(file => ({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          size: file.size
        }))

      onFilesChange([...files, ...newFiles])

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    [files, onFilesChange]
  )

  const handleRemove = useCallback(
    (id: string) => {
      onFilesChange(files.filter(f => f.id !== id))
    },
    [files, onFilesChange]
  )

  return (
    <FileUploadContainer>
      <input ref={inputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileSelect} hidden />
      {files.length > 0 && (
        <FileChipsContainer>
          {files.map(file => (
            <FileChip key={file.id}>
              {file.name}
              <span className="remove-btn" onClick={() => handleRemove(file.id)} role="button" tabIndex={0}>
                ✕
              </span>
            </FileChip>
          ))}
        </FileChipsContainer>
      )}
      <AddFileButton variant="contained" color="secondary" size="small" onClick={handleClick} disabled={files.length >= MAX_FILES}>
        Add File
      </AddFileButton>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </FileUploadContainer>
  )
}

export { FileUpload }
