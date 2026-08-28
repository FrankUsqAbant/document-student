export const CodeService = {
  generate: (prefix: string) => {
    // Generate realistic university document codes
    // Format: PREFIX-YYMM-NNNNNN (e.g. TID-2501-004373)
    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const seq = String(Math.floor(Math.random() * 9000) + 1000).padStart(
      6,
      "0",
    );
    return `${prefix}-${yy}${mm}-${seq}`;
  },
  currency: (n: number, countryOrCode: string = "USD", symbol?: string) => {
    const code = countryOrCode?.toLowerCase() || "";
    if (code === "pen" || code === "pe" || symbol === "S/.") {
      return `S/. ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (code === "inr" || code === "in" || symbol === "₹") {
      return `₹ ${(n * 12).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
    }
    if (code === "cad" || code === "ca") {
      return `CAD $${n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },
  date: (val: string, lang: "en" | "es" = "en") => {
    if (!val) return "";
    try {
      const d = new Date(val);
      // We want dates like Jan 06, 2025 for authentic US documents
      if (lang === "en") {
        return d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      }
      return d.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return val;
    }
  },
  now: (lang: "en" | "es" = "en") => {
    const d = new Date();
    if (lang === "en") {
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    }
    return d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  },
};
