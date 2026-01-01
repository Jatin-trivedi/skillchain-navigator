import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  X,
  Hash,
  QrCode,
  ArrowLeft,
} from "lucide-react";

const AddCredentialPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    issuingAuthority: "",
    issueDate: "",
    credentialFile: null as File | null,
    verificationUrl: "",
    credentialId: "",
    description: "",
    verificationMethod: "",
    credentialHash: "",
  });

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
      if (validTypes.includes(file.type)) {
        handleInputChange("credentialFile", file);
      } else {
        alert("Please upload a PDF or Image file (JPG, PNG)");
      }
    }
  };

  const handleRemoveFile = () => {
    handleInputChange("credentialFile", null);
  };

  const handleGenerateHash = () => {
    // Generate a hash (placeholder - implement actual hash generation)
    const hash = `hash_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    handleInputChange("credentialHash", hash);
  };

  const handleGenerateQR = () => {
    // Generate QR code (placeholder - implement actual QR generation)
    console.log("Generating QR code...");
    alert("QR code generation will be implemented");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    // Reset form and navigate back
    setFormData({
      title: "",
      type: "",
      issuingAuthority: "",
      issueDate: "",
      credentialFile: null,
      verificationUrl: "",
      credentialId: "",
      description: "",
      verificationMethod: "",
      credentialHash: "",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="student"
        user={{
          name: `${user?.firstName} ${user?.lastName}`,
          initials: user?.initials || "U",
        }}
        notifications={3}
        activeTab="dashboard"
        onLogout={() => {
          logout();
          navigate("/");
        }}
        onTabChange={(tab) => console.log("Tab:", tab)}
      />

      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Add New Credential
            </h1>
            <p className="text-muted-foreground mt-1">
              Fill in the details to add a new credential to your portfolio
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Credential Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Credential Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">
                    Credential Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., React Internship Certificate, B.Tech Degree"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>

                {/* Credential Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-foreground">
                    Credential Type *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                    required
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select credential type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="professional">Professional / Skill</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Issuing Authority */}
                <div className="space-y-2">
                  <Label htmlFor="issuingAuthority" className="text-foreground">
                    Issuing Authority *
                  </Label>
                  <Input
                    id="issuingAuthority"
                    placeholder="College name, Company name, Platform name"
                    value={formData.issuingAuthority}
                    onChange={(e) => handleInputChange("issuingAuthority", e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>

                {/* Issue Date */}
                <div className="space-y-2">
                  <Label htmlFor="issueDate" className="text-foreground">
                    Issue Date *
                  </Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    required
                    className="bg-background"
                  />
                </div>

                {/* Upload Credential File */}
                <div className="space-y-2">
                  <Label className="text-foreground">Upload Credential File</Label>
                  {formData.credentialFile ? (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Upload className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {formData.credentialFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(formData.credentialFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        className="h-8 w-8"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-border hover:border-primary/50 transition-colors bg-muted/30">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <p className="text-sm text-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF or Image (JPG, PNG)
                        </p>
                      </div>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Verification URL */}
                <div className="space-y-2">
                  <Label htmlFor="verificationUrl" className="text-foreground">
                     Verification URL
                  </Label>
                  <Input
                    id="verificationUrl"
                    type="url"
                    placeholder="https://example.com/verify"
                    value={formData.verificationUrl}
                    onChange={(e) => handleInputChange("verificationUrl", e.target.value)}
                    className="bg-background"
                  />
                </div>

                
                {/* Credential ID / Certificate Number (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="credentialId" className="text-foreground">
                    Credential ID / Certificate Number{" "}
                    <span className="text-muted-foreground text-xs">(Optional)</span>
                  </Label>
                  <Input
                    id="credentialId"
                    placeholder="Enter certificate number or ID"
                    value={formData.credentialId}
                    onChange={(e) => handleInputChange("credentialId", e.target.value)}
                    className="bg-background"
                  />
                </div>

                {/* Description / Notes (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Description / Notes{" "}
                    <span className="text-muted-foreground text-xs">(Optional)</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Add any additional details or notes"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    className="bg-background"
                  />
                </div>

                {/* Verification Method */}
                <div className="space-y-2">
                  <Label htmlFor="verificationMethod" className="text-foreground">
                    Verification Method *
                  </Label>
                  <Select
                    value={formData.verificationMethod}
                    onValueChange={(value) => handleInputChange("verificationMethod", value)}
                    required
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select verification method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual review</SelectItem>
                      <SelectItem value="qr">QR code verification</SelectItem>
                      <SelectItem value="hash">Hash-based verification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Credential Hash */}
                <div className="space-y-2">
                  <Label className="text-foreground">Credential Hash</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Hash will be generated automatically"
                      value={formData.credentialHash}
                      readOnly
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateHash}
                      className="flex items-center gap-2"
                    >
                      <Hash className="w-4 h-4" />
                      Generate Hash
                    </Button>
                  </div>
                </div>

                {/* Generate QR Code */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateQR}
                    className="w-full flex items-center gap-2"
                  >
                    <QrCode className="w-4 h-4" />
                    Generate QR Code
                  </Button>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 gradient-bg text-primary-foreground">
                    Add Credential
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddCredentialPage;

