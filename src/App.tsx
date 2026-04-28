import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Phone as WhatsApp, Mail, MapPin, Instagram, Facebook, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Catalogue from './pages/Catalogue';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Rating State
  const [showRating, setShowRating] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Close menu when route changes and scroll to top
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const submitRating = (val: number) => {
    const existing = JSON.parse(localStorage.getItem('customerRatings') || '[]');
    existing.push({ rating: val, date: new Date().toISOString() });
    localStorage.setItem('customerRatings', JSON.stringify(existing));
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col grain-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-charcoal text-brand-cream border-b border-brand-turmeric/20">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-display font-black tracking-tighter text-brand-turmeric">AKIRA</span>
            <span className="text-xs tracking-[0.2em] font-bold text-brand-paprika uppercase -mt-1">Culinary Investments</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-bold text-sm uppercase tracking-widest">
            <Link to="/" className="hover:text-brand-turmeric transition-colors">Home</Link>
            <Link to="/about" className="hover:text-brand-turmeric transition-colors">About</Link>
            <Link to="/catalogue" className="hover:text-brand-turmeric transition-colors">Catalogue</Link>
            <Link to="/contact" className="hover:text-brand-turmeric transition-colors">Contact</Link>
            <a 
              href="https://wa.me/263777579549" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-paprika px-4 py-2 rounded-sm text-brand-cream hover:bg-brand-chili transition-all transform hover:scale-105"
            >
              Order Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-turmeric" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-charcoal border-t border-brand-turmeric/20 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-6 font-bold uppercase tracking-widest text-center">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/catalogue">Catalogue</Link>
                <Link to="/contact">Contact</Link>
                <a 
                  href="https://wa.me/263777579549" 
                  className="bg-brand-turmeric text-brand-charcoal py-3 rounded-sm"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-brand-charcoal text-brand-cream py-16 px-4 border-t-4 border-brand-turmeric">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-3xl font-display font-black tracking-tighter text-brand-turmeric">AKIRA</span>
              <span className="text-xs tracking-[0.2em] font-bold text-brand-paprika uppercase">Culinary Investments</span>
            </div>
            <p className="text-brand-cream/60 italic text-sm">
              "Bringing Gwanda's flavors to the world."
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6 text-brand-turmeric">Quick Links</h4>
            <ul className="space-y-3 text-sm uppercase tracking-widest font-bold">
              <li><Link to="/" className="hover:text-brand-turmeric">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-turmeric">About</Link></li>
              <li><Link to="/catalogue" className="hover:text-brand-turmeric">Catalogue</Link></li>
              <li><Link to="/contact" className="hover:text-brand-turmeric">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl mb-6 text-brand-turmeric">Contact</h4>
            <ul className="space-y-4 text-sm text-brand-cream/80">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-paprika" />
                Gwanda, Zimbabwe
              </li>
              <li className="flex items-center gap-3">
                <WhatsApp size={18} className="text-brand-paprika" />
                +263 77 757 9549
              </li>
              <li className="flex items-center gap-3 break-all">
                <Mail size={18} className="text-brand-paprika shrink-0" />
                info-AkiraInvestiments@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl mb-6 text-brand-turmeric">Aroma Vault</h4>
            <p className="text-sm text-brand-cream/80 mb-6 uppercase tracking-wider font-bold">
              Authentic Spices. <br/>Premium Quality.
            </p>
            <div className="flex gap-4">
              <Instagram className="hover:text-brand-turmeric cursor-pointer transition-colors" />
              <Facebook className="hover:text-brand-turmeric cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-16 pt-8 border-t border-brand-cream/10">
          <div className="text-center text-xs text-brand-cream/60 uppercase tracking-[0.3em] mb-4">
            &copy; {new Date().getFullYear()} Akira Culinary Investments. All rights reserved.
          </div>
          <div className="text-center space-y-3 text-xs text-brand-cream/50 pb-4">
            <p>
              Crafted by <span className="text-brand-turmeric font-bold">Lwandiswe P Mabhena</span>
            </p>
            <p>
              For custom web solutions & partnerships inquire: <a href="mailto:lwandiswemabhena@gmail.com" className="text-brand-turmeric hover:text-brand-gold transition-colors underline">lwandiswemabhena@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp and Rating */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {showRating && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-brand-charcoal p-4 rounded-lg shadow-2xl w-64 border border-brand-turmeric/30"
          >
            {ratingSubmitted ? (
              <p className="text-center font-bold text-green-600">Thank you for your feedback!</p>
            ) : (
              <>
                <p className="text-sm font-bold mb-2 text-center">Rate your experience</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => submitRating(star)} className="hover:scale-110 transition-transform">
                      <Star size={24} className="text-brand-turmeric fill-brand-turmeric/20 hover:fill-brand-turmeric" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
        
        <div className="flex gap-4">
          <button 
            onClick={() => setShowRating(!showRating)}
            className="bg-brand-turmeric text-brand-charcoal w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center font-bold text-xl"
            title="Rate your experience"
          >
            <Star size={24} />
          </button>

          <a 
            href="https://wa.me/263777579549"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          >
            <WhatsApp size={28} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
