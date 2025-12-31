import { useState } from 'react';
import { Copy, Share2, Calendar, Tag, Award, Clock, User, Building2, QrCode, Download, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CredentialStatusBadge } from './CredentialStatusBadge';
import { AddedByIndicator } from './AddedByIndicator';
import { QRCodeDisplay } from './QRCodeDisplay';
import { ExportOptions } from './ExportOptions';
import { useToast } from '@/hooks/use-toast';
import type { Credential } from '@/types/credential';

interface EnhancedCredentialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  credential: Credential | null;
  onRevoke?: (credential: Credential) => void;
  showRevokeButton?: boolean;
}

export const EnhancedCredentialDetailModal = ({
  isOpen,
  onClose,
  credential,
  onRevoke,
  showRevokeButton = false,
}: EnhancedCredentialDetailModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');

  if (!credential) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(credential.credentialId);
    toast({
      title: 'Copied!',
      description: 'Credential ID copied to clipboard',
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/c/${credential.credentialId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied!',
      description: 'Shareable verification link copied',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Generate simulated blockchain hash
  const blockchainHash = credential.blockchainHash || 
    `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <CredentialStatusBadge status={credential.status} size="sm" />
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="details" className="text-xs gap-1">
              <FileText className="w-3 h-3" />
              Details
            </TabsTrigger>
            <TabsTrigger value="qr" className="text-xs gap-1">
              <QrCode className="w-3 h-3" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="export" className="text-xs gap-1">
              <Download className="w-3 h-3" />
              Export
            </TabsTrigger>
            <TabsTrigger value="proof" className="text-xs gap-1">
              <Shield className="w-3 h-3" />
              Proof
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-4 space-y-6">
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
                  <User className="w-3 h-3" /> Recipient
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
              {showRevokeButton && credential.status === 'issued' && onRevoke && (
                <Button
                  variant="outline"
                  onClick={() => onRevoke(credential)}
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  Revoke
                </Button>
              )}
            </div>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="mt-4">
            <QRCodeDisplay credentialId={credential.credentialId} />
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="mt-4">
            <ExportOptions credential={credential} />
          </TabsContent>

          {/* Proof Tab */}
          <TabsContent value="proof" className="mt-4 space-y-4">
            <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-indigo-400" />
                <h4 className="font-medium text-foreground">Blockchain Verification</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                This credential is anchored to the blockchain, creating an immutable, tamper-proof record.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 rounded bg-background/50">
                  <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                  <code className="text-xs text-primary break-all">{blockchainHash}</code>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-background/50">
                    <p className="text-xs text-muted-foreground mb-1">Network</p>
                    <p className="text-sm text-foreground">Ethereum (Simulated)</p>
                  </div>
                  <div className="p-3 rounded bg-background/50">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <p className="text-sm text-emerald-400">Confirmed</p>
                  </div>
                </div>
              </div>
            </div>

            <AddedByIndicator
              addedBy="issuer"
              issuerName={credential.issuerName}
              studentName={credential.studentName}
              showChain
            />

            <p className="text-xs text-muted-foreground text-center">
              Note: This is a simulated blockchain proof for demonstration purposes.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
