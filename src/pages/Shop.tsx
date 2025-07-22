import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import { useCartStore } from '../store/cart';
import { createCheckoutSession } from '../lib/stripe';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { items, addItem, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleCheckout = async (item: any) => {
    if (item.stripe_price_id) {
      await createCheckoutSession(item.stripe_price_id, item.name);
    } else {
      alert(`Demo mode: Would purchase ${item.name} for $${(item.price_cents / 100).toFixed(2)}`);
    }
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            JULDD Shop
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Bring the magic home with our exclusive collection of character merchandise, 
            coloring books, and digital content.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'btn-gradient text-white'
                  : 'glass text-white/80 hover:text-white hover:scale-105'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="glass rounded-2xl overflow-hidden card-tilt group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <div className="aspect-square bg-gradient-to-br from-mint/20 to-pink/20 flex items-center justify-center relative overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-white/20">
                      {product.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gradient">
                      {formatPrice(product.price_cents)}
                    </span>
                    <motion.button
                      onClick={() => addItem(product)}
                      className="p-2 btn-gradient rounded-full hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Cart Button */}
        <motion.button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 p-4 btn-gradient rounded-full shadow-2xl z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: getTotalItems() > 0 ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <ShoppingCart className="w-6 h-6" />
          {getTotalItems() > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-pink text-white text-sm rounded-full w-6 h-6 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              {getTotalItems()}
            </motion.span>
          )}
        </motion.button>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
              />
              <motion.div
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-midnight border-l border-white/20 z-50 overflow-y-auto"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', bounce: 0.2 }}
              >
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gradient">Your Cart</h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 glass rounded-full hover:scale-110 transition-transform"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/60">Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-8">
                        {items.map((item) => (
                          <div key={item.id} className="glass rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-white">{item.name}</h3>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-white/60 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 glass rounded-full hover:scale-110 transition-transform"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-white font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 glass rounded-full hover:scale-110 transition-transform"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <span className="text-mint font-bold">
                                {formatPrice(item.price_cents * item.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-white/20 pt-6">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xl font-bold text-white">Total:</span>
                          <span className="text-2xl font-bold text-gradient">
                            {formatPrice(getTotalPrice())}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {items.map((item) => (
                            <motion.button
                              key={item.id}
                              onClick={() => handleCheckout(item)}
                              className="w-full btn-gradient py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Buy {item.name} - {formatPrice(item.price_cents * item.quantity)}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shop;