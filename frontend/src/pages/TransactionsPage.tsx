import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  Download,
  Upload,
  Eye,
  Edit,
  Search,
  User,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  Plus
} from 'lucide-react';
import { GlassCard, StatCard, InfoCard } from '../components/UI/GlassCards';
import { GlassButton } from '../components/UI/GlassForm';
import { clsx } from 'clsx';

interface Transaction {
  id: string;
  type: 'sale' | 'purchase' | 'refund' | 'payment';
  amount: number;
  customer?: string;
  supplier?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  paymentMethod: 'cash' | 'card' | 'bank-transfer' | 'digital-wallet';
  reference: string;
  notes?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'sale',
    amount: 2499,
    customer: 'John Smith',
    date: '2024-08-11T10:30:00Z',
    status: 'completed',
    items: [
      { name: 'MacBook Pro 14"', quantity: 1, price: 2499 }
    ],
    paymentMethod: 'card',
    reference: 'REF-001',
    notes: 'Corporate purchase'
  },
  {
    id: 'TXN-002',
    type: 'sale',
    amount: 999,
    customer: 'Sarah Johnson',
    date: '2024-08-11T09:15:00Z',
    status: 'pending',
    items: [
      { name: 'iPhone 15 Pro', quantity: 1, price: 999 }
    ],
    paymentMethod: 'digital-wallet',
    reference: 'REF-002'
  },
  {
    id: 'TXN-003',
    type: 'purchase',
    amount: 15000,
    supplier: 'Apple Inc.',
    date: '2024-08-10T14:20:00Z',
    status: 'completed',
    items: [
      { name: 'iPhone 15 Pro', quantity: 15, price: 1000 }
    ],
    paymentMethod: 'bank-transfer',
    reference: 'PO-001',
    notes: 'Monthly inventory restock'
  },
  {
    id: 'TXN-004',
    type: 'refund',
    amount: 599,
    customer: 'Mike Chen',
    date: '2024-08-10T11:45:00Z',
    status: 'completed',
    items: [
      { name: 'iPad Air', quantity: 1, price: 599 }
    ],
    paymentMethod: 'card',
    reference: 'REF-003',
    notes: 'Defective unit return'
  },
  {
    id: 'TXN-005',
    type: 'sale',
    amount: 399,
    customer: 'Emily Davis',
    date: '2024-08-09T16:30:00Z',
    status: 'failed',
    items: [
      { name: 'Apple Watch Series 9', quantity: 1, price: 399 }
    ],
    paymentMethod: 'card',
    reference: 'REF-004',
    notes: 'Payment declined'
  },
];

