import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthLayout from "@/components/layout/AuthLayout";
import PasswordStrengthIndicator from "@/components/auth/PasswordStrengthIndicator";
import { issuerSignupSchema, IssuerSignupForm } from "@/utils/authValidation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const IssuerSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();

  const form = useForm<IssuerSignupForm>({
    resolver: zodResolver(issuerSignupSchema),
    defaultValues: {
      organizationName: "",
      organizationUrl: "",
      organizationType: undefined,
      email: "",
      password: "",
      confirmPassword: "",
      recipientsPerYear: undefined,
      acceptTerms: false,
    },
  });

  const password = form.watch("password");

  const onSubmit = async (data: IssuerSignupForm) => {
    setIsLoading(true);
    const result = await signup(
      {
        email: data.email,
        password: data.password,
        organizationName: data.organizationName,
        organizationUrl: data.organizationUrl,
        organizationType: data.organizationType,
        recipientsPerYear: data.recipientsPerYear,
      },
      "issuer"
    );
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Account created!",
        description: "Welcome to SkillChain. You can now start issuing credentials.",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: result.error,
      });
    }
  };

  return (
    <AuthLayout
      title="Create Issuer Account"
      subtitle="Start issuing verified credentials for your organization"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-secondary" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tech University"
                    autoComplete="organization"
                    className="bg-muted/50 border-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-muted/50 border-border">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="university">University / College</SelectItem>
                    <SelectItem value="company">Company / Enterprise</SelectItem>
                    <SelectItem value="certification">Certification Body</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizationUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Website (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    type="url"
                    className="bg-muted/50 border-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin@organization.com"
                    type="email"
                    autoComplete="email"
                    className="bg-muted/50 border-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className="bg-muted/50 border-border pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <PasswordStrengthIndicator password={password} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className="bg-muted/50 border-border pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientsPerYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipients Per Year</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-muted/50 border-border">
                      <SelectValue placeholder="How many credentials will you issue?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="<100">Less than 100</SelectItem>
                    <SelectItem value="100-1000">100 - 1,000</SelectItem>
                    <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                    <SelectItem value="5000+">5,000+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-2">
                  <FormControl>
                    <Checkbox
                      id="acceptTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full gradient-bg text-primary-foreground glow-hover"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Issuer Account"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login/issuer" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </div>

      <div className="mt-4 text-center">
        <Link to="/signup/student" className="text-sm text-muted-foreground hover:text-foreground">
          Sign up as Student instead →
        </Link>
      </div>
    </AuthLayout>
  );
};

export default IssuerSignup;
