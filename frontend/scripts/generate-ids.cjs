#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
let dotenv;
try { dotenv = require('dotenv'); } catch {}

// Load env from .env.local first, then override with .env.production if present
if (dotenv) {
  const envLocal = path.join(__dirname, '..', '.env.local');
  const envProd = path.join(__dirname, '..', '.env.production');
  if (fs.existsSync(envLocal)) {
    dotenv.config({ path: envLocal });
  }
  if (fs.existsSync(envProd)) {
    dotenv.config({ path: envProd });
  }
}

function resolveApiBase() {
  const direct = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim();
  if (direct) return direct;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL && process.env.NEXT_PUBLIC_API_BASE_URL.trim();
  if (base) return `${base.replace(/\/$/, '')}/api`;
  return 'http://127.0.0.1:8000/api';
}

const API_BASE = resolveApiBase();

async function main() {
  try {
    const res = await fetch(`${API_BASE}/itineraries`);
    if (!res.ok) throw new Error(`Failed ${res.status}`);
    const data = await res.json();
    const ids = (Array.isArray(data) ? data : [])
      .map((it) => String(it.id))
      .filter((id) => id && /^[0-9]+$/.test(id));
    const outPath = path.join(__dirname, '..', 'src', 'app', 'tours', 'ids.json');
    fs.writeFileSync(outPath, JSON.stringify(ids, null, 2));
    console.log(`Using API_BASE=${API_BASE}`);
    console.log(`Wrote ${ids.length} ids to ${outPath}`);
  } catch (e) {
    console.error('Failed to fetch itinerary ids, writing fallback [1,2,3]', e && e.message);
    const outPath = path.join(__dirname, '..', 'src', 'app', 'tours', 'ids.json');
    fs.writeFileSync(outPath, JSON.stringify(['1','2','3'], null, 2));
  }
}

main();
