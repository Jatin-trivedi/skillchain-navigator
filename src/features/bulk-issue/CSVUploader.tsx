import { useCallback, useState } from 'react';
import { Upload, FileText, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCSVParser, type CSVParseResult } from '@/hooks/useCSVParser';

interface CSVUploaderProps {
  onUpload: (result: CSVParseResult) => void;
  onClear: () => void;
  uploadedFile: File | null;
}

export const CSVUploader = ({ onUpload, onClear, uploadedFile }: CSVUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { parseCSV, parsing, error, downloadTemplate } = useCSVParser();

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      return;
    }
    try {
      const result = await parseCSV(file);
      onUpload(result);
    } catch (err) {
      console.error('CSV parse error:', err);
    }
  }, [parseCSV, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (uploadedFile) {
    return (
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClear}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card
        className={`p-8 border-2 border-dashed transition-all cursor-pointer ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label className="flex flex-col items-center gap-4 cursor-pointer">
          <div className="p-4 rounded-full bg-muted">
            <Upload className={`w-8 h-8 ${parsing ? 'animate-pulse text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">
              {parsing ? 'Processing CSV...' : 'Drag & drop CSV file here'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
          </div>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleInputChange}
            disabled={parsing}
          />
        </label>
      </Card>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <p className="text-sm font-medium text-foreground">CSV Format:</p>
        <pre className="text-xs text-muted-foreground bg-background p-3 rounded font-mono">
{`email,name
john@uni.edu,John Doe
jane@tech.io,Jane Smith`}
        </pre>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Max 200 students per batch</p>
          <Button variant="outline" size="sm" onClick={downloadTemplate}>
            <Download className="w-3 h-3 mr-1" />
            Download Template
          </Button>
        </div>
      </div>
    </div>
  );
};
