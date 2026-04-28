import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-charcoal text-brand-cream py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
            Get In <span className="text-brand-turmeric">Touch</span>
          </h1>
          <p className="max-w-2xl mx-auto text-brand-cream/60 uppercase tracking-[0.2em] font-bold text-sm">
            Whether you're a retailer or a home cook, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-black text-brand-charcoal uppercase">Wholesale Inquiries</h2>
                <div className="w-16 h-2 bg-brand-paprika"></div>
                <p className="text-brand-charcoal/70 text-lg italic">
                  "For large scale orders, retail partnerships, or custom spice blends, reach out to our team in Gwanda."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="bg-brand-turmeric p-4 h-fit">
                    <Phone className="text-brand-charcoal" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Phone / WhatsApp</h4>
                    <p className="text-brand-charcoal/80">+263 77 000 0000</p>
                    <p className="text-brand-charcoal/80">+263 29 000 000</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-brand-paprika p-4 h-fit text-brand-cream">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Email</h4>
                    <p className="text-brand-charcoal/80">info@akiraculinary.com</p>
                    <p className="text-brand-charcoal/80">sales@akiraculinary.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-brand-charcoal p-4 h-fit text-brand-turmeric">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Location</h4>
                    <p className="text-brand-charcoal/80">Industrial Area, Gwanda</p>
                    <p className="text-brand-charcoal/80">Zimbabwe</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-brand-turmeric p-4 h-fit">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">Business Hours</h4>
                    <p className="text-brand-charcoal/80">Mon - Fri: 8:00 - 17:00</p>
                    <p className="text-brand-charcoal/80">Sat: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-brand-charcoal/5 border-2 border-brand-charcoal flex items-center justify-center grayscale">
                <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-30 text-center px-8">
                  [ Embedded Map Placeholder - Gwanda ]
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border-4 border-brand-charcoal p-8 md:p-12 shadow-2xl">
              <h3 className="text-2xl font-display font-black mb-8 uppercase">Send us a message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-50">Full Name</label>
                  <input type="text" className="w-full border-b-2 border-brand-charcoal/10 py-3 focus:border-brand-paprika outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-50">Email Address</label>
                  <input type="email" className="w-full border-b-2 border-brand-charcoal/10 py-3 focus:border-brand-paprika outline-none transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-50">Subject</label>
                  <select className="w-full border-b-2 border-brand-charcoal/10 py-3 focus:border-brand-paprika outline-none transition-colors bg-transparent">
                    <option>General Inquiry</option>
                    <option>Wholesale Order</option>
                    <option>Retail Partnership</option>
                    <option>Product Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-50">Your Message</label>
                  <textarea rows={4} className="w-full border-b-2 border-brand-charcoal/10 py-3 focus:border-brand-paprika outline-none transition-colors resize-none" placeholder="Tell us how we can help..."></textarea>
                </div>
                <button className="w-full bg-brand-charcoal text-brand-turmeric py-5 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-paprika hover:text-brand-cream transition-colors">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
