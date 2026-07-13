import { Check, ArrowRight, ShieldCheck, Star, X, Building, Mail, Phone, MapPin, Sparkles, Calculator, FileText, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductCatalog from '../components/ProductCatalog';
import ScrollToTopButton from '../components/ScrollToTopButton';

const categories = [
  {
    title: "Kitchen Utensils",
    icon: "🥣",
    items: [
      { name: "Stainless Steel Lota", image: "../images/stainless_steel_lota.webp" },
      { name: "Stainless Steel Glass", image: "/images/steel_glass.jpg" },
      { name: "Stainless Steel Bowl (Katori)", image: "/images/katori_1783603516071.jpg" },
      { name: "Stainless Steel Plate (Thali)", image: "/images/dinner_set_1783603542763.jpg" },
      { name: "Stainless Steel Spoon", image: "/images/spoon_1783604685387.jpg" },
      { name: "Stainless Steel Fork", image: "/images/fork_1783604699757.jpg" },
      { name: "Stainless Steel Knife", image: "/images/knife_1783604712202.jpg" },
      { name: "Stainless Steel Serving Spoon", image: "/images/serving_spoon_1783604723395.jpg" },
      { name: "Stainless Steel Tea Strainer", image: "/images/tea_strainer_1783604734063.jpg" },
      { name: "Stainless Steel Lemon Squeezer", image: "/images/lemon_squeezer_1783604746970.jpg" },
      { name: "Stainless Steel Whisk", image: "/images/whisk_1783604759120.jpg" }
    ]
  },
  {
    title: "Lunch & Storage",
    icon: "🍱",
    items: [
      { name: "Stainless Steel Tiffin Box", image: "/images/tiffin_1783603479978.jpg" },
      { name: "Lunch Carrier", image: "/images/tiffin_1783603479978.jpg" },
      { name: "Food Storage Containers", image: "/images/steel_boxes_1783605604566.jpg" },
      { name: "Airtight Steel Containers", image: "/images/food_storage_1783604778508.jpg" },
      { name: "Steel Canisters", image: "/images/steel_canisters_1783604791689.jpg" },
      { name: "Steel Spice Boxes (Masala Dabba)", image: "/images/masala_dabba_1783604804974.jpg" },
      { name: "Steel Water Jug", image: "/images/water_jug_1783605591131.jpg" },
      { name: "Steel Water Bottle", image: "/images/water_bottle_1783604216273.jpg" },
      { name: "Steel Lunch Box (Compartments)", image: "/images/tiffin_1783603479978.jpg" }
    ]
  },
  {
    title: "Cookware",
    icon: "🍳",
    items: [
      { name: "Stainless Steel Fry Pan", image: "/images/fry_pan_1783603493034.jpg" },
      { name: "Stainless Steel Kadhai", image: "/images/stainless_steel_kadai_1783664165512.jpg" },
      { name: "Stainless Steel Saucepan", image: "/images/milk_pot_1783604817454.jpg" },
      { name: "Stainless Steel Pressure Cooker", image: "/images/pressure_cooker_1783603530362.jpg" },
      { name: "Stainless Steel Cooking Pot", image: "/images/hotel_utensils_1783604950553.jpg" },
      { name: "Stainless Steel Stock Pot", image: "/images/hotel_utensils_1783604950553.jpg" },
      { name: "Stainless Steel Milk Pot", image: "/images/milk_pot_1783604817454.jpg" },
      { name: "Stainless Steel Casserole", image: "/images/casserole_1783604830092.jpg" },
      { name: "Steel Wok", image: "/images/stainless_steel_kadai_1783664165512.jpg" }
    ]
  },
  {
    title: "Dining & Serving",
    icon: "🍽",
    items: [
      { name: "Stainless Steel Tray", image: "/images/tray_1783603506131.jpg" },
      { name: "Stainless Steel Dinner Set", image: "/images/dinner_set_1783603542763.jpg" },
      { name: "Serving Bowl", image: "/images/katori_1783603516071.jpg" },
      { name: "Rice Plate", image: "/images/dinner_set_1783603542763.jpg" },
      { name: "Compartment Plate", image: "/images/compartment_plate_1783604842965.jpg" },
      { name: "Serving Dish", image: "/images/tray_1783603506131.jpg" },
      { name: "Snack Plate", image: "/images/dinner_set_1783603542763.jpg" },
      { name: "Oval Serving Tray", image: "/images/tray_1783603506131.jpg" },
      { name: "Round Serving Tray", image: "/images/tray_1783603506131.jpg" }
    ]
  },
  {
    title: "Kitchen Essentials",
    icon: "🍚",
    items: [
      { name: "Mixing Bowl", image: "/images/katori_1783603516071.jpg" },
      { name: "Colander (Strainer)", image: "/images/colander_1783604857618.jpg" },
      { name: "Rice Strainer", image: "/images/colander_1783604857618.jpg" },
      { name: "Steel Bucket", image: "/images/bucket_1783604873123.jpg" },
      { name: "Steel Mug", image: "/images/glass_1783603466189.jpg" },
      { name: "Steel Dustbin", image: "/images/dustbin_1783604886051.jpg" },
      { name: "Steel Ice Bucket", image: "/images/ice_bucket_1783604897081.jpg" },
      { name: "Steel Measuring Cups", image: "/images/measuring_cups_1783604911234.jpg" },
      { name: "Steel Measuring Spoons", image: "/images/measuring_spoons_1783604923570.jpg" },
      { name: "Steel Sink Basket", image: "/images/colander_1783604857618.jpg" }
    ]
  },
  {
    title: "Beverage Items",
    icon: "☕",
    items: [
      { name: "Tea Glass", image: "/images/glass_1783603466189.jpg" },
      { name: "Coffee Mug", image: "/images/glass_1783603466189.jpg" },
      { name: "Steel Cup", image: "/images/glass_1783603466189.jpg" },
      { name: "Steel Flask", image: "/images/water_bottle_1783604216273.jpg" },
      { name: "Steel Kettle", image: "/images/stainless_steel_kettle_1783664186975.jpg" },
      { name: "Steel Teapot", image: "/images/kettle_1783604936789.jpg" }
    ]
  },
  {
    title: "Commercial Products",
    icon: "🏪",
    items: [
      { name: "Hotel Utensils", image: "/images/hotel_utensils_1783604950553.jpg" },
      { name: "Restaurant Kitchenware", image: "/images/hotel_utensils_1783604950553.jpg" },
      { name: "Catering Utensils", image: "/images/hotel_utensils_1783604950553.jpg" },
      { name: "Bulk Storage Containers", image: "/images/food_storage_1783604778508.jpg" },
      { name: "Commercial Cooking Pots", image: "/images/hotel_utensils_1783604950553.jpg" },
      { name: "Steel Serving Buckets", image: "/images/bucket_1783604873123.jpg" },
      { name: "Heavy Duty Hotel Pans", image: "/images/tray_1783603506131.jpg" }
    ]
  }
];

const featuredProducts = [
  {
    name: "Stainless Steel Lota",
    description: "Perfect for daily household use, made from premium food-grade stainless steel with a polished finish.",
    image: "/images/lota_1783603449089.jpg"
  },
  {
    name: "Stainless Steel Glass",
    description: "Rust-resistant drinking glass available in multiple sizes for everyday use.",
    image: "/images/glass_1783603466189.jpg"
  },
  {
    name: "Stainless Steel Tiffin Box",
    description: "Leak-resistant, durable lunch box ideal for school, office, and travel.",
    image: "/images/tiffin_1783603479978.jpg"
  },
  {
    name: "Stainless Steel Fry Pan",
    description: "Heavy-duty fry pan with an ergonomic handle for convenient cooking.",
    image: "/images/fry_pan_1783603493034.jpg"
  },
  {
    name: "Stainless Steel Tray",
    description: "Elegant serving tray suitable for homes, hotels, and restaurants.",
    image: "/images/tray_1783603506131.jpg"
  },
  {
    name: "Stainless Steel Bowl (Katori)",
    description: "Available in different sizes, ideal for serving vegetables, curries, desserts, and snacks.",
    image: "/images/katori_1783603516071.jpg"
  },
  {
    name: "Stainless Steel Pressure Cooker",
    description: "Strong and reliable pressure cooker compatible with gas and induction cooktops.",
    image: "/images/pressure_cooker_1783603530362.jpg"
  },
  {
    name: "Stainless Steel Dinner Set",
    description: "Complete dinner set including plates, bowls, glasses, and spoons for family dining.",
    image: "/images/dinner_set_1783603542763.jpg"
  }
];

const whyChooseUs = [
  "Premium Food-Grade Stainless Steel",
  "Rust Resistant & Corrosion Free",
  "Durable & Long-Lasting",
  "Elegant Mirror Finish",
  "Easy to Clean",
  "Hygienic & Food Safe",
  "Competitive Wholesale Options",
  "Bulk Orders Available",
  "Suitable for Homes, Hotels & Restaurants"
];

const allProductsFlat = [
  "Stainless Steel Lota",
  "Stainless Steel Glass",
  "Stainless Steel Bowl (Katori)",
  "Stainless Steel Plate (Thali)",
  "Stainless Steel Spoon",
  "Stainless Steel Fork",
  "Stainless Steel Knife",
  "Stainless Steel Serving Spoon",
  "Stainless Steel Tea Strainer",
  "Stainless Steel Lemon Squeezer",
  "Stainless Steel Whisk",
  "Stainless Steel Tiffin Box",
  "Lunch Carrier",
  "Food Storage Containers",
  "Airtight Steel Containers",
  "Steel Canisters",
  "Steel Spice Boxes (Masala Dabba)",
  "Steel Water Jug",
  "Steel Water Bottle",
  "Stainless Steel Fry Pan",
  "Stainless Steel Kadhai",
  "Stainless Steel Saucepan",
  "Stainless Steel Pressure Cooker",
  "Stainless Steel Cooking Pot",
  "Stainless Steel Stock Pot",
  "Stainless Steel Milk Pot",
  "Stainless Steel Casserole",
  "Steel Wok",
  "Stainless Steel Tray",
  "Stainless Steel Dinner Set",
  "Serving Bowl",
  "Rice Plate",
  "Compartment Plate",
  "Serving Dish",
  "Snack Plate",
  "Oval Serving Tray",
  "Round Serving Tray",
  "Mixing Bowl",
  "Colander (Strainer)",
  "Rice Strainer",
  "Steel Bucket",
  "Steel Mug",
  "Steel Dustbin",
  "Steel Ice Bucket",
  "Steel Measuring Cups",
  "Steel Measuring Spoons",
  "Steel Sink Basket",
  "Tea Glass",
  "Coffee Mug",
  "Steel Cup",
  "Steel Flask",
  "Steel Kettle",
  "Steel Teapot",
  "Hotel Utensils",
  "Restaurant Kitchenware",
  "Catering Utensils",
  "Bulk Storage Containers",
  "Commercial Cooking Pots",
  "Steel Serving Buckets",
  "Heavy Duty Hotel Pans"
];

const getEstimatedDetails = (qty: number) => {
  let discount = "0%";
  let leadTime = "3-5 Business Days";
  let tierName = "Standard Wholesale";
  let unitDiscountPercent = 0;

  if (qty >= 1000) {
    discount = "25% Direct Factory Discount";
    leadTime = "15-20 Days (Priority Production)";
    tierName = "Platinum Direct Partner";
    unitDiscountPercent = 25;
  } else if (qty >= 500) {
    discount = "20% Off";
    leadTime = "12-15 Days";
    tierName = "Gold Partner";
    unitDiscountPercent = 20;
  } else if (qty >= 250) {
    discount = "15% Off";
    leadTime = "10-12 Days";
    tierName = "Silver Partner";
    unitDiscountPercent = 15;
  } else if (qty >= 100) {
    discount = "10% Off";
    leadTime = "7-10 Days";
    tierName = "Bronze Partner";
    unitDiscountPercent = 10;
  } else if (qty >= 50) {
    discount = "5% Off";
    leadTime = "5-7 Days";
    tierName = "Trial Batch Partner";
    unitDiscountPercent = 5;
  }

  return { discount, leadTime, tierName, unitDiscountPercent };
};

export default function Products() {
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<{name: string, image: string} | null>(null);
  const navigate = useNavigate();

  // Bulk Inquiry Form State
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryProduct, setInquiryProduct] = useState('');
  const [inquiryQty, setInquiryQty] = useState(250);
  const [inquiryGrade, setInquiryGrade] = useState('SS 304 (Premium Food Grade)');
  const [inquiryCustomLogo, setInquiryCustomLogo] = useState(false);
  const [inquiryLocation, setInquiryLocation] = useState('');
  const [inquiryDetails, setInquiryDetails] = useState('');
  
  // Submit feedback
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryRefNo, setInquiryRefNo] = useState('');

  // Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const resetInquiryForm = () => {
    setInquiryName('');
    setInquiryCompany('');
    setInquiryEmail('');
    setInquiryPhone('');
    setInquiryProduct('');
    setInquiryQty(250);
    setInquiryGrade('SS 304 (Premium Food Grade)');
    setInquiryCustomLogo(false);
    setInquiryLocation('');
    setInquiryDetails('');
    setInquirySubmitted(false);
    setInquiryRefNo('');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    setTimeout(() => {
      const uniqueRef = "SD-INQ-" + Math.floor(100000 + Math.random() * 900000);
      setInquiryRefNo(uniqueRef);
      setIsFormSubmitting(false);
      setInquirySubmitted(true);
    }, 1200);
  };

  useEffect(() => {
    document.title = "Stainless Steel Utensils Collection | Sidak Steel Products";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse our range of stainless steel utensils including lota, glasses, tiffin boxes, trays, bowls, fry pans, cookware, plates, and kitchen accessories.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Browse our range of stainless steel utensils including lota, glasses, tiffin boxes, trays, bowls, fry pans, cookware, plates, and kitchen accessories.";
      document.head.appendChild(meta);
    }
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + '/products');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', window.location.origin + '/products');
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
    <div className="py-12 md:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 glass p-10 rounded-3xl max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Our Products</h1>
          <p className="text-lg text-slate-700 mx-auto font-medium leading-relaxed">
            As a leading <span className="text-slate-900 font-bold">kitchen utensils supplier</span>, Sidak Steel offers a wide range of premium stainless steel utensils and kitchenware for homes, restaurants, hotels, and retailers. Our products are made from high-quality food-grade stainless steel, ensuring durability, hygiene, and long-lasting performance.
          </p>
        </div>

        {/* Dynamic Product Catalog Feed */}
        <div className="mb-20">
          <ProductCatalog 
            onInquireClick={(productName, qty) => {
              setInquiryProduct(productName);
              setInquiryQty(qty);
              setIsInquiryModalOpen(true);
            }} 
          />
        </div>

        {/* Bulk Order Inquiry Section */}
        <section id="bulk-inquiry" className="mb-20 scroll-mt-24">
          <div className="text-center mb-12 glass p-10 rounded-3xl max-w-4xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-slate-900 mb-2 block">
              B2B Wholesaler Partnership Hub
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Bulk Order & Wholesale Inquiry
            </h2>
            <p className="text-slate-600 font-semibold text-sm max-w-2xl mx-auto leading-relaxed">
              Are you looking to procure premium <span className="text-slate-900 font-bold">Stainless Steel Kitchenware</span> in bulk?
              Partner with Sidak Steel and get direct-from-factory pricing, certified quality, and dedicated shipment support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Estimates & Perks */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold tracking-tight">Wholesale Pricing Estimator</h3>
              </div>
              
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                Sidak Steel is a primary manufacturer. Adjust the order quantity in the form to dynamically estimate your bulk discounts and lead times.
              </p>

              {/* Dynamic Estimates Output */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/50 space-y-4 mb-8">
                <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                  <span className="text-slate-400 text-xs font-bold uppercase">Target Product</span>
                  <span className="text-white font-bold max-w-[60%] truncate text-right text-xs md:text-sm">
                    {inquiryProduct || "General Inquiry"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                  <span className="text-slate-400 text-xs font-bold uppercase">Quantity (Units)</span>
                  <span className="text-indigo-400 font-black text-lg">
                    {inquiryQty} pcs
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                  <span className="text-slate-400 text-xs font-bold uppercase">Wholesale Tier</span>
                  <span className="text-indigo-300 font-black uppercase text-sm">
                    {getEstimatedDetails(inquiryQty).tierName}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                  <span className="text-slate-400 text-xs font-bold uppercase">Direct Factory Discount</span>
                  <span className="text-emerald-400 font-black text-base">
                    {getEstimatedDetails(inquiryQty).discount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-bold uppercase">Production Lead Time</span>
                  <span className="text-white font-bold">
                    {getEstimatedDetails(inquiryQty).leadTime}
                  </span>
                </div>
              </div>

              {/* Partnership Checklist */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" /> Included Wholesaler Perks
                </h4>
                <ul className="space-y-3.5 text-sm text-slate-300 font-medium">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Certified premium food-grade steel material sheets</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Free custom laser logo engraving on products (≥ 250 units)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Export-grade durable heavy-corrugated box packaging</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dedicated logistics coordination & pan-India bulk shipping dispatch</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Dynamic Inquiry Form / Success Screen */}
            <div className="lg:col-span-7 bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-lg relative min-h-[500px] flex flex-col justify-center">
              {inquirySubmitted ? (
                // SUCCESS STATE
                <div className="text-center p-6 space-y-6">
                  <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <Check className="w-10 h-10 stroke-[3]" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Quotation Request Logged!</h3>
                  <p className="text-slate-700 font-medium leading-relaxed max-w-lg mx-auto">
                    Your wholesale quotation request has been processed successfully. A dedicated wholesale manager from our manufacturer branch will contact you within <span className="font-bold text-slate-900">2-4 business hours</span> with pricing and shipping rates.
                  </p>

                  <div className="bg-slate-900 text-white rounded-2xl p-5 max-w-md mx-auto border border-slate-800 text-left space-y-2.5 shadow-sm text-xs md:text-sm">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Reference Number</span>
                      <span className="font-mono text-indigo-400 font-black">{inquiryRefNo}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Product</span>
                      <span className="font-bold">{inquiryProduct || "Standard Catalog"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Inquiry Volume</span>
                      <span className="font-bold">{inquiryQty} pieces ({getEstimatedDetails(inquiryQty).tierName})</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Steel Grade</span>
                      <span className="font-bold">{inquiryGrade}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Delivery State</span>
                      <span className="font-bold">{inquiryLocation || "Not specified"}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      onClick={resetInquiryForm}
                      className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-md"
                    >
                      Submit Another Quote
                    </button>
                    <button
                      onClick={() => {
                        resetInquiryForm();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-white text-slate-800 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 active:scale-95 transition-all"
                    >
                      Browse Catalog
                    </button>
                  </div>
                </div>
              ) : (
                // FORM STATE
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amit Sharma"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder-slate-400 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sharma Utensils Wholesalers"
                        value={inquiryCompany}
                        onChange={(e) => setInquiryCompany(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder-slate-400 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Phone Number (WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Select Steel Product for Quote <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={inquiryProduct}
                        onChange={(e) => setInquiryProduct(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all font-semibold"
                      >
                        <option value="" disabled>-- Choose Stainless Steel Product --</option>
                        {allProductsFlat.map((prod, idx) => (
                          <option key={idx} value={prod}>{prod}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Delivery State / Region <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maharashtra, IN"
                        value={inquiryLocation}
                        onChange={(e) => setInquiryLocation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Range and count sync */}
                  <div className="space-y-3 bg-slate-50/50 border border-slate-200/30 p-5 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Target Order Quantity <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="10"
                          max="50000"
                          value={inquiryQty}
                          onChange={(e) => setInquiryQty(Math.max(10, parseInt(e.target.value, 10) || 10))}
                          className="w-24 px-2 py-1 bg-white border border-slate-200 rounded-lg text-center font-bold text-slate-800 outline-none focus:ring-1 focus:ring-slate-900 text-sm"
                        />
                        <span className="text-xs font-black text-slate-500 uppercase">pcs</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="2000"
                      step="10"
                      value={inquiryQty > 2000 ? 2000 : inquiryQty}
                      onChange={(e) => setInquiryQty(parseInt(e.target.value, 10))}
                      className="w-full accent-slate-900 h-1.5 rounded-lg cursor-pointer appearance-none bg-slate-200"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase">
                      <span>10 units</span>
                      <span>100 (Bronze)</span>
                      <span>250 (Silver)</span>
                      <span>500 (Gold)</span>
                      <span>1000+ (Platinum)</span>
                    </div>
                  </div>

                  {/* Steel Grade Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Required Steel Grade
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { val: 'SS 304 (Premium Food Grade)', desc: 'Highest corrosion resistance' },
                        { val: 'SS 202 (Standard Commercial Grade)', desc: 'High durability & cost effective' },
                        { val: 'SS 430 (Magnetic/Induction-friendly)', desc: 'Ideal for induction base lines' }
                      ].map((grade, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setInquiryGrade(grade.val)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            inquiryGrade === grade.val
                              ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                              : 'border-slate-200 bg-white hover:bg-white text-slate-800'
                          }`}
                        >
                          <span className="block font-bold text-xs">{grade.val.split(' ')[0]}</span>
                          <span className="block text-[10px] mt-0.5 opacity-80 leading-snug font-medium">
                            {grade.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Branding Embossing Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-50/50 p-3.5 rounded-xl border border-slate-200/30 select-none">
                    <input
                      type="checkbox"
                      checked={inquiryCustomLogo}
                      onChange={(e) => setInquiryCustomLogo(e.target.checked)}
                      className="w-4.5 h-4.5 rounded text-slate-900 focus:ring-slate-900 accent-slate-900 cursor-pointer"
                    />
                    <div>
                      <span className="block font-bold text-xs text-slate-800 uppercase tracking-wider">
                        I require custom branding / logo engraving
                      </span>
                      <span className="block text-[10px] text-slate-500 font-semibold">
                        Sidak Steel offers laser logo printing & brand embossing directly on the kitchenware.
                      </span>
                    </div>
                  </label>

                  {/* Special requirements */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Special Specifications or Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Customized inner box packaging, specific thickness gauge requirements, container dispatch schedule, etc."
                      value={inquiryDetails}
                      onChange={(e) => setInquiryDetails(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder-slate-400 font-semibold resize-none text-sm leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider"
                  >
                    {isFormSubmitting ? (
                      <>
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Processing Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Bulk Quotation Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2 text-center">Why Choose Sidak Steel?</h2>
          <p className="text-center text-slate-500 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-8">
            Your Trusted and Certified <span className="text-slate-700 font-bold">steel utensils dealer</span> across India
          </p>
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl hover:bg-white/60 hover:scale-105 transition-all cursor-default shadow-sm hover:shadow-md">
                  <ShieldCheck className="w-8 h-8 text-slate-900 shrink-0" />
                  <span className="font-bold text-slate-800">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="glass rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Looking for quality stainless steel utensils?</h2>
          <p className="text-lg text-slate-700 font-medium mb-8 max-w-2xl mx-auto">
            Explore our wide collection of stainless steel products and find the perfect kitchen essentials for your home or business.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all text-lg shadow-xl"
          >
            View Products
          </button>
        </div>

      </div>

      {/* Item Modal */}
      {selectedCategoryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-slate-50 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setSelectedCategoryItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-slate-800 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-full aspect-video bg-white flex items-center justify-center">
              <img src={selectedCategoryItem.image} alt={selectedCategoryItem.name} className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedCategoryItem.name}</h3>
              <p className="text-slate-600 mb-6 font-medium">Available in high quality premium stainless steel. Contact us for bulk orders or detailed specifications.</p>
              <button 
                onClick={() => {
                  const name = selectedCategoryItem.name;
                  setSelectedCategoryItem(null);
                  setInquiryProduct(name);
                  setInquiryQty(100);
                  setIsInquiryModalOpen(true);
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all active:scale-95 shadow-sm"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Order Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-50 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative my-8 border border-slate-100">
            {/* Close button */}
            <button
              onClick={() => {
                setIsInquiryModalOpen(false);
                setInquirySubmitted(false);
              }}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm text-slate-800 hover:scale-105 active:scale-95 transition-all"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-slate-900" />
                <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">Wholesale Quote Request</h3>
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">
                Direct Manufacturer Inquiry • Sidak Steel India
              </p>

              {inquirySubmitted ? (
                // SUCCESS STATE IN MODAL
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Inquiry Received</h4>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed max-w-md mx-auto">
                    We have successfully logged your wholesale inquiry. A company representative will contact you on your registered phone/email within <span className="text-slate-900 font-bold">2-4 hours</span>.
                  </p>

                  <div className="bg-slate-900 text-white rounded-2xl p-4 text-left space-y-2 text-xs max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reference:</span>
                      <span className="font-mono text-white font-bold text-xs">{inquiryRefNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Product:</span>
                      <span className="font-bold text-white text-xs">{inquiryProduct}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volume:</span>
                      <span className="font-bold text-white text-xs">{inquiryQty} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Discount Tier:</span>
                      <span className="font-bold text-indigo-300 uppercase text-xs">{getEstimatedDetails(inquiryQty).tierName}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsInquiryModalOpen(false);
                      resetInquiryForm();
                    }}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                // FORM STATE IN MODAL
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Target Product <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={inquiryProduct}
                      onChange={(e) => setInquiryProduct(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-1 focus:ring-slate-950 outline-none text-sm font-semibold text-slate-900"
                    >
                      <option value="" disabled>-- Select Product --</option>
                      {allProductsFlat.map((prod, idx) => (
                        <option key={idx} value={prod}>{prod}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amit Sharma"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-1 focus:ring-slate-950 outline-none text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sharma Traders"
                        value={inquiryCompany}
                        onChange={(e) => setInquiryCompany(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-1 focus:ring-slate-950 outline-none text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-1 focus:ring-slate-950 outline-none text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-1 focus:ring-slate-950 outline-none text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider">
                          Quantity <span className="text-red-500">*</span>
                        </label>
                        <span className="text-xs font-bold text-slate-900">{inquiryQty} pcs</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="2000"
                        step="10"
                        value={inquiryQty > 2000 ? 2000 : inquiryQty}
                        onChange={(e) => setInquiryQty(parseInt(e.target.value, 10))}
                        className="w-full accent-slate-900 h-1 rounded-lg cursor-pointer appearance-none bg-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Delivery State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maharashtra"
                        value={inquiryLocation}
                        onChange={(e) => setInquiryLocation(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-1 focus:ring-slate-950 outline-none text-sm font-semibold"
                      />
                    </div>
                  </div>

                  {/* Pricing tier preview line */}
                  <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200/50 flex justify-between text-[11px] font-bold text-slate-700">
                    <span>Discount Tier: <span className="text-slate-950">{getEstimatedDetails(inquiryQty).tierName} ({getEstimatedDetails(inquiryQty).discount})</span></span>
                    <span>Lead Time: <span className="text-slate-950">{getEstimatedDetails(inquiryQty).leadTime}</span></span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Special Specifications
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Custom logo engraving requested, packaging specifications..."
                      value={inquiryDetails}
                      onChange={(e) => setInquiryDetails(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 focus:ring-1 focus:ring-slate-950 outline-none text-xs font-semibold resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsInquiryModalOpen(false);
                        resetInquiryForm();
                      }}
                      className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold rounded-xl text-sm transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isFormSubmitting}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-sm transition-all flex items-center gap-2"
                    >
                      {isFormSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Submit Quote</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Scroll To Top Indicator Button */}
      <ScrollToTopButton />
    </div>
  );
}
