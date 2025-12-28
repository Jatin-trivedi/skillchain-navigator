import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, Plus, RefreshCw } from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Button } from '@/components/ui/button';
import { SearchFilters } from '@/components/issuer/SearchFilters';
import { CredentialsTable } from '@/components/issuer/CredentialsTable';
import { StatsCards } from '@/components/issuer/StatsCards';
import { BulkActionsBar } from '@/components/issuer/BulkActionsBar';
import { RevokeModal } from '@/components/issuer/RevokeModal';
import { CredentialDetailModal } from '@/components/issuer/CredentialDetailModal';
import { useAuth } from '@/contexts/AuthContext';
import { useDebounce } from '@/hooks/useDebounce';
import { getCredentials, getCredentialStats, revokeCredential } from '@/services/credentialService';
import { useToast } from '@/hooks/use-toast';
import type { Credential, CredentialFilters } from '@/types/credential';

const IssuedCredentialsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [stats, setStats] = useState({ total: 0, issued: 0, revoked: 0, expired: 0, thisMonth: 0, topCategory: 'N/A' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<CredentialFilters>({
    search: '', status: 'all', category: 'all', sortBy: 'newest',
  });
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);
  const issuerName = user?.organizationName || `${user?.firstName} ${user?.lastName}`;

  const fetchData = async () => {
    setIsLoading(true);
    const [credentialsResult, statsResult] = await Promise.all([
      getCredentials(user?.id || '', { ...filters, search: debouncedSearch }),
      getCredentialStats(user?.id || ''),
    ]);
    setCredentials(credentialsResult.credentials);
    setStats(statsResult);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, [debouncedSearch, filters.status, filters.category, filters.dateFrom, filters.dateTo, filters.sortBy]);

  const handleRevoke = async (credentialId: string, reason?: string) => {
    const result = await revokeCredential(credentialId, reason);
    if (result.success) {
      toast({ title: 'Credential Revoked', description: 'The credential has been revoked successfully.' });
      fetchData();
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar authState="issuer" user={{ name: issuerName, initials: user?.initials || 'OR' }} notifications={3} activeTab="credentials"
        onLogout={() => { logout(); navigate('/'); }}
        onTabChange={(tab) => { if (tab === 'dashboard') navigate('/dashboard'); else if (tab === 'issue') navigate('/issuer/issue'); }}
      />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-2 text-muted-foreground"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center glow-sm"><FileText className="w-6 h-6 text-primary-foreground" /></div>
              <div><h1 className="text-2xl md:text-3xl font-bold text-foreground">Issued Credentials</h1><p className="text-muted-foreground">Manage and review all issued credentials</p></div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={fetchData} className="border-border"><RefreshCw className="w-4 h-4 mr-2" />Refresh</Button>
            <Button onClick={() => navigate('/issuer/issue')} className="gradient-bg text-primary-foreground glow-hover"><Plus className="w-4 h-4 mr-2" />Issue New</Button>
          </div>
        </div>
        <div className="space-y-6">
          <StatsCards stats={stats} />
          <SearchFilters filters={filters} onFiltersChange={setFilters} totalResults={credentials.length} />
          <BulkActionsBar selectedCount={selectedIds.length} onEmailAll={() => toast({ title: 'Coming Soon' })} onExportCsv={() => toast({ title: 'Coming Soon' })} onRevokeSelected={() => toast({ title: 'Coming Soon' })} onClearSelection={() => setSelectedIds([])} />
          <CredentialsTable credentials={credentials} selectedIds={selectedIds} onSelectionChange={setSelectedIds} isLoading={isLoading}
            onViewCredential={(c) => { setSelectedCredential(c); setIsDetailModalOpen(true); }}
            onRevokeCredential={(c) => { setSelectedCredential(c); setIsRevokeModalOpen(true); }}
          />
        </div>
      </main>
      <Footer />
      <CredentialDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} credential={selectedCredential} onRevoke={(c) => { setIsDetailModalOpen(false); setSelectedCredential(c); setIsRevokeModalOpen(true); }} />
      <RevokeModal isOpen={isRevokeModalOpen} onClose={() => setIsRevokeModalOpen(false)} credential={selectedCredential} onConfirm={handleRevoke} />
    </div>
  );
};

export default IssuedCredentialsPage;
