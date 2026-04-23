# Email Agent Reader – Backend

A **FastAPI** backend that serves email data stored in [Supabase](https://supabase.com/), built as part of Team 9's CS 4485 Senior Capstone project at UT Dallas.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Links](#project-links)

---

## Overview

The Email Agent Reader Backend exposes a REST API that reads emails stored in a Supabase database and returns them to client applications. It is designed to be lightweight, easy to extend, and ready for integration with AI/agent-based email processing workflows.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | [FastAPI](https://fastapi.tiangolo.com/) |
| Database   | [Supabase](https://supabase.com/) (PostgreSQL) |
| Language   | Python 3.x                          |

---

## Project Structure

```
email-agent-reader-Backend/
├── backend/
│   └── app/
│       ├── main.py             # FastAPI application and route definitions
│       ├── supabase_client.py  # Supabase client initialization
│       └── static/             # Colorful frontend (HTML/CSS/JS)
├── Documents/
│   ├── Links.txt               # Project-related links
│   └── Weekly Reports/         # Team weekly progress reports
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- A [Supabase](https://supabase.com/) project with an `emails` table

### Installation

```bash
# Clone the repository
git clone https://github.com/shayanCS-UTD/email-agent-reader-Backend.git
cd email-agent-reader-Backend

# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn supabase
```

### Configuration

The Supabase connection is configured in `backend/app/supabase_client.py`. It is recommended to use environment variables instead of hardcoding credentials:

```python
import os
from supabase import create_client, Client

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
```

Set the variables before starting the server:

```bash
export SUPABASE_URL="https://your-project-id.supabase.co"
export SUPABASE_KEY="your-anon-public-key"   # Use the anon/public key for client-facing access
```

### Running the Server

```bash
cd backend
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

A colorful frontend dashboard is available at `http://127.0.0.1:8000/frontend`.

Interactive API docs (Swagger UI) are automatically available at `http://127.0.0.1:8000/docs`.

---

## API Endpoints

| Method | Path      | Description                        |
|--------|-----------|------------------------------------|
| GET    | `/`       | Returns a welcome message          |
| GET    | `/health` | Health check – returns `{"status": "ok"}` |
| GET    | `/emails` | Fetches all rows from the `emails` table in Supabase |
| GET    | `/frontend` | Serves the colorful email dashboard UI |

### Example Responses

**GET /**
```json
{"message": "Email Agent Reader API running"}
```

**GET /health**
```json
{"status": "ok"}
```

**GET /emails**
```json
{
  "emails": [
    {
      "id": 1,
      "subject": "Hello World",
      "body": "...",
      ...
    }
  ]
}
```

---

## Project Links

- **Jira Board**: [SCRUM Board](https://utdallas-team9-4485-26f.atlassian.net/jira/software/projects/SCRUM/boards/1)
