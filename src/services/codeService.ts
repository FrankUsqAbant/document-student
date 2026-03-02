import type { Lang } from "../i18n/translations";

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
  currency: (n: number, lang: Lang = "es") => {
    if (lang === "en") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(n);
    }
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(n);
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
