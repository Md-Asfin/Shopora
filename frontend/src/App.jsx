import React from 'react';
import { DATA_SOURCE } from './config/dataMode';
import { getProducts, getCategories, getOrders, getUsers, getAddresses } from './services/mockDataService';

export default function App() {
  const products = getProducts();
  const categories = getCategories();
  const orders = getOrders();
  const users = getUsers();
  const addresses = getAddresses();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl shadow-md">
          S
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shopora Frontend Foundation</h1>
        <p className="text-sm text-gray-500 mb-6">
          Mock Product Data &amp; Local Image Asset System initialized successfully.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-500">Data Source</div>
            <div className="text-sm font-semibold text-blue-600 uppercase">{DATA_SOURCE}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-500">Products</div>
            <div className="text-sm font-semibold text-gray-800">{products.length} Items</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-500">Categories</div>
            <div className="text-sm font-semibold text-gray-800">{categories.length} Items</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-500">Mock Users</div>
            <div className="text-sm font-semibold text-gray-800">{users.length} Users</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-500">Mock Orders</div>
            <div className="text-sm font-semibold text-gray-800">{orders.length} Orders</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-500">Addresses</div>
            <div className="text-sm font-semibold text-gray-800">{addresses.length} Addresses</div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
          Ready for UI build steps.
        </div>
      </div>
    </div>
  );
}
