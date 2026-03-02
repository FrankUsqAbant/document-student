import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { t } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface RegistrationReceiptProps {
  data: any;
  institution: any;
  lang: Lang;
}

export const RegistrationReceipt: React.FC<RegistrationReceiptProps> = ({
  data,
  institution,
  lang,
}) => {
  const docCode = CodeService.generate("RRE");
  const totalCred = data.enrolledCourses.reduce(
    (s: number, c: any) => s + parseInt(c.credits || 0),
    0,
  );

  return (
    <div style={S.page}>
      <div style={S.watermark}>{t(lang, "wmRegistration")}</div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>{t(lang, "registrationTitle")}</div>
      <div style={S.metaRow}>
        <span>
          {t(lang, "docNumber")}: <strong>{docCode}</strong>
        </span>
        <span>
          {t(lang, "date")}:{" "}
          <strong>{CodeService.date(data.registrationDate, lang)}</strong>
        </span>
        <span>
          {t(lang, "period")}: <strong>{data.semester}</strong>
        </span>
      </div>

      <div style={S.infoBox}>
        {[
          [t(lang, "student"), data.studentName],
          [t(lang, "studentId"), data.studentId],
          [t(lang, "program"), data.program],
          [t(lang, "level"), data.level],
        ].map(([l, v]) => (
          <span key={l as string} style={{ marginRight: "16px" }}>
            <strong>{l as string}:</strong> {v as string}
          </span>
        ))}
      </div>

      <div style={S.section}>
        <div style={S.sTitle}>{t(lang, "enrolledCoursesTitle")}</div>
        <table style={S.table}>
          <thead>
            <tr>
              {[
                "#",
                t(lang, "courseCode"),
                t(lang, "courseName"),
                t(lang, "credits"),
                t(lang, "section"),
                t(lang, "group"),
                t(lang, "modality"),
                t(lang, "status"),
              ].map((h) => (
                <th key={h as string} style={S.th}>
                  {h as string}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.enrolledCourses.map((c: any, i: number) => (
              <tr key={i}>
                <td style={i % 2 ? S.tdAlt : S.td}>{i + 1}</td>
                <td style={i % 2 ? S.tdAlt : S.td}>{c.code}</td>
                <td style={i % 2 ? S.tdAlt : S.td}>
                  <strong>{c.name}</strong>
                </td>
                <td style={i % 2 ? S.tdAlt : S.td}>{c.credits}</td>
                <td style={i % 2 ? S.tdAlt : S.td}>{c.section}</td>
                <td style={i % 2 ? S.tdAlt : S.td}>{c.group}</td>
                <td style={i % 2 ? S.tdAlt : S.td}>
                  {c.modality || (lang === "en" ? "On-Campus" : "Presencial")}
                </td>
                <td style={i % 2 ? S.tdAlt : S.td}>
                  <span
                    style={{
                      ...S.badge,
                      background: "#d1fae5",
                      color: "#065f46",
                    }}
                  >
                    {lang === "en" ? "✓ Active" : "✓ Activo"}
                  </span>
                </td>
              </tr>
            ))}
            <tr style={S.totalRow}>
              <td
                colSpan={3}
                style={{ ...S.td, color: "#fff", padding: "8px 12px" }}
              >
                <strong>{lang === "en" ? "SUMMARY" : "RESUMEN"}</strong>
              </td>
              <td style={{ ...S.td, color: "#c9a84c", padding: "8px 12px" }}>
                <strong>{totalCred}</strong>
              </td>
              <td
                colSpan={4}
                style={{ ...S.td, color: "#fff", padding: "8px 12px" }}
              >
                {data.enrolledCourses.length}{" "}
                {lang === "en" ? "course(s)" : "curso(s)"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {data.observations && (
        <div
          style={{
            ...S.infoBox,
            background: "#fefce8",
            borderColor: "#fde68a",
            borderLeft: "4px solid #d97706",
          }}
        >
          <strong>{t(lang, "observations")}:</strong> {data.observations}
        </div>
      )}

      <SignatureSection
        signers={[
          {
            name: institution.registrar,
            title: t(lang, "registrarOffice") as string,
          },
          {
            name: data.studentName,
            title: lang === "en" ? "Student" : "Estudiante",
          },
        ]}
        seal={institution.name?.toUpperCase() || "REGISTRAR"}
        lang={lang}
      />
      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
