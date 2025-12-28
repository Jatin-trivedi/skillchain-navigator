import { Mail, Download, Ban, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BulkActionsBarProps {
  selectedCount: number;
  onEmailAll: () => void;
  onExportCsv: () => void;
  onRevokeSelected: () => void;
  onClearSelection: () => void;
}

export const BulkActionsBar = ({
  selectedCount,
  onEmailAll,
  onExportCsv,
  onRevokeSelected,
  onClearSelection,
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20 animate-fade-in">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">
          {selectedCount} credential{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEmailAll}
          className="border-border"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExportCsv}
          className="border-border"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRevokeSelected}
          className="border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <Ban className="w-4 h-4 mr-2" />
          Revoke
        </Button>
      </div>
    </div>
  );
};
