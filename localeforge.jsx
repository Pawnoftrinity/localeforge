import { useState, useCallback, useEffect, useRef } from "react";

// ─── LANGUAGE LIST (70) ───────────────────────────────────────────────────────
const LANGUAGES = [
  // ── European ──────────────────────────────────────────────────────────────
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
  // ── East European / Slavic ────────────────────────────────────────────────
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "uk", name: "Ukrainian", native: "Українська" },
  // ── Caucasus & Central Asia ───────────────────────────────────────────────
  { code: "hy", name: "Armenian", native: "Հայերեն" },
  { code: "ka", name: "Georgian", native: "ქართული" },
  { code: "az", name: "Azerbaijani", native: "Azərbaycan" },
  { code: "kk", name: "Kazakh", native: "Қазақша" },
  { code: "uz", name: "Uzbek", native: "O'zbek" },
  // ── East Asia ─────────────────────────────────────────────────────────────
  { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
  { code: "mn", name: "Mongolian", native: "Монгол" },
  // ── South Asia ────────────────────────────────────────────────────────────
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
  // ── Southeast Asia ────────────────────────────────────────────────────────
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "th", name: "Thai", native: "ไทย" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu" },
  { code: "tl", name: "Tagalog", native: "Tagalog" },
  { code: "my", name: "Burmese", native: "မြန်မာဘာသာ" },
  { code: "km", name: "Khmer", native: "ភាសាខ្មែរ" },
  // ── Middle East ───────────────────────────────────────────────────────────
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "he", name: "Hebrew", native: "עברית" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "fa", name: "Persian", native: "فارسی" },
  { code: "ku", name: "Kurdish", native: "کوردی" },
  // ── Africa ────────────────────────────────────────────────────────────────
  { code: "sw", name: "Swahili", native: "Kiswahili" },
  { code: "am", name: "Amharic", native: "አማርኛ" },
  { code: "ha", name: "Hausa", native: "Hausa" },
  { code: "yo", name: "Yoruba", native: "Yorùbá" },
  { code: "so", name: "Somali", native: "Soomaali" },
  { code: "zu", name: "Zulu", native: "isiZulu" },
  // ── Americas / Caribbean ─────────────────────────────────────────────────
  { code: "ht", name: "Haitian Creole", native: "Kreyòl Ayisyen" },
];

// ─── JSON HELPERS ─────────────────────────────────────────────────────────────
function flattenKeys(obj, prefix = "") {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      Object.assign(out, flattenKeys(v, key));
    } else {
      out[key] = String(v);
    }
  }
  return out;
}

function buildNested(keys, values) {
  const result = {};
  keys.forEach((key, i) => {
    const parts = key.split(".");
    let cur = result;
    parts.forEach((p, idx) => {
      if (idx === parts.length - 1) {
        cur[p] = values[i] ?? key;
      } else {
        if (typeof cur[p] !== "object" || cur[p] === null) cur[p] = {};
        cur = cur[p];
      }
    });
  });
  return result;
}

function deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    if (typeof sv === "object" && sv !== null && !Array.isArray(sv)) {
      out[key] = deepMerge(out[key] || {}, sv);
    } else {
      out[key] = sv;
    }
  }
  return out;
}

