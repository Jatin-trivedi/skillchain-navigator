import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

const LoginPage = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleSelectRole = (role: "student" | "issuer") => {
    navigate(`/login/${role}`);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleSelectionModal
        open={open}
        onOpenChange={handleOpenChange}
        mode="login"
        onSelectRole={handleSelectRole}
      />
    </div>
  );
};

export default LoginPage;
