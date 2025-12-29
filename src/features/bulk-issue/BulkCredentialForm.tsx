import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CREDENTIAL_CATEGORIES, SKILL_LEVELS, type CredentialCategory, type SkillLevel } from '@/types/credential';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(500),
  category: z.string().min(1, 'Please select a category'),
  level: z.string().min(1, 'Please select a level'),
  issueDate: z.date(),
  hours: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BulkCredentialFormProps {
  studentCount: number;
  onSubmit: (data: {
    title: string;
    description: string;
    category: CredentialCategory;
    level: SkillLevel;
    issueDate: string;
    hours?: number;
  }) => void;
}

export const BulkCredentialForm = ({ studentCount, onSubmit }: BulkCredentialFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      level: '',
      issueDate: new Date(),
    }
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      title: values.title,
      description: values.description,
      category: values.category as CredentialCategory,
      level: values.level as SkillLevel,
      issueDate: format(values.issueDate, 'yyyy-MM-dd'),
      hours: values.hours,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <p className="text-sm text-foreground">
            Credential will be issued to <strong>{studentCount}</strong> students
          </p>
        </div>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Credential Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Advanced Blockchain Developer Certificate"
            className="mt-1.5 bg-muted/50 border-border"
            {...form.register('title')}
          />
          {form.formState.errors.title && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe what this credential represents..."
            className="mt-1.5 bg-muted/50 border-border min-h-[100px]"
            {...form.register('description')}
          />
          {form.formState.errors.description && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category *</Label>
            <Select onValueChange={(v) => form.setValue('category', v)}>
              <SelectTrigger className="mt-1.5 bg-muted/50 border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CREDENTIAL_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.category && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.category.message}</p>
            )}
          </div>

          <div>
            <Label>Skill Level *</Label>
            <Select onValueChange={(v) => form.setValue('level', v)}>
              <SelectTrigger className="mt-1.5 bg-muted/50 border-border">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {SKILL_LEVELS.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.level && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.level.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Issue Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full mt-1.5 justify-start text-left font-normal bg-muted/50 border-border",
                    !form.watch('issueDate') && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch('issueDate') ? format(form.watch('issueDate'), 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.watch('issueDate')}
                  onSelect={(date) => date && form.setValue('issueDate', date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="hours">Duration (hours)</Label>
            <Input
              id="hours"
              type="number"
              placeholder="e.g., 40"
              className="mt-1.5 bg-muted/50 border-border"
              {...form.register('hours', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full gradient-bg text-primary-foreground">
        Continue to Review
      </Button>
    </form>
  );
};