// ─── DOWNLOAD HELPER ──────────────────────────────────────────────────────────
function downloadBlob(filename, content, mime = "application/json") {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── CLAUDE TRANSLATE ─────────────────────────────────────────────────────────
const CHUNK = 20;

async function translateChunk(pairs, langName, langNative) {
  const lines = pairs.map((p, i) => `${i + 1}. [${p.key}] ${JSON.stringify(p.value)}`).join("\n");
  const prompt = `You are a professional medical equipment terminology translator for a healthcare technology management (HTM) app used by Biomedical Equipment Technicians (BMETs).

Translate the following UI strings from English to ${langName} (${langNative}).

RULES:
- Return ONLY a JSON array of translated strings in the EXACT same order as input
- Keep medical device names, brand names, and acronyms (BMET, HTM, CBET, CRES, CHTM, FDA, MAUDE, GUDID, LOTO, OEM, PM, AI) unchanged
- Keep technical identifiers and model numbers unchanged
- Keep template variables like {{count}} exactly as-is
- Keep shortcodes like [SECTION:key] unchanged
- Use natural, professional medical/technical language for healthcare professionals
- For RTL languages (Arabic, Hebrew, Persian, Kurdish) use proper RTL text
- Return ONLY the JSON array, no explanation, no markdown, no backticks

Input strings:
${lines}

Return format: ["translation1", "translation2", ...]`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data.content?.[0]?.text ?? "[]";
  const clean = content.replace(/```json|```/gi, "").trim();
  const start = clean.indexOf("[");
  const end = clean.lastIndexOf("]");
  const arrStr = start >= 0 && end > start ? clean.slice(start, end + 1) : clean;
  const parsed = JSON.parse(arrStr);
  if (!Array.isArray(parsed)) throw new Error("Model did not return a JSON array");
  return parsed;
}

async function translateAll(enFlat, keys, langName, langNative, onProgress) {
  const out = [];
  const chunks = Math.ceil(keys.length / CHUNK);
  for (let i = 0; i < keys.length; i += CHUNK) {
    const chunkIdx = Math.floor(i / CHUNK);
    const slice = keys.slice(i, i + CHUNK).map((k) => ({ key: k, value: enFlat[k] }));
    onProgress(
      `Chunk ${chunkIdx + 1}/${chunks} — ${slice.length} strings`,
      Math.round(10 + (chunkIdx / chunks) * 80)
    );
    const translations = await translateChunk(slice, langName, langNative);
    // Pad/truncate defensively
    const padded = [...translations];
    while (padded.length < slice.length) padded.push(slice[padded.length]?.value ?? "");
    out.push(...padded.slice(0, slice.length));
  }
  return out;
}

// ─── JSZip LOADER ─────────────────────────────────────────────────────────────
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

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const JSZip = useJSZip();
  const [activeTab, setActiveTab] = useState("single"); // "single" | "bulk"
  const [enJson, setEnJson] = useState("");
  const [enError, setEnError] = useState("");

  // Single mode
  const [targetJson, setTargetJson] = useState("");
  const [targetError, setTargetError] = useState("");
  const [selectedLang, setSelectedLang] = useState("es");
  const [mode, setMode] = useState("gap"); // "gap" | "full"
  const [singleStatus, setSingleStatus] = useState("idle");
  const [singleProgress, setSingleProgress] = useState({ step: "", pct: 0 });
  const [missingKeys, setMissingKeys] = useState([]);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Bulk mode
  const [bulkSelected, setBulkSelected] = useState(() => new Set(LANGUAGES.map((l) => l.code)));
  const [bulkRunning, setBulkRunning] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ step: "", pct: 0 });
  const [bulkResults, setBulkResults] = useState([]);

  const lang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  function parseJSON(str, setErr) {
    if (!str.trim()) { setErr(""); return {}; }
    try { setErr(""); return JSON.parse(str); }
    catch (e) { setErr("Invalid JSON: " + e.message); return null; }
  }

  function analyze() {
    const en = parseJSON(enJson, setEnError);
    if (en === null) return;
    const target = parseJSON(targetJson, setTargetError);
    if (target === null) return;
    const missing = Object.keys(flattenKeys(en)).filter((k) => !(k in flattenKeys(target)));
    setMissingKeys(missing);
    setSingleStatus("analyzed");
  }

  async function translate() {
    const en = parseJSON(enJson, setEnError);
    if (en === null) return;
    let target = {};
    if (targetJson.trim() && mode === "gap") {
      const t = parseJSON(targetJson, setTargetError);
      if (t === null) return;
      target = t;
    }
    const enFlat = flattenKeys(en);
    const targetFlat = flattenKeys(target);
    const keys = mode === "gap"
      ? Object.keys(enFlat).filter((k) => !(k in targetFlat))
      : Object.keys(enFlat);

    if (keys.length === 0) {
      setOutput(JSON.stringify(target, null, 2));
      setSingleStatus("done");
      return;
    }
    setSingleStatus("translating");
    setSingleProgress({ step: `Preparing ${keys.length} keys…`, pct: 5 });
    try {
      const vals = await translateAll(enFlat, keys, lang.name, lang.native,
        (step, pct) => setSingleProgress({ step, pct }));
      setSingleProgress({ step: "Building file…", pct: 95 });
      const nested = buildNested(keys, vals);
      const final = mode === "gap" ? deepMerge(target, nested) : nested;
      setOutput(JSON.stringify(final, null, 2));
      setSingleStatus("done");
      setSingleProgress({ step: "Done!", pct: 100 });
    } catch (e) {
      setSingleStatus("error");
      setSingleProgress({ step: e.message, pct: 0 });
    }
  }

  async function runBulk() {
    const en = parseJSON(enJson, setEnError);
    if (en === null) return;
    const enFlat = flattenKeys(en);
    const keys = Object.keys(enFlat);
    const targets = LANGUAGES.filter((l) => bulkSelected.has(l.code));
    if (!targets.length) return;

    setBulkRunning(true);
    setBulkResults([]);
    const results = [];

    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      setBulkProgress({
        step: `(${i + 1}/${targets.length}) ${t.native} — ${t.code}.json`,
        pct: Math.round((i / targets.length) * 100),
      });
      try {
        const vals = await translateAll(enFlat, keys, t.name, t.native, (step) => {
          setBulkProgress((p) => ({ ...p, step: `(${i + 1}/${targets.length}) ${t.native} — ${step}` }));
        });
        const nested = buildNested(keys, vals);
        results.push({ code: t.code, native: t.native, json: JSON.stringify(nested, null, 2) });
      } catch (e) {
        results.push({ code: t.code, native: t.native, json: "", error: e.message });
      }
      setBulkResults([...results]);
    }
    setBulkProgress({ step: "All done!", pct: 100 });
    setBulkRunning(false);
  }

  async function downloadAllZip() {
    if (!JSZip || !bulkResults.length) return;
    const zip = new JSZip();
    const folder = zip.folder("locales");
    for (const r of bulkResults) {
      if (r.json) folder.file(`${r.code}.json`, r.json);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob("locales.zip", blob, "application/zip");
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={styles.root}>
      {/* Animated grid background */}
      <div style={styles.gridBg} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>🌐</div>
          <div>
            <div style={styles.appName}>LocaleForge</div>
            <div style={styles.appSub}>Locale File Translator · {LANGUAGES.length} Languages</div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* en.json input */}
        <Section label="en.json · Source File" error={!!enError}>
          <textarea
            value={enJson}
            onChange={(e) => { setEnJson(e.target.value); setEnError(""); setSingleStatus("idle"); }}
            placeholder="Paste your en.json content here…"
            style={styles.ta}
          />
          {enError && <ErrMsg>{enError}</ErrMsg>}
          {enJson && !enError && (
            <div style={styles.jsonStat}>
              {(() => {
                try {
                  const flat = flattenKeys(JSON.parse(enJson));
                  return `✓ ${Object.keys(flat).length} translation keys loaded`;
                } catch { return null; }
              })()}
            </div>
          )}
        </Section>

        {/* Tab bar */}
        <div style={styles.tabBar}>
          {[["single", "🔠 Single Language"], ["bulk", "🚀 Bulk Export"]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ ...styles.tab, ...(activeTab === id ? styles.tabActive : {}) }}>
              {label}
            </button>
          ))}
        </div>

        {/* ── SINGLE TAB ──────────────────────────────────────────────────── */}
        {activeTab === "single" && (
          <>
            {/* Mode toggle */}
            <Section label="Mode">
              <div style={styles.row}>
                {[["gap", "🔍 Fill Missing Keys"], ["full", "🔄 Full Retranslate"]].map(([v, label]) => (
                  <button key={v} onClick={() => { setMode(v); setSingleStatus("idle"); setOutput(""); }}
                    style={{ ...styles.modeBtn, ...(mode === v ? styles.modeBtnActive : {}) }}>
                    {label}
                  </button>
                ))}
              </div>
            </Section>

            {/* Language picker */}
            <Section label="Target Language">
              <select value={selectedLang}
                onChange={(e) => { setSelectedLang(e.target.value); setSingleStatus("idle"); setOutput(""); }}
                style={styles.select}>
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.native} ({l.name}) — {l.code}.json</option>
                ))}
              </select>
            </Section>

            {/* Target JSON (gap mode only) */}
            {mode === "gap" && (
              <Section label={`${selectedLang}.json · Existing file (optional)`} error={!!targetError}>
                <textarea value={targetJson}
                  onChange={(e) => { setTargetJson(e.target.value); setTargetError(""); setSingleStatus("idle"); }}
                  placeholder={`Paste your existing ${selectedLang}.json here (leave blank to translate all)…`}
                  style={styles.ta} />
                {targetError && <ErrMsg>{targetError}</ErrMsg>}
                {enJson && (
                  <button onClick={analyze} style={{ ...styles.btnSecondary, marginTop: 10, width: "100%" }}>
                    🔍 Analyze Gap
                  </button>
                )}
                {singleStatus === "analyzed" && (
                  <div style={{
                    ...styles.infoBox,
                    background: missingKeys.length === 0 ? "rgba(34,197,94,0.07)" : "rgba(245,158,11,0.07)",
                    borderColor: missingKeys.length === 0 ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)",
                  }}>
                    {missingKeys.length === 0 ? (
                      <div style={{ color: "#22c55e", fontSize: 12 }}>✅ {selectedLang}.json is fully in sync</div>
                    ) : (
                      <>
                        <div style={{ color: "#f59e0b", fontSize: 12, marginBottom: 6 }}>
                          ⚠ {missingKeys.length} missing key{missingKeys.length !== 1 ? "s" : ""}
                        </div>
                        <div style={styles.keyList}>
                          {missingKeys.map((k) => (
                            <div key={k} style={{ fontSize: 10, color: "#f59e0b", lineHeight: 1.9 }}>• {k}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Section>
            )}

            {/* Translate button */}
            <button onClick={translate}
              disabled={!enJson || singleStatus === "translating"}
              style={{ ...styles.btnPrimary, opacity: !enJson ? 0.45 : 1 }}>
              {singleStatus === "translating"
                ? `⏳ ${singleProgress.step}`
                : mode === "gap"
                  ? `🌐 Fill Missing → ${lang.native}`
                  : `🔄 Retranslate → ${lang.native}`}
            </button>

            {singleStatus === "translating" && <ProgressBar pct={singleProgress.pct} />}

            {singleStatus === "error" && (
              <div style={{ ...styles.infoBox, background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)", color: "#f87171", fontSize: 12 }}>
                ❌ {singleProgress.step}
              </div>
            )}

            {singleStatus === "done" && output && (
              <Section label={`✅ ${selectedLang}.json — ${output.split("\n").length} lines`}>
                <div style={{ ...styles.row, marginBottom: 10, flexWrap: "wrap" }}>
                  <button onClick={() => downloadBlob(`${selectedLang}.json`, output)} style={styles.btnSm}>⬇ Download</button>
                  <button onClick={() => { navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); }} style={styles.btnSmSecondary}>
                    {copied ? "✓ Copied" : "📋 Copy"}
                  </button>
                </div>
                <textarea readOnly value={output} style={{ ...styles.ta, height: 220, color: "#4ade80" }} />
              </Section>
            )}
          </>
        )}

        {/* ── BULK TAB ─────────────────────────────────────────────────────── */}
        {activeTab === "bulk" && (
          <>
            <Section label={`Select Languages · ${bulkSelected.size}/${LANGUAGES.length}`}>
              <div style={styles.row}>
                <button onClick={() => setBulkSelected(new Set(LANGUAGES.map((l) => l.code)))} style={styles.btnSmSecondary}>All</button>
                <button onClick={() => setBulkSelected(new Set())} style={styles.btnSmSecondary}>None</button>
              </div>
              <div style={styles.langGrid}>
                {LANGUAGES.map((l) => {
                  const sel = bulkSelected.has(l.code);
                  return (
                    <label key={l.code} style={{ ...styles.langChk, ...(sel ? styles.langChkActive : {}) }}>
                      <input type="checkbox" checked={sel}
                        onChange={(e) => {
                          const next = new Set(bulkSelected);
                          e.target.checked ? next.add(l.code) : next.delete(l.code);
                          setBulkSelected(next);
                        }}
                        style={{ accentColor: "#3b82f6", width: 14, height: 14 }} />
                      <span style={{ fontWeight: 600, color: sel ? "#93c5fd" : "#475569" }}>{l.code}</span>
                      <span style={{ fontSize: 10, opacity: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.native}</span>
                    </label>
                  );
                })}
              </div>
            </Section>

            <button onClick={runBulk}
              disabled={!enJson || bulkRunning || bulkSelected.size === 0}
              style={{ ...styles.btnPrimary, opacity: (!enJson || bulkSelected.size === 0) ? 0.45 : 1 }}>
              {bulkRunning ? `⏳ ${bulkProgress.step}` : `🚀 Generate ${bulkSelected.size} files`}
            </button>

            {bulkRunning && <ProgressBar pct={bulkProgress.pct} />}

            {bulkResults.length > 0 && (
              <Section label={`Results · ${bulkResults.filter((r) => !r.error).length}/${bulkResults.length} ready`}>
                <div style={{ ...styles.row, marginBottom: 12 }}>
                  <button onClick={downloadAllZip} disabled={!JSZip} style={styles.btnSm}>
                    ⬇ Download All (.zip)
                  </button>
                </div>
                <div style={styles.resultsGrid}>
                  {bulkResults.map((r) => (
                    <div key={r.code} style={{ ...styles.resultItem, background: r.error ? "rgba(239,68,68,0.07)" : "rgba(34,197,94,0.05)" }}>
                      <span style={{ color: r.error ? "#f87171" : "#86efac", fontWeight: 700, fontSize: 11 }}>{r.code}.json</span>
                      <span style={{ fontSize: 10, opacity: 0.6, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{r.native}</span>
                      {r.error
                        ? <span title={r.error} style={{ color: "#f87171", fontSize: 12 }}>⚠</span>
                        : <button onClick={() => downloadBlob(`${r.code}.json`, r.json)}
                            style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: 13, padding: 0 }}>⬇</button>
                      }
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </>
        )}

        {/* bottom safe area */}
        <div style={{ height: 40 }} />
      </main>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Section({ label, error, children }) {
  return (
    <div style={{ ...styles.section, ...(error ? { borderColor: "#ef4444" } : {}) }}>
      <div style={styles.sectionLabel}>{label}</div>
      {children}
    </div>
  );
}
function ErrMsg({ children }) {
  return <div style={{ color: "#ef4444", fontSize: 11, marginTop: 6 }}>⚠ {children}</div>;
}
function ProgressBar({ pct }) {
  return (
    <div style={styles.progressTrack}>
      <div style={{ ...styles.progressFill, width: `${pct}%` }} />
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    background: "#060d1f",
    color: "#e2e8f0",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    position: "relative",
    overflowX: "hidden",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,71,171,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,71,171,0.06) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "linear-gradient(135deg, rgba(0,47,120,0.97) 0%, rgba(0,15,50,0.97) 100%)",
    borderBottom: "1px solid rgba(0,100,220,0.25)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "12px 16px",
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    maxWidth: 700,
    margin: "0 auto",
  },
  logo: {
    width: 38,
    height: 38,
    background: "rgba(0,71,171,0.4)",
    border: "1px solid rgba(0,180,255,0.25)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },
  appName: {
    fontWeight: 800,
    fontSize: 14,
    color: "#fff",
    letterSpacing: "0.06em",
  },
  appSub: {
    fontSize: 10,
    color: "rgba(0,229,255,0.65)",
    marginTop: 1,
    letterSpacing: "0.04em",
  },
  main: {
    maxWidth: 700,
    margin: "0 auto",
    padding: "16px 12px",
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  section: {
    background: "rgba(255,255,255,0.028)",
    border: "1px solid rgba(0,71,171,0.28)",
    borderRadius: 14,
    padding: "14px 14px",
  },
  sectionLabel: {
    fontSize: 10,
    color: "#475569",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 10,
    fontWeight: 700,
  },
  ta: {
    width: "100%",
    height: 110,
    background: "#040a18",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 8,
    color: "#94a3b8",
    padding: "10px 12px",
    fontSize: 11,
    fontFamily: "monospace",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    lineHeight: 1.6,
  },
  jsonStat: {
    fontSize: 10,
    color: "#22c55e",
    marginTop: 6,
  },
  tabBar: {
    display: "flex",
    gap: 8,
    background: "rgba(0,0,0,0.3)",
    padding: 4,
    borderRadius: 12,
    border: "1px solid rgba(0,71,171,0.2)",
  },
  tab: {
    flex: 1,
    padding: "10px 8px",
    borderRadius: 9,
    border: "none",
    background: "transparent",
    color: "#475569",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.02em",
    transition: "all 0.15s",
  },
  tabActive: {
    background: "linear-gradient(135deg, #0047AB, #002d7a)",
    color: "#e2e8f0",
    boxShadow: "0 2px 8px rgba(0,71,171,0.4)",
  },
  row: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  modeBtn: {
    flex: 1,
    minWidth: 120,
    padding: "10px 10px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    color: "#475569",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "inherit",
  },
  modeBtnActive: {
    border: "1px solid rgba(0,100,255,0.5)",
    background: "rgba(0,71,171,0.2)",
    color: "#93c5fd",
  },
  select: {
    width: "100%",
    background: "#040a18",
    border: "1px solid rgba(0,71,171,0.35)",
    borderRadius: 8,
    color: "#e2e8f0",
    padding: "11px 12px",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
  },
  infoBox: {
    marginTop: 10,
    borderRadius: 10,
    border: "1px solid",
    padding: "10px 12px",
  },
  keyList: {
    maxHeight: 100,
    overflowY: "auto",
    background: "#030810",
    borderRadius: 6,
    padding: "6px 10px",
  },
  btnPrimary: {
    width: "100%",
    padding: "14px 16px",
    background: "linear-gradient(135deg, #0047AB 0%, #002d7a 100%)",
    border: "1px solid rgba(0,71,171,0.5)",
    borderRadius: 12,
    color: "#fff",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.04em",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 16px rgba(0,71,171,0.3)",
    transition: "opacity 0.15s",
  },
  btnSecondary: {
    padding: "10px 16px",
    background: "rgba(0,71,171,0.12)",
    border: "1px solid rgba(0,71,171,0.35)",
    borderRadius: 8,
    color: "#60a5fa",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 600,
  },
  btnSm: {
    padding: "8px 14px",
    background: "linear-gradient(135deg, #0047AB, #002d7a)",
    border: "1px solid rgba(0,71,171,0.5)",
    borderRadius: 8,
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  btnSmSecondary: {
    padding: "8px 14px",
    background: "rgba(0,71,171,0.1)",
    border: "1px solid rgba(0,71,171,0.3)",
    borderRadius: 8,
    color: "#60a5fa",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  progressTrack: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: 6,
    height: 4,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #0047AB, #00d4ff)",
    transition: "width 0.35s ease",
    borderRadius: 6,
  },
  langGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: 6,
    maxHeight: 300,
    overflowY: "auto",
    background: "#030810",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  langChk: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: "#475569",
    cursor: "pointer",
    padding: "5px 6px",
    borderRadius: 6,
    border: "1px solid transparent",
  },
  langChkActive: {
    background: "rgba(0,71,171,0.12)",
    border: "1px solid rgba(0,71,171,0.25)",
    color: "#e2e8f0",
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
    gap: 6,
    maxHeight: 280,
    overflowY: "auto",
    background: "#030810",
    padding: 10,
    borderRadius: 8,
  },
  resultItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    padding: "7px 10px",
    borderRadius: 7,
    border: "1px solid rgba(255,255,255,0.04)",
    overflow: "hidden",
  },
};
