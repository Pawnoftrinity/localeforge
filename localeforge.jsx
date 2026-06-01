import { useState, useEffect, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   LANGUAGES  (100 locales)
══════════════════════════════════════════════════════════ */
const LANGUAGES = [
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "nl", name: "Dutch", native: "Nederlands" },
  { code: "el", name: "Greek", native: "Ελληνικά" },
  { code: "sv", name: "Swedish", native: "Svenska" },
  { code: "no", name: "Norwegian", native: "Norsk" },
  { code: "da", name: "Danish", native: "Dansk" },
  { code: "fi", name: "Finnish", native: "Suomi" },
  { code: "pl", name: "Polish", native: "Polski" },
  { code: "cs", name: "Czech", native: "Čeština" },
  { code: "sk", name: "Slovak", native: "Slovenčina" },
  { code: "hu", name: "Hungarian", native: "Magyar" },
  { code: "ro", name: "Romanian", native: "Română" },
  { code: "bg", name: "Bulgarian", native: "Български" },
  { code: "sr", name: "Serbian", native: "Српски" },
  { code: "hr", name: "Croatian", native: "Hrvatski" },
  { code: "sl", name: "Slovenian", native: "Slovenščina" },
  { code: "mk", name: "Macedonian", native: "Македонски" },
  { code: "sq", name: "Albanian", native: "Shqip" },
  { code: "et", name: "Estonian", native: "Eesti" },
  { code: "lv", name: "Latvian", native: "Latviešu" },
  { code: "lt", name: "Lithuanian", native: "Lietuvių" },
  { code: "cy", name: "Welsh", native: "Cymraeg" },
  { code: "ga", name: "Irish", native: "Gaeilge" },
  { code: "ca", name: "Catalan", native: "Català" },
  { code: "af", name: "Afrikaans", native: "Afrikaans" },
  { code: "is", name: "Icelandic", native: "Íslenska" },
  { code: "gl", name: "Galician", native: "Galego" },
  { code: "eu", name: "Basque", native: "Euskara" },
  { code: "br", name: "Breton", native: "Brezhoneg" },
  { code: "oc", name: "Occitan", native: "Occitan" },
  { code: "mt", name: "Maltese", native: "Malti" },
  { code: "lb", name: "Luxembourgish", native: "Lëtzebuergesch" },
  { code: "bs", name: "Bosnian", native: "Bosanski" },
  { code: "fy", name: "Frisian", native: "Frysk" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "uk", name: "Ukrainian", native: "Українська" },
  { code: "hy", name: "Armenian", native: "Հայերեն" },
  { code: "ka", name: "Georgian", native: "ქართული" },
  { code: "az", name: "Azerbaijani", native: "Azərbaycan" },
  { code: "kk", name: "Kazakh", native: "Қазақша" },
  { code: "uz", name: "Uzbek", native: "O'zbek" },
  { code: "ky", name: "Kyrgyz", native: "Кыргызча" },
  { code: "tg", name: "Tajik", native: "Тоҷикӣ" },
  { code: "tk", name: "Turkmen", native: "Türkmen" },
  { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
  { code: "mn", name: "Mongolian", native: "Монгол" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "si", name: "Sinhala", native: "සිංහල" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "sa", name: "Sanskrit", native: "संस्कृतम्" },
  { code: "ps", name: "Pashto", native: "پښتو" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "th", name: "Thai", native: "ไทย" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu" },
  { code: "tl", name: "Tagalog", native: "Tagalog" },
  { code: "my", name: "Burmese", native: "မြန်မာဘာသာ" },
  { code: "km", name: "Khmer", native: "ភាសាខ្មែរ" },
  { code: "lo", name: "Lao", native: "ລາວ" },
  { code: "jv", name: "Javanese", native: "Basa Jawa" },
  { code: "su", name: "Sundanese", native: "Basa Sunda" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "he", name: "Hebrew", native: "עברית" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "fa", name: "Persian", native: "فارسی" },
  { code: "ku", name: "Kurdish", native: "کوردی" },
  { code: "sw", name: "Swahili", native: "Kiswahili" },
  { code: "am", name: "Amharic", native: "አማርኛ" },
  { code: "ha", name: "Hausa", native: "Hausa" },
  { code: "yo", name: "Yoruba", native: "Yorùbá" },
  { code: "so", name: "Somali", native: "Soomaali" },
  { code: "zu", name: "Zulu", native: "isiZulu" },
  { code: "xh", name: "Xhosa", native: "isiXhosa" },
  { code: "st", name: "Sesotho", native: "Sesotho" },
  { code: "tn", name: "Setswana", native: "Setswana" },
  { code: "ts", name: "Tsonga", native: "Xitsonga" },
  { code: "ve", name: "Venda", native: "Tshivenda" },
  { code: "nr", name: "South Ndebele", native: "isiNdebele" },
  { code: "rw", name: "Kinyarwanda", native: "Kinyarwanda" },
  { code: "lg", name: "Luganda", native: "Luganda" },
  { code: "rn", name: "Kirundi", native: "Kirundi" },
  { code: "sn", name: "Shona", native: "ChiShona" },
  { code: "ti", name: "Tigrinya", native: "ትግርኛ" },
  { code: "om", name: "Oromo", native: "Afaan Oromoo" },
  { code: "mg", name: "Malagasy", native: "Malagasy" },
  { code: "ak", name: "Akan", native: "Akan" },
  { code: "ht", name: "Haitian Creole", native: "Kreyòl Ayisyen" },
  { code: "en-GB", name: "English (UK)", native: "English (UK)" },
  { code: "en-US", name: "English (US)", native: "English (US)" },
];

/* ══════════════════════════════════════════════════════════
   PROVIDER REGISTRY  — 6 providers
══════════════════════════════════════════════════════════ */
const PROVIDERS = {
  claude: {
    label: "Claude", sub: "Anthropic", icon: "🟠",
    models: ["claude-opus-4-8", "claude-opus-4-6", "claude-sonnet-4-6", "claude-haiku-4-5-20251001"],
    defaultModel: "claude-sonnet-4-6",
    keyLabel: "Anthropic API Key", keyPlaceholder: "sk-ant-api03-...",
  },
  openai: {
    label: "ChatGPT", sub: "OpenAI", icon: "🟢",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4.1", "gpt-4.1-mini", "o1-mini", "o3-mini"],
    defaultModel: "gpt-4o-mini",
    keyLabel: "OpenAI API Key", keyPlaceholder: "sk-proj-...",
  },
  gemini: {
    label: "Gemini", sub: "Google", icon: "🔵",
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"],
    defaultModel: "gemini-2.0-flash",
    keyLabel: "Google AI Studio Key", keyPlaceholder: "AIzaSy...",
  },
  mistral: {
    label: "Mistral", sub: "Mistral AI", icon: "🟡",
    models: ["mistral-large-latest", "mistral-small-latest", "open-mistral-nemo", "codestral-latest"],
    defaultModel: "mistral-small-latest",
    keyLabel: "Mistral API Key", keyPlaceholder: "...",
  },
  groq: {
    label: "Groq", sub: "Groq Cloud", icon: "⚡",
    models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768", "gemma2-9b-it"],
    defaultModel: "llama-3.3-70b-versatile",
    keyLabel: "Groq API Key", keyPlaceholder: "gsk_...",
  },
  copilot: {
    label: "Copilot", sub: "Azure OpenAI", icon: "🔷",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4"],
    defaultModel: "gpt-4o-mini",
    keyLabel: "Azure API Key", keyPlaceholder: "...",
    hasBaseUrl: true,
  },
};
const PIDS = Object.keys(PROVIDERS);
const CHUNK = 20;
const STORAGE_KEY = "localeforge_v2";

/* ══════════════════════════════════════════════════════════
   JSON HELPERS
══════════════════════════════════════════════════════════ */
function flattenKeys(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null && !Array.isArray(v))
      Object.assign(out, flattenKeys(v, key));
    else out[key] = String(v);
  }
  return out;
}

