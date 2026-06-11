# 🗣️ AI-Powered Language Learning

Plataforma web para aprender idiomas con **flashcards inteligentes**, **lectura bilingue de novelas**, **vocabulario interactivo** y un **coach de IA** que corrige tus respuestas.

> Plantilla listo para usar. Clonala, personaliza los datos, y empieza a estudiar.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57)

---

## ✨ Funcionalidades

| Feature | Descripcion |
|---------|-------------|
| **🃏 English Flashcards** | 20+ tarjetas en 5 decks temáticos (anime, tech, gym, AWS, laptops). Click para voltear, escribe tu respuesta y recibe corrección con IA. |
| **🤖 AI Coach** | Cuando escribes una respuesta, la IA la corrige, te da una puntuación, y te muestra una versión mejorada. Funciona con cualquier API compatible (OpenAI, Groq, Gemini, Ollama, etc.). |
| **📚 Bilingual Reader** | Novelar ligeras (Mushoku Tensei, Re:Zero) parrafo a parrafo: inglés arriba, español abajo. Click en cualquier palabra para guardarla. |
| **📖 Vocabulario** | Diccionario organizado por curso/tema. Marca palabras como conocidas, filtra las que faltan por aprender. |
| **📤 Biblioteca** | Sube PDFs, EPUBs, TXT o Markdown para tu colección personal de material de estudio. |
| **📊 Progress Tracking** | SQLite para persistir progreso de vocabulario, cursos y tareas de estudio. |

---

## 🚀 Instalación

```bash
# 1. Clonar
git clone https://github.com/yosuSALA/AI-powered-language-learning.git
cd AI-powered-language-learning

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
open http://localhost:3000
```

**Requisitos:** Node.js 18+ instalado.

---

## 📁 Estructura del Proyecto

```
├── data/
│   ├── courses.json              # Cursos de vocabulario (personaliza aquí)
│   ├── flashcards_vocabulario.json # Palabras guardadas desde la lectura
│   ├── novels/
│   │   ├── index.json            # Índice de novelas disponibles
│   │   └── sample-story.json     # Datos de capítulos (EN/ES)
│   ├── exercises.json            # Ejercicios por curso
│   ├── flashcards.json           # Flashcards adicionales
│   └── summaries.json            # Resúmenes por curso
│
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home — dashboard principal
│   │   ├── ingles/               # Módulo de inglés
│   │   │   ├── page.tsx          # Plan de estudio + módulos
│   │   │   └── flashcards/       # Flashcards interactivas
│   │   ├── vocabulario/          # Diccionario de vocabulario
│   │   │   ├── page.tsx          # Lista de términos
│   │   │   └── flashcards/       # Flashcards de vocabulario
│   │   ├── novelas/              # Lector bilingüe
│   │   │   ├── page.tsx          # Índice de novelas
│   │   │   └── [slug]/           # Serie → Capítulos
│   │   │       └── [chapter]/    # Lector parrafo a parrafo
│   │   ├── biblioteca/           # Gestión de libros
│   │   └── api/
│   │       ├── english-coach/    # POST: IA corrige respuestas
│   │       ├── vocabulario/      # GET/POST progreso de términos
│   │       ├── novels/           # GET datos de novelas
│   │       ├── books/            # CRUD de libros
│   │       └── progress/         # GET/POST progreso general
│   │
│   ├── components/
│   │   ├── Navigation.tsx        # Sidebar de navegación
│   │   ├── EnglishFlashcardTrainer.tsx  # Trainer de flashcards con IA
│   │   ├── BookUpload.tsx        # Drag & drop para libros
│   │   └── ProgressBadge.tsx     # Badge de estado
│   │
│   └── lib/
│       ├── types.ts              # Tipos TypeScript
│       ├── db.ts                 # SQLite (better-sqlite3)
│       ├── content.ts            # Carga de datos JSON
│       ├── english-flashcards.ts # Flashcards de inglés
│       └── seo.ts                # Metadata SEO
│
├── db/                           # Base de datos SQLite (auto-creada)
└── uploads/                      # Libros subidos (auto-creada)
```

---

## 🎯 Cómo Personalizar

### 1. Agregar tus propias flashcards de inglés

Edita `src/lib/english-flashcards.ts`:

