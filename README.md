# Sales Data Dashboard

## Project Overview
A full-stack dashboard for sales analytics. It preprocesses raw sales data, exposes a FastAPI backend with KPI and aggregation endpoints, and visualizes results in a React dashboard (Recharts).

## Tech Stack
- Python (pandas, FastAPI)
- React (Vite, Recharts)
- Node.js (for frontend)

## Folder Structure
```
README.md
api/           # FastAPI backend
  app.py
  requirements.txt
  run.sh
  ...
data/
  processed/
    sales_clean.csv
  raw/
    sales_sample.csv
docs/
  report_template.md
notebooks/
  preprocessing.ipynb
web/           # React frontend
  index.html
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
  .env
```

## How to Run (Windows)

### Backend
```sh
cd api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

### Frontend
```sh
cd web
npm install
npm run dev
```

Open http://localhost:5173

## API List & Examples
- `GET /kpis` → `{ "totalSales": 12345, "totalOrders": 100, "avgOrderValue": 123.45 }`
- `GET /sales/time?granularity=month|quarter|year`
- `GET /sales/by-category`
- `GET /sales/by-country`
- `GET /customers/top?limit=10`
- `GET /status/breakdown`

## Credits & AI Usage
- Built by <Your Name> for Arys Garage selection.
- Used GitHub Copilot for code, prompt engineering, and documentation.

---

See `/docs/report_template.md` for the full report template.

## Run locally

### 1) Backend
```
cd api
python -m venv .venv && . .venv/bin/activate  # (Windows: .venv\Scripts\activate)
pip install -r requirements.txt
python - <<'PY'
# Ensure there's a cleaned file (usually the notebook produces it)
# This snippet is optional since a sample cleaned file is provided.
print("Data file present:", __import__('pathlib').Path('../data/processed/sales_clean.csv').exists())
PY
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 2) Frontend (new terminal)
```
cd web
npm i
cp .env.example .env   # or set VITE_API_URL if backend runs elsewhere
npm run dev
```
Open http://localhost:5173

## API Routes
- `GET /kpis`
- `GET /sales/time?granularity=month|quarter|year`
- `GET /sales/by-category`
- `GET /sales/by-country`
- `GET /customers/top?limit=10`
- `GET /status/breakdown`

## Notes
- Replace sample data with your assignment dataset if provided.
- Keep incremental commits per assignment instructions.
- Record a 2–4 minute demo: preprocessing → API → dashboard.

## License
MIT