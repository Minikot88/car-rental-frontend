import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

export default function RevenueChart({ data = [], loading = false }) {
  //////////////////////////////////////////////////////
  // EMPTY STATE
  //////////////////////////////////////////////////////
  if (loading) {
    return <div style={{ padding: 20 }}>กำลังโหลดกราฟ...</div>;
  }

  if (!data.length) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        ไม่มีข้อมูลรายได้
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // FORMATTERS
  //////////////////////////////////////////////////////
  const formatCurrency = (value) =>
    `฿${Number(value).toLocaleString()}`;

  const formatDate = (value) =>
    new Date(value).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
    });

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          fontSize={12}
        />

        <YAxis
          tickFormatter={(value) =>
            `฿${(value / 1000).toFixed(0)}k`
          }
          fontSize={12}
        />

        <Tooltip
          formatter={(value) => formatCurrency(value)}
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString("th-TH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorRevenue)"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}