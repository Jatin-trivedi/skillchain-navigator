import { useState } from 'react';
import { MoreHorizontal, Eye, Copy, Share2, Ban, ExternalLink, Mail, Award, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from './StatusBadge';
import { useToast } from '@/hooks/use-toast';
import type { Credential } from '@/types/credential';

interface CredentialsTableProps {
  credentials: Credential[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onViewCredential: (credential: Credential) => void;
  onRevokeCredential: (credential: Credential) => void;
  isLoading?: boolean;
}

export const CredentialsTable = ({
  credentials,
  selectedIds,
  onSelectionChange,
  onViewCredential,
  onRevokeCredential,
  isLoading,
}: CredentialsTableProps) => {
  const { toast } = useToast();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(credentials.map(c => c.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter(i => i !== id));
    }
  };

  const handleCopyId = (credentialId: string) => {
    navigator.clipboard.writeText(credentialId);
    toast({
      title: 'Copied!',
      description: 'Credential ID copied to clipboard',
    });
  };

  const handleShare = (credential: Credential) => {
    const shareUrl = `${window.location.origin}/verify/${credential.credentialId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied!',
      description: 'Shareable verification link copied',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isAllSelected = credentials.length > 0 && selectedIds.length === credentials.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < credentials.length;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-lg bg-muted/50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (credentials.length === 0) {
    return (
      <div className="text-center py-12">
        <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No credentials found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className={isSomeSelected ? 'data-[state=checked]:bg-primary/50' : ''}
                />
              </TableHead>
              <TableHead className="text-muted-foreground">Title</TableHead>
              <TableHead className="text-muted-foreground">Student</TableHead>
              <TableHead className="text-muted-foreground">Issued</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {credentials.map((credential) => (
              <TableRow
                key={credential.id}
                className="border-border hover:bg-muted/30"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(credential.id)}
                    onCheckedChange={(checked) => handleSelectOne(credential.id, !!checked)}
                    aria-label={`Select ${credential.title}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate max-w-[200px]">
                        {credential.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {credential.credentialId}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{credential.studentName}</p>
                    <p className="text-xs text-muted-foreground">{credential.studentEmail}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(credential.issueDate)}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{credential.category}</span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={credential.status} size="sm" />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onViewCredential(credential)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopyId(credential.credentialId)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare(credential)}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {credential.status === 'issued' && (
                        <DropdownMenuItem
                          onClick={() => onRevokeCredential(credential)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Revoke
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {credentials.map((credential) => (
          <Card key={credential.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedIds.includes(credential.id)}
                    onCheckedChange={(checked) => handleSelectOne(credential.id, !!checked)}
                  />
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <StatusBadge status={credential.status} size="sm" />
              </div>

              <h3 className="font-semibold text-foreground mb-2">{credential.title}</h3>
              
              <div className="space-y-2 text-sm mb-4">
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  {credential.studentName} ({credential.studentEmail})
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(credential.issueDate)}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5" />
                  {credential.category}
                </p>
                <p className="text-muted-foreground font-mono text-xs">
                  ID: {credential.credentialId}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewCredential(credential)}
                  className="flex-1 border-border"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyId(credential.credentialId)}
                  className="border-border"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-border">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleShare(credential)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    {credential.status === 'issued' && (
                      <DropdownMenuItem
                        onClick={() => onRevokeCredential(credential)}
                        className="text-destructive"
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Revoke
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