```typescript
{
  id: "my-custom-1",           // ID único
  deck: "travel",              // Categoría: anime | cs | gym | aws | reselling
  level: "A2",                 // Nivel: A2 | B1
  front: "boarding pass",      // Palabra/frase en inglés
  meaningEs: "tarjeta de embarque",
  phrase: "I need my boarding pass to get on the plane.",
  prompt: "What document do you need at the airport?",
  idealAnswer: "I need my boarding pass and my passport.",
  hint: "Use: I need my...",
}
```

### 2. Agregar cursos de vocabulario

Edita `data/courses.json`:

```json
[
  {
    "id": "my-course",
    "name": "My Course Name",
    "nameEs": "Mi Curso",
    "description": "Description in English",
    "descriptionEs": "Descripción en español",
    "url": "",
    "vocabulary": [
      { "en": "word", "es": "palabra", "definition": "English definition", "definitionEn": "Context in English" }
    ]
  }
]
```

### 3. Agregar novelas para leer

1. Crea un archivo JSON en `data/novels/` con la estructura del capítulo (mira `sample-story.json` como ejemplo)
2. Registra la serie en `data/novels/index.json`
3. Agrega el import en `src/app/novelas/[slug]/page.tsx` y en las API routes

Estructura de un capítulo:

```json
{
  "id": "ch1",
  "number": 1,
  "title_en": "Chapter Title",
  "title_es": "Título del Capítulo",
  "volume": 1,
  "reading_time_min": 10,
  "source": "source",
  "paragraphs": [
    {
      "id": "p1",
      "en": "English paragraph here.",
      "es": "Párrafo en español aquí."
    }
  ],
  "vocabulario_destacado": [
    { "word": "highlighted", "translation": "destacado", "pos": "adjective" }
  ]
}
```

### 4. Configurar el AI Coach (recomendado)

El coach funciona sin IA (fallback local), pero para correcciones inteligentes configura tu API desde la página de **Settings** (`/settings`).

**Quick setup** — selecciona un preset y pega tu API key:

| Provider | Endpoint | Modelos populares | API Key |
|----------|----------|-------------------|---------|
| **OpenAI** | `api.openai.com/v1/chat/completions` | `gpt-4o-mini`, `gpt-4o` | `sk-...` |
| **Groq** | `api.groq.com/openai/v1/chat/completions` | `llama-3.3-70b-versatile` | `gsk_...` |
| **Gemini** | `generativelanguage.googleapis.com/v1beta/openai/chat/completions` | `gemini-2.0-flash` | `AIza...` |
| **Ollama** (local) | `localhost:11434/v1/chat/completions` | `llama3.2`, `mistral` | No necesaria |
| **DeepSeek** | `api.deepseek.com/v1/chat/completions` | `deepseek-chat` | `sk-...` |

O edita `data/config.json` directamente:

```json
{
  "ai": {
    "apiEndpoint": "https://api.groq.com/openai/v1/chat/completions",
    "apiKey": "gsk_tu_api_key_aqui",
    "model": "llama-3.3-70b-versatile"
  }
}
```

### 5. Cambiar idiomas

En **Settings** (`/settings`) selecciona:
- **Aprendiendo** — el idioma que quieres aprender (EN, FR, DE, JP, etc.)
- **Mi idioma** — tu idioma nativo (ES, PT, etc.)

Esto afecta las correcciones del AI Coach (te explicara en tu idioma nativo).

---

## 🛠️ Scripts

```bash
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Build de producción
npm run start    # Iniciar servidor de producción
npm run lint     # Linting con ESLint
```

---

## 📦 Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4
- **Backend:** Next.js API Routes (Edge + Node.js)
- **Database:** SQLite via better-sqlite3 (WAL mode)
- **AI:** API genérica compatible con OpenAI (OpenAI, Groq, Gemini, Ollama, DeepSeek, etc.)
- **Config:** Settings page con presets, test de conexión, multi-idioma
- **Deploy:** Compatible con Vercel, Docker, o cualquier VPS

---

## 📄 Licencia

MIT — Usa esta plantilla para lo que quieras.

---

*Creado como plantilla de estudio de idiomas. Personaliza los decks, cursos, y novelas a tu gusto.*
