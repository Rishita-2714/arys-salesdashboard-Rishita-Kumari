import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [kpis, setKpis] = useState({ totalSales: 0, totalOrders: 0, avgOrderValue: 0 })
  const [timeData, setTimeData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [statusData, setStatusData] = useState([])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6699', '#FF4444', '#00B8D9', '#FFB347', '#B6D7A8'];

  useEffect(() => {
    fetch(`${API}/kpis`).then(r=>r.json()).then(setKpis)
    fetch(`${API}/sales/time?granularity=month`).then(r=>r.json()).then(setTimeData)
    fetch(`${API}/sales/by-category`).then(r=>r.json()).then(setCategoryData)
    fetch(`${API}/status/breakdown`).then(r=>r.json()).then(setStatusData)
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, system-ui', padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <h1>Sales Dashboard</h1>
      <p style={{opacity:.7}}>KPI cards, sales over time, productline distribution, and order status donut.</p>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
          <div>Total Sales</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>₹ {kpis.totalSales.toFixed(2)}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
          <div>Total Orders</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{kpis.totalOrders}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
          <div>Avg Order Value</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>₹ {kpis.avgOrderValue.toFixed(2)}</div>
        </div>
      </div>

      {/* Line Chart: Sales over time */}
      <div style={{ marginTop: 32, padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
        <h3>Sales Over Time (Monthly)</h3>
        <LineChart width={1100} height={320} data={timeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" strokeWidth={2} />
        </LineChart>
      </div>

      {/* Bar / Pie for productline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
          <h3>Sales by Product Line</h3>
          <BarChart width={520} height={320} data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" />
          </BarChart>
        </div>
        <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
          <h3>Order Status Mix</h3>
          <PieChart width={520} height={320}>
            <Pie data={statusData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={110} label>
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  )
}
