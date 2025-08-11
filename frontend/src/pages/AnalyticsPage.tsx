import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Target,
  Percent,
  Clock
} from 'lucide-react';

// {/* Page Header */}
import { GlassCard, StatCard, ChartCard } from '../components/UI/GlassCards';
import { GlassButton } from '../components/UI/GlassForm';
import ChartWrapper from '../components/UI/ChartWrapper';
import {
  Line,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 45000, profit: 12000, orders: 234, customers: 156 },
  { month: 'Feb', revenue: 52000, profit: 15000, orders: 267, customers: 178 },
  { month: 'Mar', revenue: 48000, profit: 13500, orders: 245, customers: 162 },
  { month: 'Apr', revenue: 61000, profit: 18000, orders: 289, customers: 201 },
  { month: 'May', revenue: 55000, profit: 16500, orders: 267, customers: 189 },
  { month: 'Jun', revenue: 67000, profit: 21000, orders: 312, customers: 234 },
  { month: 'Jul', revenue: 72000, profit: 24000, orders: 345, customers: 267 },
  { month: 'Aug', revenue: 69000, profit: 22500, orders: 323, customers: 245 },
];

const categoryData = [
  { name: 'Electronics', value: 45, revenue: 320000, color: '#3b82f6' },
  { name: 'Clothing', value: 25, revenue: 180000, color: '#0ea5e9' },
  { name: 'Home & Garden', value: 20, revenue: 140000, color: '#06b6d4' },
  { name: 'Books', value: 10, revenue: 70000, color: '#8b5cf6' },
];

const dailyData = [
  { day: 'Mon', sales: 12500, orders: 45, conversion: 3.2 },
  { day: 'Tue', sales: 15800, orders: 52, conversion: 3.8 },
  { day: 'Wed', sales: 11200, orders: 38, conversion: 2.9 },
  { day: 'Thu', sales: 18900, orders: 67, conversion: 4.1 },
  { day: 'Fri', sales: 22400, orders: 78, conversion: 4.8 },
  { day: 'Sat', sales: 28700, orders: 95, conversion: 5.2 },
  { day: 'Sun', sales: 16300, orders: 58, conversion: 3.6 },
];

const topProducts = [
  { name: 'iPhone 15 Pro', sales: 234, revenue: 233400, growth: 15.3 },
  { name: 'MacBook Pro', sales: 89, revenue: 222500, growth: 8.7 },
  { name: 'iPad Air', sales: 156, revenue: 93400, growth: -2.1 },
  { name: 'Apple Watch', sales: 203, revenue: 81200, growth: 22.4 },
  { name: 'AirPods Pro', sales: 345, revenue: 86250, growth: 18.9 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: 'year', label: 'This year' },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">Analytics & Reports</h1>
          <p className="text-dark-70">Comprehensive insights into your store's performance and growth metrics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-dark-60" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="glass-panel rounded-lg px-3 py-2 text-dark bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-slate-600/30"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value} className="bg-gray-800">
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <GlassButton variant="secondary" icon={Filter}>
            Filter
          </GlassButton>
          <GlassButton variant="secondary" icon={Download}>
            Export Report
          </GlassButton>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="this period"
          icon={DollarSign}
          trend={{ value: 12.5, label: 'vs last period', positive: true }}
          gradient="success"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          subtitle="orders"
          icon={ShoppingCart}
          trend={{ value: 8.3, label: 'vs last period', positive: true }}
          gradient="info"
        />
        <StatCard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(0)}`}
          subtitle="per order"
          icon={Target}
          trend={{ value: 4.2, label: 'vs last period', positive: true }}
          gradient="primary"
        />
        <StatCard
          title="Profit Margin"
          value={`${((totalProfit / totalRevenue) * 100).toFixed(1)}%`}
          subtitle="margin"
          icon={TrendingUp}
          trend={{ value: -1.2, label: 'vs last period', positive: false }}
          gradient="warning"
        />
      </motion.div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ChartCard 
            title="Revenue & Profit Trend"
            action={{ label: 'View Details', onClick: () => console.log('View details') }}
            height="h-96"
          >
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <ComposedChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(30,41,59,0.7)"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgba(30,41,59,0.7)"
                  fontSize={12}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(20px)',
                    color: '#1e293b',
                    fontSize: '14px'
                  }}
                />
                <Legend wrapperStyle={{ color: '#1e293b' }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#667eea"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={3}
                />
                <Bar dataKey="profit" fill="#4facfe" opacity={0.8} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ChartCard title="Sales by Category" height="h-96">
            <ChartWrapper>
              <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="40%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `${value}% ($${categoryData.find(c => c.name === name)?.revenue?.toLocaleString()})`,
                      name
                    ]}
                  />
                  <Legend
                    iconType="circle"
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    wrapperStyle={{ 
                      paddingTop: '20px',
                      fontSize: '14px',
                      color: '#374151'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ChartCard>
        </motion.div>
      </div>

      {/* Daily Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ChartCard title="Daily Performance" height="h-80">
          <ResponsiveContainer width="100%" height="100%" minHeight={250}>
            <BarChart data={dailyData} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
                stroke="rgba(30,41,59,0.7)"
                fontSize={12}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left" 
                stroke="rgba(30,41,59,0.7)"
                fontSize={12}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="rgba(30,41,59,0.7)"
                fontSize={12}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(20px)',
                  color: '#1e293b',
                  fontSize: '14px'
                }}
              />
              <Bar yAxisId="left" dataKey="sales" fill="#667eea" />
              <Bar yAxisId="left" dataKey="orders" fill="#4facfe" />
              <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#f093fb" strokeWidth={3} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </motion.div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark">Top Performing Products</h3>
              <GlassButton variant="secondary" size="sm" icon={Eye}>
                View All
              </GlassButton>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 glass-panel rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-dark font-medium">{product.name}</p>
                      <p className="text-dark-60 text-sm">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-dark font-semibold">${product.revenue.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      {product.growth > 0 ? (
                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-400" />
                      )}
                      <span className={product.growth > 0 ? 'text-green-400' : 'text-red-400'}>
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard>
            <h3 className="text-xl font-semibold text-dark mb-6">Performance Metrics</h3>
            <div className="space-y-6">
              {[
                { 
                  label: 'Conversion Rate', 
                  value: '3.8%', 
                  change: '+0.4%', 
                  positive: true,
                  icon: Percent 
                },
                { 
                  label: 'Customer Lifetime Value', 
                  value: '$1,245', 
                  change: '+$125', 
                  positive: true,
                  icon: Users 
                },
                { 
                  label: 'Average Session Duration', 
                  value: '4m 32s', 
                  change: '+45s', 
                  positive: true,
                  icon: Clock 
                },
                { 
                  label: 'Cart Abandonment Rate', 
                  value: '68.2%', 
                  change: '-2.1%', 
                  positive: true,
                  icon: ShoppingCart 
                },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 glass-panel rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-info rounded-lg flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-dark font-medium">{metric.label}</p>
                      <p className="text-2xl font-bold text-dark">{metric.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${
                      metric.positive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.positive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">{metric.change}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
