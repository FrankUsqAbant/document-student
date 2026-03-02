export type Lang = "en" | "es";

const translations = {
  en: {
    // Document titles
    studentCardTitle: "Student Identification Card",
    scheduleTitle: "Official Class Schedule",
    tuitionTitle: "Official Tuition Statement",
    transcriptTitle: "Academic Transcript",
    registrationTitle: "Registration Receipt",
    officialLetterTitle: "Official Letter",

    // Watermarks
    wmOriginal: "ORIGINAL",
    wmSchedule: "SCHEDULE",
    wmPaid: "PAID",
    wmTranscript: "TRANSCRIPT",
    wmRegistration: "REGISTERED",
    wmLetter: "OFFICIAL",

    // Common labels
    docNumber: "Document No.",
    issueDate: "Issue Date",
    expiryDate: "Expires",
    period: "Period",
    modality: "Modality",
    receiptNo: "Receipt No.",
    status: "Status",

    // Student Card
    studentDataTitle: "Student Information",
    fullName: "Full name",
    nationalId: "National ID",
    studentId: "Student ID",
    academicProgram: "Academic program",
    level: "Level",
    entryYear: "Year of admission",
    institutionalEmail: "Institutional email",
    condition: "Status",
    creditsCompleted: "Credits completed",
    gpa: "GPA",
    studentPhoto: "Student",
    photo: "Photo",

    // Schedule
    enrolledCourses: "Enrolled Courses",
    student: "Student",
    courseCode: "Code",
    courseName: "Course Name",
    credits: "Credits",
    section: "Section",
    classroom: "Room",
    professor: "Professor",
    totalCredits: "TOTAL CREDITS",
    creditsLabel: "credits",
    weeklySchedule: "Weekly Schedule",
    time: "Time",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

    // Tuition
    studentData: "STUDENT INFORMATION",
    paymentData: "PAYMENT INFORMATION",
    name: "Name",
    program: "Program",
    paymentDate: "Payment date",
    method: "Method",
    reference: "Reference",
    cashier: "Cashier",
    chargesDetail: "Charges Detail",
    code: "Code",
    concept: "Concept",
    amount: "Amount ($)",
    totalPaid: "TOTAL AMOUNT",
    statusPaid: "✓ PAID",
    tuitionNote:
      "Note: This receipt is valid only as proof of payment. No refunds are given once enrollment is finalized.",

    // Transcript
    academicRecord: "Academic Record",
    semester: "Semester",
    grade: "Grade",
    letterGrade: "Letter",
    semesterGPA: "Semester GPA",
    cumulativeGPA: "Cumulative GPA",
    totalCreditsEarned: "Total Credits Earned",
    graduationDate: "Expected Graduation",
    academicStanding: "Academic Standing",

    // Registration
    registrationData: "Registration Details",
    registrationDate: "Registration date",
    observations: "Observations",
    enrolledCoursesTitle: "Enrolled Courses",
    group: "Group",

    // Official Letter
    date: "Date",
    subject: "Subject",
    category: "Category",
    attachments: "Attachments",
    attachmentDesc: "Description",
    pages: "Pages",

    // Signature & Footer
    officialSeal: "Official Seal",
    registrarOffice: "Office of the Registrar",
    academicDept: "Academic Department",
    treasurerOffice: "Bursar's Office",
    studentSignature: "Student — Acknowledgment",
    coordinatorTitle: "Academic Coordination",
    footerCode: "Code",
    footerGenerated: "Electronically generated",
    footerPage: "Page",
    footerOf: "of",

    // Header
    accreditedBy: "Accredited by NWCCU",
    institutionalCode: "Institutional Code",
    issueDateLabel: "Issued",

    // UI
    printDocument: "PRINT DOCUMENT",
    customize: "Customize",
    institutionalConfig: "Institutional Settings",
    universityName: "University Name",
    logoUrl: "Logo URL (Image)",
    faculty: "Faculty/College",
    department: "Department",
    accreditation: "Accreditation",
    registrarName: "Registrar Name",
    personalInfo: "Personal Information",
    academicInfo: "Academic Information",
    validityPeriod: "Validity Period",
    institution: "Institution",
    studentSection: "Student",
    periodDetails: "Period Details",
    paymentDetails: "Payment Details",
    academicData: "Academic Data",
    recipient: "Recipient",
    content: "Content",
  },
  es: {
    // Document titles
    studentCardTitle: "Tarjeta de Identificación Estudiantil",
    scheduleTitle: "Cronograma Oficial de Clases",
    tuitionTitle: "Recibo Oficial de Matrícula",
    transcriptTitle: "Expediente Académico",
    registrationTitle: "Recibo de Registro",
    officialLetterTitle: "Carta Oficial",

    // Watermarks
    wmOriginal: "ORIGINAL",
    wmSchedule: "HORARIO",
    wmPaid: "CANCELADO",
    wmTranscript: "EXPEDIENTE",
    wmRegistration: "REGISTRADO",
    wmLetter: "OFICIAL",

    // Common labels
    docNumber: "N° Documento",
    issueDate: "Emisión",
    expiryDate: "Vence",
    period: "Período",
    modality: "Modalidad",
    receiptNo: "N° Recibo",
    status: "Estado",

    // Student Card
    studentDataTitle: "Datos del Estudiante",
    fullName: "Nombre completo",
    nationalId: "Número de cédula",
    studentId: "Carné estudiantil",
    academicProgram: "Programa académico",
    level: "Nivel",
    entryYear: "Año de ingreso",
    institutionalEmail: "Correo institucional",
    condition: "Condición",
    creditsCompleted: "Créditos cursados",
    gpa: "Promedio",
    studentPhoto: "Fotografía",
    photo: "del Estudiante",

    // Schedule
    enrolledCourses: "Cursos Matriculados",
    student: "Estudiante",
    courseCode: "Código",
    courseName: "Nombre del Curso",
    credits: "Créditos",
    section: "Sección",
    classroom: "Aula",
    professor: "Profesor(a)",
    totalCredits: "TOTAL DE CRÉDITOS",
    creditsLabel: "créditos",
    weeklySchedule: "Distribución Horaria Semanal",
    time: "Hora",
    days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],

    // Tuition
    studentData: "DATOS DEL ESTUDIANTE",
    paymentData: "DATOS DEL PAGO",
    name: "Nombre",
    program: "Programa",
    paymentDate: "Fecha de pago",
    method: "Método",
    reference: "Referencia",
    cashier: "Cajero(a)",
    chargesDetail: "Detalle de Cobros",
    code: "Código",
    concept: "Concepto",
    amount: "Monto (₡)",
    totalPaid: "MONTO TOTAL CANCELADO",
    statusPaid: "✓ CANCELADO",
    tuitionNote:
      "Nota: Este recibo es válido únicamente como comprobante de pago. No se realizan devoluciones una vez formalizada la matrícula.",

    // Transcript
    academicRecord: "Registro Académico",
    semester: "Semestre",
    grade: "Nota",
    letterGrade: "Letra",
    semesterGPA: "Promedio Semestral",
    cumulativeGPA: "Promedio Acumulado",
    totalCreditsEarned: "Total de Créditos Cursados",
    graduationDate: "Fecha de Graduación Esperada",
    academicStanding: "Estado Académico",

    // Registration
    registrationData: "Datos de Registro",
    registrationDate: "Fecha de registro",
    observations: "Observaciones",
    enrolledCoursesTitle: "Cursos Matriculados",
    group: "Grupo",

    // Official Letter
    date: "Fecha",
    subject: "Asunto",
    category: "Categoría",
    attachments: "Adjuntos",
    attachmentDesc: "Descripción",
    pages: "Páginas",

    // Signature & Footer
    officialSeal: "Sello Oficial",
    registrarOffice: "Dirección de Admisiones y Registro",
    academicDept: "Depto. Académico",
    treasurerOffice: "Tesorería Institucional",
    studentSignature: "Estudiante — Firma de recepción",
    coordinatorTitle: "Coordinación Académica",
    footerCode: "Código",
    footerGenerated: "Generado electrónicamente",
    footerPage: "Página",
    footerOf: "de",

    // Header
    accreditedBy: "Acreditada por SINAES",
    institutionalCode: "Código Institucional",
    issueDateLabel: "Emisión",

    // UI
    printDocument: "IMPRIMIR DOCUMENTO",
    customize: "Personalizar",
    institutionalConfig: "Configuración Institucional",
    universityName: "Nombre Universidad",
    logoUrl: "URL del Logo (Imagen)",
    faculty: "Facultad",
    department: "Departamento",
    accreditation: "Acreditación",
    registrarName: "Nombre del Registrador",
    personalInfo: "Información Personal",
    academicInfo: "Información Académica",
    validityPeriod: "Período de Vigencia",
    institution: "Institución",
    studentSection: "Estudiante",
    periodDetails: "Detalles del Período",
    paymentDetails: "Datos del Pago",
    academicData: "Datos Académicos",
    recipient: "Destinatario",
    content: "Contenido",
  },
};

export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (lang: Lang) => {
  const dict = translations[lang];
  return (key: TranslationKey): string | string[] => dict[key];
};

export const t = (lang: Lang, key: TranslationKey): any => {
  return translations[lang][key];
};
