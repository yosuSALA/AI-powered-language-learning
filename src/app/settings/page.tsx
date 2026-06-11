"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/useLocale";
import { LOCALES, type Locale } from "@/lib/i18n";

type Settings = {
  ai: {
    provider: string;
    apiEndpoint: string;
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
  };
  languages: {
    source: string;
    target: string;
    sourceName: string;
    targetName: string;
  };
  site: {
    name: string;
    url: string;
  };
  presets?: Record<string, { apiEndpoint: string; model: string }>;
};

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "中文" },
  { code: "ru", name: "Русский" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "nl", name: "Nederlands" },
  { code: "sv", name: "Svenska" },
  { code: "tr", name: "Türkçe" },
  { code: "pl", name: "Polski" },
];

export default function SettingsPage() {
  const { t } = useLocale();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setSettings);
  }, []);

  if (!settings) {
    return <div className="p-12 text-center text-muted">{t["common.loading"]}</div>;
  }

  async function save() {
    if (!settings) return;
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ai: settings.ai,
          languages: settings.languages,
          site: settings.site,
        }),
      });
      setToast(t["settings.saved"]);
      window.setTimeout(() => setToast(null), 2500);
    } finally {
      setSaving(false);
    }
  }

  async function testConnection() {
    if (!settings) return;
    setTesting(true);
    setTestResult(null);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai: settings.ai }),
      });

      const res = await fetch("/api/english-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: "anime-1", answer: "My favorite character is strong and smart." }),
      });
      const data = await res.json();
      if (data.source === "ai") {
        setTestResult(`${t["settings.connectionOk"]} ${settings.ai.model}. Score: ${data.score}/100`);
      } else {
        setTestResult(t["settings.connectionFail"]);
      }
    } catch (e: any) {
      setTestResult(`❌ Error: ${e.message}`);
    } finally {
      setTesting(false);
    }
  }

  function applyPreset(name: string) {
    if (!settings) return;
    const preset = settings.presets?.[name];
    if (!preset) return;
    setSettings({
      ...settings,
      ai: { ...settings.ai, apiEndpoint: preset.apiEndpoint, model: preset.model },
    });
  }

  // Get the 6 i18n locales for the UI language selector
  const uiLocales = Object.entries(LOCALES) as [Locale, { flag: string; nativeName: string; name: string }][];

  return (
    <div className="max-w-3xl space-y-8">
      <div className="animate-fade-in">
        <p className="text-xs uppercase tracking-[0.28em] text-accent/70 font-bold">Configuration</p>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent mt-2">
          {t["settings.title"]}
        </h1>
        <p className="text-muted mt-2 text-lg">
          {t["settings.subtitle"]}
        </p>
      </div>

      {/* AI Provider */}
      <section className="glass rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🤖</span> {t["settings.aiProvider"]}
        </h2>
        <p className="text-sm text-muted">
          {t["settings.aiProviderDesc"]}
        </p>

        {/* Quick presets */}
        {settings.presets && Object.keys(settings.presets).length > 0 && (
          <div>
            <p className="text-xs text-muted/60 uppercase tracking-wider font-bold mb-2">{t["settings.quickSetup"]}</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(settings.presets).map((name) => (
                <button
                  key={name}
                  onClick={() => applyPreset(name)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-sm font-medium hover:bg-white/10 transition-all capitalize"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.endpoint"]}</label>
            <input
              type="url"
              value={settings.ai.apiEndpoint}
              onChange={(e) => setSettings({ ...settings, ai: { ...settings.ai, apiEndpoint: e.target.value } })}
              className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50 font-mono"
              placeholder="https://api.openai.com/v1/chat/completions"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.apiKey"]}</label>
              <input
                type="password"
                value={settings.ai.apiKey}
                onChange={(e) => setSettings({ ...settings, ai: { ...settings.ai, apiKey: e.target.value } })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
                placeholder="sk-..."
              />
            </div>
            <div>
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.model"]}</label>
              <input
                type="text"
                value={settings.ai.model}
                onChange={(e) => setSettings({ ...settings, ai: { ...settings.ai, model: e.target.value } })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50 font-mono"
                placeholder="gpt-4o-mini"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.maxTokens"]}</label>
              <input
                type="number"
                value={settings.ai.maxTokens}
                onChange={(e) => setSettings({ ...settings, ai: { ...settings.ai, maxTokens: Number(e.target.value) } })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.temperature"]}</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={settings.ai.temperature}
                onChange={(e) => setSettings({ ...settings, ai: { ...settings.ai, temperature: Number(e.target.value) } })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
          </div>
        </div>

        <button
          onClick={testConnection}
          disabled={testing || !settings.ai.apiKey || settings.ai.apiKey.startsWith("••••")}
          className="px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-xl hover:bg-accent/15 transition-all disabled:opacity-40"
        >
          {testing ? t["settings.testing"] : t["settings.testConnection"]}
        </button>
        {testResult && (
          <p className="text-sm p-3 rounded-xl bg-white/[0.03]">{testResult}</p>
        )}
      </section>

      {/* Languages */}
      <section className="glass rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🌍</span> {t["settings.languages"]}
        </h2>
        <p className="text-sm text-muted">
          {t["settings.languagesDesc"]}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.learning"]}</label>
            <select
              value={settings.languages.source}
              onChange={(e) => {
                const lang = LANGUAGES.find((l) => l.code === e.target.value);
                setSettings({
                  ...settings,
                  languages: { ...settings.languages, source: e.target.value, sourceName: lang?.name || e.target.value },
                });
              }}
              className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.native"]}</label>
            <select
              value={settings.languages.target}
              onChange={(e) => {
                const lang = LANGUAGES.find((l) => l.code === e.target.value);
                setSettings({
                  ...settings,
                  languages: { ...settings.languages, target: e.target.value, targetName: lang?.name || e.target.value },
                });
              }}
              className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Site */}
      <section className="glass rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">⚙️</span> {t["settings.site"]}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.siteName"]}</label>
            <input
              type="text"
              value={settings.site.name}
              onChange={(e) => setSettings({ ...settings, site: { ...settings.site, name: e.target.value } })}
              className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">{t["settings.baseUrl"]}</label>
            <input
              type="url"
              value={settings.site.url}
              onChange={(e) => setSettings({ ...settings, site: { ...settings.site, url: e.target.value } })}
              className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="px-8 py-3 bg-accent text-background font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
        >
          {saving ? t["settings.saving"] : t["settings.save"]}
        </button>
        {toast && <p className="text-accent-green text-sm">{toast}</p>}
      </div>

      {/* Help Section */}
      <section className="glass rounded-2xl p-6 border-l-4 border-accent-yellow/60">
        <h3 className="text-sm font-bold text-accent-yellow/90 mb-2">{t["settings.helpTitle"]}</h3>
        <p className="text-sm text-muted mb-3">{t["settings.helpDesc"]}</p>
        <ol className="text-sm text-muted space-y-2 list-decimal pl-5">
          <li>{t["settings.helpStep1"]}</li>
          <li>{t["settings.helpStep2"]}</li>
          <li>{t["settings.helpStep3"]}</li>
          <li>{t["settings.helpStep4"]}</li>
          <li>{t["settings.helpStep5"]}</li>
        </ol>
        <p className="text-xs text-muted/50 mt-3">
          {t["settings.supportedProviders"]}
        </p>
      </section>

      {/* App Guide */}
      <section className="glass rounded-2xl p-6 border-l-4 border-accent-purple/60">
        <h3 className="text-lg font-bold text-accent-purple/90 mb-2">{t["settings.helpTitle"]}</h3>
        <p className="text-sm text-muted mb-4">{t["settings.helpDesc"]}</p>
        <div className="space-y-3">
          <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
            <p className="text-sm font-semibold text-foreground">🃏 Flashcards</p>
            <p className="text-xs text-muted mt-1">
              {t["locale"] === "es" 
                ? "Practica vocabulario con tarjetas. Voltea la tarjeta, lee la palabra en el idioma que aprendes, y escribe tu respuesta."
                : t["locale"] === "en"
                ? "Practice vocabulary with cards. Flip the card, read the word in the language you're learning, and write your answer."
                : t["locale"] === "fr"
                ? "Pratiquez le vocabulaire avec des cartes. Retournez la carte, lisez le mot dans la langue que vous apprenez, et écrivez votre réponse."
                : t["locale"] === "de"
                ? "Übe Vokabular mit Karten. Drehe die Karte um, lies das Wort in der Sprache die du lernst, und schreibe deine Antwort."
                : t["locale"] === "pt"
                ? "Pratique vocabulário com cartas. Vire a carta, leia a palavra no idioma que você está aprendendo, e escreva sua resposta."
                : "カードで語彙を練習します。カードをめくり、学習中の言語で単語を読み、答えを書きましょう。"
              }
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
            <p className="text-sm font-semibold text-foreground">🤖 AI Coach</p>
            <p className="text-xs text-muted mt-1">
              {t["locale"] === "es"
                ? "Escribe frases en el idioma que aprendes. La IA las corrige, te da un puntaje, y te muestra como decirlo mejor."
                : t["locale"] === "en"
                ? "Write sentences in the language you're learning. The AI corrects them, gives you a score, and shows you how to say it better."
                : t["locale"] === "fr"
                ? "Écrivez des phrases dans la langue que vous apprenez. L'IA les corrige, vous donne un score, et vous montre comment mieux le dire."
                : t["locale"] === "de"
                ? "Schreibe Sätze in der Sprache die du lernst. Die KI korrigiert sie, gibt dir eine Bewertung und zeigt dir, wie man es besser sagt."
                : t["locale"] === "pt"
                ? "Escreva frases no idioma que você está aprendendo. A IA as corrige, dá uma pontuação, e mostra como dizê-las melhor."
                : "学習中の言語で文章を書きます。AIが添削し、スコアをつけ、より自然な表現を教えてくれます。"
              }
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
            <p className="text-sm font-semibold text-foreground">📚 Bilingual Reader</p>
            <p className="text-xs text-muted mt-1">
              {t["locale"] === "es"
                ? "Lee historias párrafo a párrafo. Arriba el idioma que aprendes, abajo tu idioma. Click en cualquier palabra para guardarla."
                : t["locale"] === "en"
                ? "Read stories paragraph by paragraph. The language you're learning on top, your language below. Click any word to save it."
                : t["locale"] === "fr"
                ? "Lisez des histoires paragraphe par paragraphe. La langue que vous apprenez en haut, votre langue en bas. Cliquez sur n'importe quel mot pour le sauvegarder."
                : t["locale"] === "de"
                ? "Lies Geschichten Absatz für Absatz. Die Sprache die du lernst oben, deine Sprache unten. Klick auf ein Wort, um es zu speichern."
                : t["locale"] === "pt"
                ? "Leia histórias parágrafo por parágrafo. O idioma que você aprende em cima, seu idioma abaixo. Clique em qualquer palavra para salvá-la."
                : "物語を段落ごとに読みます。学習中の言語が上、あなたの言語が下。単語をクリックすると保存できます。"
              }
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
            <p className="text-sm font-semibold text-foreground">📖 Vocabulary</p>
            <p className="text-xs text-muted mt-1">
              {t["locale"] === "es"
                ? "Diccionario de palabras organizadas por tema. Marca las que ya sabes y enfócate en las nuevas."
                : t["locale"] === "en"
                ? "Dictionary of words organized by topic. Mark the ones you already know and focus on the new ones."
                : t["locale"] === "fr"
                ? "Dictionnaire de mots organisés par thème. Marquez ceux que vous connaissez déjà et concentrez-vous sur les nouveaux."
                : t["locale"] === "de"
                ? "Wörterbuch nach Themen organisiert. Markiere die, die du schon kennst und konzentriere dich auf die neuen."
                : t["locale"] === "pt"
                ? "Dicionário de palavras organizadas por tema. Marque as que você já sabe e foque nas novas."
                : "トピック別に整理された単語辞典。既に知っているものに印を付け、新しいものに集中しましょう。"
              }
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.025] border border-white/5 p-3">
            <p className="text-sm font-semibold text-foreground">📤 Library</p>
            <p className="text-xs text-muted mt-1">
              {t["locale"] === "es"
                ? "Sube libros, PDFs o EPUBs para tener tu propia colección de material de estudio."
                : t["locale"] === "en"
                ? "Upload books, PDFs or EPUBs to have your own collection of study material."
                : t["locale"] === "fr"
                ? "Téléchargez des livres, PDF ou EPUBs pour avoir votre propre collection de matériel d'étude."
                : t["locale"] === "de"
                ? "Lade Bücher, PDFs oder EPUBs hoch, um deine eigene Sammlung von Studienmaterial zu erstellen."
                : t["locale"] === "pt"
                ? "Envie livros, PDFs ou EPUBs para ter sua própria coleção de material de estudo."
                : "本、PDF、EPUBをアップロードして、自分だけの学習教材コレクションを作りましょう。"
              }
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
