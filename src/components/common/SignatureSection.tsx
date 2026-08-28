import React from "react";
import { S } from "../../styles/theme";
import type { Lang } from "../../i18n/translations";

interface SignatureSectionProps {
  signers: any[];
  seal: string;
  lang: Lang;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  signers,
  seal,
  lang,
}) => {
  const primarySigner = signers[signers.length - 1] || {
    name: "Dr. Carmen Rodríguez Vargas",
    title: "Academic Registrar",
  };

  const currentDate = new Date().toLocaleDateString(lang === "en" ? "en-US" : "es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).toUpperCase();

  return (
    <div
      style={{
        ...S.sigSection,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: "36px",
        paddingTop: "20px",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Official Registrar Ink Stamp (Swiss Boxed Stamp matching Option 3) */}
      <div
        style={{
          border: "2px solid #1e3a8a",
          padding: "6px 14px",
          transform: "rotate(-3deg)",
          color: "#1e3a8a",
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
          mixBlendMode: "multiply",
          opacity: 0.9,
          borderRadius: "2px",
          boxShadow: "inset 0 0 0 1px rgba(30, 58, 138, 0.4)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontSize: "8px",
            fontWeight: "800",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderBottom: "1px solid #1e3a8a",
            paddingBottom: "3px",
            marginBottom: "3px",
          }}
        >
          {seal.slice(0, 24) || "WESTERN OREGON UNIVERSITY"}
        </div>
        <div style={{ fontSize: "7px", fontWeight: "700", letterSpacing: "0.08em" }}>
          REGISTRAR'S OFFICE
        </div>
        <div style={{ fontSize: "8.5px", fontWeight: "900", letterSpacing: "0.06em", margin: "2px 0" }}>
          {currentDate}
        </div>
        <div
          style={{
            fontSize: "6.5px",
            fontWeight: "800",
            letterSpacing: "0.14em",
            borderTop: "1px solid #1e3a8a",
            paddingTop: "3px",
            marginTop: "3px",
          }}
        >
          OFFICIAL VERIFICATION
        </div>
      </div>

      {/* Primary Registrar Fountain Pen Signature */}
      <div style={{ textAlign: "center", minWidth: "190px" }}>
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "34px",
            color: "#0f2b5c",
            lineHeight: "0.7",
            marginBottom: "8px",
            transform: "rotate(-3deg)",
            opacity: 0.95,
            userSelect: "none",
          }}
        >
          {primarySigner.name}
        </div>
        <div style={{ borderTop: "1.5px solid #0f172a", margin: "6px 0 4px 0" }} />
        <div
          style={{
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#0f172a",
          }}
        >
          {primarySigner.name}
        </div>
        <div
          style={{
            fontSize: "9.5px",
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {primarySigner.title}
        </div>
      </div>
    </div>
  );
};
