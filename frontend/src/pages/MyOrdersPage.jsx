import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Package, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { Skeleton } from '../components/common/Skeleton';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, DELIVERED, PROCESSING, CANCELLED

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getMyOrders();
      setOrders(res.data?.content || res.data || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredOrders = () => {
    if (activeTab === 'ALL') return orders;
    return orders.filter(o => o.orderStatus === activeTab);
  };

  const filteredOrders = getFilteredOrders();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300">Delivered</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">Cancelled</span>;
      case 'SHIPPED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">Shipped</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">Processing</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Track and manage your recent purchases</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-dark-border mb-6 overflow-x-auto pb-1">
        {['ALL', 'PROCESSING', 'DELIVERED', 'CANCELLED'].map((tab) => {
          const label = tab === 'ALL' ? 'All Orders' : tab.charAt(0) + tab.slice(1).toLowerCase();
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 -mb-px ${
                isActive
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-dark-surface p-12 rounded-3xl border border-gray-100 dark:border-dark-border text-center">
          <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">No orders found</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">You have not placed any orders in this category yet.</p>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm hover:border-gray-200 dark:hover:border-gray-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-50 dark:bg-dark-bg rounded-xl flex items-center justify-center p-1 border border-gray-100 dark:border-dark-border flex-shrink-0">
                  {order.items && order.items[0]?.productImage ? (
                    <img src={order.items[0].productImage} alt="Order item" className="w-full h-full object-contain" />
                  ) : (
                    <Package className="w-6 h-6 text-primary-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      #{order.orderNumber || order.id}
                    </span>
                    {getStatusBadge(order.orderStatus)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'} • {order.items?.length || 1} {order.items?.length === 1 ? 'item' : 'items'}
                  </div>
                  <div className="text-xs font-extrabold text-primary-600 dark:text-primary-400 mt-1">
                    ₹{(order.totalAmount || 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex items-center justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-dark-border">
                <Link
                  to={`/order-success/${order.id}`}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-dark-bg dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-bold rounded-xl border border-gray-200 dark:border-dark-border flex items-center gap-1 transition-all"
                >
                  View Details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
