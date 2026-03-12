import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Package, Archive, RefreshCw, DollarSign, Activity, BarChart3 } from "lucide-react";
import { HealthStore, ZMW, MonthlyRecord } from "../utils/store";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Dashboard() {
  const [monthlyRecords, setMonthlyRecords] = useState<MonthlyRecord[]>([]);
  const [stock, setStock] = useState<Record<string, any>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setMonthlyRecords(HealthStore.getMonthlyRecords());
    setStock(HealthStore.getStock());
  };

  const saveMonthlyReport = () => {
    const sales = HealthStore.getSales();
    const revenue = sales.reduce((a, b) => a + b.total, 0);
    const date = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });
    const records = [{ date, revenue }, ...monthlyRecords];
    HealthStore.setMonthlyRecords(records);
    setMonthlyRecords(records);
  };

  const clearDatabase = () => {
    if (confirm("Confirm Master Reset? This clears all local data.")) {
      HealthStore.clearAll();
      window.location.reload();
    }
  };

  const revenueData = monthlyRecords.slice(0, 6).reverse();
  const inventoryData = Object.entries(stock).slice(0, 5).map(([name, data]) => ({
    name,
    quantity: data.quantity
  }));

  // Calculate stats
  const totalRevenue = monthlyRecords.reduce((sum, record) => sum + record.revenue, 0);
  const totalStock = Object.values(stock).reduce((sum: number, item: any) => sum + item.quantity, 0);
  const sales = HealthStore.getSales();
  const totalSales = sales.length;

  return (
    <div className="space-y-8">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-[300px] md:h-[350px]">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1536064479547-7ee40b74b807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwaGVhbHRoY2FyZSUyMHByb2Zlc3Npb25hbHMlMjBtZWRpY2FsfGVufDF8fHx8MTc3MzIxMTE0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Zambian Healthcare Professionals"
            className="w-full h-full object-cover"
          />
          {/* Text overlay with gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              System Analytics Dashboard
            </h2>
            <p className="text-xl text-white/90 max-w-2xl">
              Real-time monitoring and insights for healthcare management across Zambia
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{ZMW.format(totalRevenue)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-[#0093D5]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Records</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyRecords.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-md">
              <TrendingUp className="w-5 h-5 text-[#0093D5]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Analytics
              </h3>
              <p className="text-sm text-gray-600">Monthly revenue trends</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    color: '#1f2937'
                  }}
                  formatter={(value: number) => ZMW.format(value)}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0093D5" 
                  strokeWidth={2}
                  dot={{ fill: '#0093D5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-md">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Inventory Levels
              </h3>
              <p className="text-sm text-gray-600">Current stock quantities</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    color: '#1f2937'
                  }}
                />
                <Bar 
                  dataKey="quantity" 
                  fill="#0093D5"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Archive Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-md">
            <Archive className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Monthly Archive Management
            </h3>
            <p className="text-sm text-gray-600">Save and manage historical data</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={saveMonthlyReport}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0093D5] text-white font-medium rounded-md hover:bg-[#007BB5] transition-colors"
          >
            <Archive className="w-4 h-4" />
            Archive Current Month
          </button>

          <button
            onClick={clearDatabase}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Database
          </button>
        </div>

        {/* Monthly Records Table */}
        {monthlyRecords.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Month</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRecords.map((record, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-700">{record.date}</td>
                    <td className="py-3 px-4 text-[#0093D5] font-semibold">{ZMW.format(record.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}