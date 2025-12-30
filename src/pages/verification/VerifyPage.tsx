import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Search, Shield, CheckCircle2, XCircle, AlertTriangle, 
  Copy, QrCode, Share2, ExternalLink, Award, User, 
  Building, Calendar, Clock, Hash, ArrowLeft, Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { verifyCredential, generateVerificationLink, type VerificationResult } from '@/services/verificationService';

const VerifyPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [credentialId, setCredentialId] = useState(searchParams.get('cid') || '');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleVerify = async () => {
    if (!credentialId.trim()) {
      toast({ title: 'Please enter a credential ID', variant: 'destructive' });
      return;
    }

    setVerifying(true);
    setResult(null);

    try {
      const verificationResult = await verifyCredential(credentialId.trim());
      setResult(verificationResult);
    } catch (error) {
      toast({ title: 'Verification failed', variant: 'destructive' });
    } finally {
      setVerifying(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} copied to clipboard` });
  };

  const shareVerification = () => {
    const link = generateVerificationLink(credentialId);
    if (navigator.share) {
      navigator.share({ title: 'Credential Verification', url: link });
    } else {
      copyToClipboard(link, 'Verification link');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="logged-out"
        activeTab="verify"
      />

      <main className="container mx-auto px-4 md:px-8 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-bg mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Verify Credential</h1>
          <p className="text-muted-foreground mt-2">
            Enter a credential ID to verify its authenticity on the blockchain
          </p>
        </div>

        {/* Search Input */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter Credential ID (e.g., CRD-2024-ABC123)"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              <Button 
                onClick={handleVerify} 
                disabled={verifying}
                className="gradient-bg text-primary-foreground"
              >
                {verifying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Examples: CRD-2024-ABC123, BATCH-2024-XYZ789
            </p>
          </CardContent>
        </Card>

        {/* Loading State */}
        {verifying && (
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-8 text-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-foreground">Verifying credential on blockchain...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take a few seconds</p>
            </CardContent>
          </Card>
        )}

        {/* Valid Credential Result */}
        {result && result.isValid && result.credential && (
          <div className="space-y-6 animate-fade-in">
            {/* Success Banner */}
            <Card className="bg-emerald-500/10 border-emerald-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Credential Verified!</h2>
                    <p className="text-muted-foreground">
                      This credential is authentic and valid
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credential Details */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg gradient-bg">
                    <Award className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{result.credential.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{result.credential.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Recipient</p>
                        <p className="text-foreground font-medium">{result.credential.studentName}</p>
                        <p className="text-xs text-muted-foreground">{result.credential.studentEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Issuer</p>
                        <p className="text-foreground font-medium">{result.credential.issuerName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Issued</p>
                        <p className="text-foreground font-medium">
                          {format(new Date(result.credential.issueDate), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Category & Level</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{result.credential.category}</Badge>
                          <Badge variant="outline" className="text-xs">{result.credential.level}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Credential ID</p>
                    <p className="font-mono text-foreground truncate">{result.credential.credentialId}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(result.credential!.credentialId, 'Credential ID')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Proof */}
            {result.blockchainProof && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Blockchain Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: CheckCircle2, label: 'Verified', color: 'text-emerald-500' },
                      { icon: Shield, label: 'Tamper-Proof', color: 'text-primary' },
                      { icon: Clock, label: 'Timestamped', color: 'text-yellow-500' },
                      { icon: Hash, label: 'Immutable', color: 'text-secondary' },
                    ].map((item, i) => (
                      <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
                        <item.icon className={`w-5 h-5 mx-auto mb-1 ${item.color}`} />
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 p-4 rounded-lg bg-muted/30 font-mono text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="text-foreground">{result.blockchainProof.blockchain}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Block:</span>
                      <span className="text-foreground">#{result.blockchainProof.blockNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Hash:</span>
                      <span className="text-foreground truncate max-w-[200px]">{result.blockchainProof.credentialHash}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Timestamp:</span>
                      <span className="text-foreground">
                        {format(new Date(result.blockchainProof.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <a href={result.blockchainProof.explorerUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Block Explorer
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Share Options */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="outline" onClick={() => copyToClipboard(generateVerificationLink(credentialId), 'Verification link')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Dialog open={showQR} onOpenChange={setShowQR}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <QrCode className="w-4 h-4 mr-2" />
                        QR Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Verification QR Code</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center p-6 bg-white rounded-lg">
                        <QRCodeSVG value={generateVerificationLink(credentialId)} size={200} />
                      </div>
                      <p className="text-center text-sm text-muted-foreground">
                        Scan to verify this credential
                      </p>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" onClick={shareVerification}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Invalid/Revoked/Not Found Result */}
        {result && !result.isValid && (
          <Card className={`animate-fade-in ${
            result.status === 'revoked' 
              ? 'bg-destructive/10 border-destructive/30' 
              : result.status === 'expired'
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-muted border-border'
          }`}>
            <CardContent className="p-8 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                result.status === 'revoked' 
                  ? 'bg-destructive/20' 
                  : result.status === 'expired'
                    ? 'bg-yellow-500/20'
                    : 'bg-muted'
              }`}>
                {result.status === 'revoked' ? (
                  <XCircle className="w-8 h-8 text-destructive" />
                ) : result.status === 'expired' ? (
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              
              <h2 className="text-xl font-bold text-foreground mb-2">
                {result.status === 'revoked' && 'Credential Revoked'}
                {result.status === 'expired' && 'Credential Expired'}
                {result.status === 'not_found' && 'Credential Not Found'}
                {result.status === 'invalid' && 'Invalid Credential ID'}
              </h2>
              
              <p className="text-muted-foreground mb-4">{result.message}</p>

              {result.revokedInfo && (
                <div className="p-4 rounded-lg bg-background/50 text-left max-w-sm mx-auto">
                  <p className="text-sm text-muted-foreground">
                    <strong>Revoked on:</strong> {result.revokedInfo.date}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Reason:</strong> {result.revokedInfo.reason}
                  </p>
                </div>
              )}

              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => { setResult(null); setCredentialId(''); }}
              >
                Try Another Verification
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Trust Information */}
        {!result && !verifying && (
          <Card className="bg-muted/30 border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                How Verification Works
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { step: '1', title: 'Enter ID', desc: 'Input the unique credential identifier' },
                  { step: '2', title: 'Blockchain Check', desc: 'We verify the hash on the blockchain' },
                  { step: '3', title: 'Instant Result', desc: 'Get verification status immediately' },
                ].map((item) => (
                  <div key={item.step} className="text-center p-4 rounded-lg bg-card border border-border">
                    <div className="w-8 h-8 rounded-full gradient-bg text-primary-foreground font-bold flex items-center justify-center mx-auto mb-2">
                      {item.step}
                    </div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default VerifyPage;
