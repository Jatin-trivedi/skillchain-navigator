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
  ArrowLeft,
  Linkedin,
  Twitter,
  Mail,
  Lock,
  Globe,
  Zap,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CredentialStatusBadge, VerificationResultBox } from '@/components/credential/CredentialStatusBadge';
import { QRCodeDisplay } from '@/components/credential/QRCodeDisplay';
import { GlassCard, TrustIndicator } from '@/components/ui/glass-card';
import { CredentialLoadingSkeleton } from '@/components/ui/skeleton-loader';
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
      category: 'Cloud Computing',
      level: 'Associate',
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
      category: 'Frontend Development',
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
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const fetchCredential = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const handleShare = (platform: 'linkedin' | 'twitter' | 'email') => {
    const shareUrl = window.location.href;
    const shareText = `Verify my ${credential?.title} credential on SkillChain`;

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
        window.location.href = `mailto:?subject=${encodeURIComponent(`Verify: ${credential?.title}`)}&body=${encodeURIComponent(`Verify this credential: ${shareUrl}`)}`;
        break;
    }
    setShowShareOptions(false);
  };

  if (loading) {
    return <CredentialLoadingSkeleton />;
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
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
        {isValid && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse-subtle" />
        )}
      </div>

      {/* Header */}
      <header className="relative border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
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

      <main className="relative container mx-auto px-4 py-8 max-w-5xl">
        {/* Verification Result Box - Enhanced */}
        <div className="mb-8 animate-fade-in-up">
          <VerificationResultBox status={credential.status} credential={credential} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credential Card - Enhanced */}
            <GlassCard className="overflow-hidden animate-fade-in-up stagger-1">
              {/* Gradient Header */}
              <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-shift" />
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                      <Award className="w-8 h-8 text-primary-foreground" />
                    </div>
                    {isValid && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-background">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground mb-1">{credential.title}</h1>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {credential.issuerName}
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                            Trusted Issuer
                          </span>
                        </p>
                      </div>
                      <CredentialStatusBadge status={credential.status} size="lg" animated showTooltip />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{credential.description}</p>

                {/* Details Grid - Enhanced */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Recipient</span>
                    </div>
                    <p className="font-semibold text-foreground">{credential.studentName}</p>
                    <p className="text-xs text-muted-foreground">{credential.studentEmail}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Issuer</span>
                    </div>
                    <p className="font-semibold text-foreground">{credential.issuerName}</p>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Organization
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Issue Date</span>
                    </div>
                    <p className="font-semibold text-foreground">{formatDate(credential.issueDate)}</p>
                    {credential.expiryDate && (
                      <p className="text-xs text-muted-foreground">
                        Expires: {formatDate(credential.expiryDate)}
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Tag className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wide">Category</span>
                    </div>
                    <p className="font-semibold text-foreground">{credential.category}</p>
                    <p className="text-xs text-muted-foreground">{credential.level} Level</p>
                  </div>
                </div>

                {/* Skills - Enhanced */}
                {credential.skills && credential.skills.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Skills & Competencies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {credential.skills.map((skill, index) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions - Enhanced */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateCredentialPDF(credential)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateJSONProof(credential)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    JSON Proof
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </Button>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                    {showShareOptions && (
                      <div className="absolute top-full mt-2 right-0 bg-popover border border-border rounded-lg p-2 shadow-lg z-10 animate-fade-in min-w-[140px]">
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                        >
                          <Linkedin className="w-4 h-4" /> LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                        >
                          <Twitter className="w-4 h-4" /> Twitter
                        </button>
                        <button
                          onClick={() => handleShare('email')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                        >
                          <Mail className="w-4 h-4" /> Email
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Blockchain Proof - Enhanced */}
            <GlassCard className="animate-fade-in-up stagger-2">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Blockchain Verification Proof</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                    <code className="text-sm text-primary break-all font-mono">{blockchainHash}</code>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-muted/30 text-center hover:bg-muted/50 transition-colors">
                      <p className="text-xs text-muted-foreground mb-1">Network</p>
                      <p className="text-sm font-medium text-foreground">Ethereum</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-center border border-emerald-500/20">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <p className="text-sm font-medium text-emerald-400">Confirmed</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 text-center hover:bg-muted/50 transition-colors">
                      <p className="text-xs text-muted-foreground mb-1">Block</p>
                      <p className="text-sm font-medium text-foreground">#19283746</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 text-center hover:bg-muted/50 transition-colors">
                      <p className="text-xs text-muted-foreground mb-1">Type</p>
                      <p className="text-sm font-medium text-foreground">Credential</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Note: This is a simulated blockchain proof for demonstration purposes.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code - Enhanced */}
            <GlassCard className="animate-fade-in-up stagger-3">
              <div className="p-6">
                <div className="text-center mb-4">
                  <p className="text-sm font-medium text-foreground">Scan to Verify</p>
                  <p className="text-xs text-muted-foreground">Use any QR scanner</p>
                </div>
                <QRCodeDisplay 
                  credentialId={credential.credentialId} 
                  size={180}
                  showActions={true}
                  showInstructions={false}
                />
              </div>
            </GlassCard>

            {/* Trust Indicators */}
            <GlassCard className="animate-fade-in-up stagger-4">
              <div className="p-4 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  Trust Indicators
                </p>
                <TrustIndicator
                  icon={<Shield className="w-4 h-4" />}
                  label="Blockchain Verified"
                  verified
                />
                <TrustIndicator
                  icon={<Lock className="w-4 h-4" />}
                  label="Tamper-Proof"
                  verified
                />
                <TrustIndicator
                  icon={<Globe className="w-4 h-4" />}
                  label="Globally Verifiable"
                  verified
                />
                <TrustIndicator
                  icon={<Zap className="w-4 h-4" />}
                  label="Instant Verification"
                  verified
                />
              </div>
            </GlassCard>

            {/* Credential ID */}
            <GlassCard className="animate-fade-in-up stagger-5">
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">Credential ID</p>
                <code className="text-sm font-mono text-primary">{credential.credentialId}</code>
              </div>
            </GlassCard>

            {/* View Portfolio */}
            <Link to={`/portfolio/jatin_tech`} className="block animate-fade-in-up stagger-6">
              <Button variant="outline" className="w-full gap-2">
                <User className="w-4 h-4" />
                View Full Portfolio
              </Button>
            </Link>

            {/* Verify Another */}
            <Link to="/verify" className="block">
              <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
                <ExternalLink className="w-4 h-4" />
                Verify Another Credential
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 SkillChain. Blockchain-verified credentials for the digital age.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicCredentialPage;