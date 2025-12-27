import { useAuth } from "@/contexts/AuthContext";
import StudentDashboard from "@/pages/dashboard/StudentDashboard";
import IssuerDashboard from "@/pages/dashboard/IssuerDashboard";

const Dashboard = () => {
  const { role } = useAuth();

  if (role === "issuer") {
    return <IssuerDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;
