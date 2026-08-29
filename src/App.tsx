import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Data & Constants
import { INSTITUTION, UNIVERSITIES, DOC_TYPES } from "./data/constants";
import { SAMPLE } from "./data/sampleData";
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

// Advanced Form Editor
import { DynamicForm } from "./components/forms/DynamicForm";

// Realistic Student Profiles
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
  },
];

export default function App() {
  const [active, setActive] = useState("transcript");
  const [docData, setDocData] = useState(SAMPLE);
  const [instState, setInstState] = useState(INSTITUTION);
  const [lang, setLang] = useState<Lang>("en");
  const [term, setTerm] = useState("Spring 2025");
  const [delivery, setDelivery] = useState("Digital PDF (300 DPI)");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [zoom, setZoom] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1440) return 0.85;
      if (window.innerWidth >= 1200) return 0.74;
      if (window.innerWidth >= 900) return 0.62;
      return 0.5;
    }
    return 0.85;
  });
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-fit zoom on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setZoom(0.85);
      } else if (window.innerWidth >= 1200) {
        setZoom(0.74);
      } else if (window.innerWidth >= 900) {
        setZoom(0.62);
      } else {
        setZoom(0.5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDataChange = useCallback(
    (newData: any) => {
      setDocData((prev) => ({ ...prev, [active]: newData }));
    },
    [active]
  );

  const handleInstChange = useCallback((newInst: any) => {
    setInstState(newInst);
  }, []);

  // Quick preset loader
  const handleLoadPreset = useCallback(
    (presetId: string) => {
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
    },
    [active]
  );

  // Print & PDF Export
  const getPrintTitle = useCallback(() => {
    const studentId =
      (docData[active as keyof typeof SAMPLE] as any)?.studentId || "987654373";
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    return `WOU_${active}_${studentId}_${dateStr}`;
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
    }, 120);
  }, [getPrintTitle]);

  // Real-time Document Renderer
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

  const currentStudent = (docData[active as keyof typeof SAMPLE] as any) || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080c14",
        color: "#f8fafc",
        padding: "32px 24px",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Top Editorial Title Banner (Exact Match to Option 3 Mockup) */}
      <div style={{ maxWidth: "1480px", margin: "0 auto 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#ffffff",
                letterSpacing: "-0.01em",
                margin: "0 0 6px 0",
              }}
            >
              Swiss Editorial & Minimalist Studio Pro
            </h1>
            <p style={{ fontSize: "12.5px", color: "#94a3b8", margin: 0, maxWidth: "800px", lineHeight: "1.4" }}>
              {lang === "en"
                ? "High-contrast ultra-minimalism in deep charcoal and warm parchment canvas. Clean A4 reading and export with high-fidelity digital seals and signatures."
                : "Ultra-minimalismo de alto contraste en carbón oscuro y lienzo apergaminado cálido. Enfoque centrado en la lectura y exportación limpia de hojas A4 con sellos y firmas digitales con alta fidelidad gráfica."}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              style={{
                background: "#121826",
                color: "#d4af37",
                border: "1px solid #1e293b",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {lang === "en" ? "🇺🇸 English" : "🇪🇸 Español"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== UNIFIED STUDIO CARD CONTAINER (Option 3 Architecture) ===== */}
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          background: "#0d131f",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.25fr) minmax(360px, 1fr)",
            gap: "36px",
            alignItems: "start",
          }}
          className="studio-grid"
        >
          {/* ================= LEFT: LIVE A4 DOCUMENT CANVAS ================= */}
          <div
            style={{
              background: "#080c14",
              borderRadius: "12px",
              border: "1px solid #1e2638",
              padding: "24px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "780px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Minimalist Canvas Toolbar */}
            <div
              style={{
                width: "100%",
                maxWidth: "760px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
                padding: "0 8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#d4af37", fontFamily: "'JetBrains Mono', monospace" }}>
                  A4 DOCUMENT PREVIEW
                </span>
                <span style={{ fontSize: "10px", color: "#64748b" }}>· 300 DPI READY</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  onClick={() => setZoom(Math.max(0.45, zoom - 0.06))}
                  style={{
                    background: "#121826",
                    color: "#cbd5e1",
                    border: "1px solid #1e293b",
                    width: "26px",
                    height: "26px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: "11px", color: "#cbd5e1", width: "40px", textAlign: "center", fontFamily: "'JetBrains Mono', monospace" }}>
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(1.15, zoom + 0.06))}
                  style={{
                    background: "#121826",
                    color: "#cbd5e1",
                    border: "1px solid #1e2638",
                    width: "26px",
                    height: "26px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Document Sheet (With strict light scheme protection) */}
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
              <div id="doc-preview" data-theme="paper">
                {renderedDocument}
              </div>
            </div>
          </div>

          {/* ================= RIGHT: SWISS EDITORIAL PANEL ================= */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* Header Typography (Exact Match to Option 3) */}
            <div>
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "900",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  lineHeight: "1.1",
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                UNIVERSITY DOCUMENT<br />GENERATOR
              </h2>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  color: "#d4af37",
                  textTransform: "uppercase",
                  marginTop: "6px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {instState.systemName.toUpperCase()} · {instState.country.toUpperCase()}
              </div>
            </div>

            {/* Country & University Model Selector */}
            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "10px", padding: "14px" }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#cbd5e1",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "10px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span>{lang === "en" ? "Country & University Model" : "País y Modelo Universitario"}</span>
                <span style={{ color: "#d4af37", fontSize: "10px", fontWeight: "800" }}>{instState.country}</span>
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {UNIVERSITIES.map((univ) => {
                  const isUnivActive = instState.id === univ.id;
                  return (
                    <button
                      key={univ.id}
                      onClick={() => handleInstChange(univ)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: "6px",
                        background: isUnivActive ? "rgba(212, 175, 55, 0.15)" : "rgba(255, 255, 255, 0.04)",
                        border: isUnivActive ? "1.5px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.08)",
                        color: isUnivActive ? "#ffffff" : "#94a3b8",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700" }}>
                        <span>{univ.countryFlag}</span>
                        <span>{univ.country}</span>
                      </div>
                      <div style={{ fontSize: "9.5px", color: isUnivActive ? "#f3e5ab" : "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                        {univ.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.1)" }} />

            {/* Select Document Type */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#cbd5e1",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "10px",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {lang === "en" ? "Select Document Type" : "Seleccionar Tipo de Documento"}
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {DOC_TYPES.map((doc) => {
                  const isSelected = active === doc.key;
                  return (
                    <label
                      key={doc.key}
                      onClick={() => setActive(doc.key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: isSelected ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.03)",
                        border: isSelected ? "1px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.06)",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: isSelected ? "#ffffff" : "#94a3b8",
                        fontWeight: isSelected ? "600" : "400",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="docType"
                        checked={isSelected}
                        onChange={() => setActive(doc.key)}
                        style={{ accentColor: "#d4af37", cursor: "pointer" }}
                      />
                      <span>{doc.icon}</span>
                      <span>{doc[lang]}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Form Input Grid (2 Columns) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {/* Student ID */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "6px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Student ID
                </label>
                <input
                  type="text"
                  value={currentStudent.studentId || "987654373"}
                  onChange={(e) =>
                    handleDataChange({ ...currentStudent, studentId: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "#080c14",
                    border: "1px solid #1e2638",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    color: "#f8fafc",
                    fontSize: "13px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Student Profile Selector */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "6px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Student
                </label>
                <select
                  onChange={(e) => handleLoadPreset(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#080c14",
                    border: "1px solid #1e2638",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    color: "#f8fafc",
                    fontSize: "13px",
                    cursor: "pointer",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  {PRESETS.map((p) => (
                    <option key={p.id} value={p.id} style={{ background: "#080c14", color: "#f8fafc" }}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Term */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "6px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Term
                </label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#080c14",
                    border: "1px solid #1e2638",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    color: "#f8fafc",
                    fontSize: "13px",
                    cursor: "pointer",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Spring 2025" style={{ background: "#080c14", color: "#f8fafc" }}>Spring 2025</option>
                  <option value="Fall 2024" style={{ background: "#080c14", color: "#f8fafc" }}>Fall 2024</option>
                  <option value="Winter 2025" style={{ background: "#080c14", color: "#f8fafc" }}>Winter 2025</option>
                  <option value="Summer 2024" style={{ background: "#080c14", color: "#f8fafc" }}>Summer 2024</option>
                </select>
              </div>

              {/* Delivery */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "6px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  Delivery
                </label>
                <select
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#080c14",
                    border: "1px solid #1e2638",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    color: "#f8fafc",
                    fontSize: "13px",
                    cursor: "pointer",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="Digital PDF (300 DPI)" style={{ background: "#080c14", color: "#f8fafc" }}>Digital PDF</option>
                  <option value="Official Verification Sheet" style={{ background: "#080c14", color: "#f8fafc" }}>Verification Sheet</option>
                </select>
              </div>
            </div>

            {/* Advanced Field Customizer Accordion */}
            <div style={{ marginTop: "4px" }}>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  background: "transparent",
                  color: "#d4af37",
                  border: "none",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "4px 0",
                }}
              >
                <span>{showAdvanced ? "▾" : "▸"}</span>
                <span>{showAdvanced ? "Ocultar Personalizador Detallado" : "⚙️ Personalizar Datos Detallados (Notas, Cursos, Fechas)"}</span>
              </button>

              {showAdvanced && (
                <div
                  style={{
                    marginTop: "14px",
                    padding: "18px",
                    background: "#080c14",
                    borderRadius: "8px",
                    border: "1px solid #1e2638",
                    maxHeight: "380px",
                    overflowY: "auto",
                  }}
                >
                  <DynamicForm
                    activeDoc={active}
                    data={docData[active as keyof typeof SAMPLE]}
                    lang={lang}
                    onChange={handleDataChange}
                    instData={instState}
                    onInstChange={handleInstChange}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons (Exact Match to Option 3 Mockup) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
              {/* Preview Document Button (Dark Pill) */}
              <button
                onClick={() => {
                  previewRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  background: "#1c2333",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#242d42")}
                onMouseOut={(e) => (e.currentTarget.style.background = "#1c2333")}
              >
                PREVIEW DOCUMENT
              </button>

              {/* Generate & Download Master Button (Cream/White Pill) */}
              <button
                onClick={handlePrint}
                style={{
                  background: "#faf8f5",
                  color: "#0f172a",
                  border: "none",
                  padding: "14px",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  fontWeight: "800",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(0, 0, 0, 0.3)",
                  transition: "all 0.15s ease",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 255, 255, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.3)";
                }}
              >
                GENERATE & DOWNLOAD
              </button>
            </div>
          </div>
        </div>

        {/* Studio Card Footer (Exact Match to Option 3 Mockup) */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: "#64748b",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            © {new Date().getFullYear()} Western Oregon University | Student Services
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ cursor: "pointer" }}>Official Verification</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }}>System Status: 🟢 Online</span>
            <span>·</span>
            <span style={{ cursor: "pointer" }}>Registrar Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
