import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

import { INSTITUTION, DOC_TYPES } from "./data/constants";
import { SAMPLE } from "./data/sampleData";
import { t } from "./i18n/translations";
import type { Lang } from "./i18n/translations";

// Document Templates
import {
  StudentCard,
  ClassSchedule,
  TuitionReceipt,
  AcademicTranscript,
  RegistrationReceipt,
  EnrollmentVerification,
  OfficialLetter,
} from "./templates";

// Form Components
import { DynamicForm } from "./components/forms/DynamicForm";

// Preset Student Profiles for Instant Realism
const PRESETS = [
  {
    id: "ethan",
    name: "Ethan Abanto Cruzado",
    program: "Marketing & Business Analytics",
    studentId: "987654373",
    nationalId: "72849105",
    level: "Undergraduate — Junior",
    email: "e.abantocruzado@wou.edu",
    photo: "./assets/student_portrait.webp",
  },
  {
    id: "sarah",
    name: "Sarah J. Jenkins",
    program: "Computer Science & AI Systems",
    studentId: "987410294",
    nationalId: "84920173",
    level: "Undergraduate — Senior (Honors)",
    email: "s.jenkins@wou.edu",
    photo: "./assets/student_portrait.webp",
  },
  {
    id: "carlos",
    name: "Carlos A. Mendoza",
    program: "Economics & Global Finance",
    studentId: "987115820",
    nationalId: "65039218",
    level: "Undergraduate — Sophomore",
    email: "c.mendoza@wou.edu",
    photo: "./assets/student_portrait.webp",
  }
];

