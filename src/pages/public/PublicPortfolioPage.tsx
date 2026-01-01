import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Award, 
  Shield, 
  User, 
  Calendar, 
  ExternalLink,
  Share2,
  Linkedin,
  Twitter,
  Copy,
  CheckCircle2,
  Building2,
  Download,
  Mail,
  Sparkles,
  TrendingUp,
  Users,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CredentialStatusBadge } from '@/components/credential/CredentialStatusBadge';
import { QRCodeDisplay } from '@/components/credential/QRCodeDisplay';
import { GlassCard, GradientText, TrustIndicator } from '@/components/ui/glass-card';
import { PortfolioLoadingSkeleton } from '@/components/ui/skeleton-loader';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/hooks/use-toast';
import type { Credential } from '@/types/credential';

interface PortfolioData {
  user: {
    uid: string;
    name: string;
    email: string;
    username: string;
    bio?: string;
    profilePhoto?: string;
    tagline?: string;
    trustScore?: number;
  };
  credentials: Credential[];
  skills: string[];
  stats: {
    totalCredentials: number;
    verifiedCount: number;
    uniqueIssuers: number;
  };
}

// Mock portfolio data
const getMockPortfolio = (username: string): PortfolioData | null => {
  if (username === 'jatin_tech' || username === 'demo') {
    return {
      user: {
        uid: 'student_001',
        name: 'Jatin Kumar',
        email: 'jatin@example.com',
        username: 'jatin_tech',
        bio: 'BTech Student • Cloud & Blockchain Enthusiast • Building the future with code',
        tagline: 'Full Stack Developer',
        trustScore: 98,
      },
      credentials: [
        {
          id: '1',
          credentialId: 'CRED-2024-001',
          title: 'AWS Solutions Architect Associate',
          description: 'Certified in designing distributed systems on AWS',
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
          skills: ['AWS', 'Cloud Architecture', 'DevOps'],
          status: 'issued',
          createdAt: '2024-12-15',
          updatedAt: '2024-12-15',
        },
        {
          id: '2',
          credentialId: 'CRED-2024-002',
          title: 'React Developer Certification',
          description: 'Advanced React development and best practices',
          issueDate: '2024-12-10',
          studentId: 'student_001',
          studentEmail: 'jatin@example.com',
          studentName: 'Jatin Kumar',
          issuerId: 'issuer_002',
          issuerName: 'Meta',
          category: 'Frontend Development',
          level: 'Advanced',
          hours: 60,
          skills: ['React', 'JavaScript', 'TypeScript'],
          status: 'issued',
          createdAt: '2024-12-10',
          updatedAt: '2024-12-10',
        },
        {
          id: '3',
          credentialId: 'CRED-2024-003',
          title: 'Blockchain Developer Fundamentals',
          description: 'Web3 development with Ethereum and Solidity',
          issueDate: '2024-12-05',
          studentId: 'student_001',
          studentEmail: 'jatin@example.com',
          studentName: 'Jatin Kumar',
          issuerId: 'issuer_003',
          issuerName: 'Ethereum Foundation',
          category: 'Blockchain & Web3',
          level: 'Intermediate',
          hours: 50,
          skills: ['Blockchain', 'Solidity', 'Web3', 'Smart Contracts'],
          status: 'issued',
          createdAt: '2024-12-05',
          updatedAt: '2024-12-05',
        },
      ],
      skills: ['AWS', 'Cloud Architecture', 'DevOps', 'React', 'JavaScript', 'TypeScript', 'Blockchain', 'Solidity', 'Web3', 'Smart Contracts'],
      stats: {
        totalCredentials: 3,
        verifiedCount: 3,
        uniqueIssuers: 3,
      },
    };
  }
  return null;
};

