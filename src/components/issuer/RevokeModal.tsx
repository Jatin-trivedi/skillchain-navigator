import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Credential } from '@/types/credential';

interface RevokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  credential: Credential | null;
  onConfirm: (credentialId: string, reason?: string) => Promise<void>;
}

export const RevokeModal = ({ isOpen, onClose, credential, onConfirm }: RevokeModalProps) => {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!credential) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(credential.id, reason || undefined);
      setReason('');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <DialogTitle className="text-lg font-semibold text-foreground">
              Revoke Credential
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            This action cannot be undone. The credential will be permanently marked as revoked.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Credential:</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {credential.title}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Student:</span>
              <span className="text-foreground">{credential.studentName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ID:</span>
              <code className="text-xs text-primary">{credential.credentialId}</code>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-foreground">
              Reason for revocation <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="e.g., Academic misconduct, Certificate issued in error..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-muted border-border"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 border-border"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Revoking...
              </>
            ) : (
              'Confirm Revocation'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
