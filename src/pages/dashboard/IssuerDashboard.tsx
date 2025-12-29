import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Plus,
  FileCheck,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  Send,
} from "lucide-react";

const IssuerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Credentials Issued", value: "1,247", icon: Award, color: "text-primary" },
    { label: "Active Recipients", value: "892", icon: Users, color: "text-secondary" },
    { label: "Pending Verification", value: "15", icon: Clock, color: "text-yellow-500" },
    { label: "This Month", value: "+48", icon: TrendingUp, color: "text-emerald-500" },
  ];

  const recentIssued = [
    {
      id: 1,
      title: "Full Stack Development",
      recipient: "Alice Johnson",
      date: "Dec 20, 2024",
      status: "issued",
    },
    {
      id: 2,
      title: "Cloud Architecture",
      recipient: "Bob Smith",
      date: "Dec 19, 2024",
      status: "issued",
    },
    {
      id: 3,
      title: "Data Engineering",
      recipient: "Carol White",
      date: "Dec 18, 2024",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="issuer"
        user={{
          name: user?.organizationName || `${user?.firstName} ${user?.lastName}`,
          initials: user?.initials || "OR",
        }}
        notifications={5}
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
            {user?.organizationName || "Organization"} Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Issue and manage credentials for your recipients.
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
          <Button className="gradient-bg text-primary-foreground glow-hover" onClick={() => navigate('/issuer/issue')}>
            <Plus className="w-4 h-4 mr-2" />
            Issue Credential
          </Button>
          <Button variant="outline" className="border-border" onClick={() => navigate('/issuer/credentials')}>
            <FileCheck className="w-4 h-4 mr-2" />
            View All Credentials
          </Button>
          <Button variant="outline" className="border-border" onClick={() => navigate('/issuer/bulk')}>
            <Send className="w-4 h-4 mr-2" />
            Bulk Issue
          </Button>
        </div>

        {/* Recently Issued */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Recently Issued
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssued.map((credential) => (
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
                        To: {credential.recipient} • {credential.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={credential.status === "issued" ? "default" : "secondary"}
                      className={
                        credential.status === "issued"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }
                    >
                      {credential.status === "issued" ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {credential.status}
                    </Badge>
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

export default IssuerDashboard;
