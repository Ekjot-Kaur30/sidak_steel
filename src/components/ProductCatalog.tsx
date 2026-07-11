import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpDown, Star, ShieldCheck, Heart, Info, ArrowRight, X, Calculator, ShoppingBag, LayoutGrid, ChefHat, Utensils, Package, GlassWater, Share2, Link as LinkIcon, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  rating: number;
  specs: string;
}

const categoryMetadata: Record<string, { subtitle: string; gradient: string }> = {
  'All': {
    subtitle: 'Entire Steel Range',
    gradient: 'from-slate-700 to-slate-900'
  },
  'Kitchen Utensils': {
    subtitle: 'Daily use pots & bowls',
    gradient: 'from-blue-600 to-indigo-700'
  },
  'Lunch & Storage': {
    subtitle: 'Tiffins, jars & bottles',
    gradient: 'from-emerald-700 to-teal-800'
  },
  'Cookware': {
    subtitle: 'High performance pans',
    gradient: 'from-amber-600 to-orange-700'
  },
  'Dining & Serving': {
    subtitle: 'Luxury trays & dinner sets',
    gradient: 'from-rose-600 to-pink-700'
  }
};

const getCategoryIcon = (name: string) => {
  switch (name) {
    case 'Cookware': return <ChefHat className="w-5 h-5" />;
    case 'Dining & Serving': return <GlassWater className="w-5 h-5" />;
    case 'Lunch & Storage': return <Package className="w-5 h-5" />;
    case 'Kitchen Utensils': return <Utensils className="w-5 h-5" />;
    default: return <LayoutGrid className="w-5 h-5" />;
  }
};

interface ProductCatalogProps {
  onInquireClick?: (productName: string, qty: number) => void;
}

