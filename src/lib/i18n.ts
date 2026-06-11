export type Locale = "es" | "en" | "fr" | "de" | "pt" | "ja";

export const LOCALES: Record<Locale, { flag: string; nativeName: string; name: string }> = {
  es: { flag: "🇪🇸", nativeName: "Español", name: "Spanish" },
  en: { flag: "🇺🇸", nativeName: "English", name: "English" },
  fr: { flag: "🇫🇷", nativeName: "Français", name: "French" },
  de: { flag: "🇩🇪", nativeName: "Deutsch", name: "German" },
  pt: { flag: "🇧🇷", nativeName: "Português", name: "Portuguese" },
  ja: { flag: "🇯🇵", nativeName: "日本語", name: "Japanese" },
};

export const LANGUAGES_LIST: { code: Locale; flag: string; name: string; nativeName: string }[] = [
  { code: "es", flag: "🇪🇸", name: "Spanish", nativeName: "Español" },
  { code: "en", flag: "🇺🇸", name: "English", nativeName: "English" },
  { code: "fr", flag: "🇫🇷", name: "French", nativeName: "Français" },
  { code: "de", flag: "🇩🇪", name: "German", nativeName: "Deutsch" },
  { code: "pt", flag: "🇧🇷", name: "Portuguese", nativeName: "Português" },
  { code: "ja", flag: "🇯🇵", name: "Japanese", nativeName: "日本語" },
];

