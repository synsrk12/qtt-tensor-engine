QTT Tensor Engine — Quick Start and Usage

Purpose:
This project provides a Next.js frontend (UI) and a FastAPI-based backend for computing and displaying tensor symmetry / point group results with KaTeX-rendered math.

Quick start (frontend):
1. Open a terminal and change to the frontend folder:
   cd Project_bolt/project
2. Install dependencies (if needed):
   npm install
3. Start the dev server:
   npm run dev
4. If build artifacts cause stale output, clean and restart:
   rm -rf .next && npm run dev

Quick start (backend):
1. Open a terminal and change to the backend folder:
   cd TnsrBackend
2. Create/activate a Python virtualenv and install requirements if present.
   python3 -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt  # if requirements.txt exists
3. Start the FastAPI server (example using uvicorn):
   uvicorn app.main:app --reload --port 8000
   # or run python main.py if that is the intended entrypoint in your setup

Data and configuration:
- Operation labels and LaTeX strings: Project_bolt/project/data/operations.json (the `latex` field is used when available).
- Point groups and operations data: Project_bolt/project/data/*.json

Developer notes:
- If you change UI code, rebuild/restart the Next dev server to see updates.
- If you change backend code, restart the FastAPI/uvicorn process.
- Look for KaTeX rendering components in Project_bolt/project/components (ResultPanel.tsx, TensorMatrix.tsx, GroupTable.tsx, etc.).

Contact/Next steps:
- If you want the README converted to Markdown (`README.md`) or expanded with screenshots and examples, tell me and I will update it.
