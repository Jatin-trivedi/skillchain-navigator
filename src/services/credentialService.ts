// @ts-ignore
import { db } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { Credential, CredentialFormData, StudentLookupResult } from '../types/credential';

type LookupStudentResponse = {
  success: boolean;
  student?: StudentLookupResult;
  error?: string;
};

type IssueCredentialResponse = {
  success: boolean;
  credential?: Credential;
  error?: string;
};

/**
 * 1) STUDENT VERIFICATION
 */
export const lookupStudent = async (email: string): Promise<LookupStudentResponse> => {
  try {
    const studentsRef = collection(db, 'users');
    const q = query(studentsRef, where('email', '==', email.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: 'Student email not found in database.' };
    }

    const studentDoc = querySnapshot.docs[0];
    const data: any = studentDoc.data();

    return {
      success: true,
      student: {
        id: studentDoc.id,
        email: String(data.email || ''),
        firstName: String(data.firstName || ''),
        lastName: String(data.lastName || ''),
        studentId: data.studentId ? String(data.studentId) : undefined,
        verified: data.verified ?? true,
      },
    };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to verify student' };
  }
};

/**
 * 2) ISSUANCE (writes to `issuedCredentials`)
 */
export const issueCredential = async (
  formData: CredentialFormData,
  student: StudentLookupResult,
  issuerInfo: { id: string; name: string }
): Promise<IssueCredentialResponse> => {
  try {
    if (!issuerInfo?.id) {
      return { success: false, error: 'Authentication error: Missing Issuer ID.' };
    }

    const displayId = `CRD-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    const nowIso = new Date().toISOString();

    // Firestore payload (no undefined values)
    const payload = {
      credentialId: displayId,
      title: String(formData.title || ''),
      description: String(formData.description || ''),
      issueDate: String(formData.issueDate || ''),
      expiryDate: formData.expiryDate ? String(formData.expiryDate) : null,
      category: String(formData.category || ''),
      level: String(formData.level || ''),
      hours: formData.hours != null ? Number(formData.hours) : null,
      skills: Array.isArray(formData.skills) ? formData.skills : [],

      studentId: String(student.id || ''),
      studentEmail: String(student.email || ''),
      studentName: `${student.firstName || ''} ${student.lastName || ''}`.trim(),

      issuerId: String(issuerInfo.id),
      issuerName: String(issuerInfo.name || 'Unknown Issuer'),

      status: 'issued',

      // store server timestamps for consistency
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'issuedCredentials'), payload);

    // Return a complete Credential object for the UI (avoid false "failure" states)
    const credential: Credential = {
      id: docRef.id,
      credentialId: displayId,
      title: String(payload.title),
      description: String(payload.description),
      issueDate: String(payload.issueDate),
      ...(payload.expiryDate ? { expiryDate: String(payload.expiryDate) } : {}),

      studentId: String(payload.studentId),
      studentEmail: String(payload.studentEmail),
      studentName: String(payload.studentName),

      issuerId: String(payload.issuerId),
      issuerName: String(payload.issuerName),

      category: payload.category as Credential['category'],
      level: payload.level as Credential['level'],
      ...(payload.hours != null ? { hours: Number(payload.hours) } : {}),
      skills: payload.skills,

      status: 'issued',

      // Optional fields
      blockchainHash: undefined,
      revokedAt: undefined,
      revokedReason: undefined,

      // UI-friendly timestamps
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    return { success: true, credential };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to issue credential' };
  }
};

/**
 * 3) FETCHING & UTILS
 */
export const getCredentials = async (
  issuerId: string,
  filters?: any
): Promise<{ credentials: Credential[]; total: number }> => {
  try {
    const credsRef = collection(db, 'issuedCredentials');
    const q = query(credsRef, where('issuerId', '==', issuerId));
    const querySnapshot = await getDocs(q);

    const credentials: Credential[] = querySnapshot.docs.map((d) => {
      const data: any = d.data();

      return {
        id: d.id,
        credentialId: String(data.credentialId || d.id),
        title: String(data.title || ''),
        description: String(data.description || ''),
        issueDate: String(data.issueDate || ''),
        ...(data.expiryDate ? { expiryDate: String(data.expiryDate) } : {}),

        studentId: String(data.studentId || ''),
        studentEmail: String(data.studentEmail || ''),
        studentName: String(data.studentName || ''),

        issuerId: String(data.issuerId || issuerId),
        issuerName: String(data.issuerName || ''),

        category: data.category as Credential['category'],
        level: data.level as Credential['level'],
        ...(data.hours != null ? { hours: Number(data.hours) } : {}),
        ...(Array.isArray(data.skills) ? { skills: data.skills } : {}),

        status: (data.status as Credential['status']) || 'issued',
        ...(data.blockchainHash ? { blockchainHash: String(data.blockchainHash) } : {}),
        ...(data.revokedAt ? { revokedAt: String(data.revokedAt) } : {}),
        ...(data.revokedReason ? { revokedReason: String(data.revokedReason) } : {}),

        // Firestore timestamps may be Timestamp objects; for MVP keep it simple
        createdAt: typeof data.createdAt === 'string' ? data.createdAt : '',
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : '',
      };
    });

    return { credentials, total: credentials.length };
  } catch {
    return { credentials: [], total: 0 };
  }
};

export const revokeCredential = async (credentialId: string, reason?: string) => {
  try {
    const credRef = doc(db, 'issuedCredentials', credentialId);
    await updateDoc(credRef, {
      status: 'revoked',
      revokedAt: new Date().toISOString(),
      revokedReason: reason || 'N/A',
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to revoke credential' };
  }
};

export const getCredentialStats = async (issuerId: string) => {
  const { credentials } = await getCredentials(issuerId);
  return {
    total: credentials.length,
    issued: credentials.filter((c) => c.status === 'issued').length,
    revoked: credentials.filter((c) => c.status === 'revoked').length,
    expired: credentials.filter((c) => c.status === 'expired').length,
    thisMonth: 0,
    topCategory: 'N/A',
  };
};
