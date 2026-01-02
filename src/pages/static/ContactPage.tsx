import { useState } from "react";
import { 
  Mail, 
  Clock, 
  Shield, 
  Building,
  HelpCircle,
  CreditCard,
  Wrench,
  Users,
  Send
} from "lucide-react";
import StaticPageLayout from "@/components/static/StaticPageLayout";
import { toast } from "sonner";

const CategoryButton = ({ 
  icon, 
  label, 
  active, 
  onClick 
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
      active 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}
  >
    {icon}
    {label}
  </button>
);

const TrustBadge = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
    <Shield className="h-3 w-3 text-green-500" />
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent!", {
        description: "We'll get back to you within 24-48 hours."
      });
      setFormData({ name: '', email: '', message: '', category: 'general' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <StaticPageLayout
      title="Contact Us"
      subtitle="We're here to help. Reach out with any questions, feedback, or partnership inquiries."
      icon="📬"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Info */}
        <div className="space-y-8">
          {/* Email Card */}
          <div className="p-6 bg-card/50 rounded-2xl border border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Email Support</h3>
                <a 
                  href="mailto:support@authvision.com" 
                  className="text-lg text-primary hover:text-primary/80 transition"
                >
                  support@authvision.com
                </a>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              For general inquiries, partnership opportunities, verification support, or technical help.
            </p>
          </div>
          
          {/* Response Time */}
          <div className="p-6 bg-muted/30 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Response Time</h3>
            </div>
            <p className="text-muted-foreground">
              We generally respond within 24-48 hours.
            </p>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">What can we help with?</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryButton
                icon={<HelpCircle className="h-4 w-4" />}
                label="General"
                active={formData.category === 'general'}
                onClick={() => setFormData({...formData, category: 'general'})}
              />
              <CategoryButton
                icon={<Users className="h-4 w-4" />}
                label="Partnership"
                active={formData.category === 'partnership'}
                onClick={() => setFormData({...formData, category: 'partnership'})}
              />
              <CategoryButton
                icon={<Wrench className="h-4 w-4" />}
                label="Technical"
                active={formData.category === 'technical'}
                onClick={() => setFormData({...formData, category: 'technical'})}
              />
              <CategoryButton
                icon={<CreditCard className="h-4 w-4" />}
                label="Billing"
                active={formData.category === 'billing'}
                onClick={() => setFormData({...formData, category: 'billing'})}
              />
            </div>
          </div>
        </div>
        
        {/* Right Column: Contact Form */}
        <div>
          <div className="p-8 bg-card/50 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="verification">Verification Support</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing & Accounts</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="How can we help you today?"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-lg font-medium text-primary-foreground transition"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree to our Privacy Policy. We'll never share your information.
              </p>
            </form>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <TrustBadge label="GDPR Compliant" />
            <TrustBadge label="256-bit Encryption" />
            <TrustBadge label="No Data Selling" />
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default ContactPage;
