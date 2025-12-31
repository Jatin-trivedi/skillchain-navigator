import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Building2, 
  User, 
  Tag, 
  Clock,
  Shield,
  ExternalLink,
  Download,
  Share2,
  Copy,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CredentialStatusBadge } from '@/components/credential/CredentialStatusBadge';
import { QRCodeDisplay } from '@/components/credential/QRCodeDisplay';
import { generateCredentialPDF, generateJSONProof } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';
import type { Credential } from '@/types/credential';

// Mock credential data for demo
const getMockCredential = (id: string): Credential | null => {
  const credentials: Record<string, Credential> = {
    'CRED-2024-001': {
      id: '1',
      credentialId: 'CRED-2024-001',
      title: 'AWS Solutions Architect Associate',
      description: 'Certified in designing distributed systems on AWS cloud infrastructure with expertise in high availability, fault tolerance, and cost optimization.',
      issueDate: '2024-12-15',
      expiryDate: '2026-12-15',
      studentId: 'student_001',
      studentEmail: 'jatin@example.com',
      studentName: 'Jatin Kumar',
      issuerId: 'issuer_001',
      issuerName: 'Amazon Web Services',
      category: 'Software Development',
      level: 'Intermediate',
      hours: 40,
      skills: ['AWS', 'Cloud Architecture', 'DevOps', 'EC2', 'S3', 'Lambda'],
      status: 'issued',
      blockchainHash: '0x7f5c5d8e9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
      createdAt: '2024-12-15T10:30:00Z',
      updatedAt: '2024-12-15T10:30:00Z',
    },
    'CRED-2024-002': {
      id: '2',
      credentialId: 'CRED-2024-002',
      title: 'React Developer Certification',
      description: 'Advanced React development including hooks, state management, performance optimization, and testing.',
      issueDate: '2024-12-10',
      studentId: 'student_001',
      studentEmail: 'jatin@example.com',
      studentName: 'Jatin Kumar',
      issuerId: 'issuer_002',
      issuerName: 'Meta',
      category: 'Software Development',
      level: 'Advanced',
      hours: 60,
      skills: ['React', 'JavaScript', 'TypeScript', 'Redux', 'Testing'],
      status: 'issued',
      createdAt: '2024-12-10T14:00:00Z',
      updatedAt: '2024-12-10T14:00:00Z',
    },
  };

  return credentials[id] || credentials['CRED-2024-001'];
};

const PublicCredentialPage = () => {
  const { credentialId } = useParams<{ credentialId: string }>();
  const { toast } = useToast();
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    checkedAt: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchCredential = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const cred = getMockCredential(credentialId || 'CRED-2024-001');
      setCredential(cred);
      
      if (cred) {
        const isValid = cred.status === 'issued' || (cred.status as string) === 'verified';
        setVerificationResult({
          valid: isValid,
          checkedAt: new Date().toISOString(),
          message: isValid
            ? 'This credential is verified and authentic.'
            : `This credential has status: ${cred.status}`,
        });
      }
      
      setLoading(false);
    };

    fetchCredential();
  }, [credentialId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copied!',
      description: 'Verification link copied to clipboard.',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying credential...</p>
        </div>
      </div>
    );
  }

  if (!credential) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 bg-card border-border">
          <CardContent className="p-8 text-center">
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Credential Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The credential ID you provided does not exist or may have been removed.
            </p>
            <Link to="/verify">
              <Button variant="outline">Try Another Verification</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isValid = verificationResult?.valid;
  const blockchainHash = credential.blockchainHash || 
    `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">SkillChain</span>
            </Link>
            <Link to="/verify">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Verify
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Verification Banner */}
        <div className={`p-4 rounded-xl mb-6 ${
          isValid 
            ? 'bg-emerald-500/10 border border-emerald-500/20' 
            : 'bg-destructive/10 border border-destructive/20'
        }`}>
          <div className="flex items-center gap-3">
            {isValid ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
            <div>
              <h2 className={`font-semibold ${isValid ? 'text-emerald-400' : 'text-destructive'}`}>
                {isValid ? 'Credential Verified Successfully' : 'Verification Failed'}
              </h2>
              <p className="text-sm text-muted-foreground">{verificationResult?.message}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credential Card */}
            <Card className="bg-card border-border overflow-hidden">
              <div className="h-2 gradient-bg" />
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-foreground mb-2">{credential.title}</h1>
                    <p className="text-muted-foreground">{credential.description}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <CredentialStatusBadge status={credential.status} showMessage size="lg" />
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs">Recipient</span>
                    </div>
                    <p className="font-medium text-foreground">{credential.studentName}</p>
                    <p className="text-xs text-muted-foreground">{credential.studentEmail}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs">Issuer</span>
                    </div>
                    <p className="font-medium text-foreground">{credential.issuerName}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Issue Date</span>
                    </div>
                    <p className="font-medium text-foreground">{formatDate(credential.issueDate)}</p>
                    {credential.expiryDate && (
                      <p className="text-xs text-muted-foreground">
                        Expires: {formatDate(credential.expiryDate)}
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Tag className="w-4 h-4" />
                      <span className="text-xs">Category & Level</span>
                    </div>
                    <p className="font-medium text-foreground">{credential.category}</p>
                    <p className="text-xs text-muted-foreground">{credential.level}</p>
                  </div>
                </div>

                {/* Skills */}
                {credential.skills && credential.skills.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-2">Skills & Competencies</p>
                    <div className="flex flex-wrap gap-2">
                      {credential.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateCredentialPDF(credential)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateJSONProof(credential)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    JSON Proof
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Proof */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-semibold text-foreground">Blockchain Verification Proof</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                    <code className="text-sm text-primary break-all">{blockchainHash}</code>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Network</p>
                      <p className="text-sm font-medium text-foreground">Ethereum</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <p className="text-sm font-medium text-emerald-400">Confirmed</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Block</p>
                      <p className="text-sm font-medium text-foreground">#19283746</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Type</p>
                      <p className="text-sm font-medium text-foreground">Credential</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Note: This is a simulated blockchain proof for demonstration purposes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <QRCodeDisplay 
                  credentialId={credential.credentialId} 
                  size={160}
                  showActions={true}
                  showInstructions={false}
                />
              </CardContent>
            </Card>

            {/* Credential ID */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Credential ID</p>
                <code className="text-sm font-mono text-primary">{credential.credentialId}</code>
              </CardContent>
            </Card>

            {/* Verify Another */}
            <Link to="/verify" className="block">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Verify Another Credential
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 SkillChain. Blockchain-verified credentials for the digital age.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicCredentialPage;
