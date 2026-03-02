import React from "react";
import { S } from "../../styles/theme";

interface FieldRowProps {
  label: string;
  value: any;
}

export const FieldRow: React.FC<FieldRowProps> = ({ label, value }) => (
  <div style={S.fRow}>
    <span style={S.fLabel}>{label}:</span>
    <span style={S.fVal}>{value || "—"}</span>
  </div>
);
