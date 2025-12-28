import { CheckCircle2, Copy, Mail, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { Credential } from '@/types/credential';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  credential: Credential | null;
  onIssueAnother: () => void;
  onViewCredential: () => void;
}

export const SuccessModal = ({
  isOpen,
  onClose,
  credential,
  onIssueAnother,
  onViewCredential,
}: SuccessModalProps) => {
  const { toast } = useToast();

  if (!credential) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(credential.credentialId);
    toast({
      title: 'Copied!',
      description: 'Credential ID copied to clipboard',
    });
  };

  const handleEmailStudent = () => {
    const subject = encodeURIComponent(`Your Credential: ${credential.title}`);
    const body = encodeURIComponent(
      `Congratulations!\n\nYou have been issued a new credential:\n\n` +
      `Title: ${credential.title}\n` +
      `Credential ID: ${credential.credentialId}\n` +
      `Issued by: ${credential.issuerName}\n\n` +
      `You can verify this credential at any time using the Credential ID.`
    );
    window.open(`mailto:${credential.studentEmail}?subject=${subject}&body=${body}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Credential Issued Successfully!
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Credential ID */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Credential ID</p>
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-primary">
                {credential.credentialId}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyId}
                className="h-8 px-2"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Student:</span>
              <span className="text-foreground font-medium">{credential.studentName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground">{credential.studentEmail}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Title:</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {credential.title}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category:</span>
              <span className="text-foreground">{credential.category}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onViewCredential}
              className="w-full border-border"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Credential
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleCopyId}
                className="border-border"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy ID
              </Button>
              <Button
                variant="outline"
                onClick={handleEmailStudent}
                className="border-border"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>

            <Button
              onClick={onIssueAnother}
              className="w-full gradient-bg text-primary-foreground glow-hover mt-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Issue Another
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
