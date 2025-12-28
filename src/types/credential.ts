export type CredentialStatus = 'issued' | 'revoked' | 'expired';

export type CredentialCategory = 
  | 'Blockchain & Web3'
  | 'AI & Machine Learning'
  | 'Software Development'
  | 'Data Science'
  | 'Cybersecurity'
  | 'Hackathon Achievement'
  | 'Internship Completion'
  | 'Course Certification'
  | 'Workshop Participation';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Credential {
  id: string;
  credentialId: string;
  title: string;
  description: string;
  issueDate: string;
  expiryDate?: string;
  
  // Student info
  studentId: string;
  studentEmail: string;
  studentName: string;
  
  // Issuer info
  issuerId: string;
  issuerName: string;
  
  // Metadata
  category: CredentialCategory;
  level: SkillLevel;
  hours?: number;
  skills?: string[];
  
  // Status
  status: CredentialStatus;
  blockchainHash?: string;
  revokedAt?: string;
  revokedReason?: string;
  
  // System
  createdAt: string;
  updatedAt: string;
}

export interface StudentLookupResult {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  verified: boolean;
}

export interface CredentialFormData {
  studentEmail: string;
  title: string;
  description: string;
  issueDate: string;
  expiryDate?: string;
  category: CredentialCategory;
  level: SkillLevel;
  hours?: number;
  skills?: string[];
}

export interface CredentialFilters {
  search: string;
  status: CredentialStatus | 'all';
  category: CredentialCategory | 'all';
  dateFrom?: string;
  dateTo?: string;
  sortBy: 'newest' | 'oldest' | 'title';
}

export const CREDENTIAL_CATEGORIES: CredentialCategory[] = [
  'Blockchain & Web3',
  'AI & Machine Learning',
  'Software Development',
  'Data Science',
  'Cybersecurity',
  'Hackathon Achievement',
  'Internship Completion',
  'Course Certification',
  'Workshop Participation',
];

export const SKILL_LEVELS: SkillLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];
