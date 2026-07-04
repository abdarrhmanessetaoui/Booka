'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon, Upload, X } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const MAX_PDF_SIZE = 50 * 1024 * 1024

const formSchema = z.object({
  pdfFile: z
    .any()
    .refine((file) => file instanceof File, 'Please upload a PDF file.')
    .refine(
      (file) => file?.type === 'application/pdf',
      'Only PDF files are allowed.'
    )
    .refine(
      (file) => file?.size <= MAX_PDF_SIZE,
      'PDF file must be less than 50MB.'
    ),

  coverImage: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      'Please upload a valid image.'
    )
    .refine(
      (file) => !file || file.type.startsWith('image/'),
      'Only image files are allowed.'
    ),

  title: z.string().min(1, 'Title is required.'),
  author: z.string().min(1, 'Author name is required.'),
  voice: z.string().min(1, 'Please choose an assistant voice.'),
})

type FormValues = z.infer<typeof formSchema>

const voices = {
  male: [
    {
      id: 'dave',
      name: 'Dave',
      description: 'Young male, British-Essex, casual & conversational',
    },
    {
      id: 'daniel',
      name: 'Daniel',
      description: 'Middle-aged male, British, authoritative but warm',
    },
    {
      id: 'chris',
      name: 'Chris',
      description: 'Male, casual & easy-going',
    },
  ],
  female: [
    {
      id: 'rachel',
      name: 'Rachel',
      description: 'Young female, American, calm & clear',
    },
    {
      id: 'sarah',
      name: 'Sarah',
      description: 'Young female, American, soft & approachable',
    },
  ],
}

