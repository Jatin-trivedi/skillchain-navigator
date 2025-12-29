import { CheckCircle2, XCircle, Download, Eye, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { BatchResult } from '@/hooks/useBulkIssuance';

interface BatchResultsProps {
  result: BatchResult;
  onViewBatch: () => void;
  onIssueAnother: () => void;
  onGoHome: () => void;
}

export const BatchResults = ({ result, onViewBatch, onIssueAnother, onGoHome }: BatchResultsProps) => {
  const successRate = (result.issued.length / (result.issued.length + result.failed.length)) * 100;

  const downloadSuccessCSV = () => {
    const header = 'email,name,credential_id\n';
    const rows = result.issued.map(r => 
      `${r.student.email},${r.student.name},${r.credential.credentialId}`
    ).join('\n');
    
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_success_${result.batchId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadFailureCSV = () => {
    const header = 'email,name,error\n';
    const rows = result.failed.map(r => 
      `${r.student.email},${r.student.name},"${r.error}"`
    ).join('\n');
    
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_failures_${result.batchId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <Card className="p-6 bg-emerald-500/10 border-emerald-500/30">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Bulk Issuance Complete!</h2>
            <p className="text-muted-foreground">
              Successfully issued {result.issued.length} credentials in {(result.duration / 1000).toFixed(1)}s
            </p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border text-center">
          <p className="text-3xl font-bold text-emerald-500">{result.issued.length}</p>
          <p className="text-sm text-muted-foreground">Issued</p>
        </Card>
        <Card className="p-4 bg-card border-border text-center">
          <p className="text-3xl font-bold text-destructive">{result.failed.length}</p>
          <p className="text-sm text-muted-foreground">Failed</p>
        </Card>
        <Card className="p-4 bg-card border-border text-center">
          <p className="text-3xl font-bold text-primary">{successRate.toFixed(0)}%</p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </Card>
      </div>

      {/* Batch Details */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Batch ID</p>
            <p className="font-mono text-foreground">{result.batchId}</p>
          </div>
          <Badge className="bg-primary/10 text-primary">Completed</Badge>
        </div>
      </Card>

      {/* Download Reports */}
      <Card className="p-4 bg-card border-border">
        <h3 className="font-medium text-foreground mb-4">Download Reports</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={downloadSuccessCSV} disabled={result.issued.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Success List (CSV)
          </Button>
          <Button variant="outline" onClick={downloadFailureCSV} disabled={result.failed.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Failure Report (CSV)
          </Button>
        </div>
      </Card>

      {/* Failed Items (if any) */}
      {result.failed.length > 0 && (
        <Card className="bg-card border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              Failed Issuances ({result.failed.length})
            </h3>
          </div>
          <ScrollArea className="max-h-48">
            <div className="p-4 space-y-2">
              {result.failed.map((item, i) => (
                <div key={i} className="p-2 rounded bg-destructive/5 border border-destructive/20">
                  <p className="text-sm font-medium text-foreground">{item.student.email}</p>
                  <p className="text-xs text-destructive">{item.error}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={onViewBatch}>
          <Eye className="w-4 h-4 mr-2" />
          View Batch
        </Button>
        <Button variant="outline" onClick={onIssueAnother}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Issue Another Batch
        </Button>
        <Button variant="ghost" onClick={onGoHome}>
          <Home className="w-4 h-4 mr-2" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
