import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { Logo } from "../components/common/Logo";
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
  const studentPhoto = data.photo || "./assets/student_portrait.webp";

  return (
    <div style={S.page}>
      <div style={S.securityBorder} />
      <div style={S.watermark}>{t(lang, "wmOriginal")}</div>
      
      {/* Institutional Letterhead */}
      <InstitutionHeader institution={institution} lang={lang} />
      
      <div style={S.docTitle}>
        {lang === "en" 
          ? "Official Student Identification & Credentials Verification" 
          : "Identificación Estudiantil Oficial y Verificación de Credenciales"}
      </div>

      <div style={S.metaRow}>
        <span style={{ whiteSpace: "nowrap" }}>
          {t(lang, "docNumber")}: <strong>{docCode}</strong>
        </span>
        <span style={{ whiteSpace: "nowrap" }}>
          {t(lang, "issueDate")}:{" "}
          <strong>{CodeService.date(data.issueDate, lang)}</strong>
        </span>
        <span style={{ whiteSpace: "nowrap" }}>
          {t(lang, "expiryDate")}:{" "}
          <strong style={{ color: "#991b1b" }}>
            {CodeService.date(data.expiryDate, lang)}
          </strong>
        </span>
      </div>

      {/* ===== REALISTIC CR80 PVC STUDENT ID BADGE ===== */}
      <div style={{
        margin: "24px auto 32px",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        zIndex: 3
      }}>
        <div style={{
          width: "420px",
          height: "260px",
          borderRadius: "14px",
          background: "linear-gradient(145deg, #0d1a33 0%, #081124 100%)",
          color: "#ffffff",
          boxShadow: "0 18px 38px -10px rgba(0, 15, 40, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 1px rgba(255,255,255,0.3)",
          position: "relative",
          overflow: "hidden",
          padding: "16px 20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          {/* Subtle Security Guilloche Background */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 85% 20%, rgba(212, 175, 55, 0.12) 0%, transparent 60%)",
            pointerEvents: "none"
          }} />

          {/* Card Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(212, 175, 55, 0.3)", paddingBottom: "8px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Logo institution={institution} size={28} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "10.5px", fontWeight: "900", letterSpacing: "0.04em", color: "#f8fafc", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "230px" }}>
                  {institution.name.toUpperCase()}
                </div>
                <div style={{ fontSize: "7px", color: "#d4af37", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "230px" }}>
                  {institution.faculty || "OFFICIAL STUDENT CREDENTIAL"}
                </div>
              </div>
            </div>
            <span style={{ fontSize: "8px", fontWeight: "800", background: "rgba(212, 175, 55, 0.2)", color: "#f3e5ab", border: "1px solid rgba(212, 175, 55, 0.4)", padding: "2px 6px", borderRadius: "4px", letterSpacing: "0.05em", flexShrink: 0 }}>
              {institution.countryCode === "pe" ? "SUNEDU VIGENTE" : "ACTIVE"}
            </span>
          </div>

          {/* Card Middle: Photo + EMV Chip + Student Details */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", margin: "6px 0" }}>
            {/* Student Photo with Security Frame */}
            <div style={{
              width: "86px",
              height: "108px",
              borderRadius: "8px",
              overflow: "hidden",
              border: "2px solid #d4af37",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              flexShrink: 0,
              background: "#1e293b",
              position: "relative"
            }}>
              <img 
                src={studentPhoto} 
                alt={data.studentName} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
              <div style={{
                position: "absolute",
                bottom: "2px",
                left: "2px",
                right: "2px",
                fontSize: "6px",
                textAlign: "center",
                background: "rgba(0,0,0,0.6)",
                color: "#e2e8f0",
                letterSpacing: "0.08em",
                borderRadius: "2px"
              }}>
                VALIDATED
              </div>
            </div>

            {/* Information Grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* EMV Smart Chip */}
              <div style={{
                width: "32px",
                height: "24px",
                background: "linear-gradient(135deg, #e6c875 0%, #c9a84c 50%, #997828 100%)",
                borderRadius: "4px",
                border: "1px solid #7c621d",
                marginBottom: "8px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)"
              }}>
                <div style={{ width: "18px", height: "12px", border: "1px solid rgba(0,0,0,0.3)", borderRadius: "2px" }} />
              </div>

              <div style={{ fontSize: "13.5px", fontWeight: "800", letterSpacing: "0.02em", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Inter', sans-serif" }}>
                {data.studentName}
              </div>

              <div style={{ fontSize: "9px", color: "#94a3b8", marginTop: "2px", fontFamily: "'JetBrains Mono', monospace" }}>
                {institution.countryCode === "pe" ? "CÓDIGO / DNI" : institution.countryCode === "in" ? "ROLL NO" : "STUDENT ID"}:{" "}
                <span style={{ color: "#d4af37", fontWeight: "700" }}>{data.studentId}</span>
              </div>

              <div style={{ fontSize: "8.5px", color: "#cbd5e1", marginTop: "3px" }}>
                <strong>PROGRAM:</strong> {data.program}
              </div>

              <div style={{ fontSize: "8px", color: "#94a3b8", marginTop: "2px" }}>
                CLASS OF {data.entryYear ? parseInt(data.entryYear) + 4 : "2027"} · {data.level || "Undergraduate"}
              </div>
            </div>
          </div>

          {/* Card Footer: Barcode & Security Strip */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "6px" }}>
            <div style={{ fontFamily: "'Libre Barcode 39', cursive", fontSize: "28px", lineHeight: "0.8", color: "#ffffff", letterSpacing: "2px" }}>
              *{data.studentId}*
            </div>
            <div style={{ fontSize: "7px", color: "#94a3b8", textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>
              EXP: {data.expiryDate} · NFC ENABLED
            </div>
          </div>
        </div>
      </div>

      {/* Official Issuance Record Details Table */}
      <div style={S.section}>
        <div style={S.sTitle}>
          {lang === "en" ? "Official Enrollment Record Details" : "Detalles del Registro Oficial de Matrícula"}
        </div>
        {[
          [t(lang, "fullName"), data.studentName],
          [t(lang, "nationalId"), data.nationalId],
          [t(lang, "studentId"), data.studentId],
          [t(lang, "academicProgram"), data.program],
          [t(lang, "level"), data.level],
          [t(lang, "entryYear"), data.entryYear],
          [lang === "en" ? "Academic Standing" : "Condición Académica", data.academicStatus || (lang === "en" ? "Good Standing / Active" : "Regular / Activo")],
        ].map(([label, val]) => (
          <FieldRow
            key={label as string}
            label={label as string}
            value={val as string}
          />
        ))}
      </div>

      <div style={S.infoBox}>
        <strong>{lang === "en" ? "Legal Verification Notice" : "Aviso Legal de Verificación"}:</strong>{" "}
        {lang === "en"
          ? `This document and the associated credential serve as official verification of active enrollment at ${institution.name}. Any alteration or unauthorized reproduction voids this certificate.`
          : `Este documento y la credencial asociada certifican la matrícula activa en ${institution.name}. Cualquier alteración o reproducción no autorizada anula este certificado.`}
      </div>

      {/* Signature & Official Seal Section */}
      <SignatureSection
        signers={[
          {
            name: data.studentName,
            title: lang === "en" ? "Student Cardholder" : "Estudiante Titular",
          },
          {
            name: institution.registrar,
            title: institution.countryCode === "pe" ? "Secretaría General" : (t(lang, "registrarOffice") as string),
          },
        ]}
        seal={institution.name?.toUpperCase() || "WESTERN OREGON UNIVERSITY"}
        institution={institution}
        lang={lang}
      />

      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
