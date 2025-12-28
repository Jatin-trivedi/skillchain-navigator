import { useState } from 'react';
import { Search, Loader2, CheckCircle2, User, Mail, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { lookupStudent } from '@/services/credentialService';
import type { StudentLookupResult } from '@/types/credential';

interface StudentLookupProps {
  onStudentVerified: (student: StudentLookupResult | null) => void;
  verifiedStudent: StudentLookupResult | null;
}

export const StudentLookup = ({ onStudentVerified, verifiedStudent }: StudentLookupProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await lookupStudent(email);

    if (result.success && result.student) {
      onStudentVerified(result.student);
      setError(null);
    } else {
      onStudentVerified(null);
      setError(result.error || 'Student not found');
    }

    setIsLoading(false);
  };

  const handleClear = () => {
    setEmail('');
    setError(null);
    onStudentVerified(null);
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Search className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">1. Student Identification</h3>
            <p className="text-sm text-muted-foreground">Verify the recipient's email</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter student email (e.g., demo@student.com)"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              className="bg-muted border-border"
              disabled={!!verifiedStudent}
            />
          </div>
          {verifiedStudent ? (
            <Button variant="outline" onClick={handleClear} className="border-border">
              Change
            </Button>
          ) : (
            <Button
              onClick={handleVerify}
              disabled={isLoading || !email.trim()}
              className="gradient-bg text-primary-foreground glow-hover min-w-[100px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Verify
                </>
              )}
            </Button>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-destructive flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
            {error}
          </p>
        )}

        {verifiedStudent && (
          <div className="mt-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-lg font-semibold text-emerald-400">
                  {verifiedStudent.firstName[0]}{verifiedStudent.lastName[0]}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">
                    {verifiedStudent.firstName} {verifiedStudent.lastName}
                  </h4>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    {verifiedStudent.email}
                  </p>
                  {verifiedStudent.studentId && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <IdCard className="w-3.5 h-3.5" />
                      ID: {verifiedStudent.studentId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