export default function ProductCatalog({ onInquireClick }: ProductCatalogProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);

  // Bulk calculator state in modal
  const [bulkQuantity, setBulkQuantity] = useState(100);

  const navigate = useNavigate();

  // Fetch product data on mount and check for deep linking
  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load product catalog data');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
        
        // Deep linking: Automatically open product modal if ID is in the URL query parameters
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id') || params.get('productId');
        if (productId) {
          const matched = data.find((p: Product) => p.id === productId);
          if (matched) {
            setSelectedProduct(matched);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Something went wrong while fetching products.');
        setLoading(false);
      });
  }, []);

  // Synchronize deep-link URL parameter when selecting/deselecting a product
  useEffect(() => {
    if (selectedProduct) {
      const params = new URLSearchParams(window.location.search);
      params.set('id', selectedProduct.id);
      window.history.replaceState(null, '', `?${params.toString()}`);
    } else {
      const params = new URLSearchParams(window.location.search);
      if (params.has('id')) {
        params.delete('id');
        const searchStr = params.toString();
        window.history.replaceState(null, '', searchStr ? `?${searchStr}` : window.location.pathname);
      }
    }
  }, [selectedProduct]);

  // Filter & Sort Logic
  const categories: string[] = ['All', ...Array.from(new Set(products.map((p) => p.category)) as Set<string>)];

  const getCategoryCount = (catName: string) => {
    if (catName === 'All') return products.length;
    return products.filter((p) => p.category === catName).length;
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // 'featured' or default
    });

  const toggleFavorite = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Bulk tier production & customization calculation (focuses on timeline/benefits instead of rates/prices)
  const getBulkDetails = (qty: number) => {
    let tier = 'Standard Inquiry';
    let leadTime = '2-3 Business Days';
    let benefits = ['Secure Export Packaging', 'Standard Quality Guarantee'];
    let customization = 'Standard Sidak Steel branding';

    if (qty >= 500) {
      tier = 'Platinum Manufacturer Tier';
      leadTime = '12-15 Business Days (Direct-from-Factory production run)';
      benefits = [
        'Free Custom Logo Embossing / Mold design',
        'Free Priority Sea/Air Cargo coordination',
        'Dedicated Quality Assurance inspection report',
        'Pre-production raw material test reports'
      ];
      customization = 'Custom Embossing, Laser Engraving & Bespoke Box Design';
    } else if (qty >= 250) {
      tier = 'Gold Wholesale Tier';
      leadTime = '7-10 Business Days';
      benefits = [
        'Laser Engraving of your custom brand name',
        'Expedited Cargo dispatch priority',
        'Custom cardboard master cartons packaging'
      ];
      customization = 'Laser Engraved Branding & custom packaging label';
    } else if (qty >= 100) {
      tier = 'Silver Distributor Tier';
      leadTime = '5-7 Business Days';
      benefits = [
        'Custom sticker labeling allowed',
        'Bulk transport network assistance'
      ];
      customization = 'Sidak Steel branding + Custom stickers';
    } else if (qty >= 50) {
      tier = 'Bronze Wholesale Tier';
      leadTime = '4-5 Business Days';
      benefits = [
        'Bulk packaging in master sets'
      ];
      customization = 'Sidak Steel standard packaging';
    }

    return { tier, leadTime, benefits, customization };
  };

  return (
    <div className="w-full">
      {/* Search and Filters Header */}
      <div className="glass p-6 md:p-8 rounded-3xl mb-10 border border-white/20 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Search bar */}
          <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search stainless steel Lota, Glasses, Tiffin boxes, Bowls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/40 hover:bg-white/60 focus:bg-white border border-slate-200/50 rounded-2xl outline-none font-medium text-slate-800 transition-all shadow-inner placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>


        </div>

        {/* Department Category Filter Navigation */}
        <div className="mt-8 pt-8 border-t border-slate-200/30">
          <div className="flex flex-col gap-1.5 mb-5 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Premium selection of durable steel utensils
            </span>
            <h3 className="text-lg font-extrabold text-slate-800">
              Browse by Department
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const meta = categoryMetadata[cat] || { subtitle: 'Premium steel items', gradient: 'from-slate-600 to-slate-800' };
              const count = getCategoryCount(cat);
              
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group h-28 cursor-pointer select-none overflow-hidden ${
                    isActive 
                      ? 'bg-slate-900 border-slate-950 text-white shadow-md shadow-slate-900/10 scale-[1.02]' 
                      : 'bg-white/40 hover:bg-white/80 border-slate-200/50 text-slate-800 hover:scale-[1.01]'
                  }`}
                >
                  {/* Active Highlight Glow */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="flex items-start justify-between w-full">
                    {/* Icon container */}
                    <div className={`p-2 rounded-xl transition-colors duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}>
                      {getCategoryIcon(cat)}
                    </div>

                    {/* Count Badge */}
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-white/15 text-slate-200' 
                        : 'bg-slate-200/60 text-slate-600'
                    }`}>
                      {count} items
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="block font-extrabold text-sm leading-tight tracking-tight">
                      {cat}
                    </span>
                    <span className={`block text-[10px] font-bold leading-normal truncate mt-0.5 ${
                      isActive ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {meta.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Utensils */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-slate-700 font-bold text-lg">Fetching pristine steel products...</p>
        </div>
      ) : error ? (
        <div className="glass p-8 text-center rounded-3xl max-w-md mx-auto">
          <p className="text-red-600 font-bold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl"
          >
            Retry Fetching
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="glass p-12 text-center rounded-3xl max-w-2xl mx-auto">
          <p className="text-xl text-slate-700 font-bold mb-3">No matching steel utensils found</p>
          <p className="text-slate-500 font-medium mb-6">
            Try adjusting your search filters or check another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${product.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProduct(product);
                    }
                  }}
                  onClick={() => setSelectedProduct(product)}
                  className="glass rounded-3xl p-6 flex flex-col hover:bg-white/50 hover:shadow-lg transition-all group cursor-pointer relative border border-white/20 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  {/* Category Badge & Favorite Button */}
                  <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-10 pointer-events-none">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {product.category}
                    </span>
                    <button
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="p-2.5 bg-white/80 hover:bg-white rounded-full shadow-md text-slate-800 hover:text-red-500 transition-colors pointer-events-auto active:scale-90"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          isFavorite ? 'fill-red-500 text-red-500 scale-110' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Image Stage */}
                  <div className="w-full aspect-square bg-white shadow-[inset_0_0_25px_rgba(0,0,0,0.03)] rounded-2xl mb-6 flex items-center justify-center overflow-hidden border border-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Rating block */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-500">{product.rating}</span>
                  </div>

                  {/* Metadata */}
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                    {product.description}
                  </p>

                   {/* Specs and Call-to-action */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/20">
                    <div className="max-w-[55%]">
                      <span className="text-[10px] font-extrabold text-slate-400 block uppercase tracking-wider mb-0.5">
                        Material Specifications
                      </span>
                      <span className="text-sm font-bold text-slate-800 line-clamp-1">
                        {product.specs.split(',')[0]}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="inline-flex items-center gap-2 py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-sm active:scale-95 text-sm"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Product Detail & Bulk Calculator Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-50 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative my-8"
            >
              {/* Close Button */}
              <button
                autoFocus
                onClick={() => setSelectedProduct(null)}
                aria-label="Close product details"
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-slate-800 hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Modal Area */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side: Product Media */}
                <div className="bg-white p-6 md:p-8 flex flex-col justify-center items-center border-r border-slate-100">
                  <div className="w-full aspect-square bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden p-4 mb-4 border border-slate-100">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-200/50">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>Food-Grade 100% Certified Safe Steel</span>
                  </div>
                </div>

                {/* Right Side: Product Meta & Dynamic Calculator */}
                <div className="p-6 md:p-8 flex flex-col max-h-[80vh] overflow-y-auto">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight">
                    {selectedProduct.name}
                  </h2>

                  {/* Rating / Quality Grade Block */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {selectedProduct.rating}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">(Verified Buyer Rating)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-xs font-bold block uppercase">Quality Grade</span>
                      <span className="text-xl font-black text-slate-900">SS 202/304 Grade</span>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-200/50">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Description
                      </span>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Specifications
                      </span>
                      <p className="text-sm text-slate-800 bg-slate-100 p-3 rounded-xl font-semibold border border-slate-200/20">
                        {selectedProduct.specs}
                      </p>
                    </div>

                    {/* Social Media Sharing */}
                    <div className="pt-4 border-t border-slate-200/50">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-slate-400" />
                        Share this Product
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {/* WhatsApp */}
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            `Check out this premium ${selectedProduct.name} from Sidak Steel: ${window.location.origin}/products?id=${selectedProduct.id}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on WhatsApp"
                          className="p-2.5 bg-slate-900 hover:bg-emerald-700 hover:scale-105 active:scale-95 text-white rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                          </svg>
                        </a>

                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            `${window.location.origin}/products?id=${selectedProduct.id}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on Facebook"
                          className="p-2.5 bg-slate-900 hover:bg-blue-600 hover:scale-105 active:scale-95 text-white rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                          </svg>
                        </a>

                        {/* Twitter / X */}
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `Check out premium stainless steel ${selectedProduct.name} from Sidak Steel!`
                          )}&url=${encodeURIComponent(
                            `${window.location.origin}/products?id=${selectedProduct.id}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on Twitter / X"
                          className="p-2.5 bg-slate-900 hover:bg-sky-500 hover:scale-105 active:scale-95 text-white rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>

                        {/* Telegram */}
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(
                            `${window.location.origin}/products?id=${selectedProduct.id}`
                          )}&text=${encodeURIComponent(
                            `Sidak Steel - Premium Stainless Steel ${selectedProduct.name}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on Telegram"
                          className="p-2.5 bg-slate-900 hover:bg-blue-500 hover:scale-105 active:scale-95 text-white rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
                          </svg>
                        </a>

                        {/* Copy Link */}
                        <button
                          type="button"
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/products?id=${selectedProduct.id}`;
                            navigator.clipboard.writeText(shareUrl);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          title="Copy Link"
                          className={`p-2.5 flex items-center justify-center rounded-xl transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 ${
                            copied
                              ? 'bg-emerald-700 text-white font-bold px-3.5 gap-1.5'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span className="text-xs font-bold">Copied!</span>
                            </>
                          ) : (
                            <LinkIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Wholesale / Bulk savings Estimator */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 mb-8 shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-5 h-5 text-indigo-400" />
                      <h4 className="text-sm font-black uppercase tracking-wider">
                        Wholesale & Bulk Estimator
                      </h4>
                    </div>

                    <p className="text-xs text-slate-300 font-medium mb-4 leading-relaxed">
                      Sidak Steel is a prime manufacturer. Adjust order size to view production timeline, perks, and custom branding options:
                    </p>

                    {/* Quantity Selector Slider */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs font-bold text-slate-400">
                        <label htmlFor="bulk-quantity-range" className="cursor-pointer">Quantity (Pieces)</label>
                        <span className="text-white font-black">{bulkQuantity} Units</span>
                      </div>
                      <input
                        type="range"
                        id="bulk-quantity-range"
                        min="10"
                        max="1000"
                        step="10"
                        value={bulkQuantity}
                        onChange={(e) => setBulkQuantity(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-500 bg-slate-700 h-1.5 rounded-lg cursor-pointer appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                        <span>10 pcs</span>
                        <span>50 pcs (Bronze)</span>
                        <span>100 pcs (Silver)</span>
                        <span>250+ pcs (Gold)</span>
                        <span>500+ pcs (Platinum)</span>
                      </div>
                    </div>

                    {/* Calculation Output */}
                    {(() => {
                      const { tier, leadTime, benefits, customization } = getBulkDetails(bulkQuantity);
                      return (
                        <div className="bg-slate-800 rounded-xl p-3.5 space-y-2 border border-slate-700/50 text-xs">
                          <div className="flex justify-between font-medium">
                            <span className="text-slate-400">Wholesale Tier:</span>
                            <span className="text-indigo-300 font-bold uppercase">{tier}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span className="text-slate-400">Est. Lead Time:</span>
                            <span className="text-white font-medium">{leadTime}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span className="text-slate-400">Customization:</span>
                            <span className="text-emerald-400 font-medium">{customization}</span>
                          </div>
                          <div className="pt-2 border-t border-slate-700/50">
                            <span className="text-slate-400 block mb-1 font-bold">Included Perks:</span>
                            <ul className="list-disc list-inside space-y-1 text-slate-300">
                              {benefits.map((benefit, bIdx) => (
                                <li key={bIdx} className="leading-snug">{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Primary Call-to-actions */}
                  <div className="space-y-3 mt-auto">
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        if (onInquireClick) {
                          onInquireClick(selectedProduct.name, bulkQuantity);
                        } else {
                          navigate('/contact', {
                            state: {
                              subject: `Bulk Query for ${selectedProduct.name}`,
                              message: `Hello Sidak Steel Team,\n\nI am interested in a bulk wholesale purchase of around ${bulkQuantity} units of "${selectedProduct.name}". Please share the quotation, lead times, and dispatch schedule.\n\nThank you!`,
                            },
                          });
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl transition-all shadow-md active:scale-95 text-sm md:text-base cursor-pointer"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Submit Bulk Quotation Request</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        navigate('/contact');
                      }}
                      className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold rounded-xl transition-all active:scale-95 text-sm"
                    >
                      Ask general questions about product
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
