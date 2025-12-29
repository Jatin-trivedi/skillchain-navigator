import { useState, useCallback } from 'react';

export interface ParsedStudent {
  email: string;
  name: string;
  isValid: boolean;
  validationErrors: string[];
}

export interface CSVParseResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  students: ParsedStudent[];
}

export const useCSVParser = () => {
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = useCallback((file: File): Promise<CSVParseResult> => {
    return new Promise((resolve, reject) => {
      setParsing(true);
      setError(null);

      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim());
          
          if (lines.length < 2) {
            throw new Error('CSV must have a header row and at least one data row');
          }

          const header = lines[0].toLowerCase().split(',').map(h => h.trim());
          const emailIndex = header.findIndex(h => h === 'email');
          const nameIndex = header.findIndex(h => h === 'name');

          if (emailIndex === -1) {
            throw new Error('CSV must have an "email" column');
          }

          const students: ParsedStudent[] = [];
          
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const email = values[emailIndex] || '';
            const name = nameIndex !== -1 ? values[nameIndex] : '';
            
            const validationErrors: string[] = [];
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
              validationErrors.push('Email is required');
            } else if (!emailRegex.test(email)) {
              validationErrors.push('Invalid email format');
            }

            students.push({
              email: email.toLowerCase(),
              name,
              isValid: validationErrors.length === 0,
              validationErrors
            });
          }

          const validStudents = students.filter(s => s.isValid);
          const invalidStudents = students.filter(s => !s.isValid);

          setParsing(false);
          resolve({
            totalRows: students.length,
            validRows: validStudents.length,
            invalidRows: invalidStudents.length,
            students
          });
        } catch (err: any) {
          setParsing(false);
          setError(err.message);
          reject(err);
        }
      };

      reader.onerror = () => {
        setParsing(false);
        setError('Failed to read file');
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }, []);

  const downloadTemplate = useCallback(() => {
    const template = 'email,name\njohn@university.edu,John Doe\njane@tech.io,Jane Smith';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_issue_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return { parseCSV, parsing, error, downloadTemplate };
};
