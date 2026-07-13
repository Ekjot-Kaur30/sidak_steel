import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass m-4 sm:m-8 rounded-3xl text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/logo" className="hover:scale-110 transition-all cursor-pointer" title="View Royal Crest Logo">
                <img 
                  src="/images/sidak_steel_logo_1783604723395.jpg" 
                  alt="Sidak Steel Royal Logo" 
                  className="w-9 h-9 rounded-full object-cover border border-slate-200/50 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <Link to="/" className="font-bold text-xl text-slate-900 tracking-tight hover:text-slate-700 transition-colors">
                Sidak Steel
              </Link>
            </div>
            <p className="text-sm text-slate-700 font-medium">
              Premium Stainless Steel Utensils for Modern Kitchens.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Home</Link></li>
              <li><Link to="/about" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">About Us</Link></li>
              <li><Link to="/products" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Products</Link></li>
              <li><Link to="/blog" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 tracking-wide uppercase text-sm">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Dinner Sets</Link></li>
              <li><Link to="/products" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Water Bottles</Link></li>
              <li><Link to="/products" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Storage Containers</Link></li>
              <li><Link to="/products" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Pressure Cookers</Link></li>
              <li><Link to="/products" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Serving Trays</Link></li>
              <li><Link to="/products" className="hover:text-slate-900 text-slate-600 font-medium transition-all hover:scale-105 inline-block text-sm">Mixing Bowls</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 font-bold mb-4 tracking-wide uppercase text-sm">Contact</h3>
            <ul className="space-y-4">
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-700 shrink-0" />
                  <a href="tel:+919354761065" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline transition-all">
                    +91 9354761065
                  </a>
                </div>
                <div className="flex flex-col items-start gap-2 pl-8">
                  <a 
                    href="tel:+919354761065"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Now
                  </a>
                  <a 
                    href="https://wa.me/919354761065?text=Hello%20Sidak%20Steel,%20I%20am%20interested%20in%20your%20products."
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
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-700 shrink-0" />
                <span className="text-sm font-medium text-slate-600 break-all">ekjotkaur570@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-700 shrink-0" />
                <span className="text-sm font-medium text-slate-600">Patri Mohalla, Jagadhri, Haryana, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 mt-12 pt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-slate-600 font-medium">
            &copy; 2017 - {new Date().getFullYear()} Sidak Steel. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
