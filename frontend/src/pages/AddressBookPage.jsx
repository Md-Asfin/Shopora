import React, { useState, useEffect } from 'react';
import { addressService } from '../services/addressService';
import { MapPin, Plus, Edit2, Trash2, Home, Building2, Check } from 'lucide-react';
import AddressModal from '../components/common/AddressModal';
import { Skeleton } from '../components/common/Skeleton';

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const res = await addressService.getMyAddresses();
      setAddresses(res.data || []);
    } catch (err) {
      console.error('Failed to load addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await addressService.deleteAddress(id);
      loadAddresses();
    } catch (err) {
      console.error('Failed to delete address:', err);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressService.setDefaultAddress(id);
      loadAddresses();
    } catch (err) {
      console.error('Failed to set default address:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-600" />
            My Addresses
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage delivery locations for swift checkout</p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-white dark:bg-dark-surface p-12 rounded-3xl border border-gray-100 dark:border-dark-border text-center">
          <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">No addresses saved</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Add your delivery address to proceed with orders quickly.</p>
          <button
            onClick={handleOpenAdd}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white dark:bg-dark-surface p-6 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                addr.isDefault
                  ? 'border-primary-600 shadow-sm'
                  : 'border-gray-100 dark:border-dark-border hover:border-gray-200 dark:hover:border-gray-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {addr.addressType?.toUpperCase() === 'OFFICE' ? (
                      <Building2 className="w-4 h-4 text-primary-600" />
                    ) : (
                      <Home className="w-4 h-4 text-primary-600" />
                    )}
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      {addr.addressType || 'Home'}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-md">
                        Default
                      </span>
                    )}
                  </div>
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[11px] font-semibold text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {addr.street}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                  {addr.city}, {addr.state} - {addr.zipCode}
                </p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-3 flex items-center gap-1.5">
                  <span>📞</span> {addr.phoneNumber}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(addr)}
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={loadAddresses}
        address={editingAddress}
      />
    </div>
  );
}
