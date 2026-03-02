import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { FieldRow } from "../components/common/FieldRow";
import { t } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface StudentCardProps {
  data: any;
  institution: any;
  lang: Lang;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  data,
  institution,
  lang,
}) => {
  const docCode = CodeService.generate("TID");
  return (
    <div style={S.page}>
      <div style={S.watermark}>{t(lang, "wmOriginal")}</div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>{t(lang, "studentCardTitle")}</div>
      <div style={S.metaRow}>
        <span>
          {t(lang, "docNumber")}: <strong>{docCode}</strong>
        </span>
        <span>
          {t(lang, "issueDate")}:{" "}
          <strong>{CodeService.date(data.issueDate, lang)}</strong>
        </span>
        <span>
          {t(lang, "expiryDate")}:{" "}
          <strong style={{ color: "#991b1b" }}>
            {CodeService.date(data.expiryDate, lang)}
          </strong>
        </span>
      </div>

      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ flex: 1 }}>
          <div style={S.section}>
            <div style={S.sTitle}>{t(lang, "studentDataTitle")}</div>
            {[
              [t(lang, "fullName"), data.studentName],
              [t(lang, "nationalId"), data.nationalId],
              [t(lang, "studentId"), data.studentId],
              [t(lang, "academicProgram"), data.program],
              [t(lang, "level"), data.level],
              [t(lang, "entryYear"), data.entryYear],
            ].map(([label, val]) => (
              <FieldRow
                key={label as string}
                label={label as string}
                value={val as string}
              />
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              width: "110px",
              height: "140px",
              border: "2px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              background: "#f8f8fb",
              fontSize: "10px",
              color: "#aaa",
              borderRadius: "4px",
            }}
          >
            <div style={{ fontSize: "36px" }}>👤</div>
            <div style={{ marginTop: "6px" }}>{t(lang, "studentPhoto")}</div>
            <div>{t(lang, "photo")}</div>
          </div>
          <div
            style={{
              marginTop: "8px",
              background: "#1a1a2e",
              color: "#fff",
              padding: "4px 8px",
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "700",
              borderRadius: "2px",
              letterSpacing: "0.1em",
            }}
          >
            {data.studentId}
          </div>
        </div>
      </div>

      <div style={S.infoBox}>
        <strong>{t(lang, "condition")}:</strong>{" "}
        {data.academicStatus || (lang === "en" ? "Active" : "Activo(a)")}
      </div>

      <SignatureSection
        signers={[
          {
            name: data.studentName,
            title: lang === "en" ? "Student" : "Estudiante",
          },
          {
            name: institution.registrar,
            title: t(lang, "registrarOffice") as string,
          },
        ]}
        seal={institution.name?.toUpperCase() || "REGISTRAR"}
        lang={lang}
      />
      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
