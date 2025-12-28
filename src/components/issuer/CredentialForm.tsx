import { useState, useEffect } from 'react';
import { FileText, Calendar, Tag, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CREDENTIAL_CATEGORIES, SKILL_LEVELS, type CredentialFormData, type CredentialCategory, type SkillLevel } from '@/types/credential';

interface CredentialFormProps {
  onFormChange: (data: Partial<CredentialFormData>, isValid: boolean) => void;
  disabled?: boolean;
}

export const CredentialForm = ({ onFormChange, disabled }: CredentialFormProps) => {
  const [formData, setFormData] = useState<Partial<CredentialFormData>>({
    title: '',
    description: '',
    issueDate: new Date().toISOString().split('T')[0],
    category: undefined,
    level: undefined,
    hours: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (data: Partial<CredentialFormData>) => {
    const newErrors: Record<string, string> = {};

    if (!data.title || data.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (data.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!data.description || data.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (data.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (!data.issueDate) {
      newErrors.issueDate = 'Issue date is required';
    } else if (new Date(data.issueDate) > new Date()) {
      newErrors.issueDate = 'Issue date cannot be in the future';
    }

    if (!data.category) {
      newErrors.category = 'Please select a category';
    }

    if (!data.level) {
      newErrors.level = 'Please select a skill level';
    }

    if (data.hours !== undefined && (data.hours < 1 || data.hours > 1000)) {
      newErrors.hours = 'Hours must be between 1 and 1000';
    }

    return newErrors;
  };

  useEffect(() => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    
    const isValid = Object.keys(newErrors).length === 0 && 
      formData.title && 
      formData.description && 
      formData.category && 
      formData.level;
    
    onFormChange(formData, !!isValid);
  }, [formData]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const updateField = <K extends keyof CredentialFormData>(
    field: K,
    value: CredentialFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">2. Credential Details</h3>
            <p className="text-sm text-muted-foreground">Fill in the credential information</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Credential Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g., Advanced Blockchain Developer Certificate"
              value={formData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              className="bg-muted border-border"
              disabled={disabled}
              maxLength={100}
            />
            <div className="flex justify-between">
              {touched.title && errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {formData.title?.length || 0}/100
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the achievement, skills demonstrated, or course completed..."
              value={formData.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              className="bg-muted border-border min-h-[100px]"
              disabled={disabled}
              maxLength={500}
            />
            <div className="flex justify-between">
              {touched.description && errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {formData.description?.length || 0}/500
              </p>
            </div>
          </div>

          {/* Date and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate" className="text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Issue Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate || ''}
                onChange={(e) => updateField('issueDate', e.target.value)}
                onBlur={() => handleBlur('issueDate')}
                className="bg-muted border-border"
                disabled={disabled}
                max={new Date().toISOString().split('T')[0]}
              />
              {touched.issueDate && errors.issueDate && (
                <p className="text-xs text-destructive">{errors.issueDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category || ''}
                onValueChange={(value) => updateField('category', value as CredentialCategory)}
                disabled={disabled}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CREDENTIAL_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.category && errors.category && (
                <p className="text-xs text-destructive">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Level and Hours Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Skill Level <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.level || ''}
                onValueChange={(value) => updateField('level', value as SkillLevel)}
                disabled={disabled}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.level && errors.level && (
                <p className="text-xs text-destructive">{errors.level}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours" className="text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Duration (Hours) <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <Input
                id="hours"
                type="number"
                placeholder="e.g., 40"
                value={formData.hours || ''}
                onChange={(e) => updateField('hours', e.target.value ? parseInt(e.target.value) : undefined)}
                onBlur={() => handleBlur('hours')}
                className="bg-muted border-border"
                disabled={disabled}
                min={1}
                max={1000}
              />
              {touched.hours && errors.hours && (
                <p className="text-xs text-destructive">{errors.hours}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
