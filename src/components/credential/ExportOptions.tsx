import { FileText, FileJson, Download, Share2, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateCredentialPDF, generateJSONProof, generatePublicLinks } from '@/utils/exportUtils';
import type { Credential } from '@/types/credential';

interface ExportOptionsProps {
  credential: Credential;
  className?: string;
}

export const ExportOptions = ({ credential, className }: ExportOptionsProps) => {
  const { toast } = useToast();
  const links = generatePublicLinks(credential.credentialId);

  const handlePDFExport = async () => {
    try {
      await generateCredentialPDF(credential);
      toast({
        title: 'PDF Downloaded',
        description: 'Your credential certificate has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Unable to generate PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleJSONExport = () => {
    try {
      generateJSONProof(credential);
      toast({
        title: 'JSON Proof Downloaded',
        description: 'Verifiable credential proof has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Unable to generate JSON proof. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'email' | 'copy') => {
    const shareText = `Check out my verified credential: ${credential.title}`;
    const shareUrl = links.credential;

    switch (platform) {
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(`Verified Credential: ${credential.title}`)}&body=${encodeURIComponent(`${shareText}\n\nVerify here: ${shareUrl}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: 'Link Copied!',
          description: 'Share link copied to clipboard.',
        });
        break;
    }
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Download Options */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Download</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={handlePDFExport}
              className="justify-start h-auto py-3"
            >
              <FileText className="w-4 h-4 mr-2 text-red-400" />
              <div className="text-left">
                <p className="text-sm font-medium">PDF Certificate</p>
                <p className="text-xs text-muted-foreground">Printable format</p>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={handleJSONExport}
              className="justify-start h-auto py-3"
            >
              <FileJson className="w-4 h-4 mr-2 text-blue-400" />
              <div className="text-left">
                <p className="text-sm font-medium">JSON Proof</p>
                <p className="text-xs text-muted-foreground">Verifiable credential</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Share Options */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Share</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="gap-2"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="gap-2"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('email')}
              className="gap-2"
            >
              <Mail className="w-4 h-4 text-orange-400" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('copy')}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        </div>

        {/* Direct Link */}
        <div className="p-3 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground mb-2">Direct Verification Link</p>
          <code className="text-xs text-primary break-all">{links.credential}</code>
        </div>
      </div>
    </div>
  );
};
