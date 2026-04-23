// assets.js — Asset CSV upload page

const SUPABASE_URL = "https://ojwhukwnuwsusxxunnmj.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2h1a3dudXdzdXN4eHVubm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNDkyMjQsImV4cCI6MjA4NzcyNTIyNH0.KUmJyLcdDaeNyksQQOkwqOI4sn3JjoOtvUlGGKpdO7k";

const TEMPLATE = `name,category,quantity,available,notes\nMacBook Pro 14",Laptop,3,true,Charger included\nProjector A,AV Equipment,2,true,HDMI cable required\nStanding Desk,Furniture,5,false,Under maintenance\n`;

// ── DOM refs ─────────────────────────────────────────────────────────────────
const dropZone       = document.getElementById("dropZone");
const fileInput      = document.getElementById("fileInput");
const errorBox       = document.getElementById("errorBox");
const previewSection = document.getElementById("previewSection");
const previewCount   = document.getElementById("previewCount");
const previewBody    = document.getElementById("previewBody");
const importBtn      = document.getElementById("importBtn");
const clearBtn       = document.getElementById("clearBtn");
const uploadingBox   = document.getElementById("uploadingBox");
const successBox     = document.getElementById("successBox");
const successMsg     = document.getElementById("successMsg");
const uploadErrorBox = document.getElementById("uploadErrorBox");
const uploadErrorMsg = document.getElementById("uploadErrorMsg");
const downloadBtn    = document.getElementById("downloadBtn");
const importMoreBtn  = document.getElementById("importMoreBtn");
const retryBtn       = document.getElementById("retryBtn");

let parsedRows = [];

// ── Template download ────────────────────────────────────────────────────────
downloadBtn.addEventListener("click", () => {
  const blob = new Blob([TEMPLATE], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "assets_template.csv"; a.click();
  URL.revokeObjectURL(url);
});

// ── Drop zone ────────────────────────────────────────────────────────────────
dropZone.addEventListener("click", () => fileInput.click());
dropZone.addEventListener("dragover",  e => { e.preventDefault(); dropZone.classList.add("drag-over"); });
dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  processFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener("change", e => processFile(e.target.files[0]));

// ── CSV parsing ──────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter(l => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };

  function splitLine(line) {
    const cols = []; let cur = ""; let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; }
      else if (c === "," && !inQ) { cols.push(cur.trim()); cur = ""; }
      else cur += c;
    }
    cols.push(cur.trim());
    return cols;
  }

  const headers = splitLine(lines[0]).map(h => h.toLowerCase().replace(/"/g, "").trim());
  const rows = lines.slice(1).map(line => {
    const vals = splitLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (vals[i] || "").replace(/"/g, "").trim(); });
    return obj;
  });
  return { headers, rows };
}

function parseAvailable(val) {
  return ["true","yes","1"].includes(String(val).toLowerCase().trim());
}

function processFile(file) {
  if (!file) return;
  if (!file.name.endsWith(".csv")) { showError(["Please upload a .csv file."]); return; }

  const reader = new FileReader();
  reader.onload = e => {
    const { headers, rows } = parseCSV(e.target.result);

    // Check required columns
    const missing = ["name","category"].filter(c => !headers.includes(c));
    if (missing.length) {
      showError([`Missing required columns: ${missing.join(", ")}`, "Download the template to see the correct format."]);
      return;
    }

    // Validate rows
    const errors = [];
    const valid  = [];
    rows.forEach((row, i) => {
      if (!row.name)      { errors.push(`Row ${i+2}: name is required`); return; }
      if (!row.category)  { errors.push(`Row ${i+2}: category is required`); return; }
      const qty = row.quantity === "" ? 1 : Number(row.quantity);
      if (isNaN(qty) || qty < 0) { errors.push(`Row ${i+2}: quantity must be a number ≥ 0`); return; }
      valid.push({
        name:      row.name,
        category:  row.category,
        quantity:  isNaN(qty) ? 1 : qty,
        available: parseAvailable(row.available ?? "true"),
        notes:     row.notes || null,
      });
    });

    if (errors.length) { showError(errors); return; }
    if (!valid.length) { showError(["No valid rows found in the CSV."]); return; }

    hideError();
    parsedRows = valid;
    showPreview();
  };
  reader.readAsText(file);
}

// ── Preview ──────────────────────────────────────────────────────────────────
function showPreview() {
  previewCount.textContent = `${parsedRows.length} asset${parsedRows.length !== 1 ? "s" : ""} ready to import`;
  previewBody.innerHTML = "";

  const display = parsedRows.slice(0, 8);
  display.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${row.name}</strong></td>
      <td>${row.category}</td>
      <td style="font-family:monospace">${row.quantity}</td>
      <td><span class="${row.available ? "avail-yes" : "avail-no"}">${row.available ? "available" : "unavailable"}</span></td>
      <td style="color:var(--muted);font-size:12px">${row.notes || "—"}</td>
    `;
    previewBody.appendChild(tr);
  });

  if (parsedRows.length > 8) {
    const tr = document.createElement("tr");
    tr.className = "more-rows";
    tr.innerHTML = `<td colspan="5">+ ${parsedRows.length - 8} more rows not shown</td>`;
    previewBody.appendChild(tr);
  }

  importBtn.textContent = `Import ${parsedRows.length} asset${parsedRows.length !== 1 ? "s" : ""} →`;
  show(previewSection);
  hide(dropZone);
}

// ── Upload ───────────────────────────────────────────────────────────────────
importBtn.addEventListener("click", async () => {
  hide(previewSection);
  show(uploadingBox);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/assets`, {
      method: "POST",
      headers: {
        "apikey":        SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type":  "application/json",
        "Prefer":        "return=representation",
      },
      body: JSON.stringify(parsedRows),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `HTTP ${res.status}`);
    }

    const inserted = await res.json();
    hide(uploadingBox);
    successMsg.textContent = `${inserted.length} asset${inserted.length !== 1 ? "s" : ""} imported successfully`;
    show(successBox);
    parsedRows = [];
  } catch (err) {
    hide(uploadingBox);
    uploadErrorMsg.textContent = err.message;
    show(uploadErrorBox);
  }
});

// ── Reset helpers ────────────────────────────────────────────────────────────
function reset() {
  parsedRows = [];
  fileInput.value = "";
  hide(previewSection); hide(uploadingBox);
  hide(successBox); hide(uploadErrorBox); hide(errorBox);
  show(dropZone);
}

clearBtn.addEventListener("click", reset);
importMoreBtn.addEventListener("click", reset);
retryBtn.addEventListener("click", reset);

// ── UI helpers ───────────────────────────────────────────────────────────────
function show(el) { el.classList.remove("hidden"); }
function hide(el) { el.classList.add("hidden"); }

function showError(msgs) {
  errorBox.innerHTML = `<p class="error-title">Fix these issues before uploading:</p>` +
    msgs.map(m => `<p style="margin:2px 0;font-family:monospace;font-size:12px">${m}</p>`).join("");
  show(errorBox);
  hide(previewSection);
  show(dropZone);
}
function hideError() { hide(errorBox); }
