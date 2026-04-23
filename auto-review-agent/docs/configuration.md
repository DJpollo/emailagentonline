# Configuration Guide

After importing the n8n workflow, you need to replace the hardcoded Supabase credentials with your own. The workflow is now configured to call Gemini instead of a local Ollama model.

## Finding your Supabase credentials

1. Go to [supabase.com](https://supabase.com) → your project
2. Click **Project Settings** → **API**
3. Copy:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon / public key** — the long JWT string

## Updating the n8n workflow

Open each of these nodes and replace the `apikey` and `Authorization` header values:

| Node | What to update |
|---|---|
| Fetch Unread Emails | apikey + Authorization headers |
| Save Request | apikey + Authorization headers |
| Save Email Summary | apikey + Authorization headers |
| Save Activity Log | apikey + Authorization headers |
| Mark Email as Read | apikey + Authorization headers + URL |

The URL in **Mark Email as Read** should use your project ID:
```
https://YOUR_PROJECT_ID.supabase.co/rest/v1/emails?id=eq.{{ $('Parse Gemini Response').first().json.email_id }}
```

## Gemini setup

The workflow uses `gemini-2.5-flash` by default through the Gemini API.

1. Create an API key in Google AI Studio
2. Open the **Analyze with Gemini** node
3. Replace the `x-goog-api-key` header value with your own if needed
4. If you want a different Gemini model, update the URL and the payload builder in **Build Gemini Payload**

## Changing the schedule

The workflow runs every hour by default. To change it:
1. Open the **Schedule Trigger** node
2. Adjust the interval as needed
