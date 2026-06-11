import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONFIG_PATH = path.join(process.cwd(), "data", "config.json");

async function readConfig() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      ai: { provider: "openai-compatible", apiEndpoint: "", apiKey: "", model: "gpt-4o-mini", maxTokens: 500, temperature: 0.3 },
      languages: { source: "en", target: "es", sourceName: "English", targetName: "Espanol" },
      site: { name: "AI Language Learning", url: "http://localhost:3000" },
      presets: {},
    };
  }
}

async function writeConfig(config: any) {
  await fs.mkdir(path.dirname(CONFIG_PATH), { recursive: true });
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

export async function GET() {
  const config = await readConfig();
  // Mask API key for display
  const safe = { ...config, ai: { ...config.ai, apiKey: config.ai.apiKey ? "••••" + config.ai.apiKey.slice(-4) : "" } };
  return NextResponse.json(safe);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const config = await readConfig();

  // Merge AI settings
  if (body.ai) {
    config.ai = { ...config.ai, ...body.ai };
    // Don't overwrite apiKey with mask
    if (body.ai.apiKey === "••••" + (config.ai.apiKey || "").slice(-4)) {
      body.ai.apiKey = config.ai.apiKey;
    }
    if (body.ai.apiKey && body.ai.apiKey !== "••••") {
      config.ai.apiKey = body.ai.apiKey;
    }
  }

  // Merge language settings
  if (body.languages) {
    config.languages = { ...config.languages, ...body.languages };
  }

  // Merge site settings
  if (body.site) {
    config.site = { ...config.site, ...body.site };
  }

  await writeConfig(config);
  return NextResponse.json({ success: true });
}

// GET presets only
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const config = await readConfig();

  if (body.preset && config.presets?.[body.preset]) {
    const p = config.presets[body.preset];
    config.ai.apiEndpoint = p.apiEndpoint;
    config.ai.model = p.model;
    await writeConfig(config);
    return NextResponse.json({ success: true, ai: config.ai });
  }

  return NextResponse.json({ error: "Unknown preset" }, { status: 400 });
}
