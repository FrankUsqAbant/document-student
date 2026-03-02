<p align="center">
  <a href="https://FrankUsqAbant.github.io/document-student/">
    <img src="https://raw.githubusercontent.com/FrankUsqAbant/document-student/main/public/header-preview.png" alt="WOU Student Portal Header" width="100%">
  </a>
</p>

# 🎓 Portal del Estudiante - WOU

**Generador de Documentos Académicos Oficiales de Alta Fidelidad**

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <br/>
    <a href="#-características"><strong>Explorar Características</strong></a> · 
    <a href="#-despliegue"><strong>Demo en Vivo / Despliegue</strong></a>
  </p>

---

## 📖 Descripción General

Una aplicación web del lado del cliente altamente optimizada, diseñada exclusivamente para generar, previsualizar e imprimir documentos académicos oficiales para los estudiantes de Western Oregon University.

Esta robusta herramienta se centra en la **autenticidad del documento**, aplicando características de seguridad visuales, legales y criptográficas del mundo real, requeridas por los sistemas automáticos de verificación académica (como los OCR de Google Student o National Student Clearinghouse).

## 📑 Tabla de Contenidos

- [✨ Características Clave](#-características-clave)
- [📄 Documentos Soportados](#-documentos-soportados)
- [🛡️ Autenticidad y Seguridad](#️-autenticidad-y-seguridad)
- [📦 Desarrollo Local](#-desarrollo-local)
- [🚀 Despliegue](#-despliegue)

---

## ✨ Características Clave

- **📱 UI Responsiva Pixel-Perfect:** Se adapta de forma fluida desde pantallas móviles de 375px hasta monitores de escritorio ultrawide de 1536px.
- **🌍 Localización Instantánea:** Cambio bilingüe en tiempo real entre Inglés (EN) y Español (ES) en toda la interfaz y en todos los documentos PDF generados.
- **🖨️ Motor de Impresión a PDF:** Al hacer clic en "Imprimir Documento", se oculta la interfaz personalizable y se escala perfectamente el documento para impresión física o guardado en PDF (8.5"x11").
- **🗂️ Auto-Metadatos:** Asegura que los PDFs descargados tengan nombres de archivo institucionales oficiales (ej., `WOU_Academic_Transcript_987654373_20260301.pdf`).

## 📄 Documentos Soportados

El portal actualmente admite la generación de alta fidelidad de 7 registros oficiales distintos:

1. 🪪 **Carnet de Estudiante**
2. 📅 **Horario de Clases**
3. 💳 **Estado de Cuenta y Matrícula**
4. 📜 **Historial Académico** (Transcript)
5. 📝 **Recibo de Registro**
6. 🎓 **Verificación de Inscripción**
7. 🏛️ **Carta de Verificación Oficial**

---

## 🛡️ Autenticidad y Seguridad

Esta aplicación incorpora marcadores avanzados antifalsificación para evitar rechazos por parte de validadores automáticos:

- **Códigos de Barras 1D:** Genera códigos institucionales dinámicos usando `Libre Barcode 39`.
- **Firmas de Tinta Húmeda:** Firmas realistas en cursiva con la fuente _Great Vibes_, superpuestas con sellos universitarios semitransparentes (`mix-blend-mode: multiply`).
- **Malla de Papel de Seguridad:** Emula las marcas de agua geométricas del papel de oficina de registro.
- **Microimpresión:** Bordes de seguridad imperceptibles con el texto "VOID IF ALTERED".
- **Cláusulas Legales:** Incluye cláusulas de privacidad estrictas de **FERPA** y **NSC**.
- **Estándares Tipográficos:** Formato de fecha localizado siguiendo estándares oficiales.

---

## 📦 Desarrollo Local

¿Quieres ejecutar el portal en tu propia máquina? Es extremadamente ligero.

### 1. Requisitos Previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### 2. Instalación

Clona el repositorio e instala las dependencias mínimas:

```bash
git clone https://github.com/FrankUsqAbant/document-student.git
cd document-student
npm install
```

### 3. Ejecutar Servidor de Desarrollo

```bash
npm run dev
```

Navega a `http://localhost:5173` en tu navegador.

---

## 🚀 Despliegue

Este proyecto incluye un pipeline de CI/CD totalmente automatizado configurado para **GitHub Pages**.

Cada vez que realizas un _push_ a la rama `main`, una GitHub Action (`deploy.yml`) compila automáticamente el código fuente de TypeScript, lo optimiza y lo publica en vivo.

```bash
git add .
git commit -m "update: Tus cambios aquí"
git push origin main
```

_(El despliegue suele tardar unos 90 segundos en reflejarse en tu URL pública)._

---

<div align="center">
  <sub>Desarrollado con fines de demostración de UI/UX de alta fidelidad.</sub>
</div>
