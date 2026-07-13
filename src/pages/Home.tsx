import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Banknote, Package, Truck, Star, X, ChevronLeft, ChevronRight, Award, Handshake } from 'lucide-react';

const whyChooseFeatures = [
  {
    title: 'Premium Quality',
    icon: Award,
    shortDesc: 'High-grade rust-resistant steel that lasts for generations.',
    longDesc: 'Our stainless steel products are manufactured using 100% food-grade material, ensuring they remain completely rust and corrosion free even after years of daily use. The elegant mirror finish not only adds a touch of luxury but makes them incredibly easy to clean and maintain.',
    images: ['/images/dinner.jpg', '/images/cooker.jpg', '/images/cup.jpg']
  },
  {
    title: 'Durable Products',
    icon: ShieldCheck,
    shortDesc: 'Heavy-gauge designs engineered to withstand rugged daily use.',
    longDesc: 'Built with heavy-gauge industrial standards, our utensils offer remarkable dent resistance and structure preservation. From commercial cooking pots to residential pressure cookers, we guarantee durability that stands the test of time.',
    images: ['/images/kadai.jpg', '/images/masala.jpg']
  },
  {
    title: 'Affordable Prices',
    icon: Banknote,
    shortDesc: 'Wholesale-competitive rates without compromise on grade.',
    longDesc: 'We believe that premium quality shouldn’t come with a premium price tag. By optimizing our manufacturing processes and offering direct wholesale prices, Sidak Steel ensures that both individual households and commercial restaurants can access top-tier kitchenware without breaking the bank.',
    images: ['/images/bowl.jpg', '/images/masala.jpg']
  },
  {
    title: 'Bulk Orders',
    icon: Package,
    shortDesc: 'High-capacity supply chains ready to fulfill large commercial lots.',
    longDesc: 'Whether you are looking for airtight storage containers to keep your spices fresh, heavy-duty cookware for professional use, or elegant serving trays for guests, our factory is fully optimized for scale. We handle high-volume bulk requirements with customized logo branding support.',
    images: ['/images/container.jpg', '/images/jug.jpg']
  },
  {
    title: 'Trusted Supplier',
    icon: Handshake,
    shortDesc: 'Decades of manufacturing integrity, trusted nationwide.',
    longDesc: 'Since 2017, we have worked with major distributors, institutional clients, and hoteliers across the nation. We adhere to food-grade materials certifications and maintain complete transparency in our billing, pricing, and steel grade reporting.',
    images: ['/images/sidak_steel_logo_1783862511965.jpg', '/images/tea.jpg']
  },
  {
    title: 'Fast Delivery',
    icon: Truck,
    shortDesc: 'Quick and secure nationwide shipping for all bulk orders.',
    longDesc: 'We understand the importance of timely delivery, especially for commercial clients setting up a new kitchen. Our robust logistics network ensures that whether you are ordering a single dinner set or bulk items for a hotel, your products arrive safely and promptly across the nation.',
    images: ['/images/fry pan.jpg', '/images/lunch.jpg']
  }
];

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (selectedFeature !== null) {
      setSlideIndex(0);
      const timer = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % whyChooseFeatures[selectedFeature].images.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [selectedFeature]);

  const nextSlide = () => {
    if (selectedFeature !== null) {
      setSlideIndex((prev) => (prev + 1) % whyChooseFeatures[selectedFeature].images.length);
    }
  };

  const prevSlide = () => {
    if (selectedFeature !== null) {
      setSlideIndex((prev) => (prev - 1 + whyChooseFeatures[selectedFeature].images.length) % whyChooseFeatures[selectedFeature].images.length);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="glass rounded-3xl p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-lg border border-white/60">
          <div className="absolute inset-0 bg-white/20"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="flex justify-center lg:justify-start mb-6">
                <Link 
                  to="/logo" 
                  className="relative p-1 bg-white/60 border border-slate-200/50 rounded-full shadow-md backdrop-blur-md hover:scale-110 transition-transform block cursor-pointer"
                  title="View Royal Crest Logo"
                >
                  <img 
                    src="/images/sidak_steel_logo_1783862511965.jpg" 
                    alt="Sidak Steel Royal Crest" 
                    className="w-16 h-16 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="absolute -top-2.5 -right-2.5 bg-slate-950 text-white text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase scale-90 border border-slate-800">
                    EST. 2017
                  </div>
                </Link>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-[10px] sm:text-xs font-black tracking-widest text-slate-800 uppercase mb-6 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Primary Steel Utensils Wholesaler & Supplier
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm leading-tight">
                Premium Stainless Steel Utensils.
              </h1>
              <p className="text-base sm:text-lg text-slate-700 mb-10 leading-relaxed font-medium">
                As a leading <span className="text-slate-900 font-bold">Steel Kitchen Utensils Supplier</span>, we deliver high-grade <span className="text-slate-900 font-bold">Stainless Steel Kitchenware</span> crafted for lifetime resilience in modern homes and commercial setups.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg text-center"
                >
                  Explore Products <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white/50 text-slate-900 rounded-xl font-semibold border border-white/60 hover:bg-white/70 hover:scale-105 active:scale-95 transition-all shadow-sm backdrop-blur-sm text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right image column */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden group border border-slate-200/40 p-4 flex items-center justify-center">
                <img 
                  src="/images/hero.jpg" 
                  alt="Sidak Steel premium stainless steel utensils collection including pots, pans, bowls, plates, and canisters with clean bright white studio background" 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credential / Keyword Ribbon */}
      <section className="py-6 bg-slate-900/5 border-y border-slate-200/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Steel Utensils Wholesaler
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Steel Kitchen Utensils Supplier
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Stainless Steel Kitchenware
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Steel Utensils Dealer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Why Choose Sidak Steel?</h2>
            <p className="mt-2 text-slate-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              India's Foremost Steel Utensils Dealer & Supplier
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-6 glass rounded-3xl text-center hover:bg-white/50 transition-colors h-full flex flex-col">
                  <div className="w-14 h-14 bg-white/60 shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-800">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 font-medium flex-grow mb-6">{feature.shortDesc}</p>
                  <button
                    onClick={() => setSelectedFeature(index)}
                    aria-label={`Learn more about our ${feature.title} feature`}
                    className="w-full py-2 bg-white/60 hover:bg-white hover:scale-105 text-slate-900 font-bold rounded-xl transition-all active:scale-95 border border-white shadow-sm mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  >
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Products</h2>
            <p className="mt-2 text-slate-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Explore Our Stainless Steel Kitchenware Collection
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { name: 'Stainless Steel Dinner Set', image: '/images/dinner.jpg' },
              { name: 'Stainless Steel Lota', image: '/images/stainless_steel_lota.webp' },
              { name: 'Stainless Steel Tiffin Box', image: '/images/lunch.jpg' },
              { name: 'Stainless Steel Pressure Cooker', image: '/images/cooker.jpg' },
              { name: 'Stainless Steel Tray', image: '/images/tray.jpg' },
              { name: 'Stainless Steel Bowl (Katori)', image: '/images/bowl.jpg' }
            ].map((product, index) => (
              <Link to="/products" key={index} className="glass p-6 rounded-3xl text-center hover:bg-white/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group block h-full">
                <div className="w-full aspect-square bg-white/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] rounded-2xl mb-4 flex items-center justify-center group-hover:bg-white/60 transition-colors overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </div>
                <h3 className="font-bold text-slate-900">{product.name}</h3>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Product Gallery</h2>
            <p className="mt-2 text-slate-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              A Glimpse of Our Exquisite Mirror-Finished Stainless Steel Collection
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Premium Stainless Steel Tiffin Box', image: '/images/premium.jpg', desc: 'Secure 3-tier leak-resistant lunch carrier' },
              { name: 'Stainless Steel Pressure Cooker', image: '/images/cooker.jpg', desc: 'Heavy induction-compatible safety cooker' },
              { name: 'Airtight Spice Box (Masala Dabba)', image: '/images/masala.jpg', desc: 'Traditional 7-compartment kitchen organizer' },
              { name: 'Heavy-Duty Stainless Steel Kadai', image: '/images/kadai.jpg', desc: 'Double riveted high-capacity helper wok' },
              { name: 'Modern Whistling Tea Kettle', image: '/images/tea.jpg', desc: 'Flat capsule fast-boiling aesthetic kettle' },
              { name: 'Airtight Steel Canister Storage Set', image: '/images/canaster.jpg', desc: 'Preserves culinary ingredients fresh and dry' },
              { name: 'Stainless Steel Colander & Strainer', image: '/images/colander.jpg', desc: 'Deep perforated wash-drain basket' },
              { name: 'Premium Stainless Steel Kitchen Rack', image: '/images/rack.jpg', desc: 'Sturdy multi-tier space-saving organizer rack' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-white border border-slate-200/40 rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(99,102,241,0.08)] hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="w-full aspect-square bg-slate-50/50 rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={`Sidak Steel ${item.name} with bright white background - professional commercial kitchenware`} 
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold tracking-wider uppercase bg-slate-900/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                      Sidak Premium
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-1">{item.name}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Reviews</h2>
            <p className="mt-2 text-slate-500 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Feedback from Clients who Trust our Steel Kitchen Utensils Supplier network
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 glass rounded-3xl h-full">
                <div className="flex gap-1 mb-4 text-yellow-500 drop-shadow-sm">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-800 font-medium italic mb-6">"Excellent quality products with fast delivery. Highly recommended!"</p>
                <p className="font-bold text-slate-900 tracking-tight">– Rahul Sharma</p>
              </div>
              <div className="p-8 glass rounded-3xl h-full">
                <div className="flex gap-1 mb-4 text-yellow-500 drop-shadow-sm">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-800 font-medium italic mb-6">"The utensils are strong, stylish, and worth the price."</p>
                <p className="font-bold text-slate-900 tracking-tight">– Simran Kaur</p>
              </div>
              <div className="p-8 glass rounded-3xl h-full">
                <div className="flex gap-1 mb-4 text-yellow-500 drop-shadow-sm">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-800 font-medium italic mb-6">"Bought the dinner set and it looks incredible on the table."</p>
                <p className="font-bold text-slate-900 tracking-tight">– Priya Patel</p>
              </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <section className="glass rounded-3xl py-20 text-center shadow-lg border border-white/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20"></div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Your Trusted Steel Utensils Dealer</h2>
            <p className="text-xl text-slate-700 mb-10 font-medium">
              Discover heavy-duty <span className="text-slate-900 font-bold">Stainless Steel Kitchenware</span> and bulk supply with India's premier <span className="text-slate-900 font-bold">Steel Kitchen Utensils Supplier</span>.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all text-lg shadow-xl"
            >
              Explore Products
            </Link>
          </div>
        </section>
      </div>
      {/* Modal */}
      {selectedFeature !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-slate-50 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
            <button
              autoFocus
              onClick={() => setSelectedFeature(null)}
              aria-label="Close feature details"
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white hover:scale-105 rounded-full shadow-sm text-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              <X size={24} />
            </button>

            {/* Slideshow */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-slate-200">
              {whyChooseFeatures[selectedFeature].images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === slideIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img src={img} alt={whyChooseFeatures[selectedFeature].title} className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </div>
              ))}
              
              {/* Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-2 bg-white/80 hover:bg-white hover:scale-105 rounded-full shadow-sm text-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-2 bg-white/80 hover:bg-white hover:scale-105 rounded-full shadow-sm text-slate-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {whyChooseFeatures[selectedFeature].images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${idx === slideIndex ? 'bg-slate-900' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-slate-900 shadow-sm">
                {(() => {
                  const Icon = whyChooseFeatures[selectedFeature].icon;
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{whyChooseFeatures[selectedFeature].title}</h2>
              <p className="text-slate-700 font-medium leading-relaxed">
                {whyChooseFeatures[selectedFeature].longDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
