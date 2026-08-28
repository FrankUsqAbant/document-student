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
      <div style={S.securityBorder} />
      <div style={S.watermark}>
        {lang === "en" ? "CERTIFIED" : "CERTIFICADO"}
      </div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>
        {institution.countryCode === "pe"
          ? "CONSTANCIA OFICIAL DE MATRÍCULA (VIGENCIA SUNEDU)"
          : institution.countryCode === "ca"
          ? "OFFICIAL CONFIRMATION OF ENROLMENT (IRCC COMPLIANT)"
          : institution.countryCode === "in"
          ? "BONAFIDE STUDENT CERTIFICATE & ENROLMENT STATUS"
          : (lang === "en" ? "OFFICIAL ENROLLMENT VERIFICATION" : "CONSTANCIA DE MATRÍCULA")}
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
          {institution.countryCode === "pe" ? (
            <>
              La Secretaría General y la Dirección de Registro Académico de la <strong>{institution.name}</strong>, institución universitaria licenciada por la <strong>Superintendencia Nacional de Educación Superior Universitaria (SUNEDU)</strong> mediante Resolución N° 126-2018-SUNEDU/CD, hace constar que el(la) estudiante <strong>{data.studentName}</strong>, identificado(a) con DNI/Código <strong>{data.studentId}</strong>, se encuentra debidamente matriculado(a) y con matrícula vigente para el período académico <strong>{data.semester}</strong>.
            </>
          ) : institution.countryCode === "ca" ? (
            <>
              The Office of the Registrar at <strong>{institution.name}</strong>, a Designated Learning Institution recognized under British Columbia legislation and Immigration, Refugees and Citizenship Canada (IRCC DLI #O19279164102), hereby certifies that <strong>{data.studentName}</strong>, Student ID <strong>{data.studentId}</strong>, is enrolled in active standing for the <strong>{data.semester}</strong> academic term.
            </>
          ) : institution.countryCode === "in" ? (
            <>
              The Academic Regulations and Records Division of <strong>{institution.name}</strong>, declared as an Institution of Eminence under Section 3 of the UGC Act, 1956, hereby certifies that <strong>{data.studentName}</strong>, Roll No. / BITS ID <strong>{data.studentId}</strong>, is a bonafide student enrolled for the <strong>{data.semester}</strong> academic session.
            </>
          ) : (
            <>
              The Office of the Registrar of <strong>{institution.name}</strong>, accredited by the Northwest Commission on Colleges and Universities (NWCCU), hereby certifies that <strong>{data.studentName}</strong>, bearing Student ID <strong>{data.studentId}</strong>, is officially enrolled as a <strong>{data.enrollmentStatus || "full-time"}</strong> student for the <strong>{data.semester}</strong> academic period.
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
        institution={institution}
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
