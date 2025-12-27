import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationBellProps {
  count: number;
  onClick?: () => void;
}

/**
 * Notification Bell Component
 * Displays notification icon with badge count
 */
const NotificationBell = ({ count, onClick }: NotificationBellProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50"
      aria-label={`Notifications: ${count} unread`}
    >
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-semibold rounded-full gradient-bg text-primary-foreground animate-glow-pulse">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
};

export default NotificationBell;