export default function App() {
  const [active, setActive] = useState("studentCard");
  const [docData, setDocData] = useState(SAMPLE);
  const [instState, setInstState] = useState(INSTITUTION);
  const [lang, setLang] = useState<Lang>("en");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [mobileTab, setMobileTab] = useState<"preview" | "editor">("preview");
  const [zoom, setZoom] = useState(0.85);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (window.innerWidth >= 1400) {
        setZoom(0.88);
      } else if (window.innerWidth >= 1100) {
        setZoom(0.72);
      } else {
        setZoom(0.65);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDataChange = useCallback((newData: any) => {
    setDocData((prev) => ({ ...prev, [active]: newData }));
  }, [active]);

  const handleInstChange = useCallback((newInst: any) => {
    setInstState(newInst);
  }, []);

  // Load a quick preset profile
  const handleLoadPreset = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setDocData((prev) => {
      const currentData = prev[active as keyof typeof SAMPLE] as any;
      return {
        ...prev,
        [active]: {
          ...currentData,
          studentName: preset.name,
          studentId: preset.studentId,
          nationalId: preset.nationalId,
          program: preset.program,
          level: preset.level,
          email: preset.email,
          photo: preset.photo,
        },
      };
    });
  }, [active]);

  // Custom photo upload handler
  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Photo = uploadEvent.target?.result as string;
      setDocData((prev) => {
        const currentData = prev[active as keyof typeof SAMPLE] as any;
        return {
          ...prev,
          [active]: {
            ...currentData,
            photo: base64Photo,
          },
        };
      });
    };
    reader.readAsDataURL(file);
  }, [active]);

  // Print filename builder
  const getPrintTitle = useCallback(() => {
    const studentId =
      (docData[active as keyof typeof SAMPLE] as any)?.studentId || "987654373";
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const docNames: Record<string, string> = {
      studentCard: "Official_Student_ID",
      schedule: "Official_Class_Schedule",
      tuitionReceipt: "Tuition_Statement",
      transcript: "Academic_Transcript",
      registrationReceipt: "Registration_Receipt",
      enrollmentVerification: "Enrollment_Verification",
      officialLetter: "Official_Verification_Letter",
    };
    const docName = docNames[active] || "Document";
    return `WOU_${docName}_${studentId}_${dateStr}`;
  }, [active, docData]);

  const handlePrint = useCallback(() => {
    const preview = document.getElementById("doc-preview");
    const printRoot = document.getElementById("print-root");
    if (!preview || !printRoot) return;

    const originalTitle = document.title;
    document.title = getPrintTitle();

    printRoot.innerHTML = preview.innerHTML;
    printRoot.style.display = "block";
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 100);
  }, [getPrintTitle]);

  const renderedDocument = useMemo(() => {
    const data = docData[active as keyof typeof SAMPLE];
    switch (active) {
      case "studentCard":
        return <StudentCard data={data} institution={instState} lang={lang} />;
      case "schedule":
        return <ClassSchedule data={data} institution={instState} lang={lang} />;
      case "tuitionReceipt":
        return <TuitionReceipt data={data} institution={instState} lang={lang} />;
      case "transcript":
        return <AcademicTranscript data={data} institution={instState} lang={lang} />;
      case "registrationReceipt":
        return <RegistrationReceipt data={data} institution={instState} lang={lang} />;
      case "enrollmentVerification":
        return <EnrollmentVerification data={data} institution={instState} lang={lang} />;
      case "officialLetter":
        return <OfficialLetter data={data} institution={instState} lang={lang} />;
      default:
        return null;
    }
  }, [active, docData, instState, lang]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-studio)" }}>
      {/* ===== SWISS EDITORIAL HEADER ===== */}
      <header
        style={{
          background: "#080c14",
          borderBottom: "1px solid #1e2638",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        {/* Brand & Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "#0d131f",
              border: "1px solid #d4af37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "#d4af37",
              flexShrink: 0,
            }}
          >
            🏛
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? "15px" : "17px",
                  fontWeight: "800",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#f8fafc",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                WOU Academic Document Studio
              </h1>
              <span
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "9.5px",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                ● 300 DPI ENGINE
              </span>
            </div>
            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px", fontFamily: "'Inter', sans-serif" }}>
              Western Oregon University · Office of the Registrar
            </div>
          </div>
        </div>

        {/* Global Controls & Primary Action */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          {/* Quick Preset Selector */}
          <div style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
              Perfil:
            </span>
            <select
              onChange={(e) => handleLoadPreset(e.target.value)}
              style={{
                background: "#0d131f",
                color: "#f8fafc",
                border: "1px solid #1e2638",
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id} style={{ background: "#0d131f", color: "#f8fafc" }}>
                  {p.name} ({p.program.split("&")[0].trim()})
                </option>
              ))}
            </select>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            style={{
              background: "#0d131f",
              color: "#d4af37",
              border: "1px solid #1e2638",
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s ease",
            }}
          >
            {lang === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
          </button>

          {/* Master Print/PDF Button */}
          <button
            onClick={handlePrint}
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #b89628 100%)",
              color: "#0a0f1c",
              border: "none",
              padding: isMobile ? "9px 18px" : "10px 24px",
              borderRadius: "6px",
              fontSize: isMobile ? "12px" : "13px",
              fontWeight: "800",
              letterSpacing: "0.04em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(212, 175, 55, 0.3)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 175, 55, 0.45)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(212, 175, 55, 0.3)";
            }}
          >
            🖨 {t(lang, "printDocument")}
          </button>
        </div>
      </header>

      {/* ===== SEGMENTED DOCUMENT TYPES BAR ===== */}
      <nav
        className="tabs-scroll"
        style={{
          background: "#0a0e17",
          borderBottom: "1px solid #1e2638",
          padding: "0 24px",
          gap: "4px",
          position: "sticky",
          top: "65px",
          zIndex: 90,
        }}
      >
        {DOC_TYPES.map((doc) => {
          const isActive = active === doc.key;
          return (
            <button
              key={doc.key}
              onClick={() => setActive(doc.key)}
              style={{
                padding: "12px 18px",
                background: isActive ? "rgba(212, 175, 55, 0.08)" : "transparent",
                color: isActive ? "#d4af37" : "#94a3b8",
                border: "none",
                borderBottom: isActive ? "2.5px solid #d4af37" : "2.5px solid transparent",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: isActive ? "700" : "500",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>{doc.icon}</span>
              <span>{doc[lang]}</span>
            </button>
          );
        })}
      </nav>

      {/* ===== MOBILE SWITCHER BAR (Visible on screens < 1024px) ===== */}
      {isMobile && (
        <div
          style={{
            background: "#0f172a",
            padding: "8px 16px",
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid #1e2638",
            position: "sticky",
            top: "109px",
            zIndex: 85,
          }}
        >
          <button
            onClick={() => setMobileTab("preview")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: mobileTab === "preview" ? "#d4af37" : "#334155",
              background: mobileTab === "preview" ? "rgba(212, 175, 55, 0.15)" : "#080c14",
              color: mobileTab === "preview" ? "#d4af37" : "#94a3b8",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            👁️ Vista Previa en Vivo
          </button>
          <button
            onClick={() => setMobileTab("editor")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: mobileTab === "editor" ? "#d4af37" : "#334155",
              background: mobileTab === "editor" ? "rgba(212, 175, 55, 0.15)" : "#080c14",
              color: mobileTab === "editor" ? "#d4af37" : "#94a3b8",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ✏️ Editor & Ajustes
          </button>
        </div>
      )}

      {/* ===== MAIN STUDIO SPLIT VIEW ===== */}
      <main
        className="studio-split-layout"
        style={{
          display: "flex",
          flex: 1,
          minHeight: "calc(100vh - 120px)",
          background: "#070a12",
        }}
      >
        {/* LEFT / CENTER: INTERACTIVE LIVE DOCUMENT CANVAS */}
        {(!isMobile || mobileTab === "preview") && (
          <section
            className="studio-preview-panel"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRight: isMobile ? "none" : "1px solid #1e2638",
              minWidth: 0,
            }}
          >
            {/* Canvas Toolbar (Zoom & Status) */}
            <div
              style={{
                padding: "10px 24px",
                background: "rgba(13, 19, 31, 0.8)",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid #1e2638",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
                  DOCUMENTO:
                </span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#f8fafc" }}>
                  {DOC_TYPES.find((d) => d.key === active)?.[lang]}
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>· A4 / US Letter (300 DPI)</span>
              </div>

              {/* Zoom Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  onClick={() => setZoom(Math.max(0.45, zoom - 0.08))}
                  title="Alejar"
                  style={{
                    background: "#080c14",
                    color: "#cbd5e1",
                    border: "1px solid #1e2638",
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: "11px", color: "#d4af37", width: "42px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace" }}>
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(1.25, zoom + 0.08))}
                  title="Acercar"
                  style={{
                    background: "#080c14",
                    color: "#cbd5e1",
                    border: "1px solid #1e2638",
                    width: "28px",
                    height: "28px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => setZoom(0.85)}
                  title="Ajustar a 85%"
                  style={{
                    background: "#080c14",
                    color: "#94a3b8",
                    border: "1px solid #1e2638",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "10.5px",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Document Sheet Desk Container */}
            <div
              className="document-desk-container"
              style={{
                flex: 1,
                padding: "36px 16px 60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                overflowY: "auto",
                overflowX: "auto",
              }}
            >
              <div
                className="document-sheet-wrapper"
                ref={previewRef}
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                  transition: "transform 0.15s ease-out",
                  margin: "0 auto",
                }}
              >
                <div id="doc-preview">
                  {renderedDocument}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RIGHT: SWISS EDITORIAL PRECISION EDITOR */}
        {(!isMobile || mobileTab === "editor") && (
          <aside
            className="studio-editor-panel"
            style={{
              width: isMobile ? "100%" : "440px",
              background: "#0a0e17",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", borderBottom: "1px solid #1e2638", paddingBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px" }}>⚙️</span>
                <h2 style={{ fontSize: "13px", fontWeight: "800", color: "#f8fafc", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>
                  {lang === "en" ? "Document Customizer" : "Personalizar Documento"}
                </h2>
              </div>
              <span style={{ fontSize: "10.5px", color: "#d4af37", fontFamily: "'JetBrains Mono', monospace" }}>
                LIVE SYNC
              </span>
            </div>

            {/* Photo Upload Section (Especially handy for Student ID Card) */}
            {active === "studentCard" && (
              <div
                style={{
                  background: "#080c14",
                  border: "1px solid #1e2638",
                  borderRadius: "8px",
                  padding: "14px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontSize: "10.5px", fontWeight: "700", color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>
                  📸 {lang === "en" ? "Student ID Portrait" : "Foto del Estudiante"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <img
                    src={(docData.studentCard as any)?.photo || "./assets/student_portrait.webp"}
                    alt="Current Portrait"
                    style={{
                      width: "48px",
                      height: "56px",
                      borderRadius: "6px",
                      objectFit: "cover",
                      border: "1.5px solid #d4af37",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "inline-block",
                        background: "#1e2638",
                        color: "#f8fafc",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        fontSize: "11px",
                        fontWeight: "600",
                        cursor: "pointer",
                        border: "1px solid #334155",
                      }}
                    >
                      {lang === "en" ? "Upload Custom Photo" : "Subir Otra Foto"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                    <button
                      onClick={() => {
                        const current = docData.studentCard as any;
                        handleDataChange({ ...current, photo: "./assets/student_portrait.webp" });
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        fontSize: "10px",
                        marginLeft: "8px",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Default
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Form for Current Active Document */}
            <div style={{ flex: 1 }}>
              <DynamicForm
                activeDoc={active}
                data={docData[active as keyof typeof SAMPLE]}
                lang={lang}
                onChange={handleDataChange}
                instData={instState}
                onInstChange={handleInstChange}
              />
            </div>
          </aside>
        )}
      </main>

      {/* ===== SWISS FOOTER ===== */}
      <footer
        style={{
          background: "#060910",
          borderTop: "1px solid #1e2638",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "11px",
          color: "#475569",
          fontFamily: "'Inter', sans-serif",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#d4af37", fontWeight: "700" }}>WESTERN OREGON UNIVERSITY</span>
          <span>·</span>
          <span>Office of the Registrar (Monmouth, Oregon)</span>
        </div>
        <div>
          Official Digital Records System © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
