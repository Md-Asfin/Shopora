import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addressService } from '../services/addressService';
import { orderService } from '../services/orderService';
import { Check, ShieldCheck, MapPin, Truck, CreditCard, Banknote, Plus } from 'lucide-react';
import AddressModal from '../components/common/AddressModal';

export default function CheckoutPage() {
  const { cart, getCartSubtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard' (free) or 'express' (99)
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD', 'CARD_MOCK', 'UPI_MOCK'
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart');
      return;
    }
    loadAddresses();
  }, [user, cart]);

  const loadAddresses = async () => {
    try {
      const res = await addressService.getMyAddresses();
      setAddresses(res.data || []);
      if (res.data && res.data.length > 0) {
        const defaultAddr = res.data.find(a => a.isDefault) || res.data[0];
        setSelectedAddressId(defaultAddr.id);
      }
    } catch (err) {
      console.error('Failed to load addresses:', err);
    }
  };

  const subtotal = getCartSubtotal();
  const deliveryFee = deliveryMethod === 'express' ? 99 : 0;
  const discount = subtotal > 50000 ? 5000 : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError('Please select or add a shipping address');
      return;
    }
    if (!agreedTerms) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        addressId: selectedAddressId,
        paymentMethod: paymentMethod,
        notes: `Delivery: ${deliveryMethod}`
      };
      const res = await orderService.checkout(payload);
      clearCart();
      navigate(`/order-success/${res.data.id || res.data.orderNumber}`, { state: { order: res.data } });
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Checkout failed. Please ensure stock is available.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Checkout Stepper */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-dark-border -z-0"></div>
          
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= 1 ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 dark:bg-dark-border dark:text-gray-400'
            }`}>
              1
            </div>
            <span className={`text-xs font-semibold mt-2 ${step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500'}`}>
              Shipping
            </span>
          </div>

          <div className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= 2 ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 dark:bg-dark-border dark:text-gray-400'
            }`}>
              2
            </div>
            <span className={`text-xs font-semibold mt-2 ${step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500'}`}>
              Payment
            </span>
          </div>

          <div className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= 3 ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 dark:bg-dark-border dark:text-gray-400'
            }`}>
              3
            </div>
            <span className={`text-xs font-semibold mt-2 ${step >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500'}`}>
              Review
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Shipping Address */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                1. Shipping Address
              </h2>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add New Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-gray-200 dark:border-dark-border rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No addresses found. Add one to continue.</p>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-2 bg-primary-600 text-white text-xs font-semibold rounded-lg hover:bg-primary-700"
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50/30 dark:bg-primary-950/20'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900 dark:text-white">{addr.addressType || 'Home'}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                      </p>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-2">
                        📞 {addr.phoneNumber}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Delivery Method */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-primary-600" />
              2. Delivery Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  deliveryMethod === 'standard'
                    ? 'border-primary-600 bg-primary-50/30 dark:bg-primary-950/20'
                    : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">Standard Delivery</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3 - 5 business days</div>
                </div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400">FREE</div>
              </div>

              <div
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  deliveryMethod === 'express'
                    ? 'border-primary-600 bg-primary-50/30 dark:bg-primary-950/20'
                    : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">Express Delivery</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">1 - 2 business days</div>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">₹99</div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary-600" />
              3. Payment Method
            </h2>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-primary-600 bg-primary-50/30 dark:bg-primary-950/20'
                    : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">Cash on Delivery</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pay with cash or UPI upon delivery</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="text-primary-600 focus:ring-primary-500"
                />
              </label>

              {/* Warning Banner for Mock Payments */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300 font-medium">
                ⚡ <strong>TEST / MOCK PAYMENT</strong> — No real money will be charged. Do NOT provide real financial credentials.
              </div>

              <label
                onClick={() => setPaymentMethod('CARD_MOCK')}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'CARD_MOCK'
                    ? 'border-primary-600 bg-primary-50/30 dark:bg-primary-950/20'
                    : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">Card (Mock)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Simulate credit/debit card authorization</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'CARD_MOCK'}
                  onChange={() => setPaymentMethod('CARD_MOCK')}
                  className="text-primary-600 focus:ring-primary-500"
                />
              </label>

              <label
                onClick={() => setPaymentMethod('UPI_MOCK')}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'UPI_MOCK'
                    ? 'border-primary-600 bg-primary-50/30 dark:bg-primary-950/20'
                    : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold">₹</span>
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">UPI (Mock)</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Simulate instant UPI payment</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'UPI_MOCK'}
                  onChange={() => setPaymentMethod('UPI_MOCK')}
                  className="text-primary-600 focus:ring-primary-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm sticky top-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>

            {/* Cart item preview */}
            <div className="max-h-48 overflow-y-auto space-y-3 mb-6 pr-1 divide-y divide-gray-100 dark:divide-dark-border">
              {cart?.items?.map((item) => (
                <div key={item.id} className="pt-2 flex items-center gap-3">
                  <img
                    src={item.productImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80'}
                    alt={item.productName}
                    className="w-10 h-10 object-contain rounded-md bg-gray-50 dark:bg-dark-bg p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{item.productName}</p>
                    <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm pt-4 border-t border-gray-100 dark:border-dark-border">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Items ({cart?.items?.length || 0})</span>
                <span className="font-medium text-gray-900 dark:text-white">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 dark:border-dark-border flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="mt-6 flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-1 rounded text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400">
                I agree to the <Link to="#" className="text-primary-600 hover:underline">Terms & Conditions</Link> and <Link to="#" className="text-primary-600 hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <button
              type="button"
              disabled={loading || !selectedAddressId || !agreedTerms}
              onClick={handlePlaceOrder}
              className="w-full mt-6 py-3.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSaved={loadAddresses}
      />
    </div>
  );
}
