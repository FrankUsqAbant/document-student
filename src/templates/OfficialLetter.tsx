import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { FieldRow } from "../components/common/FieldRow";
import { ZebraRow } from "../components/common/ZebraRow";
import { t } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface OfficialLetterProps {
  data: any;
  institution: any;
  lang: Lang;
}

export const OfficialLetter: React.FC<OfficialLetterProps> = ({
  data,
  institution,
  lang,
}) => {
  const docCode = CodeService.generate("CAR");
  return (
    <div style={S.page}>
      <div style={S.watermark}>{t(lang, "wmLetter")}</div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>{t(lang, "officialLetterTitle")}</div>
      <div style={S.metaRow}>
        <span>
          {t(lang, "reference")}: <strong>{docCode}</strong>
        </span>
        <span>
          {t(lang, "date")}: <strong>{CodeService.now(lang)}</strong>
        </span>
        <span>
          {t(lang, "category")}:{" "}
          <strong>
            {data.category ||
              (lang === "en"
                ? "Official Communication"
                : "Comunicación Oficial")}
          </strong>
        </span>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <FieldRow
          label={lang === "en" ? "To" : "Señor(a)"}
          value={<strong key="r">{data.recipientName}</strong>}
        />
        <FieldRow
          label={lang === "en" ? "Title / Organization" : "Cargo / Institución"}
          value={data.recipientTitle}
        />
        <FieldRow
          label={lang === "en" ? "Salutation" : "Estimado(a)"}
          value={data.salutation}
        />
      </div>

      <div
        style={{
          ...S.infoBox,
          background: "#1a1a2e",
          color: "#fff",
          border: "none",
        }}
      >
        <strong style={{ color: "#c9a84c" }}>
          {lang === "en" ? "SUBJECT:" : "ASUNTO:"}
        </strong>{" "}
        {data.subject}
      </div>

      <div style={S.section}>
        <div style={S.sTitle}>
          {lang === "en" ? "Letter Body" : "Cuerpo de la Comunicación"}
        </div>
        {data.body
          .split("\n")
          .filter((p: string) => p.trim())
          .map((p: string, i: number) => (
            <p
              key={i}
              style={{
                textAlign: "justify",
                marginBottom: "14px",
                textIndent: "2em",
              }}
            >
              {p}
            </p>
          ))}
      </div>

      {data.attachments?.length > 0 && (
        <div style={S.section}>
          <div style={S.sTitle}>{t(lang, "attachments")}</div>
          <table style={S.table}>
            <thead>
              <tr>
                {[
                  "#",
                  t(lang, "attachmentDesc") as string,
                  t(lang, "pages") as string,
                ].map((h) => (
                  <th key={h} style={S.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.attachments.map((a: any, i: number) => (
                <ZebraRow
                  key={i}
                  index={i}
                  cells={[i + 1, a.description, a.pages || 1]}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ marginTop: "24px" }}>
        {lang === "en" ? "Sincerely," : "Atentamente,"}
      </p>
      <p style={{ fontStyle: "italic", color: "#666", fontSize: "12px" }}>
        {institution.city}, {CodeService.now(lang)}
      </p>

      <SignatureSection
        signers={[
          {
            name: data.senderName || institution.rector,
            title:
              data.senderTitle ||
              (lang === "en" ? "Office of the Provost" : "Rectoría"),
          },
          {
            name:
              lang === "en"
                ? "Institutional Secretary"
                : "Secretaría Institucional",
            title: lang === "en" ? "Approved" : "Visto Bueno",
          },
        ]}
        seal={institution.name?.toUpperCase() || "OFFICIAL"}
        lang={lang}
      />
      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
