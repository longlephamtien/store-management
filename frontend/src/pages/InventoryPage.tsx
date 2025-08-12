import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  TrendingDown,
  MoreVertical,
  Download,
  Upload,
  Tag,
  Star,
  BarChart3
} from 'lucide-react';
import { GlassCard, StatCard, InfoCard } from '../components/UI/GlassCards';
import { clsx } from 'clsx';

interface Product {
  id: number;
  nameKey: string; // Changed from name to nameKey for translation
  sku: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  image?: string;
  lastUpdatedValue: number;
  lastUpdatedUnit: string;
  supplier: string;
  rating: number;
  sales: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    nameKey: 'iphone_15_pro',
    sku: 'IPH15P-128',
    category: 'Electronics',
    price: 999,
    stock: 12,
    lowStockThreshold: 10,
    status: 'low-stock',
    lastUpdatedValue: 2,
    lastUpdatedUnit: 'hours',
    supplier: 'Apple Inc.',
    rating: 4.8,
    sales: 89
  },
  {
    id: 2,
    nameKey: 'macbook_pro_14',
    sku: 'MBP14-512',
    category: 'Electronics',
    price: 2499,
    stock: 8,
    lowStockThreshold: 5,
    status: 'in-stock',
    lastUpdatedValue: 4,
    lastUpdatedUnit: 'hours',
    supplier: 'Apple Inc.',
    rating: 4.9,
    sales: 45
  },
  {
    id: 3,
    nameKey: 'ipad_air',
    sku: 'IPAD-AIR-64',
    category: 'Electronics',
    price: 599,
    stock: 0,
    lowStockThreshold: 15,
    status: 'out-of-stock',
    lastUpdatedValue: 1,
    lastUpdatedUnit: 'days',
    supplier: 'Apple Inc.',
    rating: 4.7,
    sales: 67
  },
  {
    id: 4,
    nameKey: 'apple_watch_series_9',
    sku: 'AWS9-45MM',
    category: 'Electronics',
    price: 399,
    stock: 25,
    lowStockThreshold: 20,
    status: 'in-stock',
    lastUpdatedValue: 6,
    lastUpdatedUnit: 'hours',
    supplier: 'Apple Inc.',
    rating: 4.6,
    sales: 134
  },
  {
    id: 5,
    nameKey: 'airpods_pro',
    sku: 'APP-GEN2',
    category: 'Audio',
    price: 249,
    stock: 3,
    lowStockThreshold: 10,
    status: 'low-stock',
    lastUpdatedValue: 3,
    lastUpdatedUnit: 'hours',
    supplier: 'Apple Inc.',
    rating: 4.8,
    sales: 78
  },
];

