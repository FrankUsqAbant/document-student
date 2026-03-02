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
        {/* Authentic cursive signature */}
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "28px",
            color: "#0a192f", // Deep blue ink color
            lineHeight: "0.5",
            marginBottom: "5px",
            transform: "rotate(-3deg)", // Slight natural slant
            opacity: 0.9,
          }}
        >
          {s.name}
        </div>
        <div style={S.sigLine} />
        <div
          style={{
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {s.name}
        </div>
        <div style={S.sigLabel}>{s.title}</div>
      </div>
    ))}

    {/* Authentic overlapping seal */}
    <div
      style={{
        ...S.seal,
        border: "2px solid rgba(26,26,46,0.3)",
        background: "transparent",
        boxShadow: "none",
        position: "absolute",
        right: "40px",
        top: "-10px",
        opacity: 0.8,
        mixBlendMode: "multiply", // Makes it look like real stamped ink
        transform: "rotate(15deg)",
      }}
    >
      <div
        style={{
          border: "1px dashed rgba(26,26,46,0.5)",
          borderRadius: "50%",
          width: "80%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "8px",
            fontWeight: "800",
            letterSpacing: "0.1em",
            color: "rgba(26,26,46,0.7)",
            lineHeight: "1.2",
            textAlign: "center",
          }}
        >
          {seal}
        </div>
        <div
          style={{
            fontSize: "6px",
            fontWeight: "700",
            color: "rgba(26,26,46,0.5)",
            letterSpacing: "0.1em",
            marginTop: "2px",
          }}
        >
          {t(lang, "officialSeal")}
        </div>
      </div>
    </div>
  </div>
);
