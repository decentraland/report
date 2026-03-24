import { useCallback, useRef, useState } from 'react'
import { Typography } from 'decentraland-ui2'
import type { FileUploadProps, UploadedFile } from './FileUpload.types'
import { AddFileButton, FileChip, FileChipsContainer, FileUploadContainer } from './FileUpload.styled'

const MAX_FILES = 5
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = 'image/png,image/jpeg,image/gif,image/webp,video/mp4,video/webm,application/pdf'

function FileUpload({ files, onFilesChange, error }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [sizeError, setSizeError] = useState<string | null>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files
      if (!selectedFiles) return

      setSizeError(null)

      const remaining = MAX_FILES - files.length
      const selected = Array.from(selectedFiles).slice(0, remaining)

      const oversized = selected.filter(f => f.size > MAX_FILE_SIZE)
      if (oversized.length > 0) {
        setSizeError(`${oversized.map(f => f.name).join(', ')} exceeded the 5MB limit`)
      }

      const newFiles: UploadedFile[] = selected
        .filter(f => f.size <= MAX_FILE_SIZE)
        .map(file => ({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          size: file.size
        }))

      if (newFiles.length > 0) {
        onFilesChange([...files, ...newFiles])
      }

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
      <input ref={inputRef} type="file" multiple accept={ACCEPTED_TYPES} onChange={handleFileSelect} hidden />
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
      <AddFileButton variant="contained" color="secondary" size="medium" onClick={handleClick} disabled={files.length >= MAX_FILES}>
        Add File
      </AddFileButton>
      {sizeError && (
        <Typography variant="caption" color="error">
          {sizeError}
        </Typography>
      )}
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </FileUploadContainer>
  )
}

export { FileUpload }
