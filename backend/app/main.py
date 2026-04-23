from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from .supabase_client import supabase

app = FastAPI(title="Email Agent Reader API")

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def root():
    return {"message": "Email Agent Reader API running"}

@app.get("/frontend")
def frontend():
    return FileResponse(STATIC_DIR / "index.html")

# ── Assets upload page ────────────────────────────────────────────────────────
@app.get("/assets/upload")
def assets_upload():
    return FileResponse(STATIC_DIR / "assets.html")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/emails")
def get_emails():
    data = supabase.table("emails").select("*").execute()
    return {"emails": data.data}

@app.get("/assets")
def get_assets():
    data = supabase.table("assets").select("*").order("name").execute()
    return {"assets": data.data}
