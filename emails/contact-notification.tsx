import { siteConfig } from "@/config/site";
import * as React from "react";

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const styles = {
  container: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f8fafc",
    padding: "40px 20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center" as const,
    marginBottom: "16px",
  },
  infoBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "24px",
  },
  infoLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "4px",
  },
  infoValue: {
    fontSize: "16px",
    color: "#1e293b",
    wordBreak: "break-word" as const,
    lineHeight: "1.6",
  },
  messageBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "16px",
    marginTop: "12px",
    whiteSpace: "pre-wrap" as const,
  },
  link: {
    color: "#3b82f6",
    textDecoration: "underline",
  },
  footer: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #e2e8f0",
  },
  footerText: {
    fontSize: "12px",
    color: "#94a3b8",
    textAlign: "center" as const,
  },
};

export const ContactNotificationEmail: React.FC<
  Readonly<ContactNotificationEmailProps>
> = ({ name, email, phone, subject, message, submittedAt }) => (
  <div style={styles.container}>
    <div style={styles.card}>
      <h1 style={styles.headerTitle}>New Contact Form Submission</h1>

      <div style={styles.infoBox}>
        <div style={{ marginBottom: "16px" }}>
          <p style={styles.infoLabel}>Name</p>
          <p style={styles.infoValue}>{name}</p>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <p style={styles.infoLabel}>Email</p>
          <p style={styles.infoValue}>
            <a href={`mailto:${email}`} style={styles.link}>
              {email}
            </a>
          </p>
        </div>
        {phone ? (
          <div style={{ marginBottom: "16px" }}>
            <p style={styles.infoLabel}>Phone</p>
            <p style={styles.infoValue}>{phone}</p>
          </div>
        ) : null}
        <div style={{ marginBottom: "16px" }}>
          <p style={styles.infoLabel}>Subject</p>
          <p style={styles.infoValue}>{subject}</p>
        </div>
        <div>
          <p style={styles.infoLabel}>Message</p>
          <div style={styles.messageBox}>
            <p style={styles.infoValue}>{message}</p>
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <p style={styles.infoLabel}>Submitted At</p>
          <p style={styles.infoValue}>{submittedAt}</p>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          This is an automated notification from {siteConfig.name}.
        </p>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

export default ContactNotificationEmail;
