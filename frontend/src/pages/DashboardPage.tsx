import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { memo } from 'react';
import {
  Package,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  AlertTriangle,
  Eye,
  Plus,
  Filter,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react';
import { GlassCard, StatCard, ChartCard, InfoCard } from '../components/UI/GlassCards';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 45000, profit: 12000 },
  { month: 'Feb', revenue: 52000, profit: 15000 },
  { month: 'Mar', revenue: 48000, profit: 13500 },
  { month: 'Apr', revenue: 61000, profit: 18000 },
  { month: 'May', revenue: 55000, profit: 16500 },
  { month: 'Jun', revenue: 67000, profit: 21000 },
];

const salesData = [
  { name: 'Electronics', value: 35, color: '#667eea' },
  { name: 'Clothing', value: 25, color: '#764ba2' },
  { name: 'Books', value: 15, color: '#f093fb' },
  { name: 'Home & Garden', value: 25, color: '#4facfe' },
];

const topProducts = [
  { id: 1, name: 'iPhone 15 Pro', sales: 89, revenue: 89000, stock: 12 },
  { id: 2, name: 'MacBook Pro', sales: 45, revenue: 112500, stock: 8 },
  { id: 3, name: 'iPad Air', sales: 67, revenue: 40200, stock: 25 },
  { id: 4, name: 'Apple Watch', sales: 134, revenue: 53600, stock: 3 },
  { id: 5, name: 'AirPods Pro', sales: 78, revenue: 19500, stock: 15 },
];

const recentTransactions = [
  { id: 1, customer: 'John Smith', amount: 2499, product: 'MacBook Pro', status: 'completed', time: '2 hours ago' },
  { id: 2, customer: 'Sarah Johnson', amount: 899, product: 'iPhone 15', status: 'pending', time: '4 hours ago' },
  { id: 3, customer: 'Mike Chen', amount: 399, product: 'Apple Watch', status: 'completed', time: '6 hours ago' },
  { id: 4, customer: 'Emily Davis', amount: 249, product: 'AirPods Pro', status: 'completed', time: '8 hours ago' },
];

// Dashboard stats with large numbers to test display
const dashboardStats = {
  totalRevenue: 672082935678, // Very large number to test truncation
  productsSold: 1234567, // Over 1 million products
  totalCustomers: 892456, // Nearly 900k customers
  lowStockItems: 23
};

// Helper function to format large numbers without arbitrary truncation
function formatStatValue(value: number, prefix = '', suffix = ''): string {
  const formattedNumber = value.toLocaleString();
  return `${prefix}${formattedNumber}${suffix}`;
}

// Memoized chart components for better performance
const RevenueChart = memo(() => (
  <ResponsiveContainer width="100%" height="100%" minHeight={250}>
    <AreaChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
      <defs>
        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
        </linearGradient>
        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#4facfe" stopOpacity={0.1}/>
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
        formatter={(value, name) => [
          `$${Number(value).toLocaleString()}`,
          name === 'revenue' ? 'Revenue' : 'Profit'
        ]}
        labelFormatter={(label) => `Month: ${label}`}
      />
      <Area type="monotone" dataKey="revenue" stroke="#667eea" fillOpacity={1} fill="url(#colorRevenue)" />
      <Area type="monotone" dataKey="profit" stroke="#4facfe" fillOpacity={1} fill="url(#colorProfit)" />
    </AreaChart>
  </ResponsiveContainer>
));

const SalesChart = memo(() => (
  <ResponsiveContainer width="100%" height="100%" minHeight={250}>
    <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 35 }}>
      <Pie
        data={salesData}
        cx="50%"
        cy="45%"
        innerRadius="100%"
        outerRadius="100%"
        paddingAngle={5}
        dataKey="value"
      >
        {salesData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          backdropFilter: 'blur(20px)',
          color: '#1e293b',
          fontSize: '14px'
        }}
        formatter={(value, name) => [`${value}%`, name]}
      />
      <Legend
        wrapperStyle={{ 
          color: '#1e293b',
          fontSize: '12px',
          paddingTop: '10px'
        }}
        iconType="circle"
        layout="horizontal"
        align="center"
        verticalAlign="bottom"
      />
    </PieChart>
  </ResponsiveContainer>
));

