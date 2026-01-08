# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
📚 AI Study Buddy

AI Study Buddy este o aplicație web care transformă orice text într-o lecție clară și ușor de înțeles, folosind inteligență artificială. Aplicația este gândită pentru elevi și studenți care vor să învețe mai eficient și mai rapid.

🚀 Funcționalități

✨ Transformă un text introdus într-o lecție structurată

🤖 Integrare cu AI (Gemini API)

⚡ Interfață modernă și rapidă (React + Vite)

🌐 Backend serverless folosind Vercel API Routes

🔐 Chei API gestionate prin Environment Variables

📱 Design responsive

🛠️ Tehnologii folosite

Frontend: React, Vite, Tailwind CSS

Backend: Vercel API Routes (Serverless Functions)

AI: Google Gemini API

Deployment: Vercel

Version Control: Git & GitHub

## 📂 Structura proiectului

ai-study-buddy
├─ api/ # Backend (Vercel API Routes)
│ └─ generate.js
├─ src/ # Frontend React
│ └─ App.jsx
├─ public/
├─ server/ # Backend local (doar pentru development)
├─ package.json
└─ README.md

## 🌍 Deployment
Aplicația este deployată pe Vercel.  
Backend-ul este implementat folosind Vercel API Routes, fără server Express persistent.

---

## 🧠 Ce am învățat din acest proiect
- Diferența dintre backend local și backend serverless
- Cum să folosesc Vercel API Routes
- Gestionarea Environment Variables în producție
- Debugging pentru erori de tip „Failed to fetch” și „Internal Server Error”
- Integrarea unui API AI într-o aplicație full-stack

---

## 📌 Îmbunătățiri viitoare
- Salvarea lecțiilor generate
- Export lecții în PDF
- Autentificare utilizatori
- Quiz interactiv
- Istoric de învățare

---

## 👩‍💻 Autor
Lorena  
GitHub: https://github.com/lorena7505

---

✨ AI Study Buddy – Learn smarter, not harder.
