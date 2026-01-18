import { useState, useEffect } from 'react';
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
  
  // Initialize with CID from URL if present
  const [credentialId, setCredentialId] = useState(searchParams.get('cid') || '');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showQR, setShowQR] = useState(false);

  // Auto-verify if CID is in URL on mount
  useEffect(() => {
    const cid = searchParams.get('cid');
    if (cid) {
      handleVerify(cid);
    }
  }, []);

  const handleVerify = async (idToVerify?: string) => {
    const targetId = idToVerify || credentialId;

    if (!targetId.trim()) {
      toast({ 
        title: 'Input Required', 
        description: 'Please enter a credential ID to proceed.',
        variant: 'destructive' 
      });
      return;
    }

    setVerifying(true);
    setResult(null);

    try {
      // Calling the service that queries Firestore
      const verificationResult = await verifyCredential(targetId.trim());
      setResult(verificationResult);

      if (verificationResult.isValid) {
        toast({
          title: 'Verification Successful',
          description: 'Credential found and validated on blockchain.',
        });
      } else if (verificationResult.status === 'not_found') {
        toast({
          title: 'Not Found',
          description: 'No matching record exists for this ID.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error("Verification Page Error:", error);
      toast({ 
        title: 'System Error', 
        description: 'Failed to connect to the verification service.',
        variant: 'destructive' 
      });
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
      navigator.share({ 
        title: 'AuthVision Credential Verification', 
        text: `Verify credential ${credentialId} on AuthVision`,
        url: link 
      });
    } else {
      copyToClipboard(link, 'Verification link');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar authState="logged-out" activeTab="verify" 
        onLogin={() => navigate("/login")}
        onSignup={() => navigate("/signup")}
        onVerify={() => navigate("/verify")}/>

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
        <Card className="mb-8 bg-card border-border shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter Credential ID (e.g., CRD-2024-ABC123)"
                  value={credentialId}
                  // Removed forced toUpperCase() to support case-sensitive Firestore IDs
                  onChange={(e) => setCredentialId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              <Button 
                onClick={() => handleVerify()} 
                disabled={verifying}
                className="gradient-bg text-primary-foreground font-semibold px-8"
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

        {/* Loading State Overlay */}
        {verifying && (
          <Card className="mb-8 bg-card border-border animate-pulse">
            <CardContent className="p-12 text-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-foreground font-medium">Querying Blockchain Records...</p>
              <p className="text-sm text-muted-foreground mt-2">Connecting to decentralized ledger</p>
            </CardContent>
          </Card>
        )}

        {/* Valid Credential Result Display */}
        {result && result.isValid && result.credential && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-emerald-500/10 border-emerald-500/30 overflow-hidden">
              <div className="h-1 gradient-bg" />
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Credential Verified!</h2>
                    <p className="text-muted-foreground">This digital record is authentic and has not been tampered with.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg gradient-bg">
                      <Award className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{result.credential.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-emerald-500/20">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{result.credential.description}</p>

                <div className="grid md:grid-cols-2 gap-6 p-4 rounded-xl bg-muted/20 border border-border/50">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Recipient</p>
                        <p className="text-foreground font-semibold">{result.credential.studentName}</p>
                        <p className="text-xs text-muted-foreground">{result.credential.studentEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Issuing Authority</p>
                        <p className="text-foreground font-semibold">{result.credential.issuerName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Date of Issue</p>
                        <p className="text-foreground font-semibold">
                          {format(new Date(result.credential.issueDate), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-4 h-4 text-primary mt-1" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Level & Category</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] px-2 py-0">{result.credential.category}</Badge>
                          <Badge variant="outline" className="text-[10px] px-2 py-0">{result.credential.level}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-dashed border-border">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">System Identifier</p>
                    <p className="font-mono text-xs text-foreground truncate">{result.credential.credentialId}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => copyToClipboard(result.credential!.credentialId, 'Credential ID')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Proof Section */}
            {result.blockchainProof && (
              <Card className="bg-card border-border shadow-md">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-primary" />
                    Blockchain Proof of Authenticity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: CheckCircle2, label: 'Verified Status', color: 'text-emerald-500' },
                      { icon: Shield, label: 'Tamper-Proof', color: 'text-blue-500' },
                      { icon: Clock, label: 'Time Anchored', color: 'text-amber-500' },
                      { icon: Hash, label: 'Immutable ID', color: 'text-purple-500' },
                    ].map((item, i) => (
                      <div key={i} className="text-center p-3 rounded-lg bg-muted/40 border border-border/50">
                        <item.icon className={`w-5 h-5 mx-auto mb-1 ${item.color}`} />
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-xs border border-border">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Network</span>
                      <span className="text-foreground font-bold">{result.blockchainProof.blockchain}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 py-2">
                      <span className="text-muted-foreground">Block Height</span>
                      <span className="text-foreground">#{result.blockchainProof.blockNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 py-2">
                      <span className="text-muted-foreground">Cryptographic Hash</span>
                      <span className="text-foreground truncate max-w-[150px] md:max-w-none ml-2">
                        {result.blockchainProof.credentialHash}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Confirmed At</span>
                      <span className="text-foreground">
                        {format(new Date(result.blockchainProof.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-colors" asChild>
                    <a href={result.blockchainProof.explorerUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View On-Chain Transaction
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Share & QR Controls */}
            <div className="flex flex-wrap gap-3 justify-center pb-12">
              <Button variant="secondary" className="rounded-full" onClick={() => copyToClipboard(generateVerificationLink(credentialId), 'Verification link')}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Dialog open={showQR} onOpenChange={setShowQR}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="rounded-full">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Proof
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Verification QR Code</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl">
                    <QRCodeSVG value={generateVerificationLink(credentialId)} size={200} level="H" includeMargin={true} />
                    <p className="mt-4 text-sm font-mono text-slate-500 uppercase tracking-widest">{credentialId}</p>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Scanning this code will lead directly to this verified page.
                  </p>
                </DialogContent>
              </Dialog>
              <Button variant="secondary" className="rounded-full" onClick={shareVerification}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Verification
              </Button>
            </div>
          </div>
        )}

        {/* Error/Invalid/Revoked Handling */}
        {result && !result.isValid && (
          <Card className={`animate-in zoom-in-95 duration-300 ${
            result.status === 'revoked' 
              ? 'bg-destructive/10 border-destructive/30' 
              : result.status === 'expired'
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-muted border-border'
          }`}>
            <CardContent className="p-10 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
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
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {result.status === 'revoked' && 'Credential Revoked'}
                {result.status === 'expired' && 'Credential Expired'}
                {result.status === 'not_found' && 'Record Not Found'}
                {result.status === 'invalid' && 'Invalid ID Format'}
              </h2>
              
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">{result.message}</p>

              {result.revokedInfo && (
                <div className="p-4 rounded-xl bg-background/50 text-left max-w-sm mx-auto border border-destructive/20 mb-6">
                  <p className="text-xs font-bold uppercase text-destructive mb-1">Revocation Details</p>
                  <p className="text-sm text-foreground">
                    <strong>Date:</strong> {result.revokedInfo.date}
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    <strong>Reason:</strong> {result.revokedInfo.reason}
                  </p>
                </div>
              )}

              <Button 
                variant="outline" 
                className="rounded-full px-8"
                onClick={() => { setResult(null); setCredentialId(''); }}
              >
                Try Another ID
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Informational Section (Visible when no result) */}
        {!result && !verifying && (
          <Card className="bg-muted/30 border-border shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                How AuthVision Verification Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: '1', title: 'Input Identity', desc: 'The unique hash or ID provided on your certificate' },
                  { step: '2', title: 'Ledger Query', desc: 'We scan the Firestore & Blockchain for a matching record' },
                  { step: '3', title: 'Truth Confirmation', desc: 'Authenticity is confirmed via cryptographic proof' },
                ].map((item) => (
                  <div key={item.step} className="relative text-center p-5 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="w-10 h-10 rounded-full gradient-bg text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3 shadow-md">
                      {item.step}
                    </div>
                    <p className="font-bold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
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