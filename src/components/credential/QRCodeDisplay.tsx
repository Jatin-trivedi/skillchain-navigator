import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QRCodeDisplayProps {
  credentialId: string;
  size?: number;
  showActions?: boolean;
  showInstructions?: boolean;
  className?: string;
}

export const QRCodeDisplay = ({
  credentialId,
  size = 180,
  showActions = true,
  showInstructions = true,
  className,
}: QRCodeDisplayProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const verificationUrl = `${window.location.origin}/c/${credentialId}`;

  const handleDownload = () => {
    const svg = document.getElementById(`qr-${credentialId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size * 2;
      canvas.height = size * 2;
      if (ctx) {
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `credential-${credentialId}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    
    toast({
      title: 'QR Code Downloaded',
      description: 'The QR code image has been saved.',
    });
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Link Copied!',
      description: 'Verification link copied to clipboard.',
    });
  };

  const handleOpenLink = () => {
    window.open(verificationUrl, '_blank');
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="text-center">
        <h4 className="text-sm font-medium text-foreground mb-1">Scan to Verify</h4>
        <p className="text-xs text-muted-foreground">
          Scan this QR code to view and verify this credential
        </p>
      </div>

      <div className="flex justify-center">
        <div className="p-4 bg-white rounded-xl shadow-lg">
          <QRCodeSVG
            id={`qr-${credentialId}`}
            value={verificationUrl}
            size={size}
            level="H"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#1f2937"
          />
        </div>
      </div>

      {showActions && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="text-xs"
          >
            {copied ? (
              <Check className="w-3 h-3 mr-1" />
            ) : (
              <Copy className="w-3 h-3 mr-1" />
            )}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenLink}
            className="text-xs"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Open
          </Button>
        </div>
      )}

      {showInstructions && (
        <div className="bg-muted/30 rounded-lg p-3 border border-border">
          <p className="text-xs font-medium text-foreground mb-2">How Verification Works</p>
          <ol className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-medium">1</span>
              Scan QR code with any smartphone camera
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-medium">2</span>
              Opens verification page automatically
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-medium">3</span>
              View credential details and blockchain proof
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};
