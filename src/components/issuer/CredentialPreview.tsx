import { Shield, Lock, Globe, Eye, Loader2, CheckSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { CredentialFormData, StudentLookupResult } from '@/types/credential';

interface CredentialPreviewProps {
  formData: Partial<CredentialFormData>;
  student: StudentLookupResult | null;
  issuerName: string;
  isFormValid: boolean;
  isConfirmed: boolean;
  onConfirmChange: (confirmed: boolean) => void;
  onPreview: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const CredentialPreview = ({
  formData,
  student,
  issuerName,
  isFormValid,
  isConfirmed,
  onConfirmChange,
  onPreview,
  onSubmit,
  isSubmitting,
}: CredentialPreviewProps) => {
  const canSubmit = student && isFormValid && isConfirmed && !isSubmitting;

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">3. Security & Confirmation</h3>
            <p className="text-sm text-muted-foreground">Review and issue the credential</p>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
            <Lock className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-foreground font-medium">Immutable</p>
            <p className="text-xs text-muted-foreground">Record</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
            <Shield className="w-5 h-5 text-secondary mx-auto mb-1" />
            <p className="text-xs text-foreground font-medium">Tamper</p>
            <p className="text-xs text-muted-foreground">Proof</p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
            <Globe className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-xs text-foreground font-medium">Globally</p>
            <p className="text-xs text-muted-foreground">Verifiable</p>
          </div>
        </div>

        {/* Preview Summary */}
        {student && formData.title && (
          <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Preview Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Recipient:</span>
                <span className="text-sm text-foreground font-medium">
                  {student.firstName} {student.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Title:</span>
                <span className="text-sm text-foreground font-medium truncate max-w-[200px]">
                  {formData.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm text-foreground">{formData.category || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Level:</span>
                <span className="text-sm text-foreground">{formData.level || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Issuer:</span>
                <span className="text-sm text-foreground">{issuerName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Checkbox */}
        <div className="flex items-start gap-3 mb-6 p-4 rounded-lg bg-muted/30 border border-border">
          <Checkbox
            id="confirm"
            checked={isConfirmed}
            onCheckedChange={(checked) => onConfirmChange(!!checked)}
            disabled={!student || !isFormValid}
            className="mt-0.5"
          />
          <Label
            htmlFor="confirm"
            className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
          >
            I confirm that this credential is accurate and the student has earned this recognition.
            This action will create an immutable blockchain record.
          </Label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onPreview}
            disabled={!student || !formData.title}
            className="flex-1 border-border"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview Credential
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="flex-1 gradient-bg text-primary-foreground glow-hover"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Issuing...
              </>
            ) : (
              <>
                <CheckSquare className="w-4 h-4 mr-2" />
                Issue Credential
              </>
            )}
          </Button>
        </div>

        {!student && (
          <p className="mt-3 text-sm text-muted-foreground text-center">
            Please verify a student first
          </p>
        )}
        {student && !isFormValid && (
          <p className="mt-3 text-sm text-muted-foreground text-center">
            Please complete all required fields
          </p>
        )}
      </CardContent>
    </Card>
  );
};
