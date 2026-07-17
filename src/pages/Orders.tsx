import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, isFirebaseActive, Order } from '../lib/firebase';
import { 
  Database, 
  CloudLightning, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  Package, 
  AlertTriangle,
  Send,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [smtpStatus, setSmtpStatus] = useState<{
    configured: boolean;
    smtpUser: string | null;
    adminEmail: string;
    host: string | null;
    port: string | null;
  } | null>(null);

  useEffect(() => {
    document.title = "Orders Dashboard | Sidak Steel";
    setIsFirebaseConnected(isFirebaseActive());
    fetchOrders();
    fetchSmtpStatus();
  }, []);

  const fetchSmtpStatus = async () => {
    try {
      const res = await fetch('/api/smtp-status');
      const data = await res.json();
      setSmtpStatus(data);
    } catch (err) {
      console.error('Error fetching SMTP status:', err);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingId(orderId);
    try {
      const success = await updateOrderStatus(orderId, newStatus);
      if (success) {
        // Update local state
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-full uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 animate-pulse" /> Pending
          </span>
        );
      case 'Processed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-full uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" /> Processed
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 animate-bounce" /> Shipped
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded-full uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  // Filter and search logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.productName && order.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-12 md:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section with Database Connection Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 glass p-8 md:p-10 rounded-3xl shadow-sm">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Orders & Inquiries</h1>
            <p className="text-slate-600 font-medium">
              View, manage, and process all customer requests, quotes, and bulk orders live.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Connection Status Badge */}
            {isFirebaseConnected ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-sm font-bold shadow-sm">
                <CloudLightning className="w-4 h-4 text-emerald-600 animate-pulse" /> Firebase Firestore Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-2xl text-sm font-bold shadow-sm">
                <Database className="w-4 h-4 text-amber-600" /> Offline Database (Active)
              </span>
            )}

            <button 
              onClick={fetchOrders}
              disabled={loading}
              className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-sm text-slate-700 hover:text-slate-950 transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Database notice if Firebase not connected */}
        {!isFirebaseConnected && (
          <div className="mb-6 p-5 bg-amber-50 border border-amber-200/60 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Local Testing Environment Active</h3>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">
                Sidak Steel has provisioned full Firebase integration. To connect to your live Google Cloud Firestore, please define your Firebase project credentials inside your environment variables (<code className="bg-amber-100/70 px-1.5 py-0.5 rounded font-mono text-xs">VITE_FIREBASE_API_KEY</code>, etc.) via the Secrets settings. In the meantime, you can place test orders and manage them right here using local persistence!
              </p>
            </div>
          </div>
        )}

        {/* Email Notification SMTP Status Notice */}
        {smtpStatus && (
          <div className={`mb-8 p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row items-start gap-4 transition-all ${
            smtpStatus.configured 
              ? 'bg-emerald-50/70 border-emerald-200/50 text-emerald-950' 
              : 'bg-indigo-50/70 border-indigo-200/50 text-indigo-950'
          }`}>
            <div className={`p-2.5 rounded-xl shrink-0 ${
              smtpStatus.configured ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
            }`}>
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-grow">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  {smtpStatus.configured ? 'Admin Email Alerts Active' : 'Admin Email Alerts Pending Setup'}
                </h3>
                <span className={`inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                  smtpStatus.configured ? 'bg-emerald-200/70 text-emerald-800' : 'bg-indigo-200/70 text-indigo-800'
                }`}>
                  {smtpStatus.configured ? 'Active' : 'Developer Fallback Active'}
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {smtpStatus.configured ? (
                  <>
                    When clients submit any wholesale inquiry, the portal automatically dispatches a detailed HTML quotation alert to <span className="font-bold underline">{smtpStatus.adminEmail}</span> using SMTP relay account <span className="font-mono bg-white/50 px-1 py-0.2 rounded text-xs text-slate-800">{smtpStatus.smtpUser}</span>.
                  </>
                ) : (
                  <>
                    Admin email notifications are currently in local simulator mode. When client inquiries are received, the details will be safely logged to the Node container console. To receive real-time email notifications on <span className="font-bold">{smtpStatus.adminEmail}</span>, please add your custom SMTP credentials to your environment secrets (<code className="bg-indigo-100/70 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-800">SMTP_HOST</code>, <code className="bg-indigo-100/70 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-800">SMTP_PORT</code>, <code className="bg-indigo-100/70 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-800">SMTP_USER</code>, <code className="bg-indigo-100/70 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-800">SMTP_PASS</code>, and <code className="bg-indigo-100/70 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-800">ADMIN_EMAIL</code>).
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="glass p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, item, ID, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none font-medium text-slate-800 placeholder-slate-400 transition-all text-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {['All', 'Pending', 'Processed', 'Shipped', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
                  statusFilter === status 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white/60 hover:bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders list container */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold">Retrieving Orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="glass p-16 text-center rounded-3xl shadow-sm">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-1">No Orders Found</h3>
            <p className="text-slate-500 font-medium">
              {orders.length === 0 
                ? "No client requests have been submitted yet." 
                : "No orders match your current search and filters."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="glass p-6 md:p-8 rounded-3xl shadow-sm border border-white/20 relative group overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 justify-between relative z-10">
                    
                    {/* Buyer's info & Order specifics */}
                    <div className="space-y-4 flex-grow">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-extrabold text-slate-900">{order.name}</h3>
                        <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md font-mono font-bold uppercase">
                          ID: {order.id.substring(0, 10)}...
                        </span>
                        {getStatusBadge(order.status)}
                      </div>

                      {/* Display Product Details Badge if ordering specific utensil */}
                      {order.productName && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm">
                          <Package className="w-3.5 h-3.5" />
                          <span>Bulk Order: {order.productName} ({order.quantity || 10} units)</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <a href={`mailto:${order.email}`} className="hover:underline hover:text-slate-900 truncate">
                            {order.email}
                          </a>
                        </div>
                        {order.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                            <a href={`tel:${order.phone}`} className="hover:underline hover:text-slate-900">
                              {order.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/50 pt-4 mt-2">
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">Subject</h4>
                        <p className="text-slate-900 font-bold mb-3">{order.subject}</p>
                        
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">Message Requirements</h4>
                        <p className="text-slate-700 font-medium whitespace-pre-line leading-relaxed text-sm bg-white/40 p-4 rounded-2xl border border-slate-100">
                          {order.message}
                        </p>
                      </div>
                    </div>

                    {/* Admin Actions (Status Manager) */}
                    <div className="lg:border-l lg:border-slate-200/50 lg:pl-6 shrink-0 flex flex-col justify-between self-stretch">
                      <div className="space-y-3">
                        <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">Update Status</h4>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                          {(['Pending', 'Processed', 'Shipped', 'Cancelled'] as Order['status'][]).map((status) => (
                            <button
                              key={status}
                              disabled={updatingId === order.id || order.status === status}
                              onClick={() => handleStatusChange(order.id, status)}
                              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                order.status === status
                                  ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 active:scale-95 disabled:opacity-50'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
