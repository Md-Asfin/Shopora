import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  AlertTriangle,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Search
} from 'lucide-react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { categoryService } from '../services/categoryService';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, products, orders, categories
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStockCount: 0,
    recentOrders: [],
    lowStockProducts: []
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Product Create / Edit
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    originalPrice: '',
    stockQuantity: '',
    categoryName: 'Electronics',
    imageUrl: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [dashRes, prodRes, ordRes, catRes] = await Promise.all([
        api.get('/admin/dashboard').catch(() => ({ data: {} })),
        productService.getAllProducts({ page: 0, size: 50 }).catch(() => ({ data: { content: [] } })),
        orderService.getAllOrders({ page: 0, size: 50 }).catch(() => ({ data: { content: [] } })),
        categoryService.getAllCategories().catch(() => ({ data: [] }))
      ]);

      setStats(dashRes.data || {});
      setProducts(prodRes.data?.content || []);
      setOrders(ordRes.data?.content || []);
      setCategories(catRes.data || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: productForm.name,
        description: productForm.description,
        brand: productForm.brand,
        price: parseFloat(productForm.price),
        originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : null,
        stockQuantity: parseInt(productForm.stockQuantity, 10),
        categoryName: productForm.categoryName,
        imageUrl: productForm.imageUrl
      };

      if (editingProductId) {
        await productService.updateProduct(editingProductId, payload);
      } else {
        await productService.createProduct(payload);
      }

      setIsProductModalOpen(false);
      setEditingProductId(null);
      setProductForm({
        name: '',
        description: '',
        brand: '',
        price: '',
        originalPrice: '',
        stockQuantity: '',
        categoryName: 'Electronics',
        imageUrl: ''
      });
      loadAllData();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.deleteProduct(id);
      loadAllData();
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      loadAllData();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)] animate-fadeIn">
      {/* Dark Sidebar matching Reference Screen 13 */}
      <aside className="w-full lg:w-64 bg-gray-900 text-gray-300 p-5 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <div>
              <span className="font-bold text-white text-sm block">Shopora Admin</span>
              <span className="text-[10px] text-gray-400">Store Management</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" /> Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Orders
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'categories'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" /> Categories
            </button>
          </nav>
        </div>

        <div className="p-3 bg-gray-800/60 rounded-xl mt-6 border border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 block mb-1">Backend Version</span>
          <span className="text-xs font-mono text-green-400">Shopora v1.0.0</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 bg-gray-50 dark:bg-dark-bg overflow-x-hidden">
        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Dashboard Overview</h1>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Orders</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {stats.totalOrders || orders.length}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-green-600 font-semibold mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +16% this month
                </div>
              </div>

              <div className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Revenue</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                  ₹{(stats.totalRevenue || orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0)).toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-green-600 font-semibold mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +24% vs last period
                </div>
              </div>

              <div className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Products</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {stats.totalProducts || products.length}
                </div>
                <div className="text-[11px] text-gray-400 font-semibold mt-2">Across 8 categories</div>
              </div>

              <div className="bg-white dark:bg-dark-surface p-5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Low Stock Alert</span>
                <div className="text-2xl font-extrabold text-red-600 dark:text-red-400 mt-1">
                  {stats.lowStockCount || products.filter(p => p.stockQuantity < 5).length}
                </div>
                <div className="text-[11px] text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Action required
                </div>
              </div>
            </div>

            {/* Sales Overview Visual + Low Stock List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sales Chart Visual */}
              <div className="lg:col-span-8 bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Sales Overview</h3>
                <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2 border-b border-gray-100 dark:border-dark-border">
                  {[45, 60, 35, 80, 65, 95, 75, 85, 90, 70, 88, 100].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        style={{ height: `${val}%` }}
                        className="w-full max-w-[28px] bg-primary-600 hover:bg-primary-700 rounded-t-lg transition-all"
                        title={`Month ${idx + 1}: ${val}%`}
                      ></div>
                      <span className="text-[10px] text-gray-400">M{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock List */}
              <div className="lg:col-span-4 bg-white dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Low Stock Products</h3>
                  <button onClick={() => setActiveTab('products')} className="text-xs font-bold text-primary-600 hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {products
                    .filter(p => p.stockQuantity < 10)
                    .slice(0, 4)
                    .map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={p.imageUrl} alt={p.name} className="w-8 h-8 rounded-lg object-contain bg-white dark:bg-dark-surface p-0.5" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{p.name}</p>
                            <p className="text-[10px] text-gray-400">₹{(p.price || 0).toLocaleString()}</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                          {p.stockQuantity} left
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Product Catalog</h1>
                <p className="text-xs text-gray-500 mt-1">Manage, add, and edit live store products</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingProductId(null);
                  setProductForm({
                    name: '',
                    description: '',
                    brand: '',
                    price: '',
                    originalPrice: '',
                    stockQuantity: '',
                    categoryName: 'Electronics',
                    imageUrl: ''
                  });
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm self-start"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-dark-bg text-gray-500 font-bold border-b border-gray-100 dark:border-dark-border">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.name} className="w-9 h-9 object-contain rounded-lg bg-gray-50 dark:bg-dark-bg p-1" />
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block">{p.name}</span>
                          <span className="text-[10px] text-gray-400">{p.brand}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">{p.category?.name || 'General'}</td>
                      <td className="p-4 font-bold text-gray-900 dark:text-white">₹{(p.price || 0).toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          p.stockQuantity < 5
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                        }`}>
                          {p.stockQuantity} in stock
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProductId(p.id);
                              setProductForm({
                                name: p.name || '',
                                description: p.description || '',
                                brand: p.brand || '',
                                price: p.price || '',
                                originalPrice: p.originalPrice || '',
                                stockQuantity: p.stockQuantity || '',
                                categoryName: p.category?.name || 'Electronics',
                                imageUrl: p.imageUrl || ''
                              });
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/50 rounded-lg"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Customer Orders</h1>

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-dark-bg text-gray-500 font-bold border-b border-gray-100 dark:border-dark-border">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                      <td className="p-4 font-bold text-gray-900 dark:text-white">#{o.orderNumber || o.id}</td>
                      <td className="p-4 text-gray-500">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'Today'}</td>
                      <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{o.shippingAddress?.fullName || 'Customer'}</td>
                      <td className="p-4 font-extrabold text-primary-600 dark:text-primary-400">₹{(o.totalAmount || 0).toLocaleString()}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300">
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary-500"
                        >
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Categories */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-2xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border shadow-sm">
                  <div className="font-bold text-sm text-gray-900 dark:text-white">{cat.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{cat.description || 'Curated category'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-dark-surface max-w-lg w-full rounded-3xl p-6 border border-gray-100 dark:border-dark-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    value={productForm.categoryName}
                    onChange={(e) => setProductForm({ ...productForm, categoryName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Sports">Sports</option>
                    <option value="Books">Books</option>
                    <option value="Toys">Toys</option>
                    <option value="Automotive">Automotive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Orig. Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-dark-border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