export default function DashboardPage() {
  // Reduced animation complexity for better performance
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.div 
        className="space-y-6"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">Dashboard</h1>
          <p className="text-dark-70">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="glass-button px-4 py-2 rounded-lg text-dark-80 hover:text-dark transition-colors flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Last 30 days</span>
          </button>
          <button className="glass-button px-4 py-2 rounded-lg text-dark-80 hover:text-dark transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Grid - Simplified animations */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Revenue"
          value={formatStatValue(dashboardStats.totalRevenue, '$')}
          subtitle="this month"
          icon={DollarSign}
          trend={{ value: 12.5, label: 'vs last month', positive: true }}
          gradient="success"
        />
        
        <StatCard
          title="Products Sold"
          value={formatStatValue(dashboardStats.productsSold)}
          subtitle="items"
          icon={Package}
          trend={{ value: 8.3, label: 'vs last month', positive: true }}
          gradient="info"
        />
        
        <StatCard
          title="Total Customers"
          value={formatStatValue(dashboardStats.totalCustomers)}
          subtitle="active"
          icon={Users}
          trend={{ value: 15.2, label: 'vs last month', positive: true }}
          gradient="primary"
        />
        
        <StatCard
          title="Low Stock Items"
          value={formatStatValue(dashboardStats.lowStockItems)}
          subtitle="requires attention"
          icon={AlertTriangle}
          trend={{ value: -5.1, label: 'vs last month', positive: false }}
          gradient="warning"
        />
      </motion.div>

      {/* Charts Section - Optimized rendering */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ChartCard 
          title="Revenue & Profit"
          action={{ label: 'View Details', onClick: () => console.log('View details') }}
          height="h-72 sm:h-80"
        >
          <RevenueChart />
        </ChartCard>

        {/* Sales Distribution */}
        <ChartCard title="Sales by Category" height="h-72 sm:h-80">
          <SalesChart />
        </ChartCard>
      </motion.div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <InfoCard
              title="Top Selling Products"
              description="Best performing products this month"
              headerAction={
                <button className="glass-button px-3 py-1 rounded-lg text-dark-80 hover:text-dark text-sm transition-colors flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>View All</span>
                </button>
              }
            >
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 glass-panel rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-dark font-medium">{product.name}</p>
                        <p className="text-dark-60 text-sm">{product.sales} sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-dark font-semibold">${product.revenue.toLocaleString()}</p>
                      <p className={`text-sm ${product.stock <= 5 ? 'text-red-500' : 'text-dark-60'}`}>
                        {product.stock} in stock
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </InfoCard>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <InfoCard
              title="Recent Transactions"
              description="Latest customer purchases"
              headerAction={
                <button className="glass-button px-3 py-1 rounded-lg text-dark-80 hover:text-dark text-sm transition-colors flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View All</span>
                </button>
              }
            >
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 glass-panel rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-info rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-dark font-medium">{transaction.customer}</p>
                        <p className="text-dark-60 text-sm">{transaction.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-dark font-semibold">${transaction.amount}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></span>
                        <p className="text-dark-60 text-sm">{transaction.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </InfoCard>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard>
            <h3 className="text-xl font-semibold text-dark mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Plus, label: 'Add Product', color: 'gradient-success' },
                { icon: ShoppingCart, label: 'New Sale', color: 'gradient-info' },
                { icon: TrendingUp, label: 'Stock In', color: 'gradient-accent' },
                { icon: Filter, label: 'Generate Report', color: 'gradient-warning' },
              ].map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 glass-panel rounded-lg hover:bg-white/15 transition-colors group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-dark-80 text-sm font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </LazyMotion>
  );
}
