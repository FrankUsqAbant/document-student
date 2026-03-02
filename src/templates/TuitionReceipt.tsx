import React from "react";
import { S } from "../styles/theme";
import { CodeService } from "../services/codeService";
import { InstitutionHeader } from "../components/common/InstitutionHeader";
import { DocumentFooter } from "../components/common/DocumentFooter";
import { SignatureSection } from "../components/common/SignatureSection";
import { FieldRow } from "../components/common/FieldRow";
import { t } from "../i18n/translations";
import type { Lang } from "../i18n/translations";

interface TuitionReceiptProps {
  data: any;
  institution: any;
  lang: Lang;
}

export const TuitionReceipt: React.FC<TuitionReceiptProps> = ({
  data,
  institution,
  lang,
}) => {
  const docCode = CodeService.generate("RMA");
  const total = data.items.reduce(
    (s: number, i: any) => s + parseFloat(i.amount || 0),
    0,
  );

  return (
    <div style={S.page}>
      <div style={S.watermark}>{t(lang, "wmPaid")}</div>
      <InstitutionHeader institution={institution} lang={lang} />
      <div style={S.docTitle}>{t(lang, "tuitionTitle")}</div>
      <div style={S.metaRow}>
        <span>
          {t(lang, "receiptNo")}: <strong>{docCode}</strong>
        </span>
        <span>
          {t(lang, "period")}: <strong>{data.semester}</strong>
        </span>
        <span>
          {t(lang, "status")}:{" "}
          <span style={{ ...S.badge, background: "#d1fae5", color: "#065f46" }}>
            {t(lang, "statusPaid")}
          </span>
        </span>
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ ...S.infoBox, flex: 1, marginBottom: 0 }}>
          <div
            style={{ fontWeight: "700", marginBottom: "6px", fontSize: "12px" }}
          >
            {t(lang, "studentData")}
          </div>
          {[
            [t(lang, "name"), data.studentName],
            [t(lang, "studentId"), data.studentId],
            [t(lang, "program"), data.program],
            [
              t(lang, "modality"),
              data.modality || (lang === "en" ? "On-Campus" : "Presencial"),
            ],
          ].map(([l, v]) => (
            <FieldRow
              key={l as string}
              label={l as string}
              value={v as string}
            />
          ))}
        </div>
        <div style={{ ...S.infoBox, flex: 1, marginBottom: 0 }}>
          <div
            style={{ fontWeight: "700", marginBottom: "6px", fontSize: "12px" }}
          >
            {t(lang, "paymentData")}
          </div>
          {[
            [t(lang, "paymentDate"), CodeService.date(data.paymentDate, lang)],
            [t(lang, "method"), data.paymentMethod],
            [t(lang, "reference"), data.bankRef || "N/A"],
            [
              t(lang, "cashier"),
              data.cashier || (lang === "en" ? "System" : "Sistema"),
            ],
          ].map(([l, v]) => (
            <FieldRow
              key={l as string}
              label={l as string}
              value={v as string}
            />
          ))}
        </div>
      </div>

      <div style={S.section}>
        <div style={S.sTitle}>{t(lang, "chargesDetail")}</div>
        <table style={S.table}>
          <thead>
            <tr>
              {[
                t(lang, "code"),
                t(lang, "concept"),
                t(lang, "credits"),
                t(lang, "amount"),
              ].map((h) => (
                <th key={h as string} style={S.th}>
                  {h as string}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.items.map((item: any, i: number) => (
              <tr key={i}>
                <td style={i % 2 ? S.tdAlt : S.td}>{item.code}</td>
                <td style={i % 2 ? S.tdAlt : S.td}>{item.concept}</td>
                <td style={i % 2 ? S.tdAlt : S.td}>{item.credits || "—"}</td>
                <td style={{ ...(i % 2 ? S.tdAlt : S.td), textAlign: "right" }}>
                  {CodeService.currency(item.amount, lang)}
                </td>
              </tr>
            ))}
            <tr style={S.totalRow}>
              <td
                colSpan={3}
                style={{ ...S.td, color: "#fff", padding: "10px 12px" }}
              >
                <strong>{t(lang, "totalPaid")}</strong>
              </td>
              <td
                style={{
                  ...S.td,
                  color: "#c9a84c",
                  padding: "10px 12px",
                  textAlign: "right",
                  fontSize: "15px",
                }}
              >
                <strong>{CodeService.currency(total, lang)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          ...S.infoBox,
          background: "#fefce8",
          borderColor: "#fde68a",
          borderLeft: "4px solid #d97706",
        }}
      >
        {t(lang, "tuitionNote")}
      </div>

      <SignatureSection
        signers={[
          {
            name: institution.treasurer,
            title: t(lang, "treasurerOffice") as string,
          },
          {
            name: data.studentName,
            title: t(lang, "studentSignature") as string,
          },
        ]}
        seal={institution.name?.toUpperCase() || "PAYMENT"}
        lang={lang}
      />
      <DocumentFooter docCode={docCode} lang={lang} />
    </div>
  );
};
