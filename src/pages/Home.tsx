import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Award } from 'lucide-react';
import { products as initialProducts, Product } from '../data/catalogue';

const Home = () => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const saved = localStorage.getItem('adminProducts');
    if (saved) {
      setDisplayProducts(JSON.parse(saved));
    }
  }, []);
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-charcoal text-brand-cream py-20 px-4">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/src/assets/hero-bg.png" 
            alt="Spices background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/80 to-transparent"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-brand-turmeric font-display text-xl uppercase tracking-[0.3em] font-bold mb-4">
              Aroma Vault presents
            </h2>
            <h1 className="text-6xl md:text-8xl font-display font-black leading-none mb-6">
              Flavor That <span className="text-brand-paprika italic">Speaks.</span>
            </h1>
            <div className="space-y-2 mb-8 border-l-4 border-brand-turmeric pl-6">
              <p className="text-2xl md:text-3xl font-bold tracking-tight">
                Gwanda's taste presented to the world.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogue" className="bg-brand-turmeric text-brand-charcoal px-8 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-brand-gold transition-colors flex items-center gap-2">
                Browse Catalogue <ArrowRight size={20} />
              </Link>
              <a href="https://wa.me/263777579549" className="border-2 border-brand-cream text-brand-cream px-8 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-brand-cream hover:text-brand-charcoal transition-all">
                Wholesale Inquiry
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="bg-brand-paprika py-12 px-4 border-y-4 border-brand-charcoal">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center gap-8 text-brand-cream">
            <div className="flex items-center gap-4">
              <Award size={48} className="text-brand-turmeric" />
              <div>
                <h3 className="font-display text-2xl font-bold">Premium Quality</h3>
                <p className="text-sm opacity-80 uppercase font-bold tracking-wider">A-Grade Spice Sourcing</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-brand-cream/20 md:pl-8">
              <Truck size={48} className="text-brand-turmeric" />
              <div>
                <h3 className="font-display text-2xl font-bold">Bulk Wholesale</h3>
                <p className="text-sm opacity-80 uppercase font-bold tracking-wider">Gwanda & Beyond Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l border-brand-cream/20 md:pl-8">
              <Star size={48} className="text-brand-turmeric" />
              <div>
                <h3 className="font-display text-2xl font-bold">Authentic Roots</h3>
                <p className="text-sm opacity-80 uppercase font-bold tracking-wider">Tswana Traditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spices */}
      <section className="py-24 px-4 bg-brand-cream">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4 gold-underline">The Spice Vault</h2>
            <p className="text-brand-charcoal/60 max-w-2xl mx-auto uppercase tracking-widest font-bold text-sm">
              Our most sought-after blends, crafted with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayProducts.slice(0, 3).map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white border-2 border-brand-charcoal/5 overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute top-4 right-4 bg-brand-paprika text-brand-cream text-xs font-black px-3 py-1 uppercase tracking-widest">
                    Best Seller
                  </div>
                </div>
                <div className="p-8">
                  {product.brand && (
                    <span className="text-brand-paprika text-xs font-black uppercase tracking-widest mb-1 block">{product.brand}</span>
                  )}
                  <h3 className="text-2xl font-display font-black mb-2 group-hover:text-brand-paprika transition-colors">{product.name}</h3>
                  <p className="text-brand-charcoal/60 mb-6 line-clamp-2 italic">{product.shortDescription}</p>
                  <Link to="/catalogue" className="text-brand-charcoal font-black uppercase tracking-widest text-sm flex items-center gap-2 border-b-2 border-brand-turmeric w-fit">
                    View in Catalogue <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/catalogue" className="inline-block bg-brand-charcoal text-brand-cream px-12 py-5 font-black uppercase tracking-widest hover:bg-brand-paprika transition-colors">
              Explore Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-brand-charcoal text-brand-cream py-24 px-4 relative">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-brand-turmeric z-0 translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800" 
              alt="Culinary roots" 
              className="relative z-10 w-full h-full object-cover border-4 border-brand-charcoal grayscale"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-black leading-tight">
              Bridging <span className="text-brand-turmeric">Tradition</span> with <span className="text-brand-paprika">Modern</span> Techniques.
            </h2>
            <p className="text-brand-cream/70 text-lg leading-relaxed italic">
              "From a small kitchen in Gwanda to supplying culinary enthusiasts and businesses across the region, our journey is seasoned with passion, heritage, and the pursuit of the perfect aroma."
            </p>
            <Link to="/about" className="inline-block border-b-2 border-brand-paprika text-xl font-display font-bold hover:text-brand-turmeric transition-colors pb-1">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
