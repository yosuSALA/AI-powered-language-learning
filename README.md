# 🗣️ AI-Powered Language Learning

Plantilla web para aprender **cualquier idioma** con flashcards, lectura bilingue, vocabulario y un coach de IA que corrige tus respuestas en tiempo real.

> Cada quien configura su propia API de IA, elige su idioma, y personaliza su contenido.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57)
![i18n](https://img.shields.io/badge/i18n-6_languages-blue)

---

## ✨ Que incluye

| Feature | Que hace |
|---------|----------|
| **🃏 Flashcards** | Tarjetas interactivas con diferentes decks tematicos. Voltea, escribe tu respuesta, recibe feedback de la IA. |
| **🤖 AI Coach** | Escribe frases en el idioma que aprendes. La IA las corrige, te puntua, y te muestra como decirlo mejor. |
| **📚 Lector Bilingue** | Lee novelas o historias parrafo a parrafo: idioma que aprendes arriba, tu idioma abajo. Click en cualquier palabra para guardarla. |
| **📖 Vocabulario** | Diccionario de palabras organizado por tema. Marca las que ya sabes, enfocate en las que faltan. |
| **📤 Biblioteca** | Sube PDFs, EPUBs o Markdown para tu coleccion personal de material de estudio. |
| **🌍 Multi-idioma** | La interfaz se adapta al idioma que aprendes: 6 idiomas (ES/EN/FR/DE/PT/JA) con banderas y traducciones completas. |

---

## ⚡ Inicio rapido

```bash
# 1. Clonar
git clone https://github.com/yosuSALA/AI-powered-language-learning.git
cd AI-powered-language-learning

# 2. Instalar
npm install

# 3. Arrancar
npm run dev

# 4. Abrir
# http://localhost:3000
```

**Requisito:** Node.js 18+

### Primer paso: Configura tu API de IA

Sin una API key el coach funciona con validacion basica (fallback local). Para correcciones inteligentes:

1. Ve a **Settings** (`/settings`)
2. Selecciona un provider con "Quick Setup" o escribe tu endpoint
3. Pega tu API key
4. Haz clic en **"Probar conexion"**
5. Guarda

**Providers soportados** (cualquier API compatible con OpenAI):

| Provider | Gratis? | Modelo recomendado | API Key |
|----------|---------|-------------------|---------|
| **Groq** | ✅ Si | `llama-3.3-70b-versatile` | [console.groq.com](https://console.groq.com) |
| **Gemini** | ✅ Si | `gemini-2.0-flash` | [aistudio.google.com](https://aistudio.google.com/apikey) |
| **Ollama** | ✅ Local | `llama3.2` | No necesita |
| **OpenAI** | ❌ Pago | `gpt-4o-mini` | [platform.openai.com](https://platform.openai.com) |
| **DeepSeek** | 💰 Barato | `deepseek-chat` | [platform.deepseek.com](https://platform.deepseek.com) |

> **Tip:** Groq y Gemini son gratis y suficientes para empezar.

---

## 🌍 Idiomas

En **Settings** (`/settings`) eliges:
- **Aprendiendo** — el idioma que quieres aprender
- **Mi idioma** — tu idioma nativo

La interfaz se traduce automaticamente (navegacion, home, settings, ayuda). El AI Coach te explicara en tu idioma nativo.

---

## 📁 Estructura

```
├── data/
│   ├── config.json              # Tu configuracion (API, idiomas, sitio)
│   ├── courses.json             # Cursos de vocabulario
│   ├── flashcards_vocabulario.json  # Palabras guardadas
│   ├── novels/
│   │   ├── index.json           # Indice de novelas
│   │   └── *.json               # Datos de capítulos
│   ├── exercises.json           # Ejercicios
│   ├── flashcards.json          # Flashcards extra
│   └── summaries.json           # Resumenes
│
├── src/
│   ├── app/
│   │   ├── page.tsx             # Home
│   │   ├── settings/page.tsx    # Configuracion + Help
│   │   ├── ingles/              # Modulo de flashcards
│   │   ├── vocabulario/         # Diccionario + flashcards
│   │   ├── novelas/             # Lector bilingue
│   │   ├── biblioteca/          # Subir libros
│   │   └── api/
│   │       ├── english-coach/   # POST: IA corrige respuestas
│   │       ├── settings/        # GET/POST configuracion
│   │       ├── vocabulario/     # Progreso de vocabulario
│   │       ├── novels/          # Datos de novelas
│   │       ├── books/           # CRUD de libros
│   │       └── progress/        # Progreso general
│   │
│   ├── components/
│   │   ├── Navigation.tsx       # Sidebar (se traduce solo)
│   │   ├── EnglishFlashcardTrainer.tsx
│   │   ├── BookUpload.tsx
│   │   └── ProgressBadge.tsx
│   │
│   └── lib/
│       ├── i18n.ts              # Traducciones (6 idiomas)
│       ├── useLocale.ts         # Hook de idioma
│       ├── types.ts             # Tipos TypeScript
│       ├── db.ts                # SQLite
│       ├── content.ts           # Carga de datos
│       ├── english-flashcards.ts # Flashcards de ejemplo
│       └── seo.ts               # Metadata SEO
│
├── db/                          # SQLite (auto-creada)
└── uploads/                     # Libros subidos (auto-creada)
```

---

## 🎯 Personalizar

### Flashcards

Edita `src/lib/english-flashcards.ts` para agregar tus propias tarjetas:

```typescript
{
  id: "custom-1",
  deck: "travel",           // Categoria
  level: "A2",              // Nivel
  front: "boarding pass",   // Palabra/frase
  meaningEs: "tarjeta de embarque",
  phrase: "I need my boarding pass.",
  prompt: "What document do you need at the airport?",
  idealAnswer: "I need my boarding pass and passport.",
  hint: "Use: I need my...",
}
```

### Vocabulario

Edita `data/courses.json` para agregar tus cursos de palabras:

```json
{
  "id": "my-course",
  "name": "Travel Words",
  "nameEs": "Palabras de viaje",
  "vocabulary": [
    { "en": "airport", "es": "aeropuerto", "definition": "Place for air travel" }
  ]
}
```

### Novelas

1. Crea un JSON en `data/novels/` (mira `sample-story.json` como ejemplo)
2. Registra la serie en `data/novels/index.json`
3. Importa en `src/app/novelas/[slug]/page.tsx` y en las API routes

---

## 🛠️ Comandos

```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build de produccion
npm run start    # Servidor de produccion
npm run lint     # Linting
```

---

## 📦 Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4
- **Backend:** Next.js API Routes
- **Database:** SQLite (better-sqlite3, WAL mode)
- **AI:** API generica OpenAI-compatible (Groq, Gemini, OpenAI, Ollama, etc.)
- **i18n:** 6 idiomas con traducciones completas (ES/EN/FR/DE/PT/JA)
- **Deploy:** Vercel, Docker, o cualquier VPS

---

## 📄 Licencia

MIT — Usa esta plantilla para lo que quieras.
