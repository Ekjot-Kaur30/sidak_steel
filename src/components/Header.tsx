import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="glass rounded-3xl m-4 sm:m-5 sticky top-5 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/logo" className="hover:scale-110 transition-all cursor-pointer" title="View Royal Crest Logo">
              <img 
                src="/images/sidak_steel_logo_1783862511965.jpg" 
                alt="Sidak Steel Royal Logo" 
                className="w-11 h-11 rounded-full object-cover border border-slate-200/50 shadow-md"
                referrerPolicy="no-referrer"
              />
            </Link>
            <Link to="/" className="font-bold text-2xl text-slate-900 tracking-tight hover:text-slate-700 transition-colors">
              Sidak Steel
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-all hover:scale-105 hover:text-slate-900 ${
                  isActive(link.path) ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-slate-500 hover:text-slate-900 hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 rounded-lg p-1"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="md:hidden glass rounded-b-3xl border-t border-white/20 mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-medium transition-all hover:scale-105 ${
                  isActive(link.path)
                    ? 'bg-white/30 text-slate-900'
                    : 'text-slate-700 hover:bg-white/20 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
