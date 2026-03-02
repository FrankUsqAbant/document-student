import React from "react";
import { S } from "../../styles/theme";
import { FormField } from "./FormField";
import { t } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";

interface DynamicFormProps {
  activeDoc: string;
  data: any;
  instData: any;
  lang: Lang;
  onChange: (newData: any) => void;
  onInstChange: (newInst: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  activeDoc,
  data,
  instData,
  lang,
  onChange,
  onInstChange,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleInstInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    onInstChange({ ...instData, [name]: value });
  };

  const renderFields = () => {
    switch (activeDoc) {
      case "studentCard":
        return (
          <div className="fade-in">
            <div style={S.ui.sectionTitle}>
              <span>🏢</span> {t(lang, "institutionalConfig")}
            </div>
            <FormField
              label={t(lang, "universityName")}
              name="name"
              value={instData.name}
              onChange={handleInstInputChange}
            />
            <FormField
              label={t(lang, "logoUrl")}
              name="logo"
              value={instData.logo}
              onChange={handleInstInputChange}
              placeholder="https://example.com/logo.png"
            />
            <FormField
              label={t(lang, "faculty")}
              name="faculty"
              value={instData.faculty}
              onChange={handleInstInputChange}
            />
            <FormField
              label={t(lang, "department")}
              name="department"
              value={instData.department}
              onChange={handleInstInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>👤</span> {t(lang, "personalInfo")}
            </div>
            <FormField
              label={t(lang, "fullName")}
              name="studentName"
              value={data.studentName}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "nationalId")}
              name="nationalId"
              value={data.nationalId}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "studentId")}
              name="studentId"
              value={data.studentId}
              onChange={handleInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>📚</span> {t(lang, "academicInfo")}
            </div>
            <FormField
              label={t(lang, "academicProgram")}
              name="program"
              value={data.program}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "level")}
              name="level"
              value={data.level}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "entryYear")}
              name="entryYear"
              value={data.entryYear}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "institutionalEmail")}
              name="email"
              value={data.email}
              onChange={handleInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>🗓</span> {t(lang, "validityPeriod")}
            </div>
            <FormField
              label={t(lang, "issueDate")}
              name="issueDate"
              type="date"
              value={data.issueDate}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "expiryDate")}
              name="expiryDate"
              type="date"
              value={data.expiryDate}
              onChange={handleInputChange}
            />
          </div>
        );
      case "schedule":
        return (
          <div className="fade-in">
            <div style={S.ui.sectionTitle}>
              <span>🏢</span> {t(lang, "institution")}
            </div>
            <FormField
              label={t(lang, "universityName")}
              name="name"
              value={instData.name}
              onChange={handleInstInputChange}
            />
            <FormField
              label={t(lang, "logoUrl")}
              name="logo"
              value={instData.logo}
              onChange={handleInstInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>👤</span> {t(lang, "studentSection")}
            </div>
            <FormField
              label={t(lang, "fullName")}
              name="studentName"
              value={data.studentName}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "studentId")}
              name="studentId"
              value={data.studentId}
              onChange={handleInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>📅</span> {t(lang, "periodDetails")}
            </div>
            <FormField
              label={t(lang, "semester")}
              name="semester"
              value={data.semester}
              onChange={handleInputChange}
            />
            <FormField
              label={lang === "en" ? "Academic Year" : "Año Académico"}
              name="academicYear"
              value={data.academicYear}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "modality")}
              name="modality"
              value={data.modality}
              onChange={handleInputChange}
            />
          </div>
        );
      case "tuitionReceipt":
        return (
          <div className="fade-in">
            <div style={S.ui.sectionTitle}>
              <span>🏢</span> {t(lang, "institution")}
            </div>
            <FormField
              label={t(lang, "universityName")}
              name="name"
              value={instData.name}
              onChange={handleInstInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>👤</span> {t(lang, "studentSection")}
            </div>
            <FormField
              label={t(lang, "fullName")}
              name="studentName"
              value={data.studentName}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "studentId")}
              name="studentId"
              value={data.studentId}
              onChange={handleInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>💳</span> {t(lang, "paymentDetails")}
            </div>
            <FormField
              label={t(lang, "paymentDate")}
              name="paymentDate"
              type="date"
              value={data.paymentDate}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "method")}
              name="paymentMethod"
              value={data.paymentMethod}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "reference")}
              name="bankRef"
              value={data.bankRef}
              onChange={handleInputChange}
            />
          </div>
        );
      case "transcript":
        return (
          <div className="fade-in">
            <div style={S.ui.sectionTitle}>
              <span>🏢</span> {t(lang, "institution")}
            </div>
            <FormField
              label={t(lang, "universityName")}
              name="name"
              value={instData.name}
              onChange={handleInstInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>📜</span> {t(lang, "academicData")}
            </div>
            <FormField
              label={t(lang, "fullName")}
              name="studentName"
              value={data.studentName}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "nationalId")}
              name="nationalId"
              value={data.nationalId}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "program")}
              name="program"
              value={data.program}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "academicStanding")}
              name="status"
              value={data.status}
              onChange={handleInputChange}
            />
          </div>
        );
      case "registrationReceipt":
        return (
          <div className="fade-in">
            <div style={S.ui.sectionTitle}>
              <span>🏢</span> {t(lang, "institution")}
            </div>
            <FormField
              label={t(lang, "universityName")}
              name="name"
              value={instData.name}
              onChange={handleInstInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>👤</span> {t(lang, "studentSection")}
            </div>
            <FormField
              label={t(lang, "fullName")}
              name="studentName"
              value={data.studentName}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "studentId")}
              name="studentId"
              value={data.studentId}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "program")}
              name="program"
              value={data.program}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "level")}
              name="level"
              value={data.level}
              onChange={handleInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>📋</span> {t(lang, "registrationData")}
            </div>
            <FormField
              label={t(lang, "registrationDate")}
              name="registrationDate"
              type="date"
              value={data.registrationDate}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "semester")}
              name="semester"
              value={data.semester}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "observations")}
              name="observations"
              value={data.observations}
              onChange={handleInputChange}
            />
          </div>
        );
      case "enrollmentVerification":
        return (
          <div className="fade-in">
            <div style={S.ui.sectionTitle}>
              <span>🏢</span> {t(lang, "institution")}
            </div>
            <FormField
              label={t(lang, "universityName")}
              name="name"
              value={instData.name}
              onChange={handleInstInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>👤</span> {t(lang, "studentData")}
            </div>
            <FormField
              label={t(lang, "fullName")}
              name="studentName"
              value={data.studentName}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "studentId")}
              name="studentId"
              value={data.studentId}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "academicProgram")}
              name="program"
              value={data.program}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "level")}
              name="level"
              value={data.level}
              onChange={handleInputChange}
            />
            <FormField
              label={lang === "en" ? "Classification" : "Clasificación"}
              name="classification"
              value={data.classification}
              onChange={handleInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>📄</span>{" "}
              {lang === "en" ? "Enrollment Details" : "Datos de Inscripción"}
            </div>
            <FormField
              label={
                lang === "en" ? "Enrollment Status" : "Estado de Inscripción"
              }
              name="enrollmentStatus"
              value={data.enrollmentStatus}
              onChange={handleInputChange}
            />
            <FormField
              label={lang === "en" ? "Credit Hours" : "Créditos Inscritos"}
              name="creditHours"
              value={data.creditHours}
              onChange={handleInputChange}
            />
            <FormField
              label={lang === "en" ? "Academic Period" : "Período Académico"}
              name="semester"
              value={data.semester}
              onChange={handleInputChange}
            />
            <FormField
              label={
                lang === "en" ? "Academic Standing" : "Situación Académica"
              }
              name="academicStanding"
              value={data.academicStanding}
              onChange={handleInputChange}
            />
          </div>
        );
      case "officialLetter":
        return (
          <div className="fade-in">
            <div style={S.ui.sectionTitle}>
              <span>🏢</span> {t(lang, "institution")}
            </div>
            <FormField
              label={t(lang, "universityName")}
              name="name"
              value={instData.name}
              onChange={handleInstInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>📨</span> {t(lang, "recipient")}
            </div>
            <FormField
              label={
                lang === "en" ? "Recipient Name" : "Nombre del Destinatario"
              }
              name="recipientName"
              value={data.recipientName}
              onChange={handleInputChange}
            />
            <FormField
              label={lang === "en" ? "Title / Position" : "Cargo / Título"}
              name="recipientTitle"
              value={data.recipientTitle}
              onChange={handleInputChange}
            />
            <FormField
              label={lang === "en" ? "Salutation" : "Saludo"}
              name="salutation"
              value={data.salutation}
              onChange={handleInputChange}
            />

            <div style={S.ui.sectionTitle}>
              <span>📝</span> {t(lang, "content")}
            </div>
            <FormField
              label={t(lang, "subject")}
              name="subject"
              value={data.subject}
              onChange={handleInputChange}
            />
            <FormField
              label={t(lang, "category")}
              name="category"
              value={data.category}
              onChange={handleInputChange}
            />
            <FormField
              label={lang === "en" ? "Letter Body" : "Cuerpo de la Carta"}
              name="body"
              type="textarea"
              value={data.body}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return (
          <p style={{ color: "#94a3b8", padding: "20px", textAlign: "center" }}>
            {lang === "en"
              ? "Select a document to begin editing."
              : "Seleccione un documento para comenzar la edición."}
          </p>
        );
    }
  };

  return (
    <div
      style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            ...S.ui.docBadge,
            background: "rgba(201,168,76,0.1)",
            color: "#c9a84c",
            border: "1px solid #c9a84c",
          }}
        >
          CONFIG
        </div>
        <h2
          style={{
            fontSize: "18px",
            margin: 0,
            color: "#fff",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: "700",
          }}
        >
          {t(lang, "customize")}
        </h2>
      </div>
      {renderFields()}
    </div>
  );
};
