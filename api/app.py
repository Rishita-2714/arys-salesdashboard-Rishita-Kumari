
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path

app = FastAPI(title="Sales Dashboard API", version="1.0")

# CORS (allow local React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "processed" / "sales_clean.csv"
_df = pd.read_csv(DATA_PATH, parse_dates=["ORDERDATE"])

def kpis():
    total_sales = float(_df["SALES"].sum())
    total_orders = int(_df["ORDERNUMBER"].nunique())
    aov = float(total_sales / total_orders) if total_orders else 0.0
    return {"totalSales": total_sales, "totalOrders": total_orders, "avgOrderValue": aov}

@app.get("/kpis")
def get_kpis():
    return kpis()

@app.get("/sales/time")
def sales_over_time(granularity: str = "month"):
    df = _df.copy()
    if granularity == "year":
        grp = df.groupby("Year", as_index=False)["SALES"].sum()
        out = [{"label": str(r["Year"]), "value": float(r["SALES"])} for _, r in grp.iterrows()]
    elif granularity == "quarter":
        grp = df.groupby("Quarter", as_index=False)["SALES"].sum().sort_values("Quarter")
        out = [{"label": str(r["Quarter"]), "value": float(r["SALES"])} for _, r in grp.iterrows()]
    else:
        # month
        grp = df.groupby("Month", as_index=False)["SALES"].sum().sort_values("Month")
        out = [{"label": str(r["Month"]), "value": float(r["SALES"])} for _, r in grp.iterrows()]
    return out

@app.get("/sales/by-category")
def sales_by_category():
    grp = _df.groupby("PRODUCTLINE", as_index=False)["SALES"].sum().sort_values("SALES", ascending=False)
    return [{"label": r["PRODUCTLINE"], "value": float(r["SALES"])} for _, r in grp.iterrows()]

@app.get("/sales/by-country")
def sales_by_country():
    grp = _df.groupby("COUNTRY", as_index=False)["SALES"].sum().sort_values("SALES", ascending=False)
    return [{"label": r["COUNTRY"], "value": float(r["SALES"])} for _, r in grp.iterrows()]

@app.get("/customers/top")
def top_customers(limit: int = 10):
    grp = _df.groupby("CUSTOMERNAME", as_index=False)["SALES"].sum().sort_values("SALES", ascending=False).head(limit)
    return [{"label": r["CUSTOMERNAME"], "value": float(r["SALES"])} for _, r in grp.iterrows()]

@app.get("/status/breakdown")
def status_breakdown():
    grp = _df.groupby("STATUS", as_index=False)["ORDERNUMBER"].nunique()
    return [{"label": r["STATUS"], "value": int(r["ORDERNUMBER"])} for _, r in grp.iterrows()]