function buildNested(keys, values) {
  const result = {};
  keys.forEach((key, i) => {
    const parts = key.split(".");
    let cur = result;
    parts.forEach((p, idx) => {
      if (idx === parts.length - 1) cur[p] = values[i] ?? key;
      else { if (typeof cur[p] !== "object" || cur[p] === null) cur[p] = {}; cur = cur[p]; }
    });
  });
  return result;
}

function deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    if (typeof sv === "object" && sv !== null && !Array.isArray(sv))
      out[key] = deepMerge(out[key] || {}, sv);
    else out[key] = sv;
  }
  return out;
}

function downloadBlob(filename, content, mime = "application/json") {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ══════════════════════════════════════════════════════════
   AI PROVIDER CALLERS
══════════════════════════════════════════════════════════ */
async function callClaude({ apiKey, modelId, prompt }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true", // ← required for browser
    },
    body: JSON.stringify({
      model: modelId || "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Claude ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).content?.[0]?.text ?? "[]";
}

async function callOpenAI({ apiKey, modelId, prompt }) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: modelId || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).choices?.[0]?.message?.content ?? "[]";
}

async function callGemini({ apiKey, modelId, prompt }) {
  const model = modelId || "gemini-2.0-flash";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "[]";
}

async function callMistral({ apiKey, modelId, prompt }) {
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: modelId || "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) throw new Error(`Mistral ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).choices?.[0]?.message?.content ?? "[]";
}

async function callGroq({ apiKey, modelId, prompt }) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: modelId || "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).choices?.[0]?.message?.content ?? "[]";
}

async function callCopilot({ apiKey, apiBase, modelId, prompt }) {
  if (!apiBase) throw new Error("Copilot requires a Base URL (Azure OpenAI endpoint).");
  const deployment = modelId || "gpt-4o-mini";
  const url = `${apiBase.replace(/\/+$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({ messages: [{ role: "user", content: prompt }], max_tokens: 1024 }),
  });
  if (!res.ok) throw new Error(`Copilot ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).choices?.[0]?.message?.content ?? "[]";
}

async function dispatchProvider(cfg, prompt) {
  const { provider, apiKey, apiBase, modelId } = cfg;
  if (!apiKey) throw new Error(`API key required for ${provider}.`);
  switch (provider) {
    case "claude":  return callClaude({ apiKey, modelId, prompt });
    case "openai":  return callOpenAI({ apiKey, modelId, prompt });
    case "gemini":  return callGemini({ apiKey, modelId, prompt });
    case "mistral": return callMistral({ apiKey, modelId, prompt });
    case "groq":    return callGroq({ apiKey, modelId, prompt });
    case "copilot": return callCopilot({ apiKey, apiBase, modelId, prompt });
    default: throw new Error("Unknown provider.");
  }
}

/* ══════════════════════════════════════════════════════════
   APPWRITE REST API  — piggybacking BMET Seeker
   NOTE: Add https://claude.ai to Appwrite project Web Platforms
   for CORS, or host LocaleForge on the same origin.
══════════════════════════════════════════════════════════ */
function awHdr(cfg, json = true) {
  const h = { "x-appwrite-project": cfg.projectId, "x-appwrite-key": cfg.apiKey };
  if (json) h["Content-Type"] = "application/json";
  return h;
}

