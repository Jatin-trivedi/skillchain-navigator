import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Award, 
  Shield, 
  User, 
  Mail, 
  Calendar, 
  ExternalLink,
  Share2,
  Linkedin,
  Twitter,
  Copy,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CredentialStatusBadge } from '@/components/credential/CredentialStatusBadge';
import { QRCodeDisplay } from '@/components/credential/QRCodeDisplay';
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
          category: 'Software Development',
          level: 'Intermediate',
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
          category: 'Software Development',
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

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
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

  const handleShare = (platform: 'linkedin' | 'twitter' | 'copy') => {
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
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
                Verify Credentials
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{portfolio.user.name}</h1>
          {portfolio.user.bio && (
            <p className="text-muted-foreground max-w-md mx-auto mb-4">{portfolio.user.bio}</p>
          )}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified Profile
            </Badge>
          </div>

          {/* Share Buttons */}
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare('copy')}>
              {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{portfolio.stats.totalCredentials}</p>
              <p className="text-sm text-muted-foreground">Credentials</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-emerald-400">{portfolio.stats.verifiedCount}</p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-foreground">{portfolio.stats.uniqueIssuers}</p>
              <p className="text-sm text-muted-foreground">Issuers</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Extracted from {portfolio.stats.totalCredentials} verified credentials
            </p>
          </CardContent>
        </Card>

        {/* Credentials */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Verified Credentials ({portfolio.credentials.length})
          </h2>
          <div className="space-y-4">
            {portfolio.credentials.map((credential) => (
              <Card key={credential.id} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{credential.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Building2 className="w-3 h-3" />
                            {credential.issuerName}
                          </p>
                        </div>
                        <CredentialStatusBadge status={credential.status} size="sm" />
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(credential.issueDate)}
                        </span>
                        <span>{credential.category}</span>
                        <span>{credential.level}</span>
                      </div>
                    </div>
                    <Link to={`/c/${credential.credentialId}`}>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recruiter Section */}
        <Card className="bg-indigo-500/10 border-indigo-500/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-2">🤝 For Recruiters & Verifiers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All credentials on this page are blockchain-verified and can be independently validated.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/verify">
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Verify All Credentials
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => handleShare('copy')}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
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

export default PublicPortfolioPage;
