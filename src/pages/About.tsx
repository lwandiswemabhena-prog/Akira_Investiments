import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-brand-cream">
      {/* Header Section */}
      <section className="bg-brand-charcoal text-brand-cream py-24 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black mb-6"
          >
            Our <span className="text-brand-turmeric underline decoration-brand-paprika">Heritage</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-brand-cream/60 uppercase tracking-[0.2em] font-bold text-sm">
            The story behind Akira Culinary Investments & Aroma Vault
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-black text-brand-charcoal">The Gwanda Kitchen Origin</h2>
              <div className="w-24 h-2 bg-brand-paprika"></div>
              <p className="text-lg leading-relaxed text-brand-charcoal/80">
                Akira Culinary Investments was born out of a deep-seated love for the vibrant flavors that defined our founder's childhood in Gwanda. It started in a modest family kitchen, where the air was always thick with the scent of hand-roasted spices and slow-simmered stews.
              </p>
              <p className="text-lg leading-relaxed text-brand-charcoal/80">
                We realized that the authentic "home" taste of Tswana culinary traditions was becoming harder to find in modern, mass-produced products. Akira was established to preserve these flavor profiles while introducing premium quality and modern culinary standards.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=800" 
                alt="Spice roasting" 
                className="rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute -bottom-8 -left-8 bg-brand-turmeric p-8 border-4 border-brand-charcoal">
                <p className="font-display text-2xl font-black text-brand-charcoal italic">"Authenticity is our only secret ingredient."</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-display font-black text-brand-paprika">Authentic</div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">True to our Southern African roots and traditions.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-display font-black text-brand-paprika">Aromatic</div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">Potent, fresh blends that transform any meal.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-display font-black text-brand-paprika">Premium</div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">Only the highest grade ingredients, no fillers.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-display font-black text-brand-paprika">Affordable</div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">Quality culinary experiences for every kitchen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bilingual CTA */}
      <section className="bg-brand-paprika py-20 px-4 text-center">
        <div className="container mx-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="border-8 border-brand-charcoal p-12 space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black text-brand-cream">
              Beautiful people of Gwanda, we invite your support!
            </h2>
            <div className="w-16 h-1 bg-brand-turmeric mx-auto"></div>
            <a 
              href="https://wa.me/263000000000" 
              className="inline-block bg-brand-charcoal text-brand-turmeric px-12 py-5 font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Partner With Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
