import React from "react";
import { S } from "../../styles/theme";
import { CodeService } from "../../services/codeService";
import { t } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";

interface DocumentFooterProps {
  docCode: string;
  page?: number;
  total?: number;
  lang: Lang;
}

export const DocumentFooter: React.FC<DocumentFooterProps> = ({
  docCode,
  page = 1,
  total = 1,
  lang,
}) => (
  <div style={S.footer}>
    <span>
      {t(lang, "footerCode")}: <strong>{docCode}</strong>
    </span>
    <span>
      {t(lang, "footerGenerated")} — {CodeService.now(lang)}
    </span>
    <span>
      {t(lang, "footerPage")} {page} {t(lang, "footerOf")} {total}
    </span>
  </div>
);
