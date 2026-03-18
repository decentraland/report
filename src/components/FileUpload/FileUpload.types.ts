interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
}

interface FileUploadProps {
  files: UploadedFile[]
  onFilesChange: (files: UploadedFile[]) => void
  error?: string
}

export type { FileUploadProps, UploadedFile }
