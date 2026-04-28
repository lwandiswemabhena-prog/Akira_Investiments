import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Plus, Image as ImageIcon, Trash2, LogOut, Star } from 'lucide-react';
import { products as initialProducts, Product } from '../data/catalogue';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAdminLoggedIn') === 'true');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Product>>({
    id: '', name: '', description: '', shortDescription: '', 
    price: 0, moq: '', size: '', category: 'spice', stockStatus: 'IN_STOCK', stockQuantity: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Ratings State
  const [activeTab, setActiveTab] = useState<'products' | 'ratings'>('products');
  const [ratings, setRatings] = useState<{rating: number, date: string}[]>([]);

  const fetchProducts = () => {
    // Read from localStorage first, if not exist, use initialProducts
    const saved = localStorage.getItem('adminProducts');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('adminProducts', JSON.stringify(initialProducts));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
      // Load ratings
      const savedRatings = localStorage.getItem('customerRatings');
      if (savedRatings) {
        setRatings(JSON.parse(savedRatings));
      }
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
    setProducts([]);
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
    setImageFile(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
    setImageFile(null);
  };

  const handleSaveProduct = (id: string) => {
    const updatedProducts = products.map((p: Product) => {
      if (p.id === id) {
        let newImage = p.image;
        if (imageFile) {
          newImage = URL.createObjectURL(imageFile);
        }
        return { ...p, ...editForm, image: newImage } as Product;
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    setEditingId(null);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    let newImage = '';
    if (imageFile) {
      newImage = URL.createObjectURL(imageFile);
    }
    const newProduct: Product = {
      ...(addForm as Product),
      id: addForm.id || `p${Date.now()}`,
      image: newImage
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    
    setIsAdding(false);
    setAddForm({
      id: '', name: '', description: '', shortDescription: '', 
      price: 0, moq: '', size: '', category: 'spice', stockStatus: 'IN_STOCK', stockQuantity: 0
    });
    setImageFile(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter((p: Product) => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-brand-charcoal px-4">
        <div className="bg-white/10 p-8 rounded-lg shadow-xl w-full max-w-md border border-brand-turmeric/20">
          <h2 className="text-2xl font-display font-black text-brand-turmeric mb-6 text-center">Admin Login</h2>
          {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password"
                className="w-full px-4 py-3 bg-brand-charcoal text-brand-cream border border-brand-turmeric/30 rounded focus:outline-none focus:border-brand-turmeric"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-paprika text-brand-cream py-3 rounded font-bold hover:bg-brand-chili transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-brand-turmeric/20 pb-4">
        <div>
          <h1 className="text-4xl font-display font-black text-brand-turmeric">Admin Dashboard</h1>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setActiveTab('products')}
              className={`pb-2 font-bold uppercase tracking-widest text-sm transition-colors border-b-2 ${activeTab === 'products' ? 'border-brand-turmeric text-brand-turmeric' : 'border-transparent text-gray-500 hover:text-brand-turmeric'}`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('ratings')}
              className={`pb-2 font-bold uppercase tracking-widest text-sm transition-colors border-b-2 ${activeTab === 'ratings' ? 'border-brand-turmeric text-brand-turmeric' : 'border-transparent text-gray-500 hover:text-brand-turmeric'}`}
            >
              Customer Ratings
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {activeTab === 'products' && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-brand-turmeric text-brand-charcoal px-4 py-2 rounded font-bold hover:bg-brand-gold transition-colors"
            >
              <Plus size={20} /> Add Product
            </button>
          )}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-brand-charcoal text-brand-cream px-4 py-2 rounded hover:bg-brand-charcoal/80 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6 border border-red-200">
          {error}
        </div>
      )}

      {activeTab === 'ratings' ? (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Customer Ratings</h2>
          {ratings.length === 0 ? (
             <p className="text-gray-500">No ratings yet.</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-sm font-bold text-gray-500 uppercase">Average Rating</p>
                  <p className="text-4xl font-black text-brand-turmeric">
                    {(ratings.reduce((a: number, b: any) => a + b.rating, 0) / ratings.length).toFixed(1)} / 5
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-sm font-bold text-gray-500 uppercase">Total Ratings</p>
                  <p className="text-4xl font-black text-brand-charcoal">{ratings.length}</p>
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {[...ratings].reverse().map((r, idx) => (
                  <li key={idx} className="py-4 flex justify-between items-center">
                    <div className="flex gap-1 text-brand-turmeric">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={16} className={star <= r.rating ? "fill-brand-turmeric" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{new Date(r.date).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="flex justify-center py-20 text-brand-charcoal/60">
          No products found. Add some!
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-charcoal text-brand-cream">
                <th className="p-4 border-b">ID</th>
                <th className="p-4 border-b">Image</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Price ($)</th>
                <th className="p-4 border-b">Stock Qty</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  {editingId === product.id ? (
                    // Edit Mode
                    <>
                      <td className="p-4">
                        <input className="w-20 border rounded p-1" value={editForm.id || ''} onChange={(e) => setEditForm({...editForm, id: e.target.value})} />
                      </td>
                      <td className="p-4">
                         <div className="flex flex-col gap-2">
                           {product.image && <img src={product.image} alt="" className="w-12 h-12 object-cover rounded" />}
                           <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="text-xs max-w-[150px]" />
                         </div>
                      </td>
                      <td className="p-4">
                        <input className="w-full border rounded p-1 mb-1" value={editForm.name || ''} onChange={(e) => setEditForm({...editForm, name: e.target.value})} placeholder="Name" />
                        <input className="w-full border rounded p-1" value={editForm.shortDescription || ''} onChange={(e) => setEditForm({...editForm, shortDescription: e.target.value})} placeholder="Short Desc" />
                      </td>
                      <td className="p-4">
                        <select className="border rounded p-1" value={editForm.category || ''} onChange={(e) => setEditForm({...editForm, category: e.target.value as any})}>
                          <option value="spice">Spice</option>
                          <option value="bag">Bag</option>
                          <option value="dairy">Dairy</option>
                          <option value="other">Other</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <input type="number" className="w-20 border rounded p-1" value={editForm.price || 0} onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})} />
                      </td>
                      <td className="p-4">
                        <input type="number" className="w-20 border rounded p-1 mb-1" value={editForm.stockQuantity || 0} onChange={(e) => setEditForm({...editForm, stockQuantity: parseInt(e.target.value)})} />
                        <select className="border rounded p-1 text-xs block w-full" value={editForm.stockStatus || ''} onChange={(e) => setEditForm({...editForm, stockStatus: e.target.value as any})}>
                          <option value="IN_STOCK">In Stock</option>
                          <option value="LOW_STOCK">Low Stock</option>
                          <option value="OUT_OF_STOCK">Out of Stock</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleSaveProduct(product.id)} className="p-1 text-green-600 hover:bg-green-100 rounded" title="Save">
                            <Save size={18} />
                          </button>
                          <button onClick={cancelEditing} className="p-1 text-red-600 hover:bg-red-100 rounded" title="Cancel">
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // View Mode
                    <>
                      <td className="p-4 font-mono text-sm text-gray-500">{product.id}</td>
                      <td className="p-4">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded bg-gray-100" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400"><ImageIcon size={20} /></div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-brand-charcoal">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.shortDescription}</div>
                      </td>
                      <td className="p-4 capitalize">{product.category}</td>
                      <td className="p-4 font-bold">${product.price.toFixed(2)}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span>{product.stockQuantity ?? 0}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 w-max ${
                            product.stockStatus === 'IN_STOCK' ? 'bg-green-100 text-green-800' :
                            product.stockStatus === 'LOW_STOCK' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {product.stockStatus.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => startEditing(product)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No products found. Add some to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      </>
      )}

      {/* Add Product Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-brand-charcoal text-brand-cream rounded-t-lg">
              <h2 className="text-2xl font-display font-bold text-brand-turmeric">Add New Product</h2>
              <button onClick={() => setIsAdding(false)} className="hover:text-brand-paprika transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Product ID (e.g. p5)</label>
                  <input required className="w-full border rounded p-2" value={addForm.id} onChange={e => setAddForm({...addForm, id: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Name</label>
                  <input required className="w-full border rounded p-2" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">Short Description</label>
                  <input required className="w-full border rounded p-2" value={addForm.shortDescription} onChange={e => setAddForm({...addForm, shortDescription: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">Full Description</label>
                  <textarea required className="w-full border rounded p-2 h-24" value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Price ($)</label>
                  <input required type="number" min="0" step="0.01" className="w-full border rounded p-2" value={addForm.price} onChange={e => setAddForm({...addForm, price: parseFloat(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Category</label>
                  <select className="w-full border rounded p-2" value={addForm.category} onChange={e => setAddForm({...addForm, category: e.target.value as any})}>
                    <option value="spice">Spice</option>
                    <option value="bag">Bag</option>
                    <option value="dairy">Dairy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">MOQ</label>
                  <input className="w-full border rounded p-2" value={addForm.moq} onChange={e => setAddForm({...addForm, moq: e.target.value})} placeholder="e.g. 10 units" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Size</label>
                  <input className="w-full border rounded p-2" value={addForm.size} onChange={e => setAddForm({...addForm, size: e.target.value})} placeholder="e.g. 200g" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Stock Quantity</label>
                  <input type="number" min="0" className="w-full border rounded p-2" value={addForm.stockQuantity} onChange={e => setAddForm({...addForm, stockQuantity: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Stock Status</label>
                  <select className="w-full border rounded p-2" value={addForm.stockStatus} onChange={e => setAddForm({...addForm, stockStatus: e.target.value as any})}>
                    <option value="IN_STOCK">In Stock</option>
                    <option value="LOW_STOCK">Low Stock</option>
                    <option value="OUT_OF_STOCK">Out of Stock</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-1">Product Image</label>
                  <input type="file" accept="image/*" className="w-full border rounded p-2" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                  <p className="text-xs text-gray-500 mt-1">Image will be uploaded when product is created.</p>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 border border-gray-300 rounded font-bold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-brand-turmeric text-brand-charcoal rounded font-bold hover:bg-brand-gold">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
