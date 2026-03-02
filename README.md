# 🎓 WOU Student Portal - Document Generator

![WOU Student Portal](public/header-preview.png)

A high-fidelity, client-side web application designed to generate and preview official academic documents for Western Oregon University students. This project focuses on authenticity, applying cryptographic and visual security features required by automated academic verification systems.

## ✨ Features

- **🛡️ Authentic Security Features:**
  - Micro-mesh security paper backgrounds (watermarks).
  - 1D Barcode generation (Libre Barcode 39) for automated scanner parsing.
  - Authentic "wet ink" cursive signatures overlapping with semi-transparent official seals.
  - Micro-printed security borders ("VOID IF ALTERED").
  - Included legal clauses (FERPA & National Student Clearinghouse).
  - Strict US date formatting (e.g., `Jan 06, 2025`).
- **📱 Responsive Design:** Fully responsive layout adapting perfectly from 375px mobile screens up to 1536px desktop monitors.
- **🌐 Bilingual Support:** Instant toggle between English (EN) and Spanish (ES) across all generated documents and UI elements.
- **📄 Document Types:**
  1. Student ID Card
  2. Class Schedule
  3. Tuition Receipt
  4. Academic Transcript
  5. Registration Receipt
  6. Enrollment Verification
  7. Official Verification Letter
- **🖨️ Print-Ready:** Pressing "Print Document" hides the UI application and perfectly formats the generated document for PDF saving or physical printing with an institutional filename (e.g., `WOU_Academic_Transcript_987654373_20260301.pdf`).

## 🛠️ Technologies

- **React 18**
- **TypeScript**
- **Vite**
- **CSS3** (Custom responsive reset, zero heavy CSS frameworks)
- **Lucide React** (Icons)

## 🚀 Quick Start (Local Development)

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit `http://localhost:5173`

## 🌍 GitHub Pages Deployment

This project is fully optimized for GitHub pages deploy (`base: './'` is already configured in Vite). The production bundle is highly optimized (~254 kB).

```bash
# Initialize and commit
git init
git add .
git commit -m "Initial commit - WOU Student Portal"

# Push to your repository
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

To deploy: Go to your repository **Settings > Pages**, choose **GitHub Actions** as the source, and use the Vite template.

---

_Disclaimer: This is a front-end UI demonstration project._