const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.language": "Idioma",
    "nav.library": "Biblioteca",
    "nav.novels": "Novelas",
    "nav.vocabulary": "Vocabulario",
    "nav.settings": "Configuración",

    // Home
    "home.title": "Aprende Idiomas",
    "home.subtitle": "Flashcards inteligentes, lectura bilingüe de novelas, vocabulario interactivo y un coach de IA que corrige tus respuestas.",
    "home.howItWorks": "Cómo funciona",
    "home.getStarted": "Empezar",

    "home.flashcards.title": "Flashcards",
    "home.flashcards.desc": "Practica vocabulario con tarjetas interactivas",

    "home.reader.title": "Lectura",
    "home.reader.desc": "Lee historias bilingües párrafo a párrafo",

    "home.coach.title": "AI Coach",
    "home.coach.desc": "Escribe en inglés y recibe correcciones al instante",

    "home.library.title": "Subir libros",
    "home.library.desc": "Sube PDFs y EPUBs para tu biblioteca personal",

    "home.step1": "Instala dependencias: npm install",
    "home.step2": "Ejecuta el servidor: npm run dev",
    "home.step3": "Abre localhost:3000 en tu navegador",
    "home.step4": "Personaliza las flashcards en data/courses.json",
    "home.step5": "Opcional: Agrega novelas en data/novels/",

    // Settings
    "settings.title": "Configuración",
    "settings.subtitle": "Configura tu API de IA, idiomas, y preferencias del sitio.",

    "settings.aiProvider": "AI Provider",
    "settings.aiProviderDesc": "Conecta cualquier API compatible con OpenAI. El coach de IA corregirá tus respuestas.",

    "settings.quickSetup": "Configuración rápida",
    "settings.endpoint": "API Endpoint",
    "settings.apiKey": "API Key",
    "settings.model": "Modelo",

    "settings.maxTokens": "Máx. Tokens",
    "settings.temperature": "Temperatura",

    "settings.testConnection": "Probar conexión",
    "settings.testing": "Probando...",
    "settings.connectionOk": "✅ API funciona! Modelo:",
    "settings.connectionFail": "⚠️ API no respondió (fallback local). Verifica endpoint y API key.",

    "settings.languages": "Idiomas",
    "settings.languagesDesc": "Selecciona qué idioma estás aprendiendo y tu idioma nativo.",

    "settings.learning": "Aprendiendo",
    "settings.native": "Mi idioma",

    "settings.site": "Sitio",
    "settings.siteName": "Nombre del sitio",
    "settings.baseUrl": "URL base",

    "settings.save": "Guardar configuración",
    "settings.saving": "Guardando...",
    "settings.saved": "Configuración guardada",

    "settings.helpTitle": "Cómo configurar tu API",
    "settings.helpDesc": "Sigue estos pasos para conectar tu proveedor de IA favorito.",
    "settings.helpStep1": "Elige un provider con el botón \"Quick Setup\" o escribe tu endpoint manualmente.",
    "settings.helpStep2": "Pega tu API key (empieza con sk- para OpenAI/Groq).",
    "settings.helpStep3": "Selecciona el modelo que quieras usar.",
    "settings.helpStep4": "Haz clic en \"Probar conexión\" para verificar que funciona.",
    "settings.helpStep5": "Guarda la configuración.",

    "settings.supportedProviders": "Providers soportados: OpenAI, Groq, Gemini, Ollama (local), DeepSeek, o cualquier API compatible con OpenAI.",

    // English
    "english.title": "Inglés para aprender",
    "english.subtitle": "Subir inglés funcional a B1 con práctica diaria: documentación, videos, prompts, flashcards y vocabulario interactivo.",
    "english.goal": "Llegar a un nivel B1 funcional en inglés: entender documentación, videos técnicos, y comunicarte con confianza.",
    "english.level": "A2-B1",
    "english.cadence": "15-30 min diarios",

    "english.modules": "Módulos",
    "english.weeklyPlan": "Cronograma semanal",
    "english.phrases": "Frases base para estudiar",

    // Flashcards
    "flashcards.title": "Flashcards de inglés para hoy",
    "flashcards.cartas": "Cartas",
    "flashcards.tiempo": "Tiempo",
    "flashcards.meta": "Meta",
    "flashcards.nivel": "Nivel",

    // Novels
    "novels.title": "Novelas ligeras",
    "novels.subtitle": "Lee historias en inglés con acompañamiento en español, párrafo a párrafo. Cada capítulo incluye vocabulario destacado y la opción de guardar palabras con un clic para repasarlas después.",
    "novels.howToUse": "Cómo usar el visualizador",
    "novels.step1": "Elige una serie y abre un capítulo.",
    "novels.step2": "Lee el párrafo en inglés, luego la traducción al español abajo.",
    "novels.step3": "Haz clic en cualquier palabra en inglés: se guarda automáticamente en tu vocabulario.",
    "novels.step4": "Aparece en el repaso matutino de vocabulario con prioridad alta.",

    // Vocabulary
    "vocab.title": "Vocabulario",
    "vocab.subtitle": "Términos clave en inglés y español",
    "vocab.progress": "Progreso Total",
    "vocab.all": "Todos",
    "vocab.unknown": "Por aprender",
    "vocab.known": "Dominados",

    // Library
    "library.title": "Biblioteca",
    "library.subtitle": "Sube libros y materiales para tu aprendizaje",
    "library.upload": "Sube libros",
    "library.empty": "Tu biblioteca está vacía",

    // Common
    "common.back": "← Volver",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
  },

  en: {
    // Navigation
    "nav.home": "Home",
    "nav.language": "Language",
    "nav.library": "Library",
    "nav.novels": "Novels",
    "nav.vocabulary": "Vocabulary",
    "nav.settings": "Settings",

    // Home
    "home.title": "Learn Languages",
    "home.subtitle": "Smart flashcards, bilingual novel reading, interactive vocabulary, and an AI coach that corrects your answers.",
    "home.howItWorks": "How it works",
    "home.getStarted": "Get Started",

    "home.flashcards.title": "Flashcards",
    "home.flashcards.desc": "Practice vocabulary with interactive cards",

    "home.reader.title": "Reading",
    "home.reader.desc": "Read bilingual stories paragraph by paragraph",

    "home.coach.title": "AI Coach",
    "home.coach.desc": "Write in English and get instant corrections",

    "home.library.title": "Upload Books",
    "home.library.desc": "Upload PDFs and EPUBs to your personal library",

    "home.step1": "Install dependencies: npm install",
    "home.step2": "Run the server: npm run dev",
    "home.step3": "Open localhost:3000 in your browser",
    "home.step4": "Customize flashcards in data/courses.json",
    "home.step5": "Optional: Add novels in data/novels/",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Configure your AI API, languages, and site preferences.",

    "settings.aiProvider": "AI Provider",
    "settings.aiProviderDesc": "Connect any OpenAI-compatible API. The AI coach will correct your answers.",

    "settings.quickSetup": "Quick Setup",
    "settings.endpoint": "API Endpoint",
    "settings.apiKey": "API Key",
    "settings.model": "Model",

    "settings.maxTokens": "Max Tokens",
    "settings.temperature": "Temperature",

    "settings.testConnection": "Test Connection",
    "settings.testing": "Testing...",
    "settings.connectionOk": "✅ API works! Model:",
    "settings.connectionFail": "⚠️ API didn't respond (local fallback). Check endpoint and API key.",

    "settings.languages": "Languages",
    "settings.languagesDesc": "Select which language you're learning and your native language.",

    "settings.learning": "Learning",
    "settings.native": "My Language",

    "settings.site": "Site",
    "settings.siteName": "Site Name",
    "settings.baseUrl": "Base URL",

    "settings.save": "Save Settings",
    "settings.saving": "Saving...",
    "settings.saved": "Settings saved",

    "settings.helpTitle": "How to Configure Your API",
    "settings.helpDesc": "Follow these steps to connect your favorite AI provider.",
    "settings.helpStep1": "Choose a provider with the \"Quick Setup\" button or enter your endpoint manually.",
    "settings.helpStep2": "Paste your API key (starts with sk- for OpenAI/Groq).",
    "settings.helpStep3": "Select the model you want to use.",
    "settings.helpStep4": "Click \"Test Connection\" to verify it works.",
    "settings.helpStep5": "Save the settings.",

    "settings.supportedProviders": "Supported providers: OpenAI, Groq, Gemini, Ollama (local), DeepSeek, or any OpenAI-compatible API.",

    // English
    "english.title": "English to Learn",
    "english.subtitle": "Bring your English to B1 level with daily practice: documentation, videos, prompts, flashcards, and interactive vocabulary.",
    "english.goal": "Reach a functional B1 level in English: understand documentation, technical videos, and communicate with confidence.",
    "english.level": "A2-B1",
    "english.cadence": "15-30 min daily",

    "english.modules": "Modules",
    "english.weeklyPlan": "Weekly Schedule",
    "english.phrases": "Base Phrases for Study",

    // Flashcards
    "flashcards.title": "English Flashcards for Today",
    "flashcards.cartas": "Cards",
    "flashcards.tiempo": "Time",
    "flashcards.meta": "Goal",
    "flashcards.nivel": "Level",

    // Novels
    "novels.title": "Light Novels",
    "novels.subtitle": "Read stories in English with Spanish accompaniment, paragraph by paragraph. Each chapter includes highlighted vocabulary and the option to save words with one click for later review.",
    "novels.howToUse": "How to Use the Reader",
    "novels.step1": "Choose a series and open a chapter.",
    "novels.step2": "Read the paragraph in English, then the Spanish translation below.",
    "novels.step3": "Click on any English word: it's automatically saved to your vocabulary.",
    "novels.step4": "It appears in your morning vocabulary review with high priority.",

    // Vocabulary
    "vocab.title": "Vocabulary",
    "vocab.subtitle": "Key terms in English and Spanish",
    "vocab.progress": "Total Progress",
    "vocab.all": "All",
    "vocab.unknown": "To Learn",
    "vocab.known": "Mastered",

    // Library
    "library.title": "Library",
    "library.subtitle": "Upload books and materials for your learning",
    "library.upload": "Upload Books",
    "library.empty": "Your library is empty",

    // Common
    "common.back": "← Back",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.save": "Save",
    "common.cancel": "Cancel",
  },

  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.language": "Langue",
    "nav.library": "Bibliothèque",
    "nav.novels": "Romans",
    "nav.vocabulary": "Vocabulaire",
    "nav.settings": "Paramètres",

    // Home
    "home.title": "Apprenez des Langues",
    "home.subtitle": "Flashcards intelligentes, lecture bilingue de romans, vocabulaire interactif et un coach IA qui corrige vos réponses.",
    "home.howItWorks": "Comment ça marche",
    "home.getStarted": "Commencer",

    "home.flashcards.title": "Flashcards",
    "home.flashcards.desc": "Pratiquez le vocabulaire avec des cartes interactives",

    "home.reader.title": "Lecture",
    "home.reader.desc": "Lisez des histoires bilingues paragraphe par paragraphe",

    "home.coach.title": "Coach IA",
    "home.coach.desc": "Écrivez en anglais et recevez des corrections instantanées",

    "home.library.title": "Télécharger des livres",
    "home.library.desc": "Téléchargez des PDF et EPUB pour votre bibliothèque personnelle",

    "home.step1": "Installez les dépendances : npm install",
    "home.step2": "Lancez le serveur : npm run dev",
    "home.step3": "Ouvrez localhost:3000 dans votre navigateur",
    "home.step4": "Personnalisez les flashcards dans data/courses.json",
    "home.step5": "Optionnel : Ajoutez des romans dans data/novels/",

    // Settings
    "settings.title": "Paramètres",
    "settings.subtitle": "Configurez votre API IA, les langues et les préférences du site.",

    "settings.aiProvider": "Fournisseur IA",
    "settings.aiProviderDesc": "Connectez n'importe quelle API compatible OpenAI. Le coach IA corrigera vos réponses.",

    "settings.quickSetup": "Configuration rapide",
    "settings.endpoint": "Point de terminaison API",
    "settings.apiKey": "Clé API",
    "settings.model": "Modèle",

    "settings.maxTokens": "Tokens max",
    "settings.temperature": "Température",

    "settings.testConnection": "Tester la connexion",
    "settings.testing": "Test en cours...",
    "settings.connectionOk": "✅ L'API fonctionne ! Modèle :",
    "settings.connectionFail": "⚠️ L'API n'a pas répondu (fallback local). Vérifiez le point de terminaison et la clé API.",

    "settings.languages": "Langues",
    "settings.languagesDesc": "Sélectionnez la langue que vous apprenez et votre langue maternelle.",

    "settings.learning": "En cours d'apprentissage",
    "settings.native": "Ma langue",

    "settings.site": "Site",
    "settings.siteName": "Nom du site",
    "settings.baseUrl": "URL de base",

    "settings.save": "Enregistrer",
    "settings.saving": "Enregistrement...",
    "settings.saved": "Paramètres enregistrés",

    "settings.helpTitle": "Comment configurer votre API",
    "settings.helpDesc": "Suivez ces étapes pour connecter votre fournisseur IA préféré.",
    "settings.helpStep1": "Choisissez un fournisseur avec le bouton \"Configuration rapide\" ou saisissez votre point de terminaison manuellement.",
    "settings.helpStep2": "Collez votre clé API (commence par sk- pour OpenAI/Groq).",
    "settings.helpStep3": "Sélectionnez le modèle que vous souhaitez utiliser.",
    "settings.helpStep4": "Cliquez sur \"Tester la connexion\" pour vérifier que ça fonctionne.",
    "settings.helpStep5": "Enregistrez les paramètres.",

    "settings.supportedProviders": "Fournisseurs supportés : OpenAI, Groq, Gemini, Ollama (local), DeepSeek, ou toute API compatible OpenAI.",

    // English
    "english.title": "Anglais à apprendre",
    "english.subtitle": "Atteignez un niveau B1 fonctionnel en anglais avec une pratique quotidienne : documentation, vidéos, prompts, flashcards et vocabulaire interactif.",
    "english.goal": "Atteindre un niveau B1 fonctionnel en anglais : comprendre la documentation, les vidéos techniques et communiquer avec confiance.",
    "english.level": "A2-B1",
    "english.cadence": "15-30 min par jour",

    "english.modules": "Modules",
    "english.weeklyPlan": "Planning hebdomadaire",
    "english.phrases": "Phrases de base pour étudier",

    // Flashcards
    "flashcards.title": "Flashcards d'anglais pour aujourd'hui",
    "flashcards.cartas": "Cartes",
    "flashcards.tiempo": "Durée",
    "flashcards.meta": "Objectif",
    "flashcards.nivel": "Niveau",

    // Novels
    "novels.title": "Romans légers",
    "novels.subtitle": "Lisez des histoires en anglais avec accompagnement en espagnol, paragraphe par paragraphe. Chaque chapitre inclut du vocabulaire mis en évidence et l'option de sauvegarder des mots en un clic.",
    "novels.howToUse": "Comment utiliser le lecteur",
    "novels.step1": "Choisissez une série et ouvrez un chapitre.",
    "novels.step2": "Lisez le paragraphe en anglais, puis la traduction en espagnol en dessous.",
    "novels.step3": "Cliquez sur n'importe quel mot en anglais : il est automatiquement sauvegardé dans votre vocabulaire.",
    "novels.step4": "Il apparaît dans votre révision matinale de vocabulaire avec une priorité élevée.",

    // Vocabulary
    "vocab.title": "Vocabulaire",
    "vocab.subtitle": "Termes clés en anglais et en espagnol",
    "vocab.progress": "Progrès total",
    "vocab.all": "Tout",
    "vocab.unknown": "À apprendre",
    "vocab.known": "Maîtrisés",

    // Library
    "library.title": "Bibliothèque",
    "library.subtitle": "Téléchargez des livres et des matériaux pour votre apprentissage",
    "library.upload": "Télécharger des livres",
    "library.empty": "Votre bibliothèque est vide",

    // Common
    "common.back": "← Retour",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
  },

  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.language": "Sprache",
    "nav.library": "Bibliothek",
    "nav.novels": "Romane",
    "nav.vocabulary": "Vokabular",
    "nav.settings": "Einstellungen",

    // Home
    "home.title": "Sprachen lernen",
    "home.subtitle": "Intelligente Flashcards, zweisprachiges Romanleben, interaktives Vokabular und ein KI-Coach, der deine Antworten korrigiert.",
    "home.howItWorks": "So funktioniert es",
    "home.getStarted": "Loslegen",

    "home.flashcards.title": "Flashcards",
    "home.flashcards.desc": "Vokabular mit interaktiven Karten üben",

    "home.reader.title": "Lesen",
    "home.reader.desc": "Zweisprachige Geschichten Absatz für Absatz lesen",

    "home.coach.title": "KI-Coach",
    "home.coach.desc": "Schreibe auf Englisch und erhalte sofortige Korrekturen",

    "home.library.title": "Bücher hochladen",
    "home.library.desc": "Lade PDFs und EPUBs für deine persönliche Bibliothek hoch",

    "home.step1": "Abhängigkeiten installieren: npm install",
    "home.step2": "Server starten: npm run dev",
    "home.step3": "Öffne localhost:3000 im Browser",
    "home.step4": "Passe Flashcards in data/courses.json an",
    "home.step5": "Optional: Romane in data/novels/ hinzufügen",

    // Settings
    "settings.title": "Einstellungen",
    "settings.subtitle": "KI-API, Sprachen und Website-Einstellungen konfigurieren.",

    "settings.aiProvider": "KI-Anbieter",
    "settings.aiProviderDesc": "Verbinde eine beliebige OpenAI-kompatible API. Der KI-Coach korrigiert deine Antworten.",

    "settings.quickSetup": "Schnelleinrichtung",
    "settings.endpoint": "API-Endpunkt",
    "settings.apiKey": "API-Schlüssel",
    "settings.model": "Modell",

    "settings.maxTokens": "Max. Tokens",
    "settings.temperature": "Temperatur",

    "settings.testConnection": "Verbindung testen",
    "settings.testing": "Teste...",
    "settings.connectionOk": "✅ API funktioniert! Modell:",
    "settings.connectionFail": "⚠️ API hat nicht geantwortet (lokaler Fallback). Überprüfe Endpunkt und API-Schlüssel.",

    "settings.languages": "Sprachen",
    "settings.languagesDesc": "Wähle die Sprache, die du lernst, und deine Muttersprache.",

    "settings.learning": "Lerne",
    "settings.native": "Meine Sprache",

    "settings.site": "Website",
    "settings.siteName": "Name der Website",
    "settings.baseUrl": "Basis-URL",

    "settings.save": "Einstellungen speichern",
    "settings.saving": "Speichern...",
    "settings.saved": "Einstellungen gespeichert",

    "settings.helpTitle": "API konfigurieren",
    "settings.helpDesc": "Befolge diese Schritte, um deinen Lieblings-KI-Anbieter zu verbinden.",
    "settings.helpStep1": "Wähle einen Anbieter mit dem \"Schnelleinrichtung\"-Button oder gib deinen Endpunkt manuell ein.",
    "settings.helpStep2": "Füge deinen API-Schlüssel ein (beginnt mit sk- für OpenAI/Groq).",
    "settings.helpStep3": "Wähle das Modell, das du verwenden möchtest.",
    "settings.helpStep4": "Klicke auf \"Verbindung testen\", um zu überprüfen, ob es funktioniert.",
    "settings.helpStep5": "Speichere die Einstellungen.",

    "settings.supportedProviders": "Unterstützte Anbieter: OpenAI, Groq, Gemini, Ollama (lokal), DeepSeek oder jede OpenAI-kompatible API.",

    // English
    "english.title": "Englisch zu lernen",
    "english.subtitle": "Bringe dein Englisch auf B1-Niveau mit täglichem Üben: Dokumentation, Videos, Prompts, Flashcards und interaktives Vokabular.",
    "english.goal": "Ein funktionales B1-Niveau in Englisch erreichen: Dokumentation, technische Videos verstehen und selbstbewusst kommunizieren.",
    "english.level": "A2-B1",
    "english.cadence": "15-30 Min. täglich",

    "english.modules": "Module",
    "english.weeklyPlan": "Wochenplan",
    "english.phrases": "Grundphrase zum Lernen",

    // Flashcards
    "flashcards.title": "Englische Flashcards für heute",
    "flashcards.cartas": "Karten",
    "flashcards.tiempo": "Dauer",
    "flashcards.meta": "Ziel",
    "flashcards.nivel": "Niveau",

    // Novels
    "novels.title": "Light Novels",
    "novels.subtitle": "Lies Geschichten auf Englisch mit spanischer Begleitung, Absatz für Absatz. Jedes Kapitel enthält hervorgehobenes Vokabular und die Möglichkeit, Wörter mit einem Klick zu speichern.",
    "novels.howToUse": "So verwendest du den Leser",
    "novels.step1": "Wähle eine Serie und öffne ein Kapitel.",
    "novels.step2": "Lies den Absatz auf Englisch, dann die spanische Übersetzung darunter.",
    "novels.step3": "Klicke auf ein englisches Wort: Es wird automatisch in deinem Vokabular gespeichert.",
    "novels.step4": "Es erscheint in deiner morgendlichen Vokabelüberprüfung mit hoher Priorität.",

    // Vocabulary
    "vocab.title": "Vokabular",
    "vocab.subtitle": "Schlüsselbegriffe auf Englisch und Spanisch",
    "vocab.progress": "Gesamtfortschritt",
    "vocab.all": "Alle",
    "vocab.unknown": "Zu lernen",
    "vocab.known": "Gemeistert",

    // Library
    "library.title": "Bibliothek",
    "library.subtitle": "Lade Bücher und Materialien für dein Lernen hoch",
    "library.upload": "Bücher hochladen",
    "library.empty": "Deine Bibliothek ist leer",

    // Common
    "common.back": "← Zurück",
    "common.loading": "Laden...",
    "common.error": "Fehler",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
  },

  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.language": "Idioma",
    "nav.library": "Biblioteca",
    "nav.novels": "Romances",
    "nav.vocabulary": "Vocabulário",
    "nav.settings": "Configurações",

    // Home
    "home.title": "Aprenda Idiomas",
    "home.subtitle": "Flashcards inteligentes, leitura bilíngue de romances, vocabulário interativo e um coach de IA que corrige suas respostas.",
    "home.howItWorks": "Como funciona",
    "home.getStarted": "Começar",

    "home.flashcards.title": "Flashcards",
    "home.flashcards.desc": "Pratique vocabulário com cartas interativas",

    "home.reader.title": "Leitura",
    "home.reader.desc": "Leia histórias bilíngues parágrafo por parágrafo",

    "home.coach.title": "Coach IA",
    "home.coach.desc": "Escreva em inglês e receba correções instantâneas",

    "home.library.title": "Enviar livros",
    "home.library.desc": "Envie PDFs e EPUBs para sua biblioteca pessoal",

    "home.step1": "Instale dependências: npm install",
    "home.step2": "Execute o servidor: npm run dev",
    "home.step3": "Abra localhost:3000 no seu navegador",
    "home.step4": "Personalize os flashcards em data/courses.json",
    "home.step5": "Opcional: Adicione romances em data/novels/",

    // Settings
    "settings.title": "Configurações",
    "settings.subtitle": "Configure sua API de IA, idiomas e preferências do site.",

    "settings.aiProvider": "Provedor de IA",
    "settings.aiProviderDesc": "Conecte qualquer API compatível com OpenAI. O coach de IA corrigirá suas respostas.",

    "settings.quickSetup": "Configuração rápida",
    "settings.endpoint": "Endpoint da API",
    "settings.apiKey": "Chave da API",
    "settings.model": "Modelo",

    "settings.maxTokens": "Máx. Tokens",
    "settings.temperature": "Temperatura",

    "settings.testConnection": "Testar conexão",
    "settings.testing": "Testando...",
    "settings.connectionOk": "✅ API funciona! Modelo:",
    "settings.connectionFail": "⚠️ API não respondeu (fallback local). Verifique o endpoint e a chave da API.",

    "settings.languages": "Idiomas",
    "settings.languagesDesc": "Selecione qual idioma você está aprendendo e seu idioma nativo.",

    "settings.learning": "Aprendendo",
    "settings.native": "Meu idioma",

    "settings.site": "Site",
    "settings.siteName": "Nome do site",
    "settings.baseUrl": "URL base",

    "settings.save": "Salvar configurações",
    "settings.saving": "Salvando...",
    "settings.saved": "Configurações salvas",

    "settings.helpTitle": "Como configurar sua API",
    "settings.helpDesc": "Siga estes passos para conectar seu provedor de IA favorito.",
    "settings.helpStep1": "Escolha um provedor com o botão \"Configuração rápida\" ou insira seu endpoint manualmente.",
    "settings.helpStep2": "Cole sua chave da API (começa com sk- para OpenAI/Groq).",
    "settings.helpStep3": "Selecione o modelo que deseja usar.",
    "settings.helpStep4": "Clique em \"Testar conexão\" para verificar se funciona.",
    "settings.helpStep5": "Salve as configurações.",

    "settings.supportedProviders": "Provedores suportados: OpenAI, Groq, Gemini, Ollama (local), DeepSeek ou qualquer API compatível com OpenAI.",

    // English
    "english.title": "Inglês para aprender",
    "english.subtitle": "Leve seu inglês ao nível B1 com prática diária: documentação, vídeos, prompts, flashcards e vocabulário interativo.",
    "english.goal": "Alcançar um nível B1 funcional em inglês: entender documentação, vídeos técnicos e comunicar-se com confiança.",
    "english.level": "A2-B1",
    "english.cadence": "15-30 min diários",

    "english.modules": "Módulos",
    "english.weeklyPlan": "Cronograma semanal",
    "english.phrases": "Frases base para estudar",

    // Flashcards
    "flashcards.title": "Flashcards de inglês para hoje",
    "flashcards.cartas": "Cartas",
    "flashcards.tiempo": "Tempo",
    "flashcards.meta": "Meta",
    "flashcards.nivel": "Nível",

    // Novels
    "novels.title": "Romances leves",
    "novels.subtitle": "Leia histórias em inglês com acompanhamento em espanhol, parágrafo por parágrafo. Cada capítulo inclui vocabulário destacado e a opção de salvar palavras com um clique.",
    "novels.howToUse": "Como usar o visualizador",
    "novels.step1": "Escolha uma série e abra um capítulo.",
    "novels.step2": "Leia o parágrafo em inglês, depois a tradução para espanhol abaixo.",
    "novels.step3": "Clique em qualquer palavra em inglês: ela é automaticamente salva no seu vocabulário.",
    "novels.step4": "Aparece na sua revisão matinal de vocabulário com prioridade alta.",

    // Vocabulary
    "vocab.title": "Vocabulário",
    "vocab.subtitle": "Termos-chave em inglês e espanhol",
    "vocab.progress": "Progresso Total",
    "vocab.all": "Todos",
    "vocab.unknown": "Para aprender",
    "vocab.known": "Dominados",

    // Library
    "library.title": "Biblioteca",
    "library.subtitle": "Envie livros e materiais para seu aprendizado",
    "library.upload": "Enviar livros",
    "library.empty": "Sua biblioteca está vazia",

    // Common
    "common.back": "← Voltar",
    "common.loading": "Carregando...",
    "common.error": "Erro",
    "common.save": "Salvar",
    "common.cancel": "Cancelar",
  },

  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.language": "言語",
    "nav.library": "ライブラリ",
    "nav.novels": "ノベル",
    "nav.vocabulary": "単語帳",
    "nav.settings": "設定",

    // Home
    "home.title": "言語を学ぼう",
    "home.subtitle": "スマートなフラッシュカード、バイリンガル小説の読み、インタラクティブな単語帳、そして回答を訂正してくれるAIコーチ。",
    "home.howItWorks": "使い方",
    "home.getStarted": "始めましょう",

    "home.flashcards.title": "フラッシュカード",
    "home.flashcards.desc": "インタラクティブなカードで語彙を練習",

    "home.reader.title": "リーディング",
    "home.reader.desc": "バイリンガルな物語を段落ごとに読む",

    "home.coach.title": "AIコーチ",
    "home.coach.desc": "英語で書いて即座に添削を受けましょう",

    "home.library.title": "本をアップロード",
    "home.library.desc": "PDFやEPUBをマイライブラリに追加",

    "home.step1": "依存関係をインストール：npm install",
    "home.step2": "サーバーを起動：npm run dev",
    "home.step3": "ブラウザでlocalhost:3000を開く",
    "home.step4": "data/courses.jsonでフラッシュカードをカスタマイズ",
    "home.step5": "オプション：data/novels/にノベルを追加",

    // Settings
    "settings.title": "設定",
    "settings.subtitle": "AI API、言語、サイトの設定を行います。",

    "settings.aiProvider": "AIプロバイダー",
    "settings.aiProviderDesc": "OpenAI互換のAPIに接続できます。AIコーチが回答を訂正します。",

    "settings.quickSetup": "クイックセットアップ",
    "settings.endpoint": "APIエンドポイント",
    "settings.apiKey": "APIキー",
    "settings.model": "モデル",

    "settings.maxTokens": "最大トークン数",
    "settings.temperature": "温度",

    "settings.testConnection": "接続テスト",
    "settings.testing": "テスト中...",
    "settings.connectionOk": "✅ APIが動作中！モデル：",
    "settings.connectionFail": "⚠️ APIが応答しませんでした（ローカルフォールバック）。エンドポイントとAPIキーを確認してください。",

    "settings.languages": "言語設定",
    "settings.languagesDesc": "学習する言語と母語を選択してください。",

    "settings.learning": "学習する言語",
    "settings.native": "母語",

    "settings.site": "サイト",
    "settings.siteName": "サイト名",
    "settings.baseUrl": "ベースURL",

    "settings.save": "設定を保存",
    "settings.saving": "保存中...",
    "settings.saved": "設定を保存しました",

    "settings.helpTitle": "APIの設定方法",
    "settings.helpDesc": "お気に入りのAIプロバイダーに接続する手順です。",
    "settings.helpStep1": "「クイックセットアップ」ボタンでプロバイダーを選ぶか、エンドポイントを手動で入力してください。",
    "settings.helpStep2": "APIキーを貼り付けます（OpenAI/Groqはsk-で始まります）。",
    "settings.helpStep3": "使用するモデルを選択します。",
    "settings.helpStep4": "「接続テスト」をクリックして動作を確認します。",
    "settings.helpStep5": "設定を保存します。",

    "settings.supportedProviders": "対応プロバイダー：OpenAI、Groq、Gemini、Ollama（ローカル）、DeepSeek、またはOpenAI互換のAPI。",

    // English
    "english.title": "英語を学ぼう",
    "english.subtitle": "毎日の練習で英語をB1レベルに持ち上げましょう：ドキュメント、ビデオ、プロンプト、フラッシュカード、インタラクティブな単語。",
    "english.level": "A2-B1",
    "english.cadence": "毎日15〜30分",
    "english.goal": "B1レベルの実用的な英語を身につける：ドキュメントや技術的なビデオを理解し、自信を持ってコミュニケーションできるようになること。",

    "english.modules": "モジュール",
    "english.weeklyPlan": "週間スケジュール",
    "english.phrases": "学習フレーズ",

    // Flashcards
    "flashcards.title": "今日のフラッシュカード",
    "flashcards.cartas": "カード数",
    "flashcards.tiempo": "時間",
    "flashcards.meta": "目標",
    "flashcards.nivel": "レベル",

    // Novels
    "novels.title": "ライトノベル",
    "novels.subtitle": "英語の物語をスペイン語の付きで段落ごとに読みます。各章には重要語彙が含まれ、単語をワンクリックで保存して後で復習できます。",
    "novels.howToUse": "リーダーの使い方",
    "novels.step1": "シリーズを選んで章を開きます。",
    "novels.step2": "英語の段落を読み、下のスペイン語訳を確認します。",
    "novels.step3": "英語の単語をクリックすると、単語帳に自動保存されます。",
    "novels.step4": "朝の単語復習で高優先度として表示されます。",

    // Vocabulary
    "vocab.title": "単語帳",
    "vocab.subtitle": "英語とスペイン語のキーワード",
    "vocab.progress": "全体の進捗",
    "vocab.all": "すべて",
    "vocab.unknown": "未習得",
    "vocab.known": "習得済み",

    // Library
    "library.title": "ライブラリ",
    "library.subtitle": "学習用の本や教材をアップロード",
    "library.upload": "本をアップロード",
    "library.empty": "ライブラリは空です",

    // Common
    "common.back": "← 戻る",
    "common.loading": "読み込み中...",
    "common.error": "エラー",
    "common.save": "保存",
    "common.cancel": "キャンセル",
  },
};

export function getTranslations(locale: Locale): Record<string, string> {
  return translations[locale] || translations["es"];
}
