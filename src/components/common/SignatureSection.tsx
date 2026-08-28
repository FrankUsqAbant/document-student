import React from "react";
import { S } from "../../styles/theme";
import { t } from "../../i18n/translations";
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
}) => (
  <div style={S.sigSection}>
    {signers.map((s, i) => (
      <div key={i} style={{ ...S.sigBlock, position: "relative" }}>
        {/* Authentic fountain pen cursive signature */}
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "32px",
            color: "#0f2b5c", // Authentic registrar blue fountain ink
            lineHeight: "0.6",
            marginBottom: "8px",
            transform: i % 2 === 0 ? "rotate(-4deg)" : "rotate(2deg)",
            opacity: 0.94,
            filter: "drop-shadow(0px 1px 0px rgba(15, 43, 92, 0.2))",
            userSelect: "none",
          }}
        >
          {s.name}
        </div>
        <div style={S.sigLine} />
        <div
          style={{
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#0f172a",
          }}
        >
          {s.name}
        </div>
        <div style={S.sigLabel}>{s.title}</div>
      </div>
    ))}

    {/* Authentic Official University Registrar Red Stamp */}
    <div
      style={{
        width: "112px",
        height: "112px",
        borderRadius: "50%",
        border: "2.5px solid #a82020",
        position: "absolute",
        right: "32px",
        top: "-16px",
        transform: "rotate(-8deg)",
        mixBlendMode: "multiply",
        opacity: 0.88,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        userSelect: "none",
        boxShadow: "inset 0 0 0 1px rgba(168, 32, 32, 0.4)",
      }}
    >
      <div
        style={{
          border: "1.5px dashed #a82020",
          borderRadius: "50%",
          width: "88%",
          height: "88%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
          textAlign: "center",
          color: "#a82020",
        }}
      >
        <div style={{ fontSize: "7px", fontWeight: "900", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          ★ {seal.slice(0, 20)} ★
        </div>
        <div style={{ fontSize: "6.5px", fontWeight: "800", letterSpacing: "0.08em", margin: "2px 0", color: "#8a1515" }}>
          OFFICE OF THE REGISTRAR
        </div>
        <div style={{ fontSize: "7.5px", fontWeight: "900", letterSpacing: "0.05em", color: "#a82020" }}>
          {new Date().getFullYear()} · VERIFIED
        </div>
        <div style={{ fontSize: "5.5px", fontWeight: "700", letterSpacing: "0.12em", marginTop: "1px", textTransform: "uppercase" }}>
          {t(lang, "officialSeal")}
        </div>
      </div>
    </div>
  </div>
);