async function awListFiles(cfg) {
  const res = await fetch(`${cfg.endpoint}/storage/buckets/${cfg.bucketId}/files?limit=100`, {
    headers: awHdr(cfg),
  });
  if (!res.ok) throw new Error(`Appwrite list ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).files || [];
}

async function awUploadFile(cfg, filename, content) {
  const safe = filename.replace(/\.json$/i, "").replace(/[^a-z0-9]/gi, "_");
  const fileId = `lf_${safe}_${Date.now()}`.slice(0, 36);
  const form = new FormData();
  form.append("fileId", fileId);
  form.append("file", new Blob([content], { type: "application/json" }), filename);
  const res = await fetch(`${cfg.endpoint}/storage/buckets/${cfg.bucketId}/files`, {
    method: "POST",
    headers: { "x-appwrite-project": cfg.projectId, "x-appwrite-key": cfg.apiKey },
    body: form,
  });
  if (!res.ok) throw new Error(`Appwrite upload ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

async function awGetFileContent(cfg, fileId) {
  const res = await fetch(
    `${cfg.endpoint}/storage/buckets/${cfg.bucketId}/files/${fileId}/download`,
    { headers: { "x-appwrite-project": cfg.projectId, "x-appwrite-key": cfg.apiKey } }
  );
  if (!res.ok) throw new Error(`Appwrite download ${res.status}`);
  return res.text();
}

async function awDeleteFile(cfg, fileId) {
  const res = await fetch(
    `${cfg.endpoint}/storage/buckets/${cfg.bucketId}/files/${fileId}`,
    { method: "DELETE", headers: awHdr(cfg) }
  );
  if (!res.ok) throw new Error(`Appwrite delete ${res.status}`);
}

/* ══════════════════════════════════════════════════════════
   TRANSLATION ENGINE
══════════════════════════════════════════════════════════ */
function buildPrompt(pairs, langName, langNative) {
  const lines = pairs.map((p, i) => `${i + 1}. [${p.key}] ${JSON.stringify(p.value)}`).join("\n");
  return `You are a professional medical equipment terminology translator for a healthcare technology management (HTM) app used by Biomedical Equipment Technicians (BMETs).

Translate the following UI strings from English to ${langName} (${langNative}).

RULES:
- Return ONLY a JSON array of translated strings in the EXACT same order as input
- Keep medical device names, brand names, and acronyms unchanged: BMET, HTM, CBET, CRES, CHTM, FDA, MAUDE, GUDID, LOTO, OEM, PM, AI
- Keep technical identifiers, model numbers, and template variables like {{count}} exactly as-is
- Keep shortcodes like [SECTION:key] unchanged
- Use natural, professional medical/technical language for healthcare professionals
- For RTL languages (Arabic, Hebrew, Persian, Kurdish) use proper RTL text
- Return ONLY the JSON array — no explanation, no markdown, no backticks

Input strings:
${lines}

Return format:
["translation1", "translation2", ...]`;
}

async function translateChunk(pairs, langName, langNative, cfg) {
  const raw = await dispatchProvider(cfg, buildPrompt(pairs, langName, langNative));
  const clean = raw.replace(/```json|```/gi, "").trim();
  const s = clean.indexOf("["), e = clean.lastIndexOf("]");
  const arrStr = s >= 0 && e > s ? clean.slice(s, e + 1) : clean;
  const parsed = JSON.parse(arrStr);
  if (!Array.isArray(parsed)) throw new Error("Model did not return a JSON array.");
  return parsed;
}

async function translateAll(enFlat, keys, langName, langNative, cfg, onProgress) {
  const out = [];
  const chunks = Math.ceil(keys.length / CHUNK);
  for (let i = 0; i < keys.length; i += CHUNK) {
    const ci = Math.floor(i / CHUNK);
    const slice = keys.slice(i, i + CHUNK).map((k) => ({ key: k, value: enFlat[k] }));
    onProgress(`Chunk ${ci + 1}/${chunks} — ${slice.length} strings`, Math.round(10 + (ci / chunks) * 80));
    const trans = await translateChunk(slice, langName, langNative, cfg);
    const padded = [...trans];
    while (padded.length < slice.length) padded.push(slice[padded.length]?.value ?? "");
    out.push(...padded.slice(0, slice.length));
  }
  return out;
}

/* ══════════════════════════════════════════════════════════
   SETTINGS PERSISTENCE  (localStorage)
══════════════════════════════════════════════════════════ */
const DEFAULT_SETTINGS = {
  activeProvider: "claude",
  providerKeys: Object.fromEntries(PIDS.map((p) => [p, ""])),
  providerModels: Object.fromEntries(PIDS.map((p) => [p, PROVIDERS[p].defaultModel])),
  copilotBase: "",
  appwrite: { endpoint: "https://cloud.appwrite.io/v1", projectId: "", apiKey: "", bucketId: "" },
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      providerKeys: { ...DEFAULT_SETTINGS.providerKeys, ...parsed.providerKeys },
      providerModels: { ...DEFAULT_SETTINGS.providerModels, ...parsed.providerModels },
      appwrite: { ...DEFAULT_SETTINGS.appwrite, ...parsed.appwrite },
    };
  } catch { return DEFAULT_SETTINGS; }
}

