import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "@/components/auth/RoleSelectionModal";

const SignupPage = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleSelectRole = (role: "student" | "issuer") => {
    navigate(`/signup/${role}`);
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
        mode="signup"
        onSelectRole={handleSelectRole}
      />
    </div>
  );
};

export default SignupPage;
