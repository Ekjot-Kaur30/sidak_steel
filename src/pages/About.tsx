import { useState, useEffect } from 'react';
import { Target, Eye, ShieldCheck, ThumbsUp, Lightbulb, Award, Users } from 'lucide-react';

const aboutValues = [
  {
    title: 'Quality First',
    icon: ShieldCheck,
    description: 'We never compromise on the quality of our stainless steel. Every product undergoes strict quality control checks to ensure it meets international food-grade standards and delivers exceptional durability.'
  },
  {
    title: 'Customer Satisfaction',
    icon: ThumbsUp,
    description: 'Our customers are at the heart of everything we do. We strive to provide excellent service, prompt support, and products that genuinely improve the daily cooking and dining experience.'
  },
  {
    title: 'Innovation',
    icon: Lightbulb,
    description: 'While honoring traditional designs, we continuously explore modern manufacturing techniques to create ergonomic, efficient, and aesthetically pleasing kitchenware.'
  },
  {
    title: 'Affordable Pricing',
    icon: Award,
    description: 'By optimizing our supply chain and manufacturing processes, we ensure that premium quality stainless steel utensils remain accessible and affordable for every household.'
  },
  {
    title: 'Honest Practices',
    icon: Users,
    description: 'Integrity and transparency are the foundations of our business. We build long-term relationships with our suppliers, distributors, and customers based on mutual trust and respect.'
  }
];

export default function About() {
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    document.title = "About Sidak Steel | Trusted Stainless Steel Utensils Supplier";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Sidak Steel, your trusted supplier of quality stainless steel utensils and kitchenware. We offer durable, food-grade products at competitive prices.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Learn about Sidak Steel, your trusted supplier of quality stainless steel utensils and kitchenware. We offer durable, food-grade products at competitive prices.";
      document.head.appendChild(meta);
    }
    
    // Cleanup function if needed, though typically not needed in a simple SPA.
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + '/about');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', window.location.origin + '/about');
      document.head.appendChild(canonical);
    }

    return () => {
        document.title = "Sidak Steel | Premium Stainless Steel Utensils & Kitchenware";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Shop premium stainless steel utensils at Sidak Steel. Explore lota, glass, tiffin boxes, trays, bowls, fry pans, plates, cookware, and kitchen essentials.');
        }
        let canonicalDesc = document.querySelector('link[rel="canonical"]');
        if (canonicalDesc) {
            canonicalDesc.setAttribute('href', window.location.origin + '/');
        }

    };
  }, []);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 glass p-8 md:p-10 rounded-3xl h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">About Sidak Steel</h1>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed font-medium">
              Sidak Steel is a trusted manufacturer of <span className="text-slate-900 font-bold">quality steel utensils</span>, committed to providing durable, hygienic, and affordable products for every household. Established in 2017, we have grown from a small local enterprise into a recognized name in the kitchenware industry, driven by our passion for quality craftsmanship.
            </p>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed font-medium">
              Our mission is to deliver products that combine quality, functionality, and modern design while maintaining the highest manufacturing standards. We source only the finest raw materials to ensure that every utensil that bears our name is corrosion-resistant, food-safe, and built to withstand the rigors of daily use.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              Whether you are furnishing a new home kitchen, upgrading your restaurant's equipment, or seeking a <span className="text-slate-900 font-bold">Reliable Steel Supplier</span>, Sidak Steel offers solutions that last for generations.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group relative bg-white border border-slate-200/40 rounded-3xl p-3 shadow-md hover:shadow-lg hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden relative flex items-center justify-center">
                <img 
                  src="/images/warehouse.jpg" 
                  alt="Sidak Steel modern clean warehouse filled with organized boxes of stainless steel utensils" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-slate-900 font-bold text-sm text-center">Our Modern Warehouse</p>
              <p className="text-slate-500 text-xs text-center font-medium">Efficient nationwide logistics center</p>
            </div>

            <div className="group relative bg-white border border-slate-200/40 rounded-3xl p-3 shadow-md hover:shadow-lg hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden relative flex items-center justify-center">
                <img 
                  src="/images/shelves.jpg" 
                  alt="Organized showroom shelves displaying premium mirror-finished stainless steel pots, bowls, and canisters" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-slate-900 font-bold text-sm text-center">Organized Showroom</p>
              <p className="text-slate-500 text-xs text-center font-medium">Stunning product showcase shelves</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="glass p-10 rounded-3xl">
            <div className="w-14 h-14 bg-white/60 shadow-sm rounded-2xl flex items-center justify-center text-slate-800 mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-700 font-medium leading-relaxed">
                To serve as a leading <span className="text-slate-900 font-bold">steel utensils supplier</span>, providing premium products that enhance everyday cooking while ensuring quality, affordability, and customer satisfaction. We aim to make healthy, safe, and beautiful kitchenware accessible to homes and businesses across the country.
              </p>
            </div>
            <div className="glass p-10 rounded-3xl h-full">
              <div className="w-14 h-14 bg-white/60 shadow-sm rounded-2xl flex items-center justify-center text-slate-800 mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-700 font-medium leading-relaxed">
                To grow as a dominant <span className="text-slate-900 font-bold">steel utensils distributor</span>, becoming one of the most trusted and preferred kitchenware brands globally, recognized for our commitment to sustainable manufacturing, innovative design, and uncompromising excellence in customer service.
              </p>
            </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-12">Our Values</h2>
          
          {/* Values Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {aboutValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <button 
                  key={index} 
                  onClick={() => setActiveValue(index)}
                  className={`p-4 md:p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-3 transition-all ${activeValue === index ? 'bg-slate-900 text-white shadow-lg scale-105' : 'glass hover:bg-white/50 text-slate-900 active:scale-95'}`}
                >
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 ${activeValue === index ? 'text-white' : 'text-slate-700'}`} />
                  <h3 className={`font-bold text-sm md:text-base ${activeValue === index ? 'text-white' : 'text-slate-900'}`}>{value.title}</h3>
                </button>
              );
            })}
          </div>

          {/* Value Details Box */}
          <div className="glass p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto shadow-sm min-h-[200px] flex flex-col justify-center transition-all duration-300">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{aboutValues[activeValue].title}</h3>
            <p className="text-lg text-slate-700 font-medium leading-relaxed">
              {aboutValues[activeValue].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
