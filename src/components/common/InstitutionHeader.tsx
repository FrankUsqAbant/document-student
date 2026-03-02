import React from "react";
import { S } from "../../styles/theme";
import { CodeService } from "../../services/codeService";
import { Logo } from "./Logo";
import { t } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";

interface InstitutionHeaderProps {
  institution: any;
  lang: Lang;
}

export const InstitutionHeader: React.FC<InstitutionHeaderProps> = ({
  institution,
  lang,
}) => (
  <div style={S.header}>
    <div style={S.logoBox}>
      <Logo src={institution.logo} />
    </div>
    <div style={S.instBlock}>
      <p style={S.instName}>{institution.name}</p>
      <p style={S.instSub}>
        {institution.faculty} — {institution.department}
      </p>
      <p style={S.instSub}>
        {institution.address} | {institution.phone} | {institution.email}
      </p>
    </div>
    <div
      style={{
        textAlign: "right",
        fontSize: "10px",
        color: "#888",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div style={{ fontWeight: "700", fontSize: "11px", color: "#1a1a2e" }}>
        {t(lang, "accreditedBy")}
      </div>
      <div>
        {t(lang, "institutionalCode")}: {institution.code}
      </div>
      <div>
        {t(lang, "issueDateLabel")}: {CodeService.now(lang)}
      </div>
      {/* 1D Barcode for Automated Parsing */}
      <div
        style={{
          fontFamily: "'Libre Barcode 39', cursive",
          fontSize: "32px",
          color: "#1a1a2e",
          marginTop: "4px",
          lineHeight: "0.8",
        }}
      >
        *{institution.code}*
      </div>
    </div>
  </div>
);
