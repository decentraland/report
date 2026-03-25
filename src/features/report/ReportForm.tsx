import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useWallet } from '@dcl/core-web3'
import { EthAddress } from '@dcl/schemas'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from 'decentraland-ui2'
import { FileUpload } from '../../components/FileUpload'
import { FieldInputGroup, FieldInputHint, FieldWrapper, FormField } from '../../components/FormField'
import { useAuthIdentity } from '../../hooks/useAuthIdentity'
import { redirectToAuth } from '../../utils/authRedirect'
import { useFormDraft } from './useFormDraft'
import { useSubmitReport } from './useSubmitReport'
import { REPORT_REASON_LABELS, ReportReason } from './ReportForm.types'
import type { ReportFormErrors, ReportFormState, UploadedFile } from './ReportForm.types'
import {
  ConfirmCheckbox,
  ConfirmLabel,
  FooterText,
  FormBackground,
  FormCard,
  FormLogo,
  FormTitle,
  LogoWrapper,
  SignInAlert,
  SubmitButton,
  WalletMismatchAlert
} from './ReportForm.styled'

function ReportForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { address } = useWallet()
  const { hasValidIdentity } = useAuthIdentity()
  const { saveDraft, restoreDraft, clearDraft } = useFormDraft()

  // Restore draft form state after auth redirect
  useEffect(() => {
    const draft = restoreDraft()
    if (!draft) return

    // Restore search params if auth service stripped them
    if (!searchParams.toString() && draft.searchParams) {
      setSearchParams(new URLSearchParams(draft.searchParams), { replace: true })
    }

    // Restore form fields
    setFormState(prev => ({
      ...prev,
      reason: draft.reason,
      description: draft.description,
      additionalComments: draft.additionalComments
    }))
  }, [])

  const playerAddressParam = searchParams.get('player_address') ?? ''
  const reportedAddressParam = searchParams.get('reported_address') ?? ''

  const walletAddress = address ?? ''

  const [formState, setFormState] = useState<ReportFormState>({
    playerAddress: walletAddress,
    reportedAddress: reportedAddressParam,
    reason: '',
    description: '',
    evidence: [],
    additionalComments: '',
    confirmAccuracy: false
  })

  const [submitted, setSubmitted] = useState(false)
  const { submitReport, isSubmitting, error: submitError } = useSubmitReport()

  useEffect(() => {
    setFormState(prev => ({ ...prev, playerAddress: walletAddress }))
  }, [walletAddress])

  useEffect(() => {
    if (reportedAddressParam) {
      setFormState(prev => ({ ...prev, reportedAddress: reportedAddressParam }))
    }
  }, [reportedAddressParam])

  const walletMismatch = useMemo(() => {
    if (!address || !playerAddressParam) return false
    return address.toLowerCase() !== playerAddressParam.toLowerCase()
  }, [address, playerAddressParam])

  const errors = useMemo<ReportFormErrors>(() => {
    return {
      playerAddress: !EthAddress.validate(formState.playerAddress) ? 'Please enter a valid wallet address' : '',
      reportedAddress: !EthAddress.validate(formState.reportedAddress) ? 'Please enter a valid wallet address' : '',
      reason: !formState.reason ? 'Please choose a reason' : '',
      description: !formState.description.trim() ? 'Please include a description of your report' : '',
      evidence: formState.evidence.length === 0 ? 'Please upload the evidence of your issue' : '',
      confirmAccuracy: !formState.confirmAccuracy ? 'You must confirm this information is accurate' : ''
    }
  }, [formState])

  const hasErrors = useMemo(() => Object.values(errors).some(e => e !== ''), [errors])

  const handleFieldChange = useCallback(<TKey extends keyof ReportFormState>(field: TKey, value: ReportFormState[TKey]) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleEvidenceChange = useCallback(
    (files: UploadedFile[]) => {
      handleFieldChange('evidence', files)
    },
    [handleFieldChange]
  )

  const handleSubmit = useCallback(async () => {
    setSubmitted(true)
    if (hasErrors || walletMismatch) return
    const success = await submitReport(formState)
    if (success) {
      clearDraft()
      navigate('/success', { state: { submitted: true } })
    }
  }, [hasErrors, walletMismatch, formState, submitReport, navigate])

  return (
    <FormBackground>
      <FormCard>
        <LogoWrapper>
          <FormLogo size="large" />
          <FormTitle variant="h3">Report User</FormTitle>
        </LogoWrapper>

        {walletMismatch && (
          <WalletMismatchAlert>
            The connected wallet does not match the player address. Please connect with the correct wallet to submit this report.
          </WalletMismatchAlert>
        )}

        <FormField
          number={1}
          label="Your Wallet Address"
          required
          helper="Reports are tied to your wallet to prevent abuse. Your identity will not be publicly shared."
          error={submitted ? errors.playerAddress : undefined}
        >
          <TextField fullWidth size="small" placeholder="Write or paste your address here..." value={formState.playerAddress} disabled />
        </FormField>

        {!hasValidIdentity && (
          <SignInAlert>
            Please sign in with your wallet to submit a report.
            <Button
              variant="text"
              color="warning"
              size="small"
              onClick={() => {
                saveDraft(formState, searchParams.toString())
                redirectToAuth()
              }}
            >
              Sign In
            </Button>
          </SignInAlert>
        )}

        <FormField
          number={2}
          label="Reported User Wallet"
          required
          helper="This is the wallet address of the user you are reporting."
          error={submitted ? errors.reportedAddress : undefined}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Write or paste an address here..."
            value={formState.reportedAddress}
            onChange={e => handleFieldChange('reportedAddress', e.target.value)}
            disabled={!!reportedAddressParam}
          />
        </FormField>

        <FormField
          number={3}
          label="Reason for Report"
          required
          helper="Select the option that best describes the issue."
          error={submitted ? errors.reason : undefined}
        >
          <FormControl fullWidth size="small" error={submitted && !!errors.reason}>
            {!formState.reason && <InputLabel shrink={false}>Choose a reason</InputLabel>}
            <Select value={formState.reason} onChange={e => handleFieldChange('reason', e.target.value as ReportReason)} displayEmpty>
              {Object.entries(REPORT_REASON_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormField>

        <FormField
          number={4}
          label="Description"
          required
          helper="Describe what happened. Include when and where the incident occurred if possible."
          error={submitted ? errors.description : undefined}
        >
          <FieldInputGroup>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={4}
              placeholder="Write your description here..."
              value={formState.description}
              onChange={e => handleFieldChange('description', e.target.value)}
            />
            <FieldInputHint>The more detail you provide, the easier it is for moderators to review your report.</FieldInputHint>
          </FieldInputGroup>
        </FormField>

        <FormField
          number={5}
          label="Evidence"
          required
          helper="Upload up to 5 screenshots, videos, or links to support your report."
          error={submitted ? errors.evidence : undefined}
        >
          <FileUpload files={formState.evidence} onFilesChange={handleEvidenceChange} />
        </FormField>

        <FormField
          number={6}
          label="Additional Comments"
          optional
          helper="Provide any extra information that might help moderators investigate."
        >
          <TextField
            fullWidth
            size="small"
            multiline
            rows={3}
            placeholder="Write your comments here..."
            value={formState.additionalComments}
            onChange={e => handleFieldChange('additionalComments', e.target.value)}
          />
        </FormField>

        {/* Confirmation Checkbox */}
        <FieldWrapper>
          <ConfirmLabel
            control={
              <ConfirmCheckbox
                checked={formState.confirmAccuracy}
                onChange={e => handleFieldChange('confirmAccuracy', e.target.checked)}
                showError={submitted && !!errors.confirmAccuracy}
              />
            }
            label="I confirm this report is accurate."
          />
          {submitted && errors.confirmAccuracy && (
            <Typography variant="caption" color="error">
              {errors.confirmAccuracy}
            </Typography>
          )}
        </FieldWrapper>

        {submitError && (
          <Typography variant="body2" color="error">
            {submitError}
          </Typography>
        )}

        {/* Submit Button */}
        <SubmitButton
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={walletMismatch || !hasValidIdentity || !formState.confirmAccuracy || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </SubmitButton>
      </FormCard>

      {/* Footer Help */}
      <FooterText>
        Need help instead?
        <br />
        For urgent issues or security concerns, please{' '}
        <a href="https://decentraland.org/help" target="_blank" rel="noopener noreferrer">
          contact the Support team
        </a>
        .
      </FooterText>
    </FormBackground>
  )
}

export { ReportForm }