export default function InventoryPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const formatTimeAgo = (value: number, unit: string) => {
    if (unit === 'hours') {
      return value === 1 ? t('hour_ago', { count: value }) : t('hours_ago', { count: value });
    }
    if (unit === 'days') {
      return value === 1 ? t('day_ago', { count: value }) : t('days_ago', { count: value });
    }
    if (unit === 'minutes') {
      return t('minutes_ago', { count: value });
    }
    return `${value} ${unit} ago`;
  };
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = ['all', 'Electronics', 'Audio', 'Accessories'];
  const statuses = ['all', 'in-stock', 'low-stock', 'out-of-stock'];

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all': return t('all_categories');
      case 'Electronics': return t('electronics');
      case 'Audio': return t('audio');
      case 'Accessories': return t('accessories');
      default: return category;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'all': return t('all_statuses');
      case 'in-stock': return t('low_stock_status');
      case 'low-stock': return t('low_stock_status');
      case 'out-of-stock': return t('out_of_stock_status');
      default: return status;
    }
  };

  const getStatusDisplayLabel = (status: string) => {
    switch (status) {
      case 'in-stock': return t('in_stock_display');
      case 'low-stock': return t('low_stock_display');
      case 'out-of-stock': return t('out_of_stock_display');
      default: return status.replace('-', ' ').toUpperCase();
    }
  };

  const getCategoryDisplayLabel = (category: string) => {
    switch (category) {
      case 'Electronics': return t('electronics');
      case 'Audio': return t('audio');
      case 'Accessories': return t('accessories');
      default: return category;
    }
  };

  const filteredProducts = mockProducts.filter(product => {
    const productName = t(product.nameKey);
    return (
      productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (selectedStatus === 'all' || product.status === selectedStatus)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-800';
      case 'low-stock': return 'text-yellow-800';
      case 'out-of-stock': return 'text-red-800';
      default: return 'text-dark-60';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-400/20';
      case 'low-stock': return 'bg-yellow-400/20';
      case 'out-of-stock': return 'bg-red-400/20';
      default: return 'bg-white/10';
    }
  };

  const stats = {
    totalProducts: mockProducts.length,
    lowStock: mockProducts.filter(p => p.status === 'low-stock').length,
    outOfStock: mockProducts.filter(p => p.status === 'out-of-stock').length,
    totalValue: mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0)
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{t('inventory_management')}</h1>
          <p className="text-dark-70">{t('manage_products_desc')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="glass-button px-4 py-2 rounded-lg text-dark-80 hover:text-dark transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>{t('import')}</span>
          </button>
          <button className="glass-button px-4 py-2 rounded-lg text-dark-80 hover:text-dark transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>{t('export')}</span>
          </button>
          <button className="bg-gradient-accent px-4 py-2 rounded-lg text-white hover:shadow-lg transition-all flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>{t('add_product')}</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title={t('total_products')}
          value={stats.totalProducts}
          subtitle={t('products')}
          icon={Package}
          gradient="primary"
        />
        <StatCard
          title={t('low_stock')}
          value={stats.lowStock}
          subtitle={t('needs_attention')}
          icon={AlertTriangle}
          gradient="warning"
        />
        <StatCard
          title={t('out_of_stock')}
          value={stats.outOfStock}
          subtitle={t('items')}
          icon={TrendingDown}
          gradient="warning"
        />
        <StatCard
          title={t('total_value')}
          value={`$${stats.totalValue.toLocaleString()}`}
          subtitle={t('inventory_value')}
          icon={BarChart3}
          gradient="success"
        />
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-60" />
              <input
                type="text"
                placeholder={t('search_products')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-panel rounded-lg text-dark placeholder-dark focus-dark border-0 focus:outline-none focus:ring-2 focus:ring-slate-600/30"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-dark-60" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="glass-panel rounded-lg px-3 py-2 text-dark bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-slate-600/30"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {getCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-dark-60" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="glass-panel rounded-lg px-3 py-2 text-dark bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-slate-600/30"
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-gray-800">
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <InfoCard title={t('products')} description={`${filteredProducts.length} ${t('products').toLowerCase()} found`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark/20">
                  <th className="text-left py-3 text-dark-80 font-medium">{t('name')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('sku')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('category')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('price')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('stock')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('status')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('rating')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-dark font-medium">{t(product.nameKey)}</p>
                          <p className="text-dark-60 text-sm">{t('updated')} {formatTimeAgo(product.lastUpdatedValue, product.lastUpdatedUnit)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-dark-80 font-mono text-sm">{product.sku}</span>
                    </td>
                    <td className="py-4">
                      <span className="glass-panel px-2 py-1 rounded text-dark-80 text-sm">
                        {getCategoryDisplayLabel(product.category)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-dark font-semibold">${product.price}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-dark">{product.stock}</span>
                        {product.stock <= product.lowStockThreshold && (
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={clsx(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getStatusBg(product.status),
                        getStatusColor(product.status)
                      )}>
                        {getStatusDisplayLabel(product.status)}
                      </span>
                    </td>
                                        <td className="py-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-dark-80">{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <button className="glass-button p-2 rounded-lg text-dark-80 hover:text-dark transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="glass-button p-2 rounded-lg text-dark-80 hover:text-dark transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="glass-button p-2 rounded-lg text-dark-80 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="glass-button p-2 rounded-lg text-dark-80 hover:text-dark transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoCard>
      </motion.div>
    </div>
  );
}
