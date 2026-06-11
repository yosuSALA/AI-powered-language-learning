"use client";

import { useState, useEffect } from "react";

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
  { code: "es", name: "Espanol" },
  { code: "fr", name: "Francais" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Portugues" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "tr", name: "Turkish" },
  { code: "pl", name: "Polish" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setSettings);
  }, []);

  if (!settings) {
    return <div className="p-12 text-center text-muted">Cargando configuracion...</div>;
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
      setToast("Configuracion guardada");
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
      // Save first, then test with a simple flashcard answer
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
        setTestResult(`\u2705 API funciona! Modelo: ${settings.ai.model}. Score: ${data.score}/100`);
      } else {
        setTestResult("\u26a0\ufe0f API no respondio (fallback local). Verifica endpoint y API key.");
      }
    } catch (e: any) {
      setTestResult(`\u274c Error: ${e.message}`);
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

  return (
    <div className="max-w-3xl space-y-8">
      <div className="animate-fade-in">
        <p className="text-xs uppercase tracking-[0.28em] text-accent/70 font-bold">Configuration</p>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent mt-2">
          Settings
        </h1>
        <p className="text-muted mt-2 text-lg">
          Configura tu API de IA, idiomas, y preferencias del sitio.
        </p>
      </div>

      {/* AI Provider */}
      <section className="glass rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🤖</span> AI Provider
        </h2>
        <p className="text-sm text-muted">
          Conecta cualquier API compatible con OpenAI. El coach de IA corregira tus respuestas.
        </p>

        {/* Quick presets */}
        {settings.presets && Object.keys(settings.presets).length > 0 && (
          <div>
            <p className="text-xs text-muted/60 uppercase tracking-wider font-bold mb-2">Quick Setup</p>
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
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">API Endpoint</label>
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
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">API Key</label>
              <input
                type="password"
                value={settings.ai.apiKey}
                onChange={(e) => setSettings({ ...settings, ai: { ...settings.ai, apiKey: e.target.value } })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
                placeholder="sk-..."
              />
            </div>
            <div>
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">Model</label>
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
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">Max Tokens</label>
              <input
                type="number"
                value={settings.ai.maxTokens}
                onChange={(e) => setSettings({ ...settings, ai: { ...settings.ai, maxTokens: Number(e.target.value) } })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">Temperature</label>
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
          {testing ? "Probando..." : "Probar conexion"}
        </button>
        {testResult && (
          <p className="text-sm p-3 rounded-xl bg-white/[0.03]">{testResult}</p>
        )}
      </section>

      {/* Languages */}
      <section className="glass rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🌍</span> Idiomas
        </h2>
        <p className="text-sm text-muted">
          Selecciona que idioma estas aprendiendo y tu idioma nativo.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">Aprendiendo</label>
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
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">Mi idioma</label>
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
          <span className="text-2xl">⚙️</span> Sitio
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">Nombre del sitio</label>
            <input
              type="text"
              value={settings.site.name}
              onChange={(e) => setSettings({ ...settings, site: { ...settings.site, name: e.target.value } })}
              className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground text-sm focus:outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted/60 uppercase tracking-wider font-bold">URL base</label>
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
          {saving ? "Guardando..." : "Guardar configuracion"}
        </button>
        {toast && <p className="text-accent-green text-sm">{toast}</p>}
      </div>

      {/* Help */}
      <section className="glass rounded-2xl p-6 border-l-4 border-accent-yellow/60">
        <h3 className="text-sm font-bold text-accent-yellow/90 mb-2">Como configurar tu API</h3>
        <ol className="text-sm text-muted space-y-2 list-decimal pl-5">
          <li>Elige un provider con el boton "Quick Setup" o escribe tu endpoint manualmente.</li>
          <li>Pega tu API key (empieza con <code className="bg-white/5 px-1 rounded">sk-</code> para OpenAI/Groq).</li>
          <li>Selecciona el modelo que quieras usar.</li>
          <li>Haz clic en "Probar conexion" para verificar que funciona.</li>
          <li>Guarda la configuracion.</li>
        </ol>
        <p className="text-xs text-muted/50 mt-3">
          Providers soportados: OpenAI, Groq, Gemini, Ollama (local), DeepSeek, o cualquier API compatible con OpenAI.
        </p>
      </section>
    </div>
  );
}
