import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Button } from '@/components/ui/button';
import { StudentLookup } from '@/components/issuer/StudentLookup';
import { CredentialForm } from '@/components/issuer/CredentialForm';
import { CredentialPreview } from '@/components/issuer/CredentialPreview';
import { SuccessModal } from '@/components/issuer/SuccessModal';
import { useAuth } from '@/contexts/AuthContext';
import { issueCredential } from '@/services/credentialService';
import { useToast } from '@/hooks/use-toast';
import type { StudentLookupResult, CredentialFormData, Credential } from '@/types/credential';

const IssueCredentialPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [verifiedStudent, setVerifiedStudent] = useState<StudentLookupResult | null>(null);
  const [formData, setFormData] = useState<Partial<CredentialFormData>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [issuedCredential, setIssuedCredential] = useState<Credential | null>(null);

  const issuerName = user?.organizationName || `${user?.firstName} ${user?.lastName}`;

  const handleFormChange = (data: Partial<CredentialFormData>, isValid: boolean) => {
    setFormData(data);
    setIsFormValid(isValid);
  };

  const handlePreview = () => {
    toast({
      title: 'Preview',
      description: 'Full credential preview coming soon!',
    });
  };

  const handleSubmit = async () => {
    if (!verifiedStudent || !isFormValid || !isConfirmed) return;

    setIsSubmitting(true);

    try {
      const result = await issueCredential(
        formData as CredentialFormData,
        verifiedStudent,
        { id: user?.id || 'issuer-1', name: issuerName }
      );

      if (result.success && result.credential) {
        setIssuedCredential(result.credential);
        setIsSuccessModalOpen(true);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to issue credential',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIssueAnother = () => {
    setVerifiedStudent(null);
    setFormData({});
    setIsFormValid(false);
    setIsConfirmed(false);
    setIssuedCredential(null);
    setIsSuccessModalOpen(false);
  };

  const handleViewCredential = () => {
    setIsSuccessModalOpen(false);
    navigate('/issuer/credentials');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        authState="issuer"
        user={{
          name: issuerName,
          initials: user?.initials || 'OR',
        }}
        notifications={3}
        activeTab="issue"
        onLogout={() => {
          logout();
          navigate('/');
        }}
        onTabChange={(tab) => {
          if (tab === 'dashboard') navigate('/dashboard');
          else if (tab === 'credentials') navigate('/issuer/credentials');
        }}
      />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center glow-sm">
              <Award className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Issue New Credential
              </h1>
              <p className="text-muted-foreground">
                Create and issue verified blockchain-backed credentials
              </p>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6 max-w-3xl">
          <StudentLookup
            onStudentVerified={setVerifiedStudent}
            verifiedStudent={verifiedStudent}
          />

          <CredentialForm
            onFormChange={handleFormChange}
            disabled={!verifiedStudent}
          />

          <CredentialPreview
            formData={formData}
            student={verifiedStudent}
            issuerName={issuerName}
            isFormValid={isFormValid}
            isConfirmed={isConfirmed}
            onConfirmChange={setIsConfirmed}
            onPreview={handlePreview}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>

      <Footer />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        credential={issuedCredential}
        onIssueAnother={handleIssueAnother}
        onViewCredential={handleViewCredential}
      />
    </div>
  );
};

export default IssueCredentialPage;
