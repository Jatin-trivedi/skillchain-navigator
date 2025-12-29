import { Shield, Clock, Users, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CredentialCategory, SkillLevel } from '@/types/credential';

interface BatchPreviewProps {
  studentCount: number;
  credentialData: {
    title: string;
    description: string;
    category: CredentialCategory;
    level: SkillLevel;
    issueDate: string;
  };
  batchId: string;
}

export const BatchPreview = ({ studentCount, credentialData, batchId }: BatchPreviewProps) => {
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{studentCount}</p>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <Award className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground truncate">{credentialData.category}</p>
            <p className="text-xs text-muted-foreground">Category</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <Clock className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">{Math.ceil(studentCount * 0.5)}s</p>
            <p className="text-xs text-muted-foreground">Est. Time</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <Shield className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Secured</p>
            <p className="text-xs text-muted-foreground">Blockchain</p>
          </div>
        </div>
      </Card>

      {/* Credential Details */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Credential Details</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Title</p>
            <p className="font-medium text-foreground">{credentialData.title}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm text-foreground">{credentialData.description}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <Badge variant="outline">{credentialData.level}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Issue Date</p>
              <p className="text-sm text-foreground">{credentialData.issueDate}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Batch ID */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Batch ID</p>
            <p className="font-mono text-sm text-foreground">{batchId}</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">Ready to Issue</Badge>
        </div>
      </Card>

      {/* Security Checks */}
      <Card className="p-4 bg-emerald-500/5 border-emerald-500/20">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-500" />
          Security Checks
        </h4>
        <div className="space-y-2">
          {[
            'You have permission to issue credentials',
            'All students are verified in the system',
            'Batch will be securely stored and tracked'
          ].map((check, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              {check}
            </div>
          ))}
        </div>
      </Card>

      <p className="text-sm text-yellow-500 text-center">
        ⚠️ This action cannot be undone. All credentials will be permanently issued.
      </p>
    </div>
  );
};
