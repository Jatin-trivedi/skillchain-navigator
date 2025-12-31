import type { Credential } from '@/types/credential';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Generate JSON Proof for a credential
export const generateJSONProof = (credential: Credential) => {
  const proof = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://skillchain.vercel.app/context/v1"
    ],
    "type": ["VerifiableCredential", "SkillCredential"],
    "credentialId": credential.credentialId,
    "issuer": {
      "id": credential.issuerId,
      "name": credential.issuerName,
      "type": "Organization"
    },
    "credentialSubject": {
      "id": credential.studentId,
      "name": credential.studentName,
      "email": credential.studentEmail,
      "achievement": credential.title,
      "description": credential.description,
      "category": credential.category,
      "level": credential.level,
      "skills": credential.skills || []
    },
    "issuanceDate": credential.issueDate,
    "expirationDate": credential.expiryDate || null,
    "credentialStatus": {
      "type": "CredentialStatusList2021",
      "status": credential.status
    },
    "proof": {
      "type": "BlockchainVerification2024",
      "created": credential.createdAt || new Date().toISOString(),
      "proofPurpose": "assertionMethod",
      "verificationMethod": "https://skillchain.vercel.app/verification",
      "blockchainHash": credential.blockchainHash || `0x${generateHash()}`,
      "simulated": true,
      "note": "This is a simulated blockchain proof for demonstration purposes."
    },
    "metadata": {
      "verificationUrl": `${window.location.origin}/c/${credential.credentialId}`,
      "createdAt": credential.createdAt,
      "updatedAt": credential.updatedAt
    }
  };

  const dataStr = JSON.stringify(proof, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `credential-proof-${credential.credentialId}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate PDF for a credential
export const generateCredentialPDF = async (credential: Credential) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Background
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 297, 'F');

  // Header band
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 65, 'F');

  // Logo/Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('SKILLCHAIN', 20, 28);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Blockchain-Verified Credential', 20, 38);

  // Credential ID
  doc.setFontSize(9);
  doc.text(`ID: ${credential.credentialId}`, 20, 50);

  // Status badge
  const statusColors: Record<string, [number, number, number]> = {
    issued: [34, 197, 94],
    verified: [34, 197, 94],
    pending: [234, 179, 8],
    revoked: [239, 68, 68],
    expired: [249, 115, 22],
    rejected: [239, 68, 68],
  };
  const statusColor = statusColors[credential.status] || [148, 163, 184];
  doc.setFillColor(...statusColor);
  doc.roundedRect(155, 22, 38, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(credential.status.toUpperCase(), 162, 29);

  // Main title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(credential.title, 170);
  doc.text(titleLines, 20, 85);

  let yPos = 85 + titleLines.length * 10 + 10;

  // Recipient
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('AWARDED TO', 20, yPos);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(credential.studentName, 20, yPos + 8);

  // Issuer
  yPos += 22;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('ISSUED BY', 20, yPos);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(credential.issuerName, 20, yPos + 8);

  // Details section
  yPos += 25;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(15, yPos, 180, 50, 3, 3, 'F');

  const details = [
    ['Issue Date', formatDate(credential.issueDate)],
    ['Category', credential.category],
    ['Level', credential.level],
    ['Duration', credential.hours ? `${credential.hours} hours` : 'N/A'],
  ];

  let detailY = yPos + 12;
  details.forEach(([label, value], index) => {
    const xPos = 25 + (index % 2) * 85;
    if (index === 2) detailY = yPos + 32;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(label, xPos, detailY);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(value, xPos, detailY + 6);
  });

  // Description
  yPos += 60;
  if (credential.description) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(209, 213, 219);
    const descLines = doc.splitTextToSize(credential.description, 170);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 5 + 10;
  }

  // Skills
  if (credential.skills && credential.skills.length > 0) {
    yPos += 5;
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text('SKILLS', 20, yPos);
    
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(credential.skills.join(' • '), 20, yPos + 7);
  }

  // Blockchain verification section
  yPos = 230;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(15, yPos, 180, 35, 3, 3, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(99, 102, 241);
  doc.text('🔗 BLOCKCHAIN VERIFICATION', 25, yPos + 10);
  
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const hash = credential.blockchainHash || `0x${generateHash()}`;
  doc.text(`Hash: ${hash}`, 25, yPos + 20);
  doc.text(`Verify: ${window.location.origin}/c/${credential.credentialId}`, 25, yPos + 28);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 285);
  doc.text('skillchain.vercel.app', 165, 285);

  doc.save(`credential-${credential.credentialId}.pdf`);
};

// Generate a random hash for simulation
const generateHash = () => {
  return Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

// Generate public links
export const generatePublicLinks = (credentialId: string, username?: string) => {
  const baseUrl = window.location.origin;
  
  return {
    credential: `${baseUrl}/c/${credentialId}`,
    verify: `${baseUrl}/verify?id=${credentialId}`,
    portfolio: username ? `${baseUrl}/portfolio/${username}` : null,
  };
};
