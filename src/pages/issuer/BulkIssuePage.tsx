import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Users, FileText, CheckCircle, Rocket, Loader2 } from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { CSVUploader } from '@/features/bulk-issue/CSVUploader';
import { StudentValidator } from '@/features/bulk-issue/StudentValidator';
import { BulkCredentialForm } from '@/features/bulk-issue/BulkCredentialForm';
import { BatchPreview } from '@/features/bulk-issue/BatchPreview';
import { BatchResults } from '@/features/bulk-issue/BatchResults';
import { useBulkIssuance, type ValidatedStudent, type BatchResult } from '@/hooks/useBulkIssuance';
import type { CSVParseResult } from '@/hooks/useCSVParser';
import type { CredentialCategory, SkillLevel } from '@/types/credential';

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { num: 1, label: 'Upload', icon: Upload },
  { num: 2, label: 'Validate', icon: Users },
  { num: 3, label: 'Configure', icon: FileText },
  { num: 4, label: 'Review', icon: CheckCircle },
  { num: 5, label: 'Complete', icon: Rocket },
];

const BulkIssuePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { validateStudents, issueBatch, validating, issuing, progress } = useBulkIssuance();

  const [step, setStep] = useState<Step>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvResult, setCsvResult] = useState<CSVParseResult | null>(null);
  const [validatedStudents, setValidatedStudents] = useState<ValidatedStudent[]>([]);
  const [credentialData, setCredentialData] = useState<{
    title: string;
    description: string;
    category: CredentialCategory;
    level: SkillLevel;
    issueDate: string;
    hours?: number;
  } | null>(null);
  const [batchResult, setBatchResult] = useState<BatchResult | null>(null);

  const batchId = `BATCH-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

  const handleCSVUpload = useCallback((result: CSVParseResult) => {
    setCsvResult(result);
  }, []);

  const handleStep1Next = async () => {
    if (!csvResult) return;
    
    // Convert parsed students to validated students format and validate
    const validated = await validateStudents(csvResult.students);
    setValidatedStudents(validated);
    setStep(2);
  };

  const handleStep2Next = () => {
    const validCount = validatedStudents.filter(s => s.isValid).length;
    if (validCount === 0) return;
    setStep(3);
  };

  const handleStep3Submit = (data: typeof credentialData) => {
    setCredentialData(data);
    setStep(4);
  };

  const handleIssue = async () => {
    if (!credentialData || !user) return;

    const result = await issueBatch(
      validatedStudents,
      {
        title: credentialData.title,
        description: credentialData.description,
        category: credentialData.category,
        level: credentialData.level,
        issueDate: credentialData.issueDate,
        hours: credentialData.hours,
      },
      {
        id: user.id,
        name: user.organizationName || `${user.firstName} ${user.lastName}`
      }
    );

    setBatchResult(result);
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setUploadedFile(null);
    setCsvResult(null);
    setValidatedStudents([]);
    setCredentialData(null);
    setBatchResult(null);
  };

  const validStudentCount = validatedStudents.filter(s => s.isValid).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="issuer"
        user={{
          name: user?.organizationName || `${user?.firstName} ${user?.lastName}`,
          initials: user?.initials || 'OR',
        }}
        notifications={0}
        activeTab="bulk"
        onLogout={() => { logout(); navigate('/'); }}
        onTabChange={() => {}}
      />

      <main className="container mx-auto px-4 md:px-8 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bulk Issue Credentials</h1>
          <p className="text-muted-foreground mt-1">
            Issue credentials to multiple students at once using CSV upload
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                step === s.num 
                  ? 'bg-primary text-primary-foreground' 
                  : step > s.num 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${step > s.num ? 'bg-emerald-500' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="p-6 bg-card border-border">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Step 1: Upload CSV
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a CSV file containing student emails and names
                </p>
              </div>

              <CSVUploader
                onUpload={(result) => {
                  handleCSVUpload(result);
                  setUploadedFile(new File([''], 'students.csv'));
                }}
                onClear={() => {
                  setUploadedFile(null);
                  setCsvResult(null);
                }}
                uploadedFile={uploadedFile}
              />

              {csvResult && (
                <Card className="p-4 bg-muted/30">
                  <p className="text-sm text-foreground">
                    Parsed {csvResult.totalRows} rows: {csvResult.validRows} valid, {csvResult.invalidRows} invalid
                  </p>
                </Card>
              )}

              <div className="flex justify-end">
                <Button 
                  onClick={handleStep1Next} 
                  disabled={!csvResult || csvResult.validRows === 0 || validating}
                  className="gradient-bg text-primary-foreground"
                >
                  {validating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Step 2: Validate Students
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Review validated students before proceeding
                </p>
              </div>

              <StudentValidator
                students={validatedStudents}
                validating={validating}
                progress={{ processed: progress.processed, total: progress.total }}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleStep2Next} 
                  disabled={validStudentCount === 0}
                  className="gradient-bg text-primary-foreground"
                >
                  Configure Credential
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Step 3: Configure Credential
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Define the credential details for all students
                </p>
              </div>

              <BulkCredentialForm
                studentCount={validStudentCount}
                onSubmit={handleStep3Submit}
              />

              <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Validation
              </Button>
            </div>
          )}

          {step === 4 && credentialData && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Step 4: Review & Confirm
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Review all details before issuing
                </p>
              </div>

              <BatchPreview
                studentCount={validStudentCount}
                credentialData={credentialData}
                batchId={batchId}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleIssue} 
                  disabled={issuing}
                  className="gradient-bg text-primary-foreground"
                >
                  {issuing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Issuing... ({progress.processed}/{progress.total})
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Issue {validStudentCount} Credentials
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 5 && batchResult && (
            <BatchResults
              result={batchResult}
              onViewBatch={() => navigate('/issuer/credentials')}
              onIssueAnother={handleReset}
              onGoHome={() => navigate('/dashboard')}
            />
          )}
        </Card>
      </main>
    </div>
  );
};

export default BulkIssuePage;
