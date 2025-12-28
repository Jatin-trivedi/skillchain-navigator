import type { Credential, CredentialFormData, StudentLookupResult, CredentialFilters } from '@/types/credential';

// Generate a unique credential ID
export const generateCredentialId = (): string => {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 8; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CRD-${year}-${random}`;
};

// Mock students database
const mockStudents: StudentLookupResult[] = [
  { id: 'student-1', email: 'john.doe@university.edu', firstName: 'John', lastName: 'Doe', studentId: 'STU-001', verified: true },
  { id: 'student-2', email: 'jane.smith@tech.io', firstName: 'Jane', lastName: 'Smith', studentId: 'STU-002', verified: true },
  { id: 'student-3', email: 'bob.wilson@hack.dev', firstName: 'Bob', lastName: 'Wilson', studentId: 'STU-003', verified: true },
  { id: 'student-4', email: 'alice.johnson@college.edu', firstName: 'Alice', lastName: 'Johnson', studentId: 'STU-004', verified: true },
  { id: 'student-5', email: 'demo@student.com', firstName: 'Demo', lastName: 'Student', studentId: 'STU-DEMO', verified: true },
];

// Mock credentials database
let mockCredentials: Credential[] = [
  {
    id: '1',
    credentialId: 'CRD-2024-AB3F7K9Z',
    title: 'Advanced Blockchain Developer Certificate',
    description: 'Demonstrated exceptional proficiency in blockchain development, including smart contract creation, DApp development, and Web3 integration.',
    issueDate: '2024-03-15',
    studentId: 'student-1',
    studentEmail: 'john.doe@university.edu',
    studentName: 'John Doe',
    issuerId: 'issuer-1',
    issuerName: 'Tech University',
    category: 'Blockchain & Web3',
    level: 'Advanced',
    hours: 120,
    skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'Ethereum'],
    status: 'issued',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    credentialId: 'CRD-2024-XY8M2P4Q',
    title: 'Machine Learning Specialist',
    description: 'Successfully completed advanced machine learning course with focus on neural networks, deep learning, and practical AI applications.',
    issueDate: '2024-03-10',
    expiryDate: '2026-03-10',
    studentId: 'student-2',
    studentEmail: 'jane.smith@tech.io',
    studentName: 'Jane Smith',
    issuerId: 'issuer-1',
    issuerName: 'Tech University',
    category: 'AI & Machine Learning',
    level: 'Expert',
    hours: 200,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Neural Networks'],
    status: 'issued',
    createdAt: '2024-03-10T14:30:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
  },
  {
    id: '3',
    credentialId: 'CRD-2024-KL5N9R2T',
    title: 'Hackathon Winner - Web3 Innovation',
    description: 'First place winner in the annual Web3 Innovation Hackathon for developing a decentralized identity verification system.',
    issueDate: '2024-03-05',
    studentId: 'student-3',
    studentEmail: 'bob.wilson@hack.dev',
    studentName: 'Bob Wilson',
    issuerId: 'issuer-1',
    issuerName: 'Tech University',
    category: 'Hackathon Achievement',
    level: 'Expert',
    hours: 48,
    skills: ['Innovation', 'Team Leadership', 'Rapid Prototyping'],
    status: 'revoked',
    revokedAt: '2024-03-20T09:00:00Z',
    revokedReason: 'Violation of competition rules',
    createdAt: '2024-03-05T18:00:00Z',
    updatedAt: '2024-03-20T09:00:00Z',
  },
  {
    id: '4',
    credentialId: 'CRD-2023-QW4E8Y1U',
    title: 'Full Stack Development Bootcamp',
    description: 'Completed intensive 12-week full stack development program covering React, Node.js, databases, and cloud deployment.',
    issueDate: '2023-12-01',
    expiryDate: '2024-01-01',
    studentId: 'student-4',
    studentEmail: 'alice.johnson@college.edu',
    studentName: 'Alice Johnson',
    issuerId: 'issuer-1',
    issuerName: 'Tech University',
    category: 'Software Development',
    level: 'Intermediate',
    hours: 480,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    status: 'expired',
    createdAt: '2023-12-01T12:00:00Z',
    updatedAt: '2023-12-01T12:00:00Z',
  },
  {
    id: '5',
    credentialId: 'CRD-2024-MN7B3C6V',
    title: 'Data Science Fundamentals',
    description: 'Mastered core data science concepts including statistical analysis, data visualization, and basic machine learning algorithms.',
    issueDate: '2024-02-28',
    studentId: 'student-2',
    studentEmail: 'jane.smith@tech.io',
    studentName: 'Jane Smith',
    issuerId: 'issuer-1',
    issuerName: 'Tech University',
    category: 'Data Science',
    level: 'Intermediate',
    hours: 80,
    skills: ['Python', 'Pandas', 'Matplotlib', 'Statistics'],
    status: 'issued',
    createdAt: '2024-02-28T16:00:00Z',
    updatedAt: '2024-02-28T16:00:00Z',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Student lookup service
export const lookupStudent = async (email: string): Promise<{ success: boolean; student?: StudentLookupResult; error?: string }> => {
  await delay(800); // Simulate network delay
  
  const student = mockStudents.find(s => s.email.toLowerCase() === email.toLowerCase());
  
  if (!student) {
    return { success: false, error: 'Student not found. Please check the email address.' };
  }
  
  return { success: true, student };
};

// Issue credential
export const issueCredential = async (
  formData: CredentialFormData,
  student: StudentLookupResult,
  issuerInfo: { id: string; name: string }
): Promise<{ success: boolean; credential?: Credential; error?: string }> => {
  await delay(1500); // Simulate processing time
  
  const credentialId = generateCredentialId();
  const now = new Date().toISOString();
  
  const newCredential: Credential = {
    id: `cred-${Date.now()}`,
    credentialId,
    title: formData.title,
    description: formData.description,
    issueDate: formData.issueDate,
    expiryDate: formData.expiryDate,
    studentId: student.id,
    studentEmail: student.email,
    studentName: `${student.firstName} ${student.lastName}`,
    issuerId: issuerInfo.id,
    issuerName: issuerInfo.name,
    category: formData.category,
    level: formData.level,
    hours: formData.hours,
    skills: formData.skills,
    status: 'issued',
    createdAt: now,
    updatedAt: now,
  };
  
  mockCredentials = [newCredential, ...mockCredentials];
  
  return { success: true, credential: newCredential };
};

// Get credentials with filters
export const getCredentials = async (
  issuerId: string,
  filters: CredentialFilters
): Promise<{ credentials: Credential[]; total: number }> => {
  await delay(500);
  
  let filtered = [...mockCredentials];
  
  // Apply search filter
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(search) ||
      c.studentName.toLowerCase().includes(search) ||
      c.studentEmail.toLowerCase().includes(search) ||
      c.credentialId.toLowerCase().includes(search)
    );
  }
  
  // Apply status filter
  if (filters.status !== 'all') {
    filtered = filtered.filter(c => c.status === filters.status);
  }
  
  // Apply category filter
  if (filters.category !== 'all') {
    filtered = filtered.filter(c => c.category === filters.category);
  }
  
  // Apply date filters
  if (filters.dateFrom) {
    filtered = filtered.filter(c => c.issueDate >= filters.dateFrom!);
  }
  if (filters.dateTo) {
    filtered = filtered.filter(c => c.issueDate <= filters.dateTo!);
  }
  
  // Apply sorting
  switch (filters.sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime());
      break;
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
  
  return { credentials: filtered, total: filtered.length };
};

// Revoke credential
export const revokeCredential = async (
  credentialId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> => {
  await delay(800);
  
  const index = mockCredentials.findIndex(c => c.id === credentialId);
  if (index === -1) {
    return { success: false, error: 'Credential not found' };
  }
  
  mockCredentials[index] = {
    ...mockCredentials[index],
    status: 'revoked',
    revokedAt: new Date().toISOString(),
    revokedReason: reason,
    updatedAt: new Date().toISOString(),
  };
  
  return { success: true };
};

// Get credential stats
export const getCredentialStats = async (issuerId: string): Promise<{
  total: number;
  issued: number;
  revoked: number;
  expired: number;
  thisMonth: number;
  topCategory: string;
}> => {
  await delay(300);
  
  const total = mockCredentials.length;
  const issued = mockCredentials.filter(c => c.status === 'issued').length;
  const revoked = mockCredentials.filter(c => c.status === 'revoked').length;
  const expired = mockCredentials.filter(c => c.status === 'expired').length;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonth = mockCredentials.filter(c => {
    const date = new Date(c.issueDate);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;
  
  // Find top category
  const categoryCounts: Record<string, number> = {};
  mockCredentials.forEach(c => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  
  return { total, issued, revoked, expired, thisMonth, topCategory };
};
