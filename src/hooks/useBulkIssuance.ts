import { useState, useCallback } from 'react';
import { lookupStudent, issueCredential } from '@/services/credentialService';
import type { CredentialFormData, StudentLookupResult, Credential } from '@/types/credential';
import type { ParsedStudent } from './useCSVParser';

export interface ValidatedStudent extends ParsedStudent {
  studentData?: StudentLookupResult;
  lookupError?: string;
}

export interface BatchResult {
  batchId: string;
  issued: Array<{ student: ValidatedStudent; credential: Credential }>;
  failed: Array<{ student: ValidatedStudent; error: string }>;
  startTime: number;
  endTime: number;
  duration: number;
}

export interface BatchProgress {
  total: number;
  processed: number;
  success: number;
  failed: number;
  currentStage: 'validating' | 'issuing' | 'complete';
  estimatedTimeRemaining: number | null;
}

export const useBulkIssuance = () => {
  const [validating, setValidating] = useState(false);
  const [issuing, setIssuing] = useState(false);
  const [progress, setProgress] = useState<BatchProgress>({
    total: 0,
    processed: 0,
    success: 0,
    failed: 0,
    currentStage: 'validating',
    estimatedTimeRemaining: null
  });

  const validateStudents = useCallback(async (students: ParsedStudent[]): Promise<ValidatedStudent[]> => {
    setValidating(true);
    setProgress(prev => ({ ...prev, currentStage: 'validating', total: students.length, processed: 0 }));

    const validated: ValidatedStudent[] = [];

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      
      if (!student.isValid) {
        validated.push({ ...student });
        continue;
      }

      try {
        const result = await lookupStudent(student.email);
        
        if (result.success && result.student) {
          validated.push({
            ...student,
            isValid: true,
            studentData: result.student
          });
        } else {
          validated.push({
            ...student,
            isValid: false,
            lookupError: result.error || 'Student not found in system',
            validationErrors: [...student.validationErrors, result.error || 'Student not found']
          });
        }
      } catch (err: any) {
        validated.push({
          ...student,
          isValid: false,
          lookupError: err.message,
          validationErrors: [...student.validationErrors, err.message]
        });
      }

      setProgress(prev => ({ ...prev, processed: i + 1 }));
    }

    setValidating(false);
    return validated;
  }, []);

  const issueBatch = useCallback(async (
    students: ValidatedStudent[],
    credentialData: Omit<CredentialFormData, 'studentEmail'>,
    issuerInfo: { id: string; name: string }
  ): Promise<BatchResult> => {
    setIssuing(true);
    const startTime = Date.now();
    const batchId = `BATCH-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

    const validStudents = students.filter(s => s.isValid && s.studentData);
    
    setProgress({
      total: validStudents.length,
      processed: 0,
      success: 0,
      failed: 0,
      currentStage: 'issuing',
      estimatedTimeRemaining: validStudents.length * 0.5
    });

    const result: BatchResult = {
      batchId,
      issued: [],
      failed: [],
      startTime,
      endTime: 0,
      duration: 0
    };

    // Process in chunks for performance
    const chunkSize = 5;
    for (let i = 0; i < validStudents.length; i += chunkSize) {
      const chunk = validStudents.slice(i, i + chunkSize);
      
      await Promise.all(chunk.map(async (student) => {
        if (!student.studentData) return;

        try {
          const formData: CredentialFormData = {
            ...credentialData,
            studentEmail: student.email
          };

          const issueResult = await issueCredential(formData, student.studentData, issuerInfo);
          
          if (issueResult.success && issueResult.credential) {
            result.issued.push({ student, credential: issueResult.credential });
          } else {
            result.failed.push({ student, error: issueResult.error || 'Unknown error' });
          }
        } catch (err: any) {
          result.failed.push({ student, error: err.message });
        }
      }));

      setProgress(prev => ({
        ...prev,
        processed: Math.min(i + chunkSize, validStudents.length),
        success: result.issued.length,
        failed: result.failed.length,
        estimatedTimeRemaining: Math.ceil((validStudents.length - (i + chunkSize)) * 0.3)
      }));
    }

    result.endTime = Date.now();
    result.duration = result.endTime - result.startTime;

    setProgress(prev => ({ ...prev, currentStage: 'complete' }));
    setIssuing(false);

    return result;
  }, []);

  return {
    validateStudents,
    issueBatch,
    validating,
    issuing,
    progress
  };
};
