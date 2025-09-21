# Sales Data Dashboard — Assignment Report
**Candidate:** <Your Name> | **Date:** 2025-09-21

## 1. Abstract
A full-stack dashboard for sales analytics. Raw sales data is cleaned and enriched in a Jupyter notebook, served via a FastAPI backend, and visualized in a React dashboard. The project demonstrates data engineering, API design, and frontend skills.

## 2. Tools & AI Usage
- Python (pandas, FastAPI)
- React (Vite, Recharts)
- Node.js (frontend)
- AI: GitHub Copilot for code, prompt engineering, and documentation

## 3. Design & Methodology
- Data cleaning: drop NAs/dups, normalize categories, parse dates, add Year/Month/Quarter
- API: 6 endpoints for KPIs and aggregations
- Frontend: KPI cards, line/bar/donut charts

## 4. Implementation Details
- See README.md for folder structure and run instructions
- Key code: pandas groupby, FastAPI routes, React chart wiring
- .env: VITE_API_URL=http://localhost:8000

## 5. Results
- [Paste screenshots of notebook, API (Postman), dashboard]
- KPIs: total sales, orders, avg order value

## 6. Challenges & Limitations
- Data quality/size
- Simple aggregations (no advanced ML)

## 7. Conclusion
- Achieved a working dashboard with clean code and modular design

## 8. References
- pandas, FastAPI, React, Recharts docs

## 9. Appendix
- Git log: `git log --oneline`
- Run commands: see README.md
