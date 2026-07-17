import { MapPin, Phone, Mail, Clock, CloudLightning, Database } from 'lucide-react';
import { FormEvent, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FAQ from '../components/FAQ';
import { saveOrder, isFirebaseActive } from '../lib/firebase';

export default function Contact() {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [savedLocally, setSavedLocally] = useState(false);
  
  // Controlled fields for form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState<number | undefined>(undefined);

  useEffect(() => {
    // If navigating from product catalog details with a custom inquiry
    if (location.state) {
      if (location.state.subject) setSubject(location.state.subject);
      if (location.state.message) setMessage(location.state.message);
      if (location.state.productName) setProductName(location.state.productName);
      if (location.state.quantity) setQuantity(location.state.quantity);
    }
  }, [location.state]);

  useEffect(() => {
    document.title = "Contact Sidak Steel | Get in Touch for Steel Utensils";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Contact Sidak Steel for product inquiries, wholesale orders, and customer support. We're here to help with all your stainless steel kitchenware needs.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Contact Sidak Steel for product inquiries, wholesale orders, and customer support. We're here to help with all your stainless steel kitchenware needs.";
      document.head.appendChild(meta);
    }
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + '/contact');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', window.location.origin + '/contact');
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await saveOrder({
        name,
        email,
        phone,
        subject,
        message,
        productName: productName || undefined,
        quantity: quantity || undefined,
      });
      setSubmittedId(result.id);
      setSavedLocally(result.isLocal);
      setIsSubmitted(true);
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setProductName('');
      setQuantity(undefined);
    } catch (err) {
      console.error("Error submitting order: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 glass p-10 rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Contact Us</h1>
          <p className="text-xl text-slate-700 font-bold mb-6">
            We would love to hear from you and assist you with your kitchenware needs.
          </p>
          <p className="text-lg text-slate-700 font-medium leading-relaxed">
            Whether you have questions about our premium stainless steel products, need assistance with bulk orders for your restaurant, or are seeking a certified <span className="text-slate-900 font-bold">Steel utensils supplier</span>, our dedicated team at Sidak Steel is always ready to provide you with the best possible service. Reach out to us using the form below or via our contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 glass rounded-3xl overflow-hidden shadow-sm">
          
          {/* Contact Information */}
          <div className="bg-white/20 p-10 lg:p-12 text-slate-900 border-r border-white/30 backdrop-blur-md">
            <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Get in Touch</h2>
            <p className="text-sm text-slate-700 font-medium mb-8 leading-relaxed">
              Sidak Steel operates as an established, nationwide <span className="text-slate-900 font-bold">steel utensils dealer</span> with a reputation for premium quality products.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-slate-700 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1 text-slate-900">Address</h3>
                  <p className="text-slate-700 font-medium">Sidak Steel<br/>Patri Mohalla, Jagadhri, Haryana, India</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-slate-700 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1 text-slate-900">Phone & WhatsApp</h3>
                  <p className="text-slate-700 font-medium mb-3">
                    <a href="tel:+919354761065" className="hover:underline hover:text-slate-950 transition-colors">
                      +91 9354761065
                    </a>
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <a 
                      href="tel:+919354761065"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Now
                    </a>
                    <a 
                      href="https://wa.me/919354761065?text=Hello%20Sidak%20Steel,%20I%20am%20interested%20in%20your%20stainless%20steel%20products."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                      </svg>
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-slate-700 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1 text-slate-900">Email</h3>
                  <p className="text-slate-700 font-medium">ekjotkaur570@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-slate-700 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1 text-slate-900">Business Hours</h3>
                  <p className="text-slate-700 font-medium mb-1">Monday – Saturday<br/>9:00 AM – 6:00 PM</p>
                  <p className="text-slate-600 font-medium">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-900/10">
              <div className="group relative bg-white border border-slate-200/40 rounded-3xl p-3 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="w-full aspect-[16/10] bg-slate-50 rounded-2xl overflow-hidden relative flex items-center justify-center">
                  <img 
                    src="/images/storefront_warehouse_1783747919229.jpg" 
                    alt="Sidak Steel storefront and logistics warehouse center displaying stainless steel utensils products" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-slate-900 font-bold text-sm text-center">Sidak Steel Storefront & Logistics Center</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 lg:p-12">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-12">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order Received!</h2>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-md w-full space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Order / Query ID:</span>
                    <span className="font-mono font-bold text-slate-800 bg-slate-200 px-2.5 py-0.5 rounded-md text-xs">{submittedId}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Database Status:</span>
                    {savedLocally ? (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-bold text-xs">
                        <Database className="w-3.5 h-3.5" /> Local Database Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold text-xs">
                        <CloudLightning className="w-3.5 h-3.5" /> Live Firebase Firestore
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-normal pt-2 border-t border-slate-200">
                    Your request has been successfully recorded. You can view, track, and manage this and all other requests on our interactive <span className="font-semibold text-slate-900">Orders Dashboard</span>!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                  <a
                    href="/orders"
                    className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-bold transition-all text-sm active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    View Orders Dashboard
                  </a>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 border border-slate-300 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all text-sm shadow-sm"
                  >
                    Place Another Order
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 p-5 rounded-2xl bg-white/40 border border-white/30 backdrop-blur-sm shadow-sm">
                  <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                    Are you an established <span className="text-slate-900 font-bold">kitchenware wholesaler</span>? Simply fill out the form below to directly <span className="text-slate-900 font-bold">contact steel utensils supplier</span> representatives and request wholesale pricing.
                  </p>
                </div>

                {/* Specific Product Order Badge */}
                {productName && (
                  <div className="mb-6 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Selected Item for Bulk Quotation</span>
                      <span className="text-base font-bold text-white block">{productName}</span>
                    </div>
                    {quantity && (
                      <span className="bg-white/20 px-3 py-1.5 rounded-lg text-xs font-black">
                        {quantity} units
                      </span>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-800 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 focus:ring-2 focus:ring-slate-900 focus:bg-white/60 focus:border-slate-900 outline-none transition-all placeholder-slate-500 font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-800 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 focus:ring-2 focus:ring-slate-900 focus:bg-white/60 focus:border-slate-900 outline-none transition-all placeholder-slate-500 font-medium"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-slate-800 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 focus:ring-2 focus:ring-slate-900 focus:bg-white/60 focus:border-slate-900 outline-none transition-all placeholder-slate-500 font-medium"
                        placeholder="+91"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-slate-800 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 focus:ring-2 focus:ring-slate-900 focus:bg-white/60 focus:border-slate-900 outline-none transition-all placeholder-slate-500 font-medium"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-800 mb-1">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/40 focus:ring-2 focus:ring-slate-900 focus:bg-white/60 focus:border-slate-900 outline-none transition-all placeholder-slate-500 font-medium resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md cursor-pointer"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
        <FAQ />
      </div>
    </div>
  );
}
