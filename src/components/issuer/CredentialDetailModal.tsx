import { Copy, Share2, Calendar, Tag, Award, Clock, User, Building2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import { useToast } from '@/hooks/use-toast';
import type { Credential } from '@/types/credential';

interface CredentialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  credential: Credential | null;
  onRevoke: (credential: Credential) => void;
}

export const CredentialDetailModal = ({
  isOpen,
  onClose,
  credential,
  onRevoke,
}: CredentialDetailModalProps) => {
  const { toast } = useToast();

  if (!credential) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(credential.credentialId);
    toast({
      title: 'Copied!',
      description: 'Credential ID copied to clipboard',
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/verify/${credential.credentialId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied!',
      description: 'Shareable verification link copied',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">
                  Credential Details
                </DialogTitle>
                <StatusBadge status={credential.status} size="sm" />
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title & Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{credential.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {credential.description}
            </p>
          </div>

          {/* Credential ID */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Credential ID</p>
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-primary">{credential.credentialId}</code>
              <Button variant="ghost" size="sm" onClick={handleCopyId} className="h-8 px-2">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3" /> Student
              </p>
              <p className="text-sm text-foreground font-medium">{credential.studentName}</p>
              <p className="text-xs text-muted-foreground">{credential.studentEmail}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Issuer
              </p>
              <p className="text-sm text-foreground font-medium">{credential.issuerName}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Issue Date
              </p>
              <p className="text-sm text-foreground">{formatDate(credential.issueDate)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Tag className="w-3 h-3" /> Category
              </p>
              <p className="text-sm text-foreground">{credential.category}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Award className="w-3 h-3" /> Level
              </p>
              <p className="text-sm text-foreground">{credential.level}</p>
            </div>

            {credential.hours && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Duration
                </p>
                <p className="text-sm text-foreground">{credential.hours} hours</p>
              </div>
            )}
          </div>

          {/* Skills */}
          {credential.skills && credential.skills.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {credential.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Revocation Info */}
          {credential.status === 'revoked' && credential.revokedAt && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm font-medium text-destructive mb-1">Revoked</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(credential.revokedAt)}
              </p>
              {credential.revokedReason && (
                <p className="text-sm text-muted-foreground mt-2">
                  Reason: {credential.revokedReason}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={handleCopyId} className="flex-1 border-border">
              <Copy className="w-4 h-4 mr-2" />
              Copy ID
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex-1 border-border">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            {credential.status === 'issued' && (
              <Button
                variant="outline"
                onClick={() => onRevoke(credential)}
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                Revoke
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
