import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { CheckCircle2, Package, Truck, Check, Home, ChevronRight, Clock } from 'lucide-react';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    if (!order && orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrderById(orderId);
      setOrder(res.data);
    } catch (err) {
      console.error('Failed to load order:', err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Confirmed', date: order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today', completed: true },
    { title: 'Packed', date: 'In Progress', completed: order?.orderStatus === 'SHIPPED' || order?.orderStatus === 'DELIVERED' },
    { title: 'Shipped', date: 'Upcoming', completed: order?.orderStatus === 'SHIPPED' || order?.orderStatus === 'DELIVERED' },
    { title: 'Out for Delivery', date: 'Upcoming', completed: order?.orderStatus === 'DELIVERED' },
    { title: 'Delivered', date: 'Expected 3-5 days', completed: order?.orderStatus === 'DELIVERED' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="bg-white dark:bg-dark-surface p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-950/60 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Thank you for shopping with Shopora. We're getting your order ready.
        </p>

        {/* Order Details Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 bg-gray-50 dark:bg-dark-bg p-4 rounded-2xl border border-gray-100 dark:border-dark-border mb-10 text-left">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Order ID</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">#{order?.orderNumber || order?.id || orderId || 'SHO-1001'}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-dark-border"></div>
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Total Amount</span>
            <span className="text-sm font-extrabold text-primary-600 dark:text-primary-400">₹{(order?.totalAmount || 0).toLocaleString()}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-dark-border"></div>
          <div>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">Payment</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{order?.paymentMethod || 'Cash on Delivery'}</span>
          </div>
        </div>

        {/* Timeline Tracking */}
        <div className="mb-10 text-left">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-6">Tracking Timeline</h2>
          <div className="relative">
            <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-gray-200 dark:bg-dark-border z-0"></div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.completed
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-dark-border text-gray-400'
                  }`}>
                    {step.completed ? <Check className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white block">{step.title}</span>
                    <span className="text-[11px] text-gray-400">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orders"
            className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-sm text-sm transition-all text-center"
          >
            View Order Details
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-dark-border dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-xl text-sm transition-all text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