function LoadingOverlay() {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white shadow-soft-lg">
        <div className="loading-shadow">
          <div className="loading-animation h-12 w-12 rounded-full border-4 border-[#f3e4c7] border-t-[#663820]" />

          <h2 className="loading-title">Preparing synthesis...</h2>

          <div className="loading-progress">
            <div className="loading-progress-item">
              <span className="loading-progress-status" />
              <span className="text-[var(--text-secondary)]">
                Uploading and analysing your book
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PdfDropzone({
  file,
  onFileChange,
  onFileRemove,
  onFileError,
}: {
  file?: File
  onFileChange: (file: File) => void
  onFileRemove: () => void
  onFileError: (message: string) => void
}) {
  const onDropRejected = useCallback(() => {
    onFileError('Only PDF files under 50MB are allowed.')
  }, [onFileError])
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0]

      if (!selectedFile) return

      if (selectedFile.type !== 'application/pdf') {
        onFileError('Only PDF files are allowed.')
        return
      }

      if (selectedFile.size > MAX_PDF_SIZE) {
        onFileError('PDF file must be less than 50MB.')
        return
      }

      onFileChange(selectedFile)
    },
    [onFileChange, onFileError]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    maxSize: MAX_PDF_SIZE,
    accept: {
      'application/pdf': ['.pdf'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className={[
        'upload-dropzone border-2 border-dashed border-[var(--border-subtle)]',
        isDragActive ? 'upload-dropzone-uploaded border-[var(--color-brand)]' : '',
      ].join(' ')}
    >
      <Input {...getInputProps()} className="hidden" />

      {file ? (
        <div className="flex items-center gap-3 text-center">
          <Upload className="upload-dropzone-icon mb-0" />

          <div>
            <p className="upload-dropzone-text">{file.name}</p>
            <p className="upload-dropzone-hint">PDF selected</p>
          </div>

          <button
            type="button"
            className="upload-dropzone-remove"
            onClick={(event) => {
              event.stopPropagation()
              onFileRemove()
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <>
          <Upload className="upload-dropzone-icon" />
          <p className="upload-dropzone-text">
            {isDragActive ? 'Drop your PDF here' : 'Click to upload PDF'}
          </p>
          <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
        </>
      )}
    </div>
  )
}

function CoverImageDropzone({
  file,
  onFileChange,
  onFileRemove,
  onFileError,
}: {
  file?: File
  onFileChange: (file: File) => void
  onFileRemove: () => void
  onFileError: (message: string) => void
}) {
  const onDropRejected = useCallback(() => {
    onFileError('Only PNG, JPG, JPEG, or WEBP image files are allowed.')
  }, [onFileError])
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0]

      if (!selectedFile) return

      if (!selectedFile.type.startsWith('image/')) {
        onFileError('Only image files are allowed.')
        return
      }

      onFileChange(selectedFile)
    },
    [onFileChange, onFileError]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className={[
        'upload-dropzone border-2 border-dashed border-[var(--border-subtle)]',
        isDragActive ? 'upload-dropzone-uploaded border-[var(--color-brand)]' : '',
      ].join(' ')}
    >
      <Input {...getInputProps()} className="hidden" />

      {file ? (
        <div className="flex items-center gap-3 text-center">
          <ImageIcon className="upload-dropzone-icon mb-0" />

          <div>
            <p className="upload-dropzone-text">{file.name}</p>
            <p className="upload-dropzone-hint">Cover image selected</p>
          </div>

          <button
            type="button"
            className="upload-dropzone-remove"
            onClick={(event) => {
              event.stopPropagation()
              onFileRemove()
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <>
          <ImageIcon className="upload-dropzone-icon" />
          <p className="upload-dropzone-text">
            {isDragActive
              ? 'Drop your cover image here'
              : 'Click to upload cover image'}
          </p>
          <p className="upload-dropzone-hint">
            Leave empty to auto-generate from PDF
          </p>
        </>
      )}
    </div>
  )
}

export default function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pdfFile: undefined,
      coverImage: undefined,
      title: '',
      author: '',
      voice: 'rachel',
    },
  })

  const pdfFile = form.watch('pdfFile') as File | undefined
  const coverImage = form.watch('coverImage') as File | undefined
  const selectedVoice = form.watch('voice')

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      formData.append('pdfFile', values.pdfFile)

      if (values.coverImage) {
        formData.append('coverImage', values.coverImage)
      }

      formData.append('title', values.title)
      formData.append('author', values.author)
      formData.append('voice', values.voice)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Book upload form submitted:', values)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      <div className="new-book-wrapper">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* PDF File Upload */}
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <Label className="form-label">Book PDF File</Label>

                  <FormControl>
                    <PdfDropzone
                      file={pdfFile}
                      onFileChange={(file) => {
                        onChange(file)
                        form.clearErrors('pdfFile')
                      }}
                      onFileRemove={() => {
                        form.setValue('pdfFile', undefined)
                      }}
                      onFileError={(message) => {
                        form.setError('pdfFile', {
                          type: 'manual',
                          message,
                        })
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image Upload */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <Label className="form-label">Cover Image (Optional)</Label>

                  <FormControl>
                    <CoverImageDropzone
                      file={coverImage}
                      onFileChange={(file) => {
                        onChange(file)
                        form.clearErrors('coverImage')
                      }}
                      onFileRemove={() => {
                        form.setValue('coverImage', undefined)
                      }}
                      onFileError={(message) => {
                        form.setError('coverImage', {
                          type: 'manual',
                          message,
                        })
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label className="form-label">Title</Label>

                  <FormControl>
                    <Input
                      {...field}
                      className="form-input"
                      placeholder="ex: Rich Dad Poor Dad"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <Label className="form-label">Author Name</Label>

                  <FormControl>
                    <Input
                      {...field}
                      className="form-input"
                      placeholder="ex: Robert Kiyosaki"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Voice Selector */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <Label className="form-label">Choose Assistant Voice</Label>

                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-5"
                    >
                      <div>
                        <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">
                          Male Voices
                        </p>

                        <div className="voice-selector-options">
                          {voices.male.map((voice) => (
                            <Label
                              key={voice.id}
                              htmlFor={voice.id}
                              className={[
                                'voice-selector-option',
                                selectedVoice === voice.id
                                  ? 'voice-selector-option-selected'
                                  : 'voice-selector-option-default',
                              ].join(' ')}
                            >
                              <RadioGroupItem
                                id={voice.id}
                                value={voice.id}
                                className="border-[var(--border-medium)] data-checked:border-[var(--color-brand)] data-checked:bg-[var(--color-brand)]"
                              />

                              <div>
                                <h3 className="font-semibold text-[var(--text-primary)]">
                                  {voice.name}
                                </h3>
                                <p className="mt-1 text-xs leading-4 text-[var(--text-secondary)]">
                                  {voice.description}
                                </p>
                              </div>
                            </Label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">
                          Female Voices
                        </p>

                        <div className="voice-selector-options">
                          {voices.female.map((voice) => (
                            <Label
                              key={voice.id}
                              htmlFor={voice.id}
                              className={[
                                'voice-selector-option',
                                selectedVoice === voice.id
                                  ? 'voice-selector-option-selected'
                                  : 'voice-selector-option-default',
                              ].join(' ')}
                            >
                              <RadioGroupItem
                                id={voice.id}
                                value={voice.id}
                                className="border-[var(--border-medium)] data-checked:border-[var(--color-brand)] data-checked:bg-[var(--color-brand)]"
                              />

                              <div>
                                <h3 className="font-semibold text-[var(--text-primary)]">
                                  {voice.name}
                                </h3>
                                <p className="mt-1 text-xs leading-4 text-[var(--text-secondary)]">
                                  {voice.description}
                                </p>
                              </div>
                            </Label>
                          ))}
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <button type="submit" className="form-btn" disabled={isSubmitting}>
              Begin Synthesis
            </button>
          </form>
        </Form>
      </div>
    </>
  )
}