import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Credential } from "@/types/credential";

// Mock credentials - replace with actual API call
const mockCredentials: Credential[] = [
  {
    id: "1",
    credentialId: "CRED-2024-001",
    title: "AWS Cloud Practitioner",
    description: "Certified in Amazon Web Services cloud computing fundamentals",
    issueDate: "2024-12-15",
    expiryDate: "2026-12-15",
    studentId: "student-1",
    studentEmail: "student@example.com",
    studentName: "John Doe",
    issuerId: "issuer-1",
    issuerName: "Amazon Web Services",
    category: "Software Development",
    level: "Intermediate",
    hours: 40,
    skills: ["AWS", "Cloud Computing", "DevOps"],
    status: "issued",
    createdAt: "2024-12-15",
    updatedAt: "2024-12-15",
  },
  {
    id: "2",
    credentialId: "CRED-2024-002",
    title: "React Developer Certificate",
    description: "Advanced React development skills and best practices",
    issueDate: "2024-12-10",
    studentId: "student-1",
    studentEmail: "student@example.com",
    studentName: "John Doe",
    issuerId: "issuer-2",
    issuerName: "Meta",
    category: "Software Development",
    level: "Advanced",
    hours: 60,
    skills: ["React", "JavaScript", "Frontend"],
    status: "issued",
    createdAt: "2024-12-10",
    updatedAt: "2024-12-10",
  },
  {
    id: "3",
    credentialId: "CRED-2024-003",
    title: "Data Science Fundamentals",
    description: "Introduction to data science and machine learning",
    issueDate: "2024-12-05",
    expiryDate: "2025-12-05",
    studentId: "student-1",
    studentEmail: "student@example.com",
    studentName: "John Doe",
    issuerId: "issuer-3",
    issuerName: "IBM",
    category: "Data Science",
    level: "Beginner",
    hours: 30,
    skills: ["Python", "Data Analysis", "Machine Learning"],
    status: "issued",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-05",
  },
];

const SharePortfolioPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const credentials = mockCredentials; // Replace with actual API call

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const generatePortfolioHTML = () => {
    const credentialsHTML = credentials
      .map(
        (cred) => `
      <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0;">
        <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: #000;">
          ${cred.title}
        </h3>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #333; font-weight: 500;">
          ${cred.issuerName}
        </p>
        <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; line-height: 1.5;">
          ${cred.description}
        </p>
        <div style="margin-top: 8px; font-size: 11px; color: #555;">
          <span>Issued: ${formatDate(cred.issueDate)}</span>
          ${cred.expiryDate ? ` | <span>Expires: ${formatDate(cred.expiryDate)}</span>` : ""}
          ${cred.level ? ` | <span>Level: ${cred.level}</span>` : ""}
        </div>
        ${cred.skills && cred.skills.length > 0 ? `
        <div style="margin-top: 8px;">
          <span style="font-size: 11px; color: #555;">Skills: </span>
          <span style="font-size: 11px; color: #333;">${cred.skills.join(", ")}</span>
        </div>
        ` : ""}
      </div>
    `
      )
      .join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - ${user?.firstName} ${user?.lastName}</title>
    <style>
        @media print {
            @page {
                size: A4;
                margin: 0;
            }
            body {
                margin: 0;
                padding: 0;
            }
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Times New Roman', serif;
            background: white;
            color: black;
            padding: 0;
            margin: 0;
        }
        .page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 25mm;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .name {
            font-size: 28px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .subtitle {
            font-size: 14px;
            color: #333;
            margin-top: 5px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin: 25px 0 15px 0;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .credentials {
            margin-top: 20px;
        }
        .credential-item {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        .credential-title {
            margin: 0 0 5px 0;
            font-size: 16px;
            font-weight: 600;
            color: #000;
        }
        .credential-issuer {
            margin: 0 0 8px 0;
            font-size: 13px;
            color: #333;
            font-weight: 500;
        }
        .credential-description {
            margin: 0 0 5px 0;
            font-size: 12px;
            color: #666;
            line-height: 1.5;
        }
        .credential-meta {
            margin-top: 8px;
            font-size: 11px;
            color: #555;
        }
        .credential-skills {
            margin-top: 8px;
            font-size: 11px;
            color: #555;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e0e0e0;
            font-size: 10px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="name">${user?.firstName} ${user?.lastName}</div>
            <div class="subtitle">Professional Credentials Portfolio</div>
        </div>
        
        <div class="section-title">Credentials & Achievements</div>
        
        <div class="credentials">
            ${credentialsHTML}
        </div>
        
        <div class="footer">
            Generated on ${new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </div>
    </div>
</body>
</html>`;
  };

  const handleDownloadPortfolio = () => {
    const portfolioHTML = generatePortfolioHTML();
    
    // Create a blob with the HTML content
    const blob = new Blob([portfolioHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-${user?.firstName}-${user?.lastName}.html`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        activeTab="share"
        onLogout={() => {
          logout();
          navigate("/");
        }}
        onTabChange={(tab) => {
          if (tab === "dashboard") navigate("/dashboard");
          else if (tab === "credentials") navigate("/student/credentials");
          else if (tab === "add") navigate("/student/add-credential");
          else if (tab === "share") navigate("/student/share-portfolio");
        }}
      />

      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Share Portfolio
            </h1>
            <p className="text-muted-foreground">
              Preview and download your portfolio page
            </p>
          </div>

          {/* A4 Portfolio Preview */}
          <div className="flex justify-center mb-6">
            <div
              className="bg-white shadow-lg"
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "25mm",
                transform: "scale(0.7)",
                transformOrigin: "top center",
              }}
            >
              {/* Portfolio Content Preview */}
              <div className="border-b-2 border-black pb-4 mb-6">
                <div className="text-3xl font-bold text-black mb-2 uppercase tracking-wide">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-sm text-gray-700 mt-2">
                  Professional Credentials Portfolio
                </div>
              </div>

              <div className="mb-6">
                <div className="text-lg font-bold text-black mb-4 pb-2 border-b border-black uppercase tracking-wide">
                  Credentials & Achievements
                </div>

                <div className="space-y-5">
                  {credentials.map((cred) => (
                    <div
                      key={cred.id}
                      className="pb-4 border-b border-gray-300"
                    >
                      <h3 className="text-base font-semibold text-black mb-1">
                        {cred.title}
                      </h3>
                      <p className="text-sm text-gray-800 font-medium mb-2">
                        {cred.issuerName}
                      </p>
                      <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                        {cred.description}
                      </p>
                      <div className="text-xs text-gray-500 mt-2">
                        <span>Issued: {formatDate(cred.issueDate)}</span>
                        {cred.expiryDate && (
                          <> | Expires: {formatDate(cred.expiryDate)}</>
                        )}
                        {cred.level && <> | Level: {cred.level}</>}
                      </div>
                      {cred.skills && cred.skills.length > 0 && (
                        <div className="text-xs text-gray-500 mt-2">
                          <span className="font-medium">Skills: </span>
                          <span>{cred.skills.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-300 text-center">
                <p className="text-xs text-gray-500">
                  Generated on{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <Button
              onClick={handleDownloadPortfolio}
              className="gradient-bg text-primary-foreground"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Portfolio
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharePortfolioPage;

