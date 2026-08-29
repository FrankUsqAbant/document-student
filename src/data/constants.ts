export interface UniversityModel {
  id: string;
  country: string;
  countryCode: "pe" | "ca" | "in" | "us";
  countryFlag: string;
  name: string;
  faculty: string;
  department: string;
  address: string;
  phone: string;
  email: string;
  code: string;
  accreditation: string;
  registrar: string;
  rector: string;
  city: string;
  logo: string;
  currency: string;
  currencySymbol: string;
  gradingSystem: string;
  sealText: string;
  sealColor: string;
  badgeLabel: string;
  systemName: string;
}

export const UNIVERSITIES: UniversityModel[] = [
  {
    id: "wou-us",
    country: "United States",
    countryCode: "us",
    countryFlag: "🇺🇸",
    name: "Western Oregon University",
    faculty: "College of Business & Computing",
    department: "Department of Marketing & Analytics",
    address: "345 Monmouth Ave N, Monmouth, OR 97361, USA",
    phone: "(503) 838-8000",
    email: "registrar@wou.edu",
    code: "WOU-MKT-001",
    accreditation: "Accredited by NWCCU · Code: WOU-001",
    registrar: "Dr. Carmen Rodríguez Vargas",
    rector: "Dr. Jesse Peters (President)",
    city: "Monmouth, Oregon",
    logo: "./assets/wou-logo.webp",
    currency: "USD ($)",
    currencySymbol: "$",
    gradingSystem: "GPA 4.0 Scale",
    sealText: "WESTERN OREGON UNIVERSITY · REGISTRAR",
    sealColor: "#1e3a8a",
    badgeLabel: "WOU OFFICIAL PORTAL",
    systemName: "WOU Student Portal",
  },
  {
    id: "unu-pe",
    country: "Perú",
    countryCode: "pe",
    countryFlag: "🇵🇪",
    name: "Universidad Nacional de Ucayali",
    faculty: "Facultad de Ciencias Económicas, Administrativas y Contables",
    department: "Escuela Profesional de Administración",
    address: "Carretera Federico Basadre Km. 6.000, Pucallpa, Ucayali, Perú",
    phone: "+51 (061) 57-5030",
    email: "registros.academicos@unu.edu.pe",
    code: "UNU-SUNEDU-052",
    accreditation: "Licenciada por SUNEDU · Res. N° 149-2018-SUNEDU/CD",
    registrar: "Dra. Teresa de Jesús Silva Delgado",
    rector: "Dr. Edgardo Leoncio Braúl Gomero (Rector)",
    city: "Pucallpa, Ucayali",
    logo: "./assets/wou-logo.webp",
    currency: "PEN (S/.)",
    currencySymbol: "S/.",
    gradingSystem: "Escala Vigesimal (0 - 20)",
    sealText: "REPÚBLICA DEL PERÚ · UNIV. NACIONAL DE UCAYALI",
    sealColor: "#047857",
    badgeLabel: "SISTEMA SUNEDU PERÚ · UNU",
    systemName: "Portal Académico UNU · Pucallpa",
  },
  {
    id: "sfu-ca",
    country: "Canada",
    countryCode: "ca",
    countryFlag: "🇨🇦",
    name: "Simon Fraser University",
    faculty: "Beedie School of Business",
    department: "Undergraduate Business Administration",
    address: "8888 University Dr, Burnaby, BC V5A 1S6, Canada",
    phone: "+1 (778) 782-6930",
    email: "student_services@sfu.ca",
    code: "SFU-BC-4102",
    accreditation: "BC Ministry of Higher Education · DLI #O19279164102",
    registrar: "Rummana Khan Hemani (Registrar)",
    rector: "Dr. Joy Johnson (President & Vice-Chancellor)",
    city: "Burnaby, British Columbia",
    logo: "./assets/wou-logo.webp",
    currency: "CAD ($)",
    currencySymbol: "$",
    gradingSystem: "Cumulative CGPA 4.33 Scale",
    sealText: "SIMON FRASER UNIVERSITY · REGISTRAR'S OFFICE",
    sealColor: "#065f46",
    badgeLabel: "SFU STUDENT SERVICES",
    systemName: "SFU Student Information System",
  },
  {
    id: "bits-in",
    country: "India",
    countryCode: "in",
    countryFlag: "🇮🇳",
    name: "Birla Institute of Technology and Science (BITS Pilani)",
    faculty: "Faculty of Management & Engineering Studies",
    department: "Department of Management & Technology",
    address: "Vidya Vihar Campus, Pilani, Rajasthan 333031, India",
    phone: "+91 1596 242210",
    email: "academic.reg@pilani.bits-pilani.ac.in",
    code: "BITS-PIL-UGC-018",
    accreditation: "UGC Approved · Deemed University · NAAC 'A' Grade",
    registrar: "Prof. Sudhirkumar Barai (Director)",
    rector: "Prof. V. Ramgopal Rao (Vice-Chancellor)",
    city: "Pilani, Rajasthan",
    logo: "./assets/wou-logo.webp",
    currency: "INR (₹)",
    currencySymbol: "₹",
    gradingSystem: "10-Point CGPA Scale",
    sealText: "BITS PILANI · CONTROLLER OF EXAMINATIONS",
    sealColor: "#7c2d12",
    badgeLabel: "BITS ACADEMIC EMEDIATION",
    systemName: "BITS Pilani Student ERP",
  },
];

export const INSTITUTION = UNIVERSITIES[0];

export const DOC_TYPES = [
  {
    key: "studentCard",
    en: "Student ID Card",
    es: "Carné de Estudiante",
    icon: "🪪",
  },
  {
    key: "schedule",
    en: "Class Schedule",
    es: "Horario de Clases",
    icon: "📅",
  },
  {
    key: "tuitionReceipt",
    en: "Tuition Statement",
    es: "Estado de Cuenta / Matrícula",
    icon: "💳",
  },
  {
    key: "transcript",
    en: "Academic Transcript",
    es: "Récord Académico / Notas",
    icon: "📜",
  },
  {
    key: "registrationReceipt",
    en: "Registration Receipt",
    es: "Comprobante de Registro",
    icon: "📋",
  },
  {
    key: "enrollmentVerification",
    en: "Enrollment Verification",
    es: "Constancia de Matrícula",
    icon: "📄",
  },
  {
    key: "officialLetter",
    en: "Official Letter",
    es: "Carta Oficial Institucional",
    icon: "📨",
  },
];
