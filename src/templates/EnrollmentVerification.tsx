import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { t } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface EnrollmentVerificationProps {
  data: any;
  institution: any;
  lang: Lang;
}

export const EnrollmentVerification: React.FC<EnrollmentVerificationProps> = ({
  data,
  institution,
  lang,
}) => {
  const docCode = CodeService.generate("ENV");

  return (
    <div style={S.page}>
      <div style={S.watermark}>
        {lang === "en" ? "CERTIFIED" : "CERTIFICADO"}
      </div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>
        {lang === "en"
          ? "ENROLLMENT VERIFICATION"
          : "COMPROBANTE DE INSCRIPCIÓN"}
      </div>
      <div style={S.metaRow}>
        <span>
          {t(lang, "docNumber")}: <strong>{docCode}</strong>
        </span>
        <span>
          {lang === "en" ? "Date Issued" : "Fecha de Emisión"}:{" "}
          <strong>{CodeService.now(lang)}</strong>
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          marginTop: "20px",
          lineHeight: "1.8",
          fontSize: "13px",
          textAlign: "justify",
        }}
      >
        <p style={{ textIndent: "40px", margin: "0 0 12px 0" }}>
          {lang === "en" ? (
            <>
              The Office of the Registrar of <strong>{institution.name}</strong>{" "}
              hereby certifies that <strong>{data.studentName}</strong>, bearing
              Student ID <strong>{data.studentId}</strong>, is officially
              enrolled as a{" "}
              <strong>{data.enrollmentStatus || "full-time"}</strong> student
              for the <strong>{data.semester}</strong> academic period.
            </>
          ) : (
            <>
              La Oficina de Registro de <strong>{institution.name}</strong>{" "}
              certifica que <strong>{data.studentName}</strong>, con Carné
              Estudiantil <strong>{data.studentId}</strong>, se encuentra
              debidamente inscrito(a) como estudiante{" "}
              <strong>
                {data.enrollmentStatus === "full-time"
                  ? "a tiempo completo"
                  : data.enrollmentStatus === "part-time"
                    ? "a medio tiempo"
                    : "a tiempo completo"}
              </strong>{" "}
              para el período académico <strong>{data.semester}</strong>.
            </>
          )}
        </p>
      </div>

      {/* Student Details Table */}
      <div style={S.section}>
        <div style={S.sTitle}>
          {lang === "en" ? "Student Details" : "Datos del Estudiante"}
        </div>
        <table style={S.table}>
          <tbody>
            {[
              [t(lang, "fullName"), data.studentName],
              [t(lang, "studentId"), data.studentId],
              [t(lang, "academicProgram"), data.program],
              [
                t(lang, "level"),
                data.level || (lang === "en" ? "Undergraduate" : "Pregrado"),
              ],
              [
                lang === "en" ? "Classification" : "Clasificación",
                data.classification || "Junior",
              ],
              [
                lang === "en" ? "Enrollment Status" : "Estado de Inscripción",
                data.enrollmentStatus === "part-time"
                  ? lang === "en"
                    ? "Part-Time"
                    : "Medio Tiempo"
                  : lang === "en"
                    ? "Full-Time"
                    : "Tiempo Completo",
              ],
              [
                lang === "en" ? "Credit Hours Enrolled" : "Créditos Inscritos",
                data.creditHours || "15",
              ],
              [
                lang === "en" ? "Academic Period" : "Período Académico",
                data.semester,
              ],
              [
                lang === "en" ? "Academic Standing" : "Situación Académica",
                data.academicStanding ||
                  (lang === "en" ? "Good Standing" : "Regular"),
              ],
            ].map(([label, value], i) => (
              <tr key={i}>
                <td
                  style={{
                    ...(i % 2 ? S.tdAlt : S.td),
                    fontWeight: "700",
                    width: "40%",
                  }}
                >
                  {label as string}:
                </td>
                <td style={i % 2 ? S.tdAlt : S.td}>{value as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Purpose */}
      <div
        style={{
          marginTop: "16px",
          fontSize: "12px",
          lineHeight: "1.6",
          color: "#555",
          fontStyle: "italic",
          textAlign: "justify",
        }}
      >
        {lang === "en"
          ? "This verification is issued at the request of the student and is valid for the academic period indicated above. It does not constitute proof of degree completion. For questions regarding this document, please contact the Office of the Registrar."
          : "Este comprobante se expide a solicitud del interesado y es válido para el período académico indicado. No constituye constancia de egreso ni de graduación. Para consultas sobre este documento, favor comunicarse con la Oficina de Registro."}
      </div>

      <p style={{ marginTop: "24px", fontSize: "13px" }}>
        {lang === "en" ? "Sincerely," : "Atentamente,"}
      </p>
      <p style={{ fontStyle: "italic", color: "#666", fontSize: "12px" }}>
        {institution.city}, {CodeService.now(lang)}
      </p>

      <SignatureSection
        signers={[
          {
            name: institution.registrar,
            title: t(lang, "registrarOffice") as string,
          },
          {
            name:
              lang === "en"
                ? "Institutional Secretary"
                : "Secretaría Institucional",
            title: lang === "en" ? "Verified" : "Verificado",
          },
        ]}
        seal={institution.name?.toUpperCase() || "OFFICIAL"}
        lang={lang}
      />

      {/* Security Features */}
      <div style={S.securityBorder} />
      <div style={{ ...S.microPrint, bottom: "4px", left: "10px" }}>
        {lang === "en"
          ? "SECURITY FEATURES INCLUDE MICROPRINTING, WATERMARK, AND BARCODE. VOID IF ALTERED. "
          : "CARACTERÍSTICAS DE SEGURIDAD INCLUYEN MICROIMPRESIÓN Y MARCA DE AGUA. NULO SI ES ALTERADO. "}
        {lang === "en"
          ? "THIS DATA HAS BEEN VERIFIED THROUGH THE NATIONAL STUDENT CLEARINGHOUSE (NSC) DEGREEVERIFY/ENROLLMENTVERIFY SYSTEM."
          : "ESTOS DATOS HAN SIDO VERIFICADOS MEDIANTE SISTEMAS OFICIALES DE REGISTRO ESTUDIANTIL."}
      </div>

      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
