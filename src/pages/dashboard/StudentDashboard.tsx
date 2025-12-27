import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Plus,
  Share2,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Total Credentials", value: "12", icon: Award, color: "text-primary" },
    { label: "Verified", value: "10", icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Pending", value: "2", icon: Clock, color: "text-yellow-500" },
    { label: "Profile Views", value: "156", icon: TrendingUp, color: "text-secondary" },
  ];

  const recentCredentials = [
    {
      id: 1,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Dec 15, 2024",
      status: "verified",
    },
    {
      id: 2,
      title: "React Developer Certificate",
      issuer: "Meta",
      date: "Dec 10, 2024",
      status: "verified",
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      issuer: "IBM",
      date: "Dec 5, 2024",
      status: "pending",
    },
  ];

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
        onTabChange={(tab) => console.log("Tab:", tab)}
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
          <Button className="gradient-bg text-primary-foreground glow-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Credential
          </Button>
          <Button variant="outline" className="border-border">
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
                        {credential.issuer} • {credential.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={credential.status === "verified" ? "default" : "secondary"}
                      className={
                        credential.status === "verified"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }
                    >
                      {credential.status}
                    </Badge>
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
    </div>
  );
};

export default StudentDashboard;