function saveSettings(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

/* ══════════════════════════════════════════════════════════
   JSZip LOADER
══════════════════════════════════════════════════════════ */
function useJSZip() {
  const [jszip, setJszip] = useState(null);
  useEffect(() => {
    if (window.JSZip) { setJszip(() => window.JSZip); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    s.onload = () => setJszip(() => window.JSZip);
    document.head.appendChild(s);
  }, []);
  return jszip;
}

/* ══════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════ */
export default function App() {
  const JSZip = useJSZip();
  const [settings, setSettings] = useState(loadSettings);
  const [mainTab, setMainTab] = useState("translate");    // translate | appwrite
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Source JSON
  const [enJson, setEnJson] = useState("");
  const [enError, setEnError] = useState("");

  // Single translate
  const [subTab, setSubTab] = useState("single");         // single | bulk
  const [targetJson, setTargetJson] = useState("");
  const [targetError, setTargetError] = useState("");
  const [selectedLang, setSelectedLang] = useState("es");
  const [mode, setMode] = useState("gap");                // gap | full
  const [singleStatus, setSingleStatus] = useState("idle");
  const [singleProgress, setSingleProgress] = useState({ step: "", pct: 0 });
  const [missingKeys, setMissingKeys] = useState([]);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Appwrite save feedback
  const [awSaving, setAwSaving] = useState(false);
  const [awSaveMsg, setAwSaveMsg] = useState("");

  // Bulk
  const [bulkSelected, setBulkSelected] = useState(() => new Set(LANGUAGES.map((l) => l.code)));
  const [bulkRunning, setBulkRunning] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ step: "", pct: 0 });
  const [bulkResults, setBulkResults] = useState([]);

  // Appwrite file browser
  const [awFiles, setAwFiles] = useState([]);
  const [awLoading, setAwLoading] = useState(false);
  const [awError, setAwError] = useState("");
  const [awPreview, setAwPreview] = useState(null);       // { name, content }

  // ── Derived ──────────────────────────────────────────
  const updateSettings = useCallback((patch) => {
    setSettings((prev) => { const next = { ...prev, ...patch }; saveSettings(next); return next; });
  }, []);

  const pid = settings.activeProvider;
  const providerCfg = {
    provider: pid,
    apiKey: settings.providerKeys[pid] || "",
    apiBase: settings.copilotBase || "",
    modelId: settings.providerModels[pid] || PROVIDERS[pid]?.defaultModel || "",
  };
  const awCfg = settings.appwrite;
  const awReady = !!(awCfg.endpoint && awCfg.projectId && awCfg.apiKey && awCfg.bucketId);

  const lang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  function parseJSON(str, setErr) {
    if (!str.trim()) { setErr(""); return {}; }
    try { setErr(""); return JSON.parse(str); }
    catch (e) { setErr("Invalid JSON: " + e.message); return null; }
  }

  // ── Single ──────────────────────────────────────────
  function analyze() {
    const en = parseJSON(enJson, setEnError); if (!en) return;
    const tgt = parseJSON(targetJson, setTargetError); if (tgt === null) return;
    setMissingKeys(Object.keys(flattenKeys(en)).filter((k) => !(k in flattenKeys(tgt))));
    setSingleStatus("analyzed");
  }

  async function translate() {
    const en = parseJSON(enJson, setEnError); if (!en) return;
    let tgt = {};
    if (targetJson.trim() && mode === "gap") {
      const t = parseJSON(targetJson, setTargetError); if (t === null) return; tgt = t;
    }
    const enFlat = flattenKeys(en);
    const tgtFlat = flattenKeys(tgt);
    const keys = mode === "gap" ? Object.keys(enFlat).filter((k) => !(k in tgtFlat)) : Object.keys(enFlat);
    if (keys.length === 0) { setOutput(JSON.stringify(tgt, null, 2)); setSingleStatus("done"); return; }

    setSingleStatus("translating");
    setSingleProgress({ step: `Preparing ${keys.length} keys…`, pct: 5 });
    try {
      const vals = await translateAll(enFlat, keys, lang.name, lang.native, providerCfg,
        (step, pct) => setSingleProgress({ step, pct }));
      setSingleProgress({ step: "Building file…", pct: 95 });
      const nested = buildNested(keys, vals);
      const final = mode === "gap" ? deepMerge(tgt, nested) : nested;
      setOutput(JSON.stringify(final, null, 2));
      setSingleStatus("done");
      setSingleProgress({ step: "Done!", pct: 100 });
      setAwSaveMsg("");
    } catch (e) {
      setSingleStatus("error");
      setSingleProgress({ step: e.message, pct: 0 });
    }
  }

  // ── Appwrite save ────────────────────────────────────
  async function saveToAw(filename, content) {
    if (!awReady) { setAwSaveMsg("⚠ Appwrite not configured — open Settings."); return; }
    setAwSaving(true); setAwSaveMsg("");
    try {
      await awUploadFile(awCfg, filename, content);
      setAwSaveMsg(`✅ ${filename} saved to Appwrite bucket`);
    } catch (e) { setAwSaveMsg(`❌ ${e.message}`); }
    finally { setAwSaving(false); }
  }

  // ── Bulk ─────────────────────────────────────────────
  async function runBulk() {
    const en = parseJSON(enJson, setEnError); if (!en) return;
    const enFlat = flattenKeys(en);
    const keys = Object.keys(enFlat);
    const targets = LANGUAGES.filter((l) => bulkSelected.has(l.code));
    if (!targets.length) return;

    setBulkRunning(true); setBulkResults([]);
    const results = [];
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      setBulkProgress({ step: `(${i + 1}/${targets.length}) ${t.native} — ${t.code}.json`, pct: Math.round((i / targets.length) * 100) });
      try {
        const vals = await translateAll(enFlat, keys, t.name, t.native, providerCfg,
          (step) => setBulkProgress((p) => ({ ...p, step: `(${i + 1}/${targets.length}) ${t.native} — ${step}` })));
        results.push({ code: t.code, native: t.native, json: JSON.stringify(buildNested(keys, vals), null, 2) });
      } catch (e) { results.push({ code: t.code, native: t.native, json: "", error: e.message }); }
      setBulkResults([...results]);
    }
    setBulkProgress({ step: "All done!", pct: 100 });
    setBulkRunning(false);
  }

  async function downloadAllZip() {
    if (!JSZip || !bulkResults.length) return;
    const zip = new JSZip();
    const folder = zip.folder("locales");
    bulkResults.forEach((r) => { if (r.json) folder.file(`${r.code}.json`, r.json); });
    downloadBlob("locales.zip", await zip.generateAsync({ type: "blob" }), "application/zip");
  }

  async function bulkSaveAllToAw() {
    for (const r of bulkResults) {
      if (r.json) await saveToAw(`${r.code}.json`, r.json).catch(() => {});
    }
  }

  // ── Appwrite Files tab ───────────────────────────────
  async function loadAwFiles() {
    if (!awReady) { setAwError("Configure Appwrite in Settings first."); return; }
    setAwLoading(true); setAwError("");
    try { setAwFiles(await awListFiles(awCfg)); }
    catch (e) { setAwError(e.message); }
    finally { setAwLoading(false); }
  }

  async function previewFile(file) {
    try { setAwPreview({ name: file.name, content: await awGetFileContent(awCfg, file.$id) }); }
    catch (e) { setAwError(`Preview: ${e.message}`); }
  }

  async function deleteFile(fileId) {
    if (!confirm("Delete this file from Appwrite?")) return;
    try { await awDeleteFile(awCfg, fileId); setAwFiles((f) => f.filter((x) => x.$id !== fileId)); }
    catch (e) { setAwError(`Delete: ${e.message}`); }
  }

  useEffect(() => {
    if (mainTab === "appwrite" && awReady && awFiles.length === 0 && !awLoading) loadAwFiles();
  }, [mainTab]);

  /* ── RENDER ─────────────────────────────────────────── */
  return (
    <div style={S.root}>
      <div style={S.gridBg} />

      {/* HEADER */}
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={S.logo}>🌐</div>
          <div style={{ flex: 1 }}>
            <div style={S.appName}>LocaleForge</div>
            <div style={S.appSub}>
              HTM · {LANGUAGES.length} locales · {PIDS.length} AI providers · Appwrite
            </div>
          </div>
          <button onClick={() => setSettingsOpen((o) => !o)} style={S.settingsBtn}>
            {settingsOpen ? "✕ Close" : "⚙ Settings"}
          </button>
        </div>
      </header>

      <main style={S.main}>

        {/* ══ SETTINGS DRAWER ══════════════════════════════ */}
        {settingsOpen && (
          <div style={S.drawer}>

            {/* Provider pills */}
            <div style={S.drawerSection}>AI Providers</div>
            <div style={S.pills}>
              {PIDS.map((p) => (
                <button key={p}
                  onClick={() => updateSettings({ activeProvider: p })}
                  style={{ ...S.pill, ...(pid === p ? S.pillOn : {}) }}
                >
                  {PROVIDERS[p].icon} {PROVIDERS[p].label}
                </button>
              ))}
            </div>

            {/* Active provider config */}
            {(() => {
              const prov = PROVIDERS[pid];
              return (
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                  <input style={S.input} type="password"
                    placeholder={`${prov.keyLabel} — ${prov.keyPlaceholder}`}
                    value={settings.providerKeys[pid] || ""}
                    onChange={(e) => updateSettings({ providerKeys: { ...settings.providerKeys, [pid]: e.target.value } })}
                  />
                  <select style={S.select}
                    value={settings.providerModels[pid] || prov.defaultModel}
                    onChange={(e) => updateSettings({ providerModels: { ...settings.providerModels, [pid]: e.target.value } })}
                  >
                    {prov.models.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {prov.hasBaseUrl && (
                    <input style={S.input}
                      placeholder="Azure Base URL — https://YOUR-RESOURCE.openai.azure.com"
                      value={settings.copilotBase || ""}
                      onChange={(e) => updateSettings({ copilotBase: e.target.value })}
                    />
                  )}
                </div>
              );
            })()}

            {/* Appwrite config */}
            <div style={{ ...S.drawerSection, marginTop: 20 }}>
              Appwrite · BMET Seeker Integration
              {awReady && <span style={{ color: "#22c55e", fontSize: 10, marginLeft: 8 }}>● Connected</span>}
            </div>
            <div style={{ fontSize: 10, color: "#64748b", marginBottom: 8, lineHeight: 1.6 }}>
              ⚠ For CORS: add <span style={{ color: "#93c5fd" }}>https://claude.ai</span> to your Appwrite project's
              Web Platforms, or host LocaleForge on the same domain as your app.
            </div>
            {[
              ["endpoint", "Appwrite Endpoint", "https://cloud.appwrite.io/v1", "text"],
              ["projectId", "Project ID", "your-project-id", "text"],
              ["apiKey", "API Key (Storage read+write)", "secret-...", "password"],
              ["bucketId", "Bucket ID (for locale files)", "locale-bucket-id", "text"],
            ].map(([field, label, ph, type]) => (
              <input key={field} style={{ ...S.input, marginTop: 6 }} type={type}
                placeholder={`${label} — ${ph}`}
                value={settings.appwrite[field] || ""}
                onChange={(e) => updateSettings({ appwrite: { ...settings.appwrite, [field]: e.target.value } })}
              />
            ))}
            {awReady && (
              <button onClick={loadAwFiles} style={{ ...S.btnSmSec, marginTop: 10 }}>
                🔄 Test Connection
              </button>
            )}
          </div>
        )}

        {/* ══ SOURCE JSON ══════════════════════════════════ */}
        <Card label="en.json · Source File" error={!!enError}>
          <textarea value={enJson}
            onChange={(e) => { setEnJson(e.target.value); setEnError(""); setSingleStatus("idle"); }}
            placeholder="Paste your en.json content here…"
            style={S.ta}
          />
          {enError && <Err>{enError}</Err>}
          {enJson && !enError && (() => {
            try {
              return <div style={{ fontSize: 10, color: "#22c55e", marginTop: 6 }}>
                ✓ {Object.keys(flattenKeys(JSON.parse(enJson))).length} translation keys loaded
              </div>;
            } catch { return null; }
          })()}
        </Card>

        {/* ══ MAIN TABS ════════════════════════════════════ */}
        <div style={S.tabBar}>
          {[["translate", "🔠 Translate"], ["appwrite", "🗄 Appwrite Files"]].map(([id, lbl]) => (
            <button key={id} onClick={() => setMainTab(id)}
              style={{ ...S.tab, ...(mainTab === id ? S.tabOn : {}) }}
            >
              {lbl}
              {id === "appwrite" && awReady && <span style={{ color: "#22c55e", marginLeft: 5, fontSize: 9 }}>●</span>}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════
            TRANSLATE TAB
        ════════════════════════════════════════════════ */}
        {mainTab === "translate" && (
          <>
            {/* Sub-tabs */}
            <div style={S.subBar}>
              {[["single", "🔠 Single Language"], ["bulk", "🚀 Bulk Export"]].map(([id, lbl]) => (
                <button key={id} onClick={() => setSubTab(id)}
                  style={{ ...S.subTab, ...(subTab === id ? S.subTabOn : {}) }}
                >{lbl}</button>
              ))}
            </div>

            {/* Active provider badge */}
            <div style={S.badge}>
              <span style={{ color: "#64748b" }}>Provider: </span>
              <span style={{ color: "#93c5fd", fontWeight: 700 }}>
                {PROVIDERS[pid]?.icon} {PROVIDERS[pid]?.label}
              </span>
              <span style={{ color: "#475569" }}> · {providerCfg.modelId}</span>
              <button onClick={() => setSettingsOpen(true)} style={S.changeBtn}>change</button>
            </div>

            {/* ─── SINGLE MODE ─────────────────────────── */}
            {subTab === "single" && (
              <>
                <Card label="Mode">
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["gap", "🔍 Fill Missing Keys"], ["full", "🔄 Full Retranslate"]].map(([v, lbl]) => (
                      <button key={v} onClick={() => { setMode(v); setSingleStatus("idle"); setOutput(""); }}
                        style={{ ...S.modeBtn, ...(mode === v ? S.modeBtnOn : {}) }}
                      >{lbl}</button>
                    ))}
                  </div>
                </Card>

                <Card label="Target Language">
                  <select value={selectedLang}
                    onChange={(e) => { setSelectedLang(e.target.value); setSingleStatus("idle"); setOutput(""); }}
                    style={S.select}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.native} ({l.name}) — {l.code}.json
                      </option>
                    ))}
                  </select>
                </Card>

                {mode === "gap" && (
                  <Card label={`${selectedLang}.json · Existing File (optional)`} error={!!targetError}>
                    <textarea value={targetJson}
                      onChange={(e) => { setTargetJson(e.target.value); setTargetError(""); setSingleStatus("idle"); }}
                      placeholder={`Paste your existing ${selectedLang}.json here (or leave blank to translate all)…`}
                      style={S.ta}
                    />
                    {targetError && <Err>{targetError}</Err>}
                    {enJson && (
                      <button onClick={analyze} style={{ ...S.btnSec, marginTop: 10, width: "100%" }}>
                        🔍 Analyze Gap
                      </button>
                    )}
                    {singleStatus === "analyzed" && (
                      <div style={{
                        ...S.infoBox, marginTop: 10,
                        background: missingKeys.length === 0 ? "rgba(34,197,94,0.07)" : "rgba(245,158,11,0.07)",
                        borderColor: missingKeys.length === 0 ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)",
                      }}>
                        {missingKeys.length === 0
                          ? <div style={{ color: "#22c55e", fontSize: 12 }}>✅ {selectedLang}.json is fully in sync</div>
                          : <>
                            <div style={{ color: "#f59e0b", fontSize: 12, marginBottom: 6 }}>
                              ⚠ {missingKeys.length} missing key{missingKeys.length !== 1 ? "s" : ""}
                            </div>
                            <div style={{ maxHeight: 90, overflowY: "auto", background: "#030810", borderRadius: 6, padding: "6px 10px" }}>
                              {missingKeys.map((k) => <div key={k} style={{ fontSize: 10, color: "#f59e0b", lineHeight: 1.9 }}>• {k}</div>)}
                            </div>
                          </>
                        }
                      </div>
                    )}
                  </Card>
                )}

                <button onClick={translate}
                  disabled={!enJson || singleStatus === "translating"}
                  style={{ ...S.btnPrimary, opacity: !enJson ? 0.45 : 1 }}
                >
                  {singleStatus === "translating"
                    ? `⏳ ${singleProgress.step}`
                    : mode === "gap"
                    ? `🌍 Fill Missing → ${lang.native}`
                    : `🔄 Retranslate → ${lang.native}`}
                </button>

                {singleStatus === "translating" && <ProgressBar pct={singleProgress.pct} />}

                {singleStatus === "error" && (
                  <div style={{ ...S.infoBox, background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)", color: "#f87171", fontSize: 12 }}>
                    ❌ {singleProgress.step}
                  </div>
                )}

                {singleStatus === "done" && output && (
                  <Card label={`✅ ${selectedLang}.json — ${output.split("\n").length} lines`}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                      <button onClick={() => downloadBlob(`${selectedLang}.json`, output)} style={S.btnSm}>
                        ⬇ Download
                      </button>
                      <button onClick={() => navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); })}
                        style={S.btnSmSec}
                      >{copied ? "✓ Copied" : "📋 Copy"}</button>
                      {awReady && (
                        <button onClick={() => saveToAw(`${selectedLang}.json`, output)} disabled={awSaving}
                          style={{ ...S.btnSmSec, borderColor: "rgba(34,197,94,0.4)", color: "#86efac" }}
                        >{awSaving ? "⏳ Saving…" : "☁ Save to Appwrite"}</button>
                      )}
                    </div>
                    {awSaveMsg && (
                      <div style={{ fontSize: 11, marginBottom: 8, color: awSaveMsg.startsWith("✅") ? "#22c55e" : "#f87171" }}>
                        {awSaveMsg}
                      </div>
                    )}
                    <textarea readOnly value={output} style={{ ...S.ta, height: 200, color: "#4ade80" }} />
                  </Card>
                )}
              </>
            )}

            {/* ─── BULK MODE ───────────────────────────── */}
            {subTab === "bulk" && (
              <>
                <Card label={`Select Languages · ${bulkSelected.size} / ${LANGUAGES.length}`}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <button onClick={() => setBulkSelected(new Set(LANGUAGES.map((l) => l.code)))} style={S.btnSmSec}>All</button>
                    <button onClick={() => setBulkSelected(new Set())} style={S.btnSmSec}>None</button>
                  </div>
                  <div style={S.langGrid}>
                    {LANGUAGES.map((l) => {
                      const sel = bulkSelected.has(l.code);
                      return (
                        <label key={l.code} style={{ ...S.langChk, ...(sel ? S.langChkOn : {}) }}>
                          <input type="checkbox" checked={sel}
                            onChange={(e) => {
                              const next = new Set(bulkSelected);
                              e.target.checked ? next.add(l.code) : next.delete(l.code);
                              setBulkSelected(next);
                            }}
                            style={{ accentColor: "#3b82f6", width: 13, height: 13 }}
                          />
                          <span style={{ fontWeight: 700, color: sel ? "#93c5fd" : "#475569", fontSize: 11 }}>{l.code}</span>
                          <span style={{ fontSize: 10, opacity: 0.65, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.native}</span>
                        </label>
                      );
                    })}
                  </div>
                </Card>

                <button onClick={runBulk}
                  disabled={!enJson || bulkRunning || bulkSelected.size === 0}
                  style={{ ...S.btnPrimary, opacity: !enJson || bulkSelected.size === 0 ? 0.45 : 1 }}
                >
                  {bulkRunning ? `⏳ ${bulkProgress.step}` : `🚀 Generate ${bulkSelected.size} files`}
                </button>

                {bulkRunning && <ProgressBar pct={bulkProgress.pct} />}

                {bulkResults.length > 0 && (
                  <Card label={`Results · ${bulkResults.filter((r) => !r.error).length} / ${bulkResults.length} ready`}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      <button onClick={downloadAllZip} disabled={!JSZip} style={S.btnSm}>⬇ Download All (.zip)</button>
                      {awReady && (
                        <button onClick={bulkSaveAllToAw}
                          style={{ ...S.btnSmSec, borderColor: "rgba(34,197,94,0.4)", color: "#86efac" }}
                        >☁ Save All to Appwrite</button>
                      )}
                    </div>
                    <div style={S.resultsGrid}>
                      {bulkResults.map((r) => (
                        <div key={r.code} style={{
                          ...S.resultItem,
                          background: r.error ? "rgba(239,68,68,0.07)" : "rgba(34,197,94,0.05)",
                        }}>
                          <span style={{ color: r.error ? "#f87171" : "#86efac", fontWeight: 700, fontSize: 11 }}>{r.code}.json</span>
                          <span style={{ fontSize: 10, opacity: 0.6, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{r.native}</span>
                          {r.error
                            ? <span title={r.error} style={{ color: "#f87171", fontSize: 12 }}>⚠</span>
                            : <button onClick={() => downloadBlob(`${r.code}.json`, r.json)}
                                style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: 13, padding: 0 }}
                              >⬇</button>
                          }
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════════
            APPWRITE FILES TAB
        ════════════════════════════════════════════════ */}
        {mainTab === "appwrite" && (
          <>
            {!awReady ? (
              <div style={{ ...S.infoBox, background: "rgba(245,158,11,0.07)", borderColor: "rgba(245,158,11,0.3)", color: "#fbbf24", fontSize: 12 }}>
                ⚙ Configure your BMET Seeker Appwrite credentials in Settings to browse and manage locale files.
                <br />
                <button onClick={() => setSettingsOpen(true)} style={{ ...S.btnSmSec, marginTop: 10 }}>Open Settings</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <button onClick={loadAwFiles} disabled={awLoading} style={S.btnSm}>
                    {awLoading ? "⏳ Loading…" : "🔄 Refresh"}
                  </button>
                  <span style={{ fontSize: 11, color: "#475569" }}>
                    Project: <span style={{ color: "#93c5fd" }}>{awCfg.projectId}</span>
                    &nbsp;· Bucket: <span style={{ color: "#93c5fd" }}>{awCfg.bucketId}</span>
                  </span>
                </div>

                {awError && (
                  <div style={{ ...S.infoBox, background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)", color: "#f87171", fontSize: 12 }}>
                    ❌ {awError}
                    <div style={{ marginTop: 6, fontSize: 10, color: "#94a3b8" }}>
                      Tip: Make sure https://claude.ai is in your Appwrite project's Web Platforms list (Project Settings → Platforms).
                    </div>
                  </div>
                )}

                {awFiles.length > 0 && (
                  <Card label={`Locale Files · ${awFiles.length} in bucket`}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {awFiles.map((f) => (
                        <div key={f.$id} style={{
                          display: "flex", alignItems: "center", gap: 8,
                          background: "rgba(0,71,171,0.08)", borderRadius: 8, padding: "8px 12px",
                          border: "1px solid rgba(0,71,171,0.2)",
                        }}>
                          <span style={{ color: "#93c5fd", fontWeight: 700, fontSize: 12, flex: 1 }}>{f.name}</span>
                          <span style={{ fontSize: 10, color: "#475569", whiteSpace: "nowrap" }}>
                            {(f.sizeOriginal / 1024).toFixed(1)} KB
                          </span>
                          <button onClick={() => previewFile(f)} title="Preview" style={S.iconBtn}>👁</button>
                          <button onClick={() => awGetFileContent(awCfg, f.$id).then((c) => downloadBlob(f.name, c)).catch((e) => setAwError(e.message))}
                            title="Download" style={S.iconBtn}>⬇</button>
                          <button onClick={() => deleteFile(f.$id)} title="Delete"
                            style={{ ...S.iconBtn, color: "#f87171" }}>🗑</button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {!awLoading && awFiles.length === 0 && !awError && (
                  <div style={{ textAlign: "center", color: "#475569", fontSize: 12, padding: "28px 0" }}>
                    No locale files in this bucket yet.<br />
                    Translate something and hit <span style={{ color: "#86efac" }}>☁ Save to Appwrite</span>!
                  </div>
                )}

                {awPreview && (
                  <Card label={`Preview · ${awPreview.name}`}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <button onClick={() => downloadBlob(awPreview.name, awPreview.content)} style={S.btnSm}>⬇ Download</button>
                      <button onClick={() => setAwPreview(null)} style={S.btnSmSec}>✕ Close</button>
                    </div>
                    <textarea readOnly value={awPreview.content}
                      style={{ ...S.ta, height: 220, color: "#4ade80" }}
                    />
                  </Card>
                )}
              </>
            )}
          </>
        )}

        <div style={{ height: 40 }} />
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════ */
function Card({ label, error, children }) {
  return (
    <div style={{ ...S.section, ...(error ? { borderColor: "#ef4444" } : {}) }}>
      <div style={S.sectionLabel}>{label}</div>
      {children}
    </div>
  );
}
function Err({ children }) {
  return <div style={{ color: "#ef4444", fontSize: 11, marginTop: 6 }}>⚠ {children}</div>;
}
function ProgressBar({ pct }) {
  return (
    <div style={S.progressTrack}>
      <div style={{ ...S.progressFill, width: `${pct}%` }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════════ */
const S = {
  root: { minHeight: "100vh", background: "#060d1f", color: "#e2e8f0", fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace", position: "relative", overflowX: "hidden" },
  gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,71,171,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,71,171,0.06) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 },
  header: { position: "sticky", top: 0, zIndex: 100, background: "linear-gradient(135deg,rgba(0,47,120,0.97) 0%,rgba(0,15,50,0.97) 100%)", borderBottom: "1px solid rgba(0,100,220,0.25)", backdropFilter: "blur(12px)", padding: "12px 16px" },
  headerInner: { display: "flex", alignItems: "center", gap: 12, maxWidth: 720, margin: "0 auto" },
  logo: { width: 36, height: 36, background: "rgba(0,71,171,0.4)", border: "1px solid rgba(0,180,255,0.25)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  appName: { fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "0.06em" },
  appSub: { fontSize: 10, color: "rgba(0,229,255,0.65)", marginTop: 1, letterSpacing: "0.04em" },
  settingsBtn: { padding: "7px 12px", background: "rgba(0,71,171,0.25)", border: "1px solid rgba(0,100,255,0.3)", borderRadius: 8, color: "#93c5fd", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 },
  main: { maxWidth: 720, margin: "0 auto", padding: "16px 12px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 12 },
  // Drawer
  drawer: { background: "rgba(0,20,60,0.96)", border: "1px solid rgba(0,71,171,0.45)", borderRadius: 14, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 0 },
  drawerSection: { fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 },
  pills: { display: "flex", gap: 6, flexWrap: "wrap" },
  pill: { padding: "6px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#475569", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  pillOn: { border: "1px solid rgba(0,100,255,0.6)", background: "rgba(0,71,171,0.3)", color: "#93c5fd" },
  // Cards
  section: { background: "rgba(255,255,255,0.028)", border: "1px solid rgba(0,71,171,0.28)", borderRadius: 14, padding: "14px 14px" },
  sectionLabel: { fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 },
  // Form controls
  ta: { width: "100%", height: 110, background: "#040a18", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#94a3b8", padding: "10px 12px", fontSize: 11, fontFamily: "monospace", resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.6 },
  input: { width: "100%", background: "#040a18", border: "1px solid rgba(0,71,171,0.35)", borderRadius: 8, color: "#e2e8f0", padding: "9px 11px", fontSize: 11, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  select: { width: "100%", background: "#040a18", border: "1px solid rgba(0,71,171,0.35)", borderRadius: 8, color: "#e2e8f0", padding: "10px 12px", fontSize: 12, outline: "none", fontFamily: "inherit" },
  // Tabs
  tabBar: { display: "flex", gap: 6, background: "rgba(0,0,0,0.3)", padding: 4, borderRadius: 12, border: "1px solid rgba(0,71,171,0.2)" },
  tab: { flex: 1, padding: "10px 8px", borderRadius: 9, border: "none", background: "transparent", color: "#475569", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" },
  tabOn: { background: "linear-gradient(135deg,#0047AB,#002d7a)", color: "#e2e8f0", boxShadow: "0 2px 8px rgba(0,71,171,0.4)" },
  subBar: { display: "flex", gap: 5, background: "rgba(0,0,0,0.2)", padding: 3, borderRadius: 10 },
  subTab: { flex: 1, padding: "8px 6px", borderRadius: 8, border: "1px solid transparent", background: "transparent", color: "#475569", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  subTabOn: { background: "rgba(0,71,171,0.22)", color: "#93c5fd", border: "1px solid rgba(0,71,171,0.35)" },
  // Badge
  badge: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "6px 10px", background: "rgba(0,71,171,0.08)", borderRadius: 8, border: "1px solid rgba(0,71,171,0.2)", flexWrap: "wrap" },
  changeBtn: { marginLeft: "auto", fontSize: 10, color: "#60a5fa", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 },
  // Mode buttons
  modeBtn: { flex: 1, padding: "10px 8px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#475569", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" },
  modeBtnOn: { border: "1px solid rgba(0,100,255,0.5)", background: "rgba(0,71,171,0.2)", color: "#93c5fd" },
  // Info box
  infoBox: { borderRadius: 10, border: "1px solid", padding: "10px 12px" },
  // Primary button
  btnPrimary: { width: "100%", padding: "14px 16px", background: "linear-gradient(135deg,#0047AB 0%,#002d7a 100%)", border: "1px solid rgba(0,71,171,0.5)", borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(0,71,171,0.3)", transition: "opacity 0.15s" },
  btnSec: { padding: "10px 16px", background: "rgba(0,71,171,0.12)", border: "1px solid rgba(0,71,171,0.35)", borderRadius: 8, color: "#60a5fa", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 },
  btnSm: { padding: "8px 14px", background: "linear-gradient(135deg,#0047AB,#002d7a)", border: "1px solid rgba(0,71,171,0.5)", borderRadius: 8, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  btnSmSec: { padding: "8px 14px", background: "rgba(0,71,171,0.1)", border: "1px solid rgba(0,71,171,0.3)", borderRadius: 8, color: "#60a5fa", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  iconBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 15, padding: "2px 4px", lineHeight: 1 },
  // Progress
  progressTrack: { background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 4, overflow: "hidden", marginTop: 10 },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#0047AB,#00d4ff)", transition: "width 0.35s ease", borderRadius: 6 },
  // Lang grid
  langGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 6, maxHeight: 280, overflowY: "auto", background: "#030810", padding: 10, borderRadius: 8, marginTop: 10 },
  langChk: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#475569", cursor: "pointer", padding: "5px 6px", borderRadius: 6, border: "1px solid transparent" },
  langChkOn: { background: "rgba(0,71,171,0.12)", border: "1px solid rgba(0,71,171,0.25)", color: "#e2e8f0" },
  // Results grid
  resultsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 6, maxHeight: 260, overflowY: "auto", background: "#030810", padding: 10, borderRadius: 8 },
  resultItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "7px 10px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.04)", overflow: "hidden" },
};

// Browser mount bridge — registers App for Index.html's inline loader
if (typeof window !== 'undefined') window.__localeForgeApp = App;
