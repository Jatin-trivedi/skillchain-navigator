import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CREDENTIAL_CATEGORIES, type CredentialFilters, type CredentialStatus, type CredentialCategory } from '@/types/credential';

interface SearchFiltersProps {
  filters: CredentialFilters;
  onFiltersChange: (filters: CredentialFilters) => void;
  totalResults: number;
}

export const SearchFilters = ({ filters, onFiltersChange, totalResults }: SearchFiltersProps) => {
  const hasActiveFilters = 
    filters.search || 
    filters.status !== 'all' || 
    filters.category !== 'all' ||
    filters.dateFrom ||
    filters.dateTo;

  const updateFilter = <K extends keyof CredentialFilters>(key: K, value: CredentialFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      status: 'all',
      category: 'all',
      dateFrom: undefined,
      dateTo: undefined,
      sortBy: 'newest',
    });
  };

  const statusOptions: { value: CredentialStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Status' },
    { value: 'issued', label: 'Issued' },
    { value: 'revoked', label: 'Revoked' },
    { value: 'expired', label: 'Expired' },
  ];

  return (
    <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
      {/* Search Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, email, ID, or name..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-muted border-border"
          />
        </div>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => updateFilter('sortBy', value as CredentialFilters['sortBy'])}
        >
          <SelectTrigger className="w-full sm:w-[140px] bg-muted border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="title">Title A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.status}
          onValueChange={(value) => updateFilter('status', value as CredentialStatus | 'all')}
        >
          <SelectTrigger className="w-[130px] bg-muted border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter('category', value as CredentialCategory | 'all')}
        >
          <SelectTrigger className="w-[180px] bg-muted border-border">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CREDENTIAL_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => updateFilter('dateFrom', e.target.value || undefined)}
            className="w-[140px] bg-muted border-border text-sm"
            placeholder="From"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => updateFilter('dateTo', e.target.value || undefined)}
            className="w-[140px] bg-muted border-border text-sm"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Results Counter & Active Filters */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-medium">{totalResults}</span> credential{totalResults !== 1 ? 's' : ''}
        </p>
        
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <div className="flex gap-1.5">
              {filters.search && (
                <Badge variant="secondary" className="text-xs">
                  "{filters.search}"
                </Badge>
              )}
              {filters.status !== 'all' && (
                <Badge variant="secondary" className="text-xs capitalize">
                  {filters.status}
                </Badge>
              )}
              {filters.category !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  {filters.category}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
