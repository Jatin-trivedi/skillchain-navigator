import { GraduationCap, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RoleSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "login" | "signup";
  onSelectRole: (role: "student" | "issuer") => void;
}

const RoleSelectionModal = ({
  open,
  onOpenChange,
  mode,
  onSelectRole,
}: RoleSelectionModalProps) => {
  const title = mode === "login" ? "Welcome back!" : "Join SkillChain";
  const subtitle = mode === "login" 
    ? "Choose how you'd like to log in" 
    : "Choose your account type to get started";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Student Option */}
          <Button
            variant="outline"
            className="h-auto flex-col gap-3 p-6 border-border hover:border-primary/50 hover:bg-muted/30 group transition-all"
            onClick={() => onSelectRole("student")}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-foreground">Student</div>
              <div className="text-xs text-muted-foreground">
                Receive & manage credentials
              </div>
            </div>
          </Button>

          {/* Issuer Option */}
          <Button
            variant="outline"
            className="h-auto flex-col gap-3 p-6 border-border hover:border-secondary/50 hover:bg-muted/30 group transition-all"
            onClick={() => onSelectRole("issuer")}
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <Building2 className="w-6 h-6 text-secondary" />
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-foreground">Issuer</div>
              <div className="text-xs text-muted-foreground">
                Issue credentials to others
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
