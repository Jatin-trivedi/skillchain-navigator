// @ts-ignore
import { db } from '../firebase'; 
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';

// --- Interfaces ---
export interface StudentLookupResult {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  studentId: string;
  verified: boolean;
}

export interface CredentialFormData {
  title: string;
  description: string;
  issueDate: string;
  category: string;
  level: string;
  hours: number;
  skills?: string[]; 
}

/**
 * 1. STUDENT VERIFICATION
 */
export const lookupStudent = async (email: string): Promise<{ 
  success: boolean; 
  student?: StudentLookupResult; 
  error?: string 
}> => {
  try {
    const studentsRef = collection(db, 'users');
    const q = query(studentsRef, where('email', '==', email.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: 'Student email not found in database.' };
    }

    const studentDoc = querySnapshot.docs[0];
    const data = studentDoc.data();

    return {
      success: true,
      student: {
        id: studentDoc.id,
        email: data.email || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        studentId: data.studentId || 'N/A',
        verified: data.verified ?? true,
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * 2. ISSUANCE (Targeting 'issuedCredentials')
 */
export const issueCredential = async (
  formData: CredentialFormData,
  student: StudentLookupResult,
  issuerInfo: { id: string; name: string }
): Promise<{ success: boolean; credentialId?: string; error?: string }> => {
  try {
    // 1. Critical Validation
    if (!issuerInfo?.id) {
      console.error("DEBUG: issuerInfo.id is missing!");
      return { success: false, error: "Authentication error: Missing Issuer ID." };
    }

    const displayId = `CRD-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    // 2. Data Clean-up (Ensuring NO undefined values)
    const payload = {
      credentialId: displayId,
      title: String(formData.title || ''),
      description: String(formData.description || ''),
      issueDate: String(formData.issueDate || ''),
      category: String(formData.category || ''),
      level: String(formData.level || ''),
      hours: Number(formData.hours) || 0,
      skills: Array.isArray(formData.skills) ? formData.skills : [],
      
      studentId: String(student.id || ''),
      studentEmail: String(student.email || ''),
      studentName: `${student.firstName || ''} ${student.lastName || ''}`.trim(),
      
      issuerId: String(issuerInfo.id), // MUST match your Firebase Auth UID
      issuerName: String(issuerInfo.name || 'Unknown Issuer'),
      
      status: 'issued',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    console.log("DEBUG: Attempting to save payload:", payload);

    // 3. Firestore Call to the specific collection in your rules
    const docRef = await addDoc(collection(db, 'issuedCredentials'), payload);
    
    console.log("DEBUG: Success! Doc ID:", docRef.id);
    return { success: true, credentialId: docRef.id };

  } catch (error: any) {
    // THIS LOG IS CRUCIAL: Check your F12 Browser Console for this!
    console.error("FIRESTORE REJECTION ERROR:", error);
    return { success: false, error: error.message || "Failed to issue credential" };
  }
};

/**
 * 3. FETCHING & UTILS
 */
export const getCredentials = async (issuerId: string, filters?: any) => {
  try {
    const credsRef = collection(db, 'issuedCredentials');
    const q = query(credsRef, where('issuerId', '==', issuerId));
    const querySnapshot = await getDocs(q);
    const credentials = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { credentials, total: credentials.length };
  } catch (error) {
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
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCredentialStats = async (issuerId: string) => {
  const { credentials } = await getCredentials(issuerId);
  return {
    total: credentials.length,
    issued: credentials.filter((c: any) => c.status === 'issued').length,
    revoked: credentials.filter((c: any) => c.status === 'revoked').length,
    expired: credentials.filter((c: any) => c.status === 'expired').length,
    thisMonth: 0,
    topCategory: 'N/A'
  };
};