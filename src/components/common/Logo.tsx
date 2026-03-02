import React from "react";

interface LogoProps {
  src?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ src, size = 78 }) => {
  if (src) {
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
          background: "#fff",
          border: "2px solid #c9a84c",
          padding: "4px",
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

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="39"
        cy="39"
        r="37"
        fill="#1a1a2e"
        stroke="#c9a84c"
        strokeWidth="2.5"
      />
      <circle
        cx="39"
        cy="39"
        r="30"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <path
        d="M39 12 L62 24 L62 44 C62 56 52 66 39 70 C26 66 16 56 16 44 L16 24 Z"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="1.5"
      />
      <path
        d="M39 18 L57 28 L57 44 C57 53 49 61 39 64 C29 61 21 53 21 44 L21 28 Z"
        fill="rgba(201,168,76,0.1)"
      />
      <text
        x="39"
        y="43"
        textAnchor="middle"
        fill="#c9a84c"
        fontSize="16"
        fontWeight="900"
        fontFamily="serif"
        letterSpacing="1"
      >
        WOU
      </text>
      <text
        x="39"
        y="55"
        textAnchor="middle"
        fill="#c9a84c"
        fontSize="5.5"
        fontFamily="serif"
        letterSpacing="1.5"
      >
        FOUNDED 1856
      </text>
    </svg>
  );
};
