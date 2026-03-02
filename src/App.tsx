import { useState, useEffect } from "react";

// Estilos y Datos
import { S } from "./styles/theme";
import { INSTITUTION, DOC_TYPES } from "./data/constants";
import { SAMPLE } from "./data/sampleData";
import { t } from "./i18n/translations";
import type { Lang } from "./i18n/translations";

// Plantillas
import {
  StudentCard,
  ClassSchedule,
  TuitionReceipt,
  AcademicTranscript,
  RegistrationReceipt,
  EnrollmentVerification,
  OfficialLetter,
} from "./templates";

// Componentes UI
import { DynamicForm } from "./components/forms/DynamicForm";

export default function App() {
  const [active, setActive] = useState("studentCard");
  const [docData, setDocData] = useState(SAMPLE);
  const [instState, setInstState] = useState(INSTITUTION);
  const [lang, setLang] = useState<Lang>("en");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDataChange = (newData: any) => {
    setDocData({ ...docData, [active]: newData });
  };

  const handleInstChange = (newInst: any) => {
    setInstState(newInst);
  };

  // Build a university-style filename for the PDF
  const getPrintTitle = () => {
    const studentId =
      (docData[active as keyof typeof SAMPLE] as any)?.studentId || "987654373";
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const docNames: Record<string, string> = {
      studentCard: "Student_ID_Card",
      schedule: "Class_Schedule",
      tuitionReceipt: "Tuition_Statement",
      transcript: "Academic_Transcript",
      registrationReceipt: "Registration_Receipt",
      enrollmentVerification: "Enrollment_Verification",
      officialLetter: "Official_Letter",
    };
    const docName = docNames[active] || "Document";
    return `WOU_${docName}_${studentId}_${dateStr}`;
  };

  const handlePrint = () => {
    const preview = document.getElementById("doc-preview");
    const printRoot = document.getElementById("print-root");
    if (!preview || !printRoot) return;

    // Set university-style document title (becomes the PDF filename)
    const originalTitle = document.title;
    document.title = getPrintTitle();

    printRoot.innerHTML = preview.innerHTML;
    printRoot.style.display = "block";
    setTimeout(() => {
      window.print();
      // Restore original title after print dialog
      document.title = originalTitle;
    }, 100);
  };

  const renderDocument = () => {
    const data = docData[active as keyof typeof SAMPLE];
    switch (active) {
      case "studentCard":
        return <StudentCard data={data} institution={instState} lang={lang} />;
      case "schedule":
        return (
          <ClassSchedule data={data} institution={instState} lang={lang} />
        );
      case "tuitionReceipt":
        return (
          <TuitionReceipt data={data} institution={instState} lang={lang} />
        );
      case "transcript":
        return (
          <AcademicTranscript data={data} institution={instState} lang={lang} />
        );
      case "registrationReceipt":
        return (
          <RegistrationReceipt
            data={data}
            institution={instState}
            lang={lang}
          />
        );
      case "enrollmentVerification":
        return (
          <EnrollmentVerification
            data={data}
            institution={instState}
            lang={lang}
          />
        );
      case "officialLetter":
        return (
          <OfficialLetter data={data} institution={instState} lang={lang} />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-animate"
      style={{ minHeight: "100vh", color: "#f8fafc", overflowX: "hidden" }}
    >
      {/* ===== HEADER ===== */}
      <header
        style={{
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
          padding: isMobile ? "16px" : "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          flexWrap: "wrap",
          gap: isMobile ? "12px" : "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo + Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "10px" : "16px",
            minWidth: 0,
            flex: 1,
          }}
        >
          <div style={{ fontSize: isMobile ? "22px" : "28px", flexShrink: 0 }}>
            🏛
          </div>
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                color: "#fff",
                margin: 0,
                fontSize: isMobile ? "15px" : "20px",
                fontWeight: "900",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lang === "en" ? "WOU Student Portal" : "Portal Estudiantil WOU"}
            </h1>
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    ...S.ui.docBadge,
                    background: "rgba(201,168,76,0.2)",
                    color: "#c9a84c",
                    border: "1px solid rgba(201,168,76,0.4)",
                  }}
                >
                  {lang === "en" ? "Official Records" : "Registros Oficiales"}
                </span>
                <p
                  style={{
                    color: "#94a3b8",
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: "500",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Western Oregon University —{" "}
                  {lang === "en"
                    ? "Office of the Registrar"
                    : "Oficina de Registro"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "12px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: isMobile ? "8px 12px" : "10px 18px",
              fontSize: isMobile ? "12px" : "13px",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "10px",
              fontFamily: "'Outfit', sans-serif",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            {lang === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
          </button>
          <button
            onClick={handlePrint}
            style={{
              background: "linear-gradient(135deg, #c9a84c 0%, #a68a3b 100%)",
              color: "#1a1a2e",
              border: "none",
              padding: isMobile ? "8px 16px" : "12px 28px",
              fontSize: isMobile ? "11px" : "13px",
              fontWeight: "800",
              letterSpacing: "0.05em",
              cursor: "pointer",
              borderRadius: "10px",
              textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 10px 20px rgba(201,168,76,0.2)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 15px 30px rgba(201,168,76,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 20px rgba(201,168,76,0.2)";
            }}
          >
            🖨 {t(lang, "printDocument")}
          </button>
        </div>
      </header>

      {/* ===== TABS ===== */}
      <nav
        className="tabs-scroll"
        style={{
          background: "rgba(30, 41, 59, 0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          padding: isMobile ? "0 12px" : "0 48px",
          gap: isMobile ? "4px" : "8px",
          position: "sticky",
          top: isMobile ? "56px" : "85px",
          zIndex: 90,
        }}
      >
        {DOC_TYPES.map((doc) => (
          <button
            key={doc.key}
            onClick={() => setActive(doc.key)}
            style={{
              padding: isMobile ? "12px 14px" : "16px 24px",
              background: "transparent",
              color: active === doc.key ? "#c9a84c" : "#64748b",
              border: "none",
              cursor: "pointer",
              fontSize: isMobile ? "11px" : "13px",
              fontWeight: active === doc.key ? "800" : "600",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              borderBottom:
                active === doc.key
                  ? "3px solid #c9a84c"
                  : "3px solid transparent",
              transition: "all 0.3s",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <span
              style={{
                marginRight: isMobile ? "4px" : "8px",
                opacity: active === doc.key ? 1 : 0.6,
              }}
            >
              {doc.icon}
            </span>
            {doc[lang]}
          </button>
        ))}
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: isMobile ? "16px" : "48px",
          minHeight: "calc(100vh - 200px)",
          background: "radial-gradient(circle at top right, #1e293b, #0f172a)",
        }}
      >
        {/* Config Panel */}
        <div
          style={{
            ...S.ui.formPanel,
            maxWidth: "720px",
            padding: isMobile ? "16px" : "28px",
            borderRadius: isMobile ? "12px" : "16px",
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

        {/* Hidden preview for print */}
        <div style={{ display: "none" }}>
          <div id="doc-preview">{renderDocument()}</div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          textAlign: "center",
          padding: isMobile ? "24px 16px" : "40px",
          color: "#475569",
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "0.05em",
          fontFamily: "'Inter', sans-serif",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{ color: "#c9a84c", marginBottom: "8px", fontWeight: "700" }}
        >
          WESTERN OREGON UNIVERSITY
        </div>
        Office of the Registrar — Monmouth, Oregon © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
