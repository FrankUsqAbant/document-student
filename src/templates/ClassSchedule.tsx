import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { ZebraRow } from "../components/common/ZebraRow";
import { t } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface ClassScheduleProps {
  data: any;
  institution: any;
  lang: Lang;
}

export const ClassSchedule: React.FC<ClassScheduleProps> = ({
  data,
  institution,
  lang,
}) => {
  const docCode = CodeService.generate("CRO");
  const DAYS = t(lang, "days") as string[];
  const SLOTS = [
    "07:00–09:00",
    "09:00–11:00",
    "11:00–13:00",
    "13:00–15:00",
    "15:00–17:00",
    "17:00–19:00",
  ];

  return (
    <div style={S.page}>
      <div style={S.watermark}>{t(lang, "wmSchedule")}</div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>{t(lang, "scheduleTitle")}</div>
      <div style={S.metaRow}>
        <span>
          {t(lang, "docNumber")}: <strong>{docCode}</strong>
        </span>
        <span>
          {t(lang, "period")}:{" "}
          <strong>
            {data.semester} — {data.academicYear}
          </strong>
        </span>
        <span>
          {t(lang, "modality")}:{" "}
          <strong>
            {data.modality || (lang === "en" ? "On-Campus" : "Presencial")}
          </strong>
        </span>
      </div>

      <div style={S.infoBox}>
        <strong>{t(lang, "student")}:</strong> {data.studentName} &nbsp;|&nbsp;
        <strong>{t(lang, "studentId")}:</strong> {data.studentId} &nbsp;|&nbsp;
        <strong>{t(lang, "program")}:</strong> {data.program}
      </div>

      <div style={S.section}>
        <div style={S.sTitle}>{t(lang, "enrolledCourses")}</div>
        <table style={S.table}>
          <thead>
            <tr>
              {[
                t(lang, "courseCode"),
                t(lang, "courseName"),
                t(lang, "credits"),
                t(lang, "section"),
                t(lang, "classroom"),
                t(lang, "professor"),
              ].map((h) => (
                <th key={h as string} style={S.th}>
                  {h as string}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.courses.map((c: any, i: number) => (
              <ZebraRow
                key={i}
                index={i}
                cells={[
                  c.code,
                  <strong key="n">{c.name}</strong>,
                  c.credits,
                  c.section,
                  c.classroom,
                  c.professor,
                ]}
              />
            ))}
            <tr style={S.totalRow}>
              <td
                colSpan={2}
                style={{ ...S.td, color: "#fff", padding: "8px 12px" }}
              >
                <strong>{t(lang, "totalCredits")}</strong>
              </td>
              <td
                colSpan={4}
                style={{ ...S.td, color: "#c9a84c", padding: "8px 12px" }}
              >
                <strong>
                  {data.courses.reduce(
                    (s: number, c: any) => s + parseInt(c.credits || 0),
                    0,
                  )}{" "}
                  {t(lang, "creditsLabel")}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={S.section}>
        <div style={S.sTitle}>{t(lang, "weeklySchedule")}</div>
        <table style={{ ...S.table, fontSize: "11px" }}>
          <thead>
            <tr>
              <th style={{ ...S.th, width: "100px" }}>{t(lang, "time")}</th>
              {DAYS.map((d) => (
                <th key={d} style={S.th}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, hi) => (
              <tr key={hi}>
                <td
                  style={{
                    ...S.td,
                    fontWeight: "700",
                    fontSize: "9px",
                    background: "#f0f4ff",
                    padding: "10px 4px",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {slot}
                </td>
                {DAYS.map((day, di) => {
                  const dayMapping: Record<string, string> = {
                    Monday: "Monday",
                    Tuesday: "Tuesday",
                    Wednesday: "Wednesday",
                    Thursday: "Thursday",
                    Friday: "Friday",
                    Saturday: "Saturday",
                    Lunes: "Monday",
                    Martes: "Tuesday",
                    Miércoles: "Wednesday",
                    Jueves: "Thursday",
                    Viernes: "Friday",
                    Sábado: "Saturday",
                  };
                  const c = data.courses.find((x: any) => {
                    const normalizedDay = dayMapping[x.day] || x.day;
                    const normalizedCurrentDay = dayMapping[day] || day;
                    return (
                      normalizedDay === normalizedCurrentDay &&
                      x.timeSlot === hi
                    );
                  });
                  return (
                    <td
                      key={di}
                      style={{
                        ...S.td,
                        background: c ? "#dbeafe" : hi % 2 ? "#f8f8fb" : "#fff",
                        fontSize: "10px",
                        padding: "8px 6px",
                        lineHeight: "1.4",
                        verticalAlign: "top",
                      }}
                    >
                      {c ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <strong
                            style={{ fontSize: "11px", color: "#1e293b" }}
                          >
                            {c.code}
                          </strong>
                          <span style={{ color: "#475569" }}>
                            {c.classroom}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SignatureSection
        signers={[
          {
            name: institution.registrar,
            title: t(lang, "registrarOffice") as string,
          },
          {
            name:
              lang === "en"
                ? "Academic Coordination"
                : "Coordinación Académica",
            title: t(lang, "academicDept") as string,
          },
        ]}
        seal={institution.name?.toUpperCase() || "SCHEDULE"}
        lang={lang}
      />
      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
