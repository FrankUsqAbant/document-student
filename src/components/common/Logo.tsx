import React from "react";

interface LogoProps {
  src?: string;
  size?: number;
  institution?: any;
}

export const Logo: React.FC<LogoProps> = ({ src, size = 78, institution }) => {
  // If user uploaded a custom logo image (base64 or custom URL)
  if (src && !src.includes("wou-logo.webp")) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          border: "2px solid #c9a84c",
          padding: "4px",
          boxSizing: "border-box",
        }}
      >
        <img
          src={src}
          alt="Logo"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  const countryCode = institution?.countryCode || "us";

  // 1. PERÚ: Universidad Nacional de Ucayali (UNU) Official Emblem
  if (countryCode === "pe" || institution?.id === "unu-pe" || institution?.id === "unt-pe") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Ring in Amazonian Green and Gold */}
        <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#047857" strokeWidth="3" />
        <circle cx="50" cy="50" r="44" fill="#f0fdf4" stroke="#d97706" strokeWidth="1.2" strokeDasharray="2.5 1.5" />

        {/* Amazonian Sun & Rays */}
        <circle cx="50" cy="30" r="8" fill="#f59e0b" stroke="#d97706" strokeWidth="0.8" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
          <line
            key={idx}
            x1="50"
            y1="30"
            x2={50 + 11 * Math.cos((angle * Math.PI) / 180)}
            y2={30 + 11 * Math.sin((angle * Math.PI) / 180)}
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        ))}

        {/* Sacred Flame of Science & Wisdom (Torch of UNU) */}
        <path d="M50 22 C53 26 56 29 56 34 C56 38 53 41 50 43 C47 41 44 38 44 34 C44 29 47 26 50 22 Z" fill="#ef4444" />
        <path d="M50 26 C51.5 29 53 31 53 34 C53 36 51.5 38 50 39 C48.5 38 47 36 47 34 C47 31 48.5 29 50 26 Z" fill="#fde047" />

        {/* Open Book of Knowledge */}
        <path d="M33 46 Q50 42 50 48 Q50 42 67 46 L67 62 Q50 58 50 64 Q50 58 33 62 Z" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
        <line x1="50" y1="48" x2="50" y2="64" stroke="#047857" strokeWidth="1.5" />

        {/* Amazonian River Ucayali Waves */}
        <path d="M36 67 Q43 64 50 67 Q57 70 64 67" stroke="#0284c7" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M38 71 Q44 68 50 71 Q56 74 62 71" stroke="#0284c7" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Amazon Laurel / Palm Fronds */}
        <path d="M25 58 C23 46 27 34 33 26" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M75 58 C77 46 73 34 67 26" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* UNU Monogram */}
        <text x="50" y="58" textAnchor="middle" fill="#065f46" fontSize="9.5" fontWeight="900" fontFamily="'Inter', sans-serif" letterSpacing="0.8">UNU</text>

        {/* Bottom Year and City Banner */}
        <rect x="24" y="78" width="52" height="12" rx="2" fill="#047857" stroke="#d97706" strokeWidth="0.8" />
        <text x="50" y="86.5" textAnchor="middle" fill="#ffffff" fontSize="6.2" fontWeight="800" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.8">PUCALLPA · 1979</text>
      </svg>
    );
  }

  // 2. CANADÁ: Simon Fraser University (SFU) Official Coat of Arms
  if (countryCode === "ca" || institution?.id === "sfu-ca") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#a6192e" strokeWidth="3" />
        <circle cx="50" cy="50" r="44" fill="#f8fafc" stroke="#002b49" strokeWidth="1" strokeDasharray="3 2" />
        {/* Heraldic Shield */}
        <path d="M30 22 L70 22 L70 54 C70 68 58 78 50 82 C42 78 30 68 30 54 Z" fill="#a6192e" stroke="#002b49" strokeWidth="2" />
        {/* Castle Tower */}
        <rect x="42" y="28" width="16" height="11" fill="#ffffff" stroke="#002b49" strokeWidth="1" />
        <path d="M42 28 L45 28 L45 31 L48 31 L48 28 L52 28 L52 31 L55 31 L55 28 L58 28" stroke="#002b49" strokeWidth="1" fill="none" />
        {/* Open Book */}
        <path d="M36 47 Q50 43 50 48 Q50 43 64 47 L64 61 Q50 57 50 62 Q50 57 36 61 Z" fill="#ffffff" stroke="#002b49" strokeWidth="1.5" />
        <line x1="50" y1="48" x2="50" y2="62" stroke="#002b49" strokeWidth="1.5" />
        <text x="50" y="74" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="'Inter', sans-serif" letterSpacing="0.8">SFU</text>
        {/* Lower Banner */}
        <rect x="25" y="83" width="50" height="11" rx="2" fill="#002b49" />
        <text x="50" y="91" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="800" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.8">CANADA · 1965</text>
      </svg>
    );
  }

  // 3. INDIA: BITS Pilani (Birla Institute of Technology and Science) Emblem
  if (countryCode === "in" || institution?.id === "bits-in") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#1e3a8a" strokeWidth="3" />
        <circle cx="50" cy="50" r="44" fill="#fefce8" stroke="#b45309" strokeWidth="1" strokeDasharray="3 2" />
        {/* Chakra / Scientific Core */}
        <circle cx="50" cy="46" r="22" fill="#1e3a8a" stroke="#d97706" strokeWidth="2" />
        {/* Diya / Sacred Flame */}
        <path d="M50 28 C53 34 57 38 57 44 C57 48 54 52 50 54 C46 52 43 48 43 44 C43 38 47 34 50 28 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
        <path d="M50 34 C51.5 38 54 40 54 44 C54 46 52 48 50 50 C48 48 46 46 46 44 C46 40 48.5 38 50 34 Z" fill="#ef4444" />
        <path d="M38 52 Q50 50 62 52 C60 58 40 58 38 52 Z" fill="#d97706" stroke="#92400e" strokeWidth="1" />
        {/* BITS Text */}
        <text x="50" y="66" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900" fontFamily="'Inter', sans-serif" letterSpacing="1">BITS</text>
        {/* Ribbon */}
        <rect x="25" y="78" width="50" height="12" rx="2" fill="#1e3a8a" />
        <text x="50" y="86.5" textAnchor="middle" fill="#fde68a" fontSize="6.5" fontWeight="800" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.8">PILANI · INDIA</text>
      </svg>
    );
  }

  // 4. USA: Western Oregon University (WOU) Wolves Torch Crest (Default)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#991b1b" strokeWidth="3" />
      <circle cx="50" cy="50" r="44" fill="#fafafa" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 2" />
      {/* Heraldic Shield */}
      <path d="M50 16 L74 28 L74 54 C74 68 62 80 50 85 C38 80 26 68 26 54 L26 28 Z" fill="#1e293b" stroke="#d4af37" strokeWidth="2" />
      {/* Outer Flame */}
      <path d="M50 26 C54 36 64 42 64 54 C64 62 58 68 50 72 C42 68 36 62 36 54 C36 42 46 36 50 26 Z" fill="#dc2626" />
      {/* Inner Flame */}
      <path d="M50 36 C52 42 58 46 58 54 C58 59 54 63 50 66 C46 63 42 59 42 54 C42 46 48 42 50 36 Z" fill="#f59e0b" />
      {/* Monogram */}
      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="'Inter', sans-serif" letterSpacing="1">WOU</text>
      {/* Year */}
      <text x="50" y="93" textAnchor="middle" fill="#991b1b" fontSize="7" fontWeight="800" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">OREGON · 1856</text>
    </svg>
  );
};
