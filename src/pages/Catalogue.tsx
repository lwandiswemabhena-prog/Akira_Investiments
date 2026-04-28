import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, X, Phone as WhatsApp, Edit2, Save, AlertCircle } from 'lucide-react';
import { products as initialProducts, Product } from '../data/catalogue';

const Catalogue = () => {
  const [activeTab, setActiveTab] = useState<'spice' | 'bag' | 'dairy' | 'other'>('spice');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingPrices, setEditingPrices] = useState(false);
  const [priceUpdates, setPriceUpdates] = useState<Record<string, number>>({});
  const [stockUpdates, setStockUpdates] = useState<Record<string, { status: string; quantity: number }>>({});
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('adminProducts');
    if (saved) {
      setDisplayProducts(JSON.parse(saved));
    } else {
      setDisplayProducts(initialProducts);
    }
  }, []);

  const filteredProducts = displayProducts.filter(p => 
    p.category === activeTab && 
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getPrice = (product: Product) => {
    return priceUpdates[product.id] ?? product.price;
  };

  const formatPrice = (price: number) => `R${price.toFixed(2)}`;

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    setPriceUpdates({ ...priceUpdates, [productId]: newPrice });
  };

  const loadSavedPrices = () => {
    const saved = localStorage.getItem('productPrices');
    if (saved) {
      setPriceUpdates(JSON.parse(saved));
    }
  };

  // Load prices on mount
  useEffect(() => {
    loadSavedPrices();
  }, []);

  const openWhatsApp = (product: Product) => {
    const price = getPrice(product);
    const message = `Hello Akira Investments, I'm interested in ordering: ${product.name} (${product.size}) @ R${price.toFixed(2)}. Please provide more details on wholesale pricing and delivery.`;
    window.open(`https://wa.me/263777579549?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'IN_STOCK':
        return 'bg-green-100 text-green-800';
      case 'LOW_STOCK':
        return 'bg-yellow-100 text-yellow-800';
      case 'OUT_OF_STOCK':
        return 'bg-red-100 text-red-800';
      case 'DISCONTINUED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStockStatusDisplay = (status: string) => {
    switch (status) {
      case 'IN_STOCK':
        return 'In Stock';
      case 'LOW_STOCK':
        return 'Low Stock';
      case 'OUT_OF_STOCK':
        return 'Out of Stock';
      case 'DISCONTINUED':
        return 'Discontinued';
      default:
        return status;
    }
  };

  const handleStockUpdate = (productId: string, status: string, quantity: number) => {
    setStockUpdates({
      ...stockUpdates,
      [productId]: { status, quantity }
    });
  };

  const savePricesAndStock = async () => {
    try {
      const updatedProducts = displayProducts.map(p => {
        let updatedP = { ...p };
        if (priceUpdates[p.id] !== undefined) {
          updatedP.price = priceUpdates[p.id];
        }
        if (stockUpdates[p.id]) {
          updatedP.stockStatus = stockUpdates[p.id].status as any;
          updatedP.stockQuantity = stockUpdates[p.id].quantity;
        }
        return updatedP;
      });

      setDisplayProducts(updatedProducts);
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));

      setEditingPrices(false);
      setPriceUpdates({});
      setStockUpdates({});
      alert('Prices and stock updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update. Please try again.');
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="bg-brand-charcoal text-brand-cream pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-center">
            Wholesale <span className="text-brand-paprika">Catalogue</span>
          </h1>

          <div className="max-w-full mx-auto flex flex-col gap-6">
            {/* Admin Price Editor Button */}
            <div className="text-right mb-2">
              <button
                onClick={() => setEditingPrices(!editingPrices)}
                className="inline-flex items-center gap-2 bg-brand-paprika text-brand-cream px-4 py-2 font-black uppercase tracking-widest text-xs hover:bg-brand-chili transition-all"
              >
                <Edit2 size={16} />
                {editingPrices ? 'Done Editing' : 'Edit Prices'}
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 bg-brand-charcoal border-2 border-brand-turmeric/30 p-1">
              {(['spice', 'bag', 'dairy'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-3 font-black uppercase tracking-widest text-sm transition-all ${
                    activeTab === category
                      ? 'bg-brand-turmeric text-brand-charcoal'
                      : 'text-brand-cream/60 hover:text-brand-cream'
                  }`}
                >
                  {category === 'spice' && 'Seasonings'}
                  {category === 'bag' && 'Bags & Supplies'}
                  {category === 'dairy' && 'Dairy Products'}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-turmeric" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'spice' ? 'seasonings' : activeTab === 'dairy' ? 'dairy' : 'bags'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-2 border-brand-turmeric/30 py-3 pl-12 pr-4 text-brand-cream focus:border-brand-turmeric outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white border-2 border-brand-charcoal flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden border-b-2 border-brand-charcoal">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { const t = e.currentTarget; t.onerror = null; t.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f5f0e8"/><text x="200" y="190" font-family="Arial" font-size="16" fill="%23555" text-anchor="middle">Image Coming Soon</text><text x="200" y="215" font-family="Arial" font-size="12" fill="%23888" text-anchor="middle">Photo will be added shortly</text></svg>')}`; }} />
                    {!editingPrices && (
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="absolute bottom-4 right-4 bg-brand-charcoal text-brand-cream p-3 rounded-sm hover:bg-brand-paprika transition-colors"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    {product.brand && (
                      <span className="text-brand-paprika text-xs font-black uppercase tracking-widest mb-1">{product.brand}</span>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-display font-black leading-tight uppercase">{product.name}</h3>
                      {editingPrices ? (
                        <div className="flex items-center gap-1">
                          <span className="text-brand-charcoal/60">R</span>
                          <input
                            type="number"
                            value={getPrice(product)}
                            onChange={(e) => handlePriceUpdate(product.id, parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-brand-paprika text-sm font-black"
                            step="0.01"
                          />
                        </div>
                      ) : (
                        <span className="text-brand-paprika font-black text-lg">{formatPrice(getPrice(product))}</span>
                      )}
                    </div>
                    <p className="text-sm text-brand-charcoal/60 mb-6 flex-grow">{product.shortDescription}</p>
                    
                    {/* Stock Status Badge */}
                    <div className="mb-4">
                      {editingPrices ? (
                        <div className="space-y-2">
                          <select
                            value={stockUpdates[product.id]?.status || product.stockStatus}
                            onChange={(e) => handleStockUpdate(product.id, e.target.value, stockUpdates[product.id]?.quantity || product.stockQuantity || 0)}
                            className="w-full px-2 py-1 border border-brand-paprika text-sm font-black"
                          >
                            <option value="IN_STOCK">In Stock</option>
                            <option value="LOW_STOCK">Low Stock</option>
                            <option value="OUT_OF_STOCK">Out of Stock</option>
                            <option value="DISCONTINUED">Discontinued</option>
                          </select>
                          <input
                            type="number"
                            min="0"
                            value={stockUpdates[product.id]?.quantity || product.stockQuantity || 0}
                            onChange={(e) => handleStockUpdate(product.id, stockUpdates[product.id]?.status || product.stockStatus, parseInt(e.target.value) || 0)}
                            placeholder="Quantity"
                            className="w-full px-2 py-1 border border-brand-paprika text-sm font-black"
                          />
                        </div>
                      ) : (
                        <div className={`inline-block px-3 py-1 rounded text-sm font-black uppercase tracking-widest ${getStockStatusColor(product.stockStatus)}`}>
                          {getStockStatusDisplay(product.stockStatus)}
                          {product.stockQuantity !== undefined && ` (${product.stockQuantity} units)`}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-brand-charcoal/5">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-60">
                        <span>Size/Weight</span>
                        <span>{product.size}</span>
                      </div>
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-brand-paprika">
                        <span>Min. Order (MOQ)</span>
                        <span>{product.moq}</span>
                      </div>
                    </div>
                    {!editingPrices && (
                      <button 
                        onClick={() => openWhatsApp(product)}
                        className="mt-6 w-full bg-brand-charcoal text-brand-cream py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-brand-paprika transition-colors"
                      >
                        <WhatsApp size={18} /> Order via WhatsApp
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-display font-bold text-brand-charcoal/40 italic">No products found matching your search.</p>
            </div>
          )}

          {/* Save Prices Button */}
          {editingPrices && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={savePricesAndStock}
                className="inline-flex items-center gap-2 bg-brand-paprika text-brand-cream px-8 py-4 font-black uppercase tracking-widest hover:bg-brand-chili transition-all transform hover:scale-[1.02]"
              >
                <Save size={20} />
                Save All Changes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-charcoal/90 backdrop-blur-sm p-4 flex items-center justify-center"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-brand-cream max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-brand-charcoal text-brand-cream p-2 hover:bg-brand-paprika"
              >
                <X size={24} />
              </button>
              <div className="h-full min-h-[400px]">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" onError={(e) => { const t = e.currentTarget; t.onerror = null; t.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23f5f0e8"/><text x="200" y="190" font-family="Arial" font-size="16" fill="%23555" text-anchor="middle">Image Coming Soon</text><text x="200" y="215" font-family="Arial" font-size="12" fill="%23888" text-anchor="middle">Photo will be added shortly</text></svg>')}`; }} />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-brand-paprika font-black uppercase tracking-[0.3em] text-sm mb-4">
                  {selectedProduct.brand || 'Product Detail'}
                </span>
                <h2 className="text-4xl font-display font-black mb-6 text-brand-charcoal uppercase leading-none">
                  {selectedProduct.name}
                </h2>
                <p className="text-lg text-brand-charcoal/80 mb-8 italic">
                  {selectedProduct.description}
                </p>
                
                {/* Stock Status in Modal */}
                <div className="mb-6 flex items-center gap-2">
                  <AlertCircle size={20} className={selectedProduct.stockStatus === 'OUT_OF_STOCK' ? 'text-red-600' : 'text-green-600'} />
                  <span className={`px-3 py-1 rounded text-sm font-black uppercase tracking-widest ${getStockStatusColor(selectedProduct.stockStatus)}`}>
                    {getStockStatusDisplay(selectedProduct.stockStatus)}
                  </span>
                </div>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                    <span className="font-bold uppercase tracking-wider text-sm opacity-50">Wholesale Price</span>
                    <span className="font-black text-xl text-brand-paprika">{formatPrice(getPrice(selectedProduct))}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                    <span className="font-bold uppercase tracking-wider text-sm opacity-50">Packaging</span>
                    <span className="font-bold text-brand-charcoal">{selectedProduct.size}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                    <span className="font-bold uppercase tracking-wider text-sm opacity-50">MOQ</span>
                    <span className="font-bold text-brand-charcoal">{selectedProduct.moq}</span>
                  </div>
                </div>
                <button 
                  onClick={() => openWhatsApp(selectedProduct)}
                  className="w-full bg-brand-paprika text-brand-cream py-5 font-black uppercase tracking-widest hover:bg-brand-chili transition-all transform hover:scale-[1.02]"
                >
                  Confirm Interest on WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalogue;