const PublicPortfolioPage = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = getMockPortfolio(username || 'demo');
      setPortfolio(data);
      setLoading(false);
    };

    fetchPortfolio();
  }, [username]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'copy' | 'email') => {
    const shareUrl = window.location.href;
    const shareText = `Check out ${portfolio?.user.name}'s verified credentials portfolio on SkillChain`;

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
        window.location.href = `mailto:?subject=${encodeURIComponent(`${portfolio?.user.name}'s Credential Portfolio`)}&body=${encodeURIComponent(`Check out this verified credentials portfolio: ${shareUrl}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: 'Link Copied!',
          description: 'Portfolio link copied to clipboard.',
        });
        break;
    }
  };

  if (loading) {
    return <PortfolioLoadingSkeleton />;
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 bg-card border-border">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Portfolio Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The portfolio you're looking for doesn't exist or may have been removed.
            </p>
            <Link to="/">
              <Button>Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
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
                Verify Credentials
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header - Enhanced */}
        <div className="text-center mb-10 animate-fade-in-up">
          {/* Avatar with gradient border */}
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-r from-primary to-secondary">
              <div className="w-full h-full rounded-full gradient-bg flex items-center justify-center">
                <User className="w-14 h-14 text-primary-foreground" />
              </div>
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-4 border-background trust-glow">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-1">{portfolio.user.name}</h1>
          {portfolio.user.tagline && (
            <p className="text-primary font-medium mb-2">{portfolio.user.tagline}</p>
          )}
          {portfolio.user.bio && (
            <p className="text-muted-foreground max-w-md mx-auto mb-4">{portfolio.user.bio}</p>
          )}

          {/* Trust Score & Verified Badge */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              Trust Score: {portfolio.user.trustScore || 95}%
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 px-3 py-1">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified Profile
            </Badge>
          </div>

          {/* Share Buttons */}
          <div className="flex justify-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')} className="gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('twitter')} className="gap-2">
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('email')} className="gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('copy')} className="gap-2">
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </div>

        {/* Stats - Enhanced */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in-up stagger-1">
          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{portfolio.stats.totalCredentials}</p>
            <p className="text-sm text-muted-foreground">Credentials</p>
          </GlassCard>
          <GlassCard className="p-4 text-center" gradient="success">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-400">{portfolio.stats.verifiedCount}</p>
            <p className="text-sm text-muted-foreground">Verified</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-2">
              <Building2 className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{portfolio.stats.uniqueIssuers}</p>
            <p className="text-sm text-muted-foreground">Issuers</p>
          </GlassCard>
        </div>

        {/* Skills - Enhanced */}
        <GlassCard className="p-6 mb-8 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Skills & Expertise</h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Extracted from {portfolio.stats.totalCredentials} credentials
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {portfolio.skills.map((skill, index) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 px-3 py-1 hover:bg-primary/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </GlassCard>

        {/* Credentials - Enhanced */}
        <div className="mb-8 animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Verified Credentials ({portfolio.credentials.length})
              </h2>
            </div>
          </div>

          {portfolio.credentials.length > 0 ? (
            <div className="space-y-4">
              {portfolio.credentials.map((credential, index) => (
                <GlassCard 
                  key={credential.id} 
                  className="p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  gradient="success"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <Award className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{credential.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" />
                            {credential.issuerName}
                          </p>
                        </div>
                        <CredentialStatusBadge status={credential.status} size="sm" animated />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {credential.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(credential.issueDate)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-muted/50">{credential.category}</span>
                        <span className="px-2 py-0.5 rounded-full bg-muted/50">{credential.level}</span>
                      </div>
                      {/* Skills tags */}
                      {credential.skills && credential.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {credential.skills.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {skill}
                            </span>
                          ))}
                          {credential.skills.length > 4 && (
                            <span className="px-2 py-0.5 text-xs text-muted-foreground">
                              +{credential.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link to={`/c/${credential.credentialId}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          navigator.clipboard.writeText(credential.credentialId);
                          toast({ title: 'Copied!', description: 'Credential ID copied to clipboard.' });
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <EmptyState
              type="credentials"
              title="No Credentials Yet"
              message="This portfolio doesn't have any credentials yet."
            />
          )}
        </div>

        {/* Recruiter Section - Enhanced */}
        <GlassCard className="p-6 animate-fade-in-up stagger-4" gradient="primary" glow>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg mb-1">For Recruiters & Verifiers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All credentials on this page are blockchain-verified and can be independently validated.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/verify">
                  <Button size="sm" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Verify All Credentials
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => handleShare('copy')} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Portfolio
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="grid sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border/50">
            <TrustIndicator
              icon={<Shield className="w-4 h-4" />}
              label="Blockchain Verified"
              verified
            />
            <TrustIndicator
              icon={<CheckCircle2 className="w-4 h-4" />}
              label="Tamper-Proof"
              verified
            />
            <TrustIndicator
              icon={<Award className="w-4 h-4" />}
              label="Trusted Issuers"
              verified
            />
          </div>
        </GlassCard>
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

export default PublicPortfolioPage;