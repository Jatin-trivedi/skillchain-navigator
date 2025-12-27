import { getPasswordStrength } from "@/utils/authValidation";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  const { level, message } = getPasswordStrength(password);

  const colors = {
    weak: "bg-destructive",
    medium: "bg-yellow-500",
    strong: "bg-emerald-500",
  };

  const widths = {
    weak: "w-1/3",
    medium: "w-2/3",
    strong: "w-full",
  };

  const textColors = {
    weak: "text-destructive",
    medium: "text-yellow-500",
    strong: "text-emerald-500",
  };

  return (
    <div className="space-y-1.5 mt-2">
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[level]} ${widths[level]} transition-all duration-300 rounded-full`}
        />
      </div>
      <p className={`text-xs ${textColors[level]}`}>{message}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;
