from supabase import create_client, Client
import os

SUPABASE_URL = "https://ojwhukwnuwsusxxunnmj.supabase.co"
SUPABASE_KEY = "sb_publishable_pZVV16B0iHnt3A1XAv_Jiw_PgqsrUZ9"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)