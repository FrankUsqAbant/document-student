import React from "react";

interface FieldRowProps {
  label: string;
  value: any;
}

export const FieldRow: React.FC<FieldRowProps> = ({ label, value }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    borderBottom: "1px dotted #cbd5e1",
    fontSize: "11px",
    lineHeight: "1.5"
  }}>
    <span style={{ color: "#475569", fontWeight: "600", letterSpacing: "0.01em" }}>
      {label}:
    </span>
    <span style={{ fontWeight: "700", color: "#0f172a", textAlign: "right" }}>
      {value || "—"}
    </span>
  </div>
);