export default function TransactionsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const transactionTypes = [
    { value: 'all', label: t('all_types') },
    { value: 'sale', label: t('sales') },
    { value: 'purchase', label: t('purchases') },
    { value: 'refund', label: t('refunds') },
    { value: 'payment', label: t('payments') },
  ];

  const statuses = [
    { value: 'all', label: t('all_statuses') },
    { value: 'completed', label: t('completed') },
    { value: 'pending', label: t('pending') },
    { value: 'failed', label: t('failed') },
    { value: 'cancelled', label: t('cancelled') },
  ];

  const dateRanges = [
    { value: '7d', label: t('last_days', { count: 7 }) },
    { value: '30d', label: t('last_30_days', { count: 30 }) },
    { value: '90d', label: t('last_months', { count: 3 }) },
    { value: 'year', label: t('this_year') },
  ];

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash': return t('cash');
      case 'card': return t('card');
      case 'bank-transfer': return t('bank_transfer');
      case 'digital-wallet': return t('digital_wallet');
      default: return method.replace('-', ' ');
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sale': return t('sale');
      case 'purchase': return t('purchase');
      case 'refund': return t('refund');
      case 'payment': return t('payment');
      default: return type;
    }
  };

  const getStatusDisplayLabel = (status: string) => {
    switch (status) {
      case 'completed': return t('completed_status');
      case 'pending': return t('pending_status');
      case 'failed': return t('failed_status');
      case 'cancelled': return t('cancelled_status');
      default: return status.toUpperCase();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-800';
      case 'pending': return 'text-yellow-800';
      case 'failed': return 'text-red-800';
      case 'cancelled': return 'text-gray-800';
      default: return 'text-dark-60';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400/20';
      case 'pending': return 'bg-yellow-400/20';
      case 'failed': return 'bg-red-400/20';
      case 'cancelled': return 'bg-gray-400/20';
      default: return 'bg-white/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sale': return ShoppingCart;
      case 'purchase': return Upload;
      case 'refund': return TrendingDown;
      case 'payment': return CreditCard;
      default: return FileText;
    }
  };

  const stats = {
    totalSales: mockTransactions
      .filter(t => t.type === 'sale' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    totalPurchases: mockTransactions
      .filter(t => t.type === 'purchase' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    pendingTransactions: mockTransactions.filter(t => t.status === 'pending').length,
    totalRefunds: mockTransactions
      .filter(t => t.type === 'refund' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
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
          <h1 className="text-3xl font-bold text-dark mb-2">{t('financial_transactions')}</h1>
          <p className="text-dark-70">{t('track_financial_activities')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <GlassButton variant="secondary" icon={Download}>
            {t('export')}
          </GlassButton>
          <GlassButton variant="secondary" icon={Upload}>
            {t('import')}
          </GlassButton>
          <GlassButton variant="primary" icon={Plus}>
            {t('new_transaction')}
          </GlassButton>
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
          title={t('total_sales')}
          value={`$${stats.totalSales.toLocaleString()}`}
          subtitle={t('this_month')}
          icon={TrendingUp}
          trend={{ value: 15.3, label: t('vs_last_month'), positive: true }}
          gradient="success"
        />
        <StatCard
          title={t('total_purchases')}
          value={`$${stats.totalPurchases.toLocaleString()}`}
          subtitle={t('this_month')}
          icon={ShoppingCart}
          trend={{ value: 8.1, label: t('vs_last_month'), positive: true }}
          gradient="info"
        />
        <StatCard
          title={t('pending_transactions')}
          value={stats.pendingTransactions}
          subtitle={t('requires_attention')}
          icon={Clock}
          gradient="warning"
        />
        <StatCard
          title={t('total_refunds')}
          value={`$${stats.totalRefunds.toLocaleString()}`}
          subtitle={t('this_month')}
          icon={TrendingDown}
          trend={{ value: -12.5, label: t('vs_last_month'), positive: false }}
          gradient="warning"
        />
      </motion.div>

      {/* Filters */}
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
                placeholder={t('search_transactions')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-panel rounded-lg text-dark placeholder-dark focus-dark border-0 focus:outline-none focus:ring-2 focus:ring-slate-600/30"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="glass-panel rounded-lg px-3 py-2 text-dark bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-slate-600/30"
              >
                {transactionTypes.map(type => (
                  <option key={type.value} value={type.value} className="bg-gray-800">
                    {type.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="glass-panel rounded-lg px-3 py-2 text-dark bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-slate-600/30"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value} className="bg-gray-800">
                    {status.label}
                  </option>
                ))}
              </select>

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
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <InfoCard
          title={t('transactions')}
          description={`${filteredTransactions.length} ${t('transactions')} ${t('found')}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark/20">
                  <th className="text-left py-3 text-dark-80 font-medium">{t('reference')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('type')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('customer_supplier')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('amount')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('payment_method')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('status')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('date')}</th>
                  <th className="text-left py-3 text-dark-80 font-medium">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => {
                  const TypeIcon = getTypeIcon(transaction.type);
                  
                  return (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-dark font-medium">{transaction.reference}</p>
                            <p className="text-dark-60 text-sm">{transaction.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="w-4 h-4 text-dark-60" />
                          <span className="glass-panel px-2 py-1 rounded text-dark-80 text-sm capitalize">
                            {getTypeLabel(transaction.type)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-dark-60" />
                          <span className="text-dark">
                            {transaction.customer || transaction.supplier}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={clsx(
                          'font-semibold',
                          transaction.type === 'refund' || transaction.type === 'purchase' 
                            ? 'text-red-400' 
                            : 'text-green-400'
                        )}>
                          {transaction.type === 'refund' || transaction.type === 'purchase' ? '-' : '+'}
                          ${transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-dark-60" />
                          <span className="text-dark-80 text-sm capitalize">
                            {getPaymentMethodLabel(transaction.paymentMethod)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={clsx(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          getStatusBg(transaction.status),
                          getStatusColor(transaction.status)
                        )}>
                          {getStatusDisplayLabel(transaction.status)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-dark-80 text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button className="glass-button p-2 rounded-lg text-dark-80 hover:text-dark transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="glass-button p-2 rounded-lg text-dark-80 hover:text-dark transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="glass-button p-2 rounded-lg text-dark-80 hover:text-dark transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </InfoCard>
      </motion.div>
    </div>
  );
}
