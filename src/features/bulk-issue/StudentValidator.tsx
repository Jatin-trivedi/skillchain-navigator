import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ValidatedStudent } from '@/hooks/useBulkIssuance';

interface StudentValidatorProps {
  students: ValidatedStudent[];
  validating: boolean;
  progress: { processed: number; total: number };
}

export const StudentValidator = ({ students, validating, progress }: StudentValidatorProps) => {
  const validStudents = students.filter(s => s.isValid);
  const invalidStudents = students.filter(s => !s.isValid);

  return (
    <div className="space-y-6">
      {validating && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Validating students... ({progress.processed}/{progress.total})
              </p>
              <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(progress.processed / progress.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-4">
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Valid ({validStudents.length})
        </Badge>
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
          <XCircle className="w-3 h-3 mr-1" />
          Invalid ({invalidStudents.length})
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Valid Students */}
        <Card className="bg-card border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Valid Students
            </h3>
          </div>
          <ScrollArea className="h-64">
            <div className="p-4 space-y-2">
              {validStudents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No valid students found
                </p>
              ) : (
                validStudents.map((student, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{student.name || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 text-xs">
                      Ready
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Invalid Students */}
        <Card className="bg-card border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              Invalid / Skipped
            </h3>
          </div>
          <ScrollArea className="h-64">
            <div className="p-4 space-y-2">
              {invalidStudents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All students are valid
                </p>
              ) : (
                invalidStudents.map((student, i) => (
                  <div key={i} className="p-2 rounded bg-destructive/5 border border-destructive/20">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{student.email}</p>
                    </div>
                    <p className="text-xs text-destructive mt-1">
                      {student.lookupError || student.validationErrors.join(', ')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};
