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
      <div class="credential-item">
        <h3 class="credential-title">${cred.title}</h3>
        <p class="credential-issuer">${cred.issuerName}</p>
        <p class="credential-description">${cred.description}</p>
        <div class="credential-meta">
          <span>Issued: ${formatDate(cred.issueDate)}</span>
          ${cred.expiryDate ? ` | <span>Expires: ${formatDate(cred.expiryDate)}</span>` : ""}
          ${cred.level ? ` | <span>Level: ${cred.level}</span>` : ""}
          ${cred.hours ? ` | <span>Duration: ${cred.hours} hours</span>` : ""}
        </div>
        ${cred.skills && cred.skills.length > 0 ? `
        <div class="credential-skills">
          <strong>Skills:</strong> ${cred.skills.join(", ")}
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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            background: #fff;
            color: #000;
            line-height: 1.6;
            padding: 0;
            margin: 0;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 20px;
            margin-bottom: 40px;
        }
        .name {
            font-size: 36px;
            font-weight: bold;
            color: #000;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .subtitle {
            font-size: 16px;
            color: #333;
            font-style: italic;
        }
        .section-title {
            font-size: 24px;
            font-weight: bold;
            color: #000;
            margin: 40px 0 20px 0;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .credentials {
            margin-top: 30px;
        }
        .credential-item {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        .credential-item:last-child {
            border-bottom: none;
        }
        .credential-title {
            margin: 0 0 8px 0;
            font-size: 20px;
            font-weight: 600;
            color: #000;
        }
        .credential-issuer {
            margin: 0 0 10px 0;
            font-size: 16px;
            color: #333;
            font-weight: 500;
            font-style: italic;
        }
        .credential-description {
            margin: 0 0 12px 0;
            font-size: 14px;
            color: #555;
            line-height: 1.7;
        }
        .credential-meta {
            margin-top: 10px;
            font-size: 13px;
            color: #666;
        }
        .credential-skills {
            margin-top: 10px;
            font-size: 13px;
            color: #666;
        }
        .credential-skills strong {
            color: #000;
        }
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        @media (max-width: 768px) {
            .container {
                padding: 20px 15px;
            }
            .name {
                font-size: 28px;
            }
            .section-title {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
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

          {/* Portfolio Preview */}
          <div className="mb-6">
            <div className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-8 md:p-12" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                {/* Header */}
                <div className="text-center border-b-2 border-black pb-6 mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 uppercase tracking-wider">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-base text-gray-700 italic">
                    Professional Credentials Portfolio
                  </p>
                </div>

                {/* Section Title */}
                <h2 className="text-xl md:text-2xl font-bold text-black mb-6 pb-3 border-b-2 border-black uppercase tracking-wide">
                  Credentials & Achievements
                </h2>

                {/* Credentials List */}
                <div className="space-y-6">
                  {credentials.map((cred, index) => (
                    <div
                      key={cred.id}
                      className={`pb-6 ${index < credentials.length - 1 ? "border-b border-gray-300" : ""}`}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2">
                        {cred.title}
                      </h3>
                      <p className="text-base text-gray-800 font-medium mb-3 italic">
                        {cred.issuerName}
                      </p>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {cred.description}
                      </p>
                      <div className="text-sm text-gray-500">
                        <span>Issued: {formatDate(cred.issueDate)}</span>
                        {cred.expiryDate && (
                          <> | Expires: {formatDate(cred.expiryDate)}</>
                        )}
                        {cred.level && <> | Level: {cred.level}</>}
                        {cred.hours && <> | Duration: {cred.hours} hours</>}
                      </div>
                      {cred.skills && cred.skills.length > 0 && (
                        <div className="text-sm text-gray-500 mt-2">
                          <strong className="text-black">Skills:</strong> {cred.skills.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-gray-300 text-center">
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

