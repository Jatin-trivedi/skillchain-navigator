import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Award,
  Plus,
  Share2,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
  Copy,
  Building2,
  Tag,
  Calendar,
  XCircle,
  AlertCircle,
} from "lucide-react";
import type { Credential } from "@/types/credential";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const stats = [
    { label: "Total Credentials", value: "12", icon: Award, color: "text-primary" },
    { label: "Verified", value: "10", icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Pending", value: "2", icon: Clock, color: "text-yellow-500" },
    { label: "Profile Views", value: "156", icon: TrendingUp, color: "text-secondary" },
  ];

  const recentCredentials: Credential[] = [
    {
      id: "1",
      credentialId: "CRED-2024-001",
      title: "AWS Cloud Practitioner",
      description: "Certified in Amazon Web Services cloud computing fundamentals",
      issueDate: "2024-12-15",
      expiryDate: "2026-12-15",
      studentId: "student-1",
      studentEmail: user?.email || "student@example.com",
      studentName: `${user?.firstName} ${user?.lastName}`,
      issuerId: "issuer-1",
      issuerName: "Amazon Web Services",
      category: "Software Development",
      level: "Intermediate",
      hours: 40,
      skills: ["AWS", "Cloud Computing", "DevOps"],
      status: "issued",
      createdAt: "2024-12-15",
      updatedAt: "2024-12-15",
    },
    {
      id: "2",
      credentialId: "CRED-2024-002",
      title: "React Developer Certificate",
      description: "Advanced React development skills and best practices",
      issueDate: "2024-12-10",
      studentId: "student-1",
      studentEmail: user?.email || "student@example.com",
      studentName: `${user?.firstName} ${user?.lastName}`,
      issuerId: "issuer-2",
      issuerName: "Meta",
      category: "Software Development",
      level: "Advanced",
      hours: 60,
      skills: ["React", "JavaScript", "Frontend"],
      status: "issued",
      createdAt: "2024-12-10",
      updatedAt: "2024-12-10",
    },
    {
      id: "3",
      credentialId: "CRED-2024-003",
      title: "Data Science Fundamentals",
      description: "Introduction to data science and machine learning",
      issueDate: "2024-12-05",
      expiryDate: "2025-12-05",
      studentId: "student-1",
      studentEmail: user?.email || "student@example.com",
      studentName: `${user?.firstName} ${user?.lastName}`,
      issuerId: "issuer-3",
      issuerName: "IBM",
      category: "Data Science",
      level: "Beginner",
      hours: 30,
      skills: ["Python", "Data Analysis", "Machine Learning"],
      status: "issued",
      createdAt: "2024-12-05",
      updatedAt: "2024-12-05",
    },
  ];


  const handleViewCredentialDetails = (credential: Credential) => {
    setSelectedCredential(credential);
    setIsDetailModalOpen(true);
  };

  const handleCopyId = () => {
    if (selectedCredential) {
      navigator.clipboard.writeText(selectedCredential.credentialId);
    }
  };

  const handleShare = () => {
    if (selectedCredential) {
      const shareUrl = `${window.location.origin}/verify/${selectedCredential.credentialId}`;
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "issued":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 transition-colors">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "revoked":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 cursor-pointer hover:bg-destructive/20 transition-colors">
            <XCircle className="w-3 h-3 mr-1" />
            Revoked
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 cursor-pointer hover:bg-yellow-500/20 transition-colors">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 cursor-pointer hover:bg-yellow-500/20 transition-colors">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="student"
        user={{
          name: `${user?.firstName} ${user?.lastName}`,
          initials: user?.initials || "U",
        }}
        notifications={3}
        activeTab="dashboard"
        onLogout={() => {
          logout();
          navigate("/");
        }}
        onTabChange={(tab) => {
          if (tab === "dashboard") navigate("/dashboard");
          else if (tab === "credentials") navigate("/student/credentials");
          else if (tab === "add") navigate("/student/add-credential");
        }}
      />

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your credentials and track your professional growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            className="gradient-bg text-primary-foreground glow-hover"
            onClick={() => navigate("/student/add-credential")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Credential
          </Button>
          <Button
            variant="outline"
            className="border-border"
            onClick={() => navigate("/student/share-portfolio")}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Portfolio
          </Button>
        </div>

        {/* Recent Credentials */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Recent Credentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCredentials.map((credential) => (
                <div
                  key={credential.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{credential.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {credential.issuerName} • {formatDate(credential.issueDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => handleViewCredentialDetails(credential)}
                      className="cursor-pointer"
                    >
                      {getStatusBadge(credential.status)}
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Credential Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
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
                  {selectedCredential && getStatusBadge(selectedCredential.status)}
                </div>
              </div>
            </div>
          </DialogHeader>

          {selectedCredential && (
            <div className="space-y-6 py-4">
              {/* Title & Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {selectedCredential.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedCredential.description}
                </p>
              </div>

              {/* Credential ID */}
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Credential ID</p>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-primary">
                    {selectedCredential.credentialId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyId}
                    className="h-8 px-2"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Issuer
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {selectedCredential.issuerName}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Issue Date
                  </p>
                  <p className="text-sm text-foreground">
                    {formatDate(selectedCredential.issueDate)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Category
                  </p>
                  <p className="text-sm text-foreground">{selectedCredential.category}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Award className="w-3 h-3" /> Level
                  </p>
                  <p className="text-sm text-foreground">{selectedCredential.level}</p>
                </div>

                {selectedCredential.hours && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Duration
                    </p>
                    <p className="text-sm text-foreground">
                      {selectedCredential.hours} hours
                    </p>
                  </div>
                )}

                {selectedCredential.expiryDate && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Expiry Date
                    </p>
                    <p className="text-sm text-foreground">
                      {formatDate(selectedCredential.expiryDate)}
                    </p>
                  </div>
                )}
              </div>

              {/* Skills */}
              {selectedCredential.skills && selectedCredential.skills.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCredential.skills.map((skill) => (
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

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleCopyId}
                  className="flex-1 border-border"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy ID
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex-1 border-border"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
