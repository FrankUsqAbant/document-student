import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { GradeService } from "../services/gradeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { t } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface AcademicTranscriptProps {
  data: any;
  institution: any;
  lang: Lang;
}

export const AcademicTranscript: React.FC<AcademicTranscriptProps> = ({
  data,
  institution,
  lang,
}) => {
  const docCode = CodeService.generate("TRN");

  // Calculate cumulative GPA across all semesters
  const allCourses = (data.semesters || []).flatMap((s: any) => s.courses);
  const cumulativeGPA = GradeService.gpa(allCourses);
  const totalCredits = GradeService.totalCredits(data.semesters || []);

  return (
    <div style={S.page}>
      <div style={S.watermark}>{t(lang, "wmTranscript")}</div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>{t(lang, "transcriptTitle")}</div>
      <div style={S.metaRow}>
        <span>
          {t(lang, "docNumber")}: <strong>{docCode}</strong>
        </span>
        <span>
          {lang === "en" ? "Date Issued" : "Fecha de emisión"}:{" "}
          <strong>{CodeService.now(lang)}</strong>
        </span>
        <span>
          {t(lang, "graduationDate")}:{" "}
          <strong>
            {data.graduationDate ||
              (lang === "en" ? "In progress" : "En curso")}
          </strong>
        </span>
      </div>

      <div style={S.infoBox}>
        {[
          [t(lang, "student"), data.studentName],
          [t(lang, "studentId"), data.studentId],
          [t(lang, "nationalId"), data.nationalId],
          [t(lang, "program"), data.program],
          [
            t(lang, "level"),
            data.level || (lang === "en" ? "Undergraduate" : "Pregrado"),
          ],
          [
            t(lang, "academicStanding"),
            data.status || (lang === "en" ? "Good Standing" : "Regular"),
          ],
        ].map(([l, v]) => (
          <span key={l as string} style={{ marginRight: "16px" }}>
            <strong>{l as string}:</strong> {v as string}
          </span>
        ))}
      </div>

      {(data.semesters || []).map((sem: any, si: number) => {
        const semGPA = GradeService.gpa(sem.courses);
        const semCredits = GradeService.semesterCredits(sem.courses);
        return (
          <div key={si} style={S.section}>
            <div style={S.sTitle}>
              {sem.label} — {sem.year}
            </div>
            <table style={S.table}>
              <thead>
                <tr>
                  {[
                    t(lang, "courseCode"),
                    t(lang, "courseName"),
                    t(lang, "credits"),
                    t(lang, "grade"),
                    t(lang, "letterGrade"),
                  ].map((h) => (
                    <th key={h as string} style={S.th}>
                      {h as string}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sem.courses.map((c: any, i: number) => (
                  <tr key={i}>
                    <td style={i % 2 ? S.tdAlt : S.td}>{c.code}</td>
                    <td style={i % 2 ? S.tdAlt : S.td}>{c.name}</td>
                    <td style={i % 2 ? S.tdAlt : S.td}>{c.credits}</td>
                    <td
                      style={{ ...(i % 2 ? S.tdAlt : S.td), fontWeight: "700" }}
                    >
                      {Number(c.grade).toFixed(2)}
                    </td>
                    <td style={i % 2 ? S.tdAlt : S.td}>
                      {c.letterGrade || "—"}
                    </td>
                  </tr>
                ))}
                <tr
                  style={{
                    background: "#e8ecf7",
                    fontWeight: "700",
                    fontSize: "11px",
                  }}
                >
                  <td colSpan={2} style={{ ...S.td, padding: "7px 12px" }}>
                    {t(lang, "semesterGPA")}
                  </td>
                  <td style={{ ...S.td, padding: "7px 12px" }}>{semCredits}</td>
                  <td style={{ ...S.td, padding: "7px 12px" }}>{semGPA}</td>
                  <td style={{ ...S.td, padding: "7px 12px" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}

      <div
        style={{
          ...S.infoBox,
          background: "#1a1a2e",
          color: "#fff",
          border: "none",
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          <strong>{t(lang, "cumulativeGPA")}:</strong>{" "}
          <span style={{ color: "#c9a84c", fontSize: "16px" }}>
            {cumulativeGPA}
          </span>{" "}
          / 4.00
        </span>
        <span>
          <strong>{t(lang, "totalCreditsEarned")}:</strong> {totalCredits}
        </span>
        <span>
          <strong>{t(lang, "academicStanding")}:</strong>{" "}
          {data.status || (lang === "en" ? "Good Standing" : "Regular")}
        </span>
      </div>

      <SignatureSection
        signers={[
          {
            name: institution.registrar,
            title: t(lang, "registrarOffice") as string,
          },
          {
            name: lang === "en" ? "Academic Secretary" : "Secretaría Académica",
            title:
              lang === "en"
                ? "Institutional Secretary"
                : "Secretaría Institucional",
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
          ? "FERPA RELEASE: IN ACCORDANCE WITH THE FAMILY EDUCATIONAL RIGHTS AND PRIVACY ACT OF 1974, THIS RECORD CANNOT BE RELEASED TO A THIRD PARTY WITHOUT WRITTEN CONSENT OF THE STUDENT."
          : "LEY FERPA: ESTE REGISTRO NO PUEDE SER COMPARTIDO CON TERCEROS SIN CONSENTIMIENTO ESCRITO DEL ESTUDIANTE."}
      </div>

      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
