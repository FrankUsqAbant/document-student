import React, { useState, memo } from "react";
import { S } from "../../styles/theme";

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  type?: "text" | "date" | "number" | "textarea" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = memo(({
  label,
  name,
  value,
  onChange,
  type = "text",
  options,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = {
    ...S.ui.input,
    ...(isFocused ? S.ui.inputFocus : {}),
  };

  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={S.ui.label}>{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value ?? ""}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={
            { ...inputStyle, minHeight: "100px", resize: "vertical" } as any
          }
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyle as any}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={inputStyle as any}
        />
      )}
    </div>
  );
});

FormField.displayName = "FormField";
