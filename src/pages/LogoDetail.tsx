import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Shield, Award, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LogoDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sidak Steel | Royal Emblem Presentation";
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
      {/* Return Button */}
      <div className="w-full mb-10 flex justify-start">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-900 hover:text-white text-slate-800 font-bold rounded-xl transition-all shadow-sm active:scale-95 border border-slate-200/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Logo Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="glass rounded-[40px] p-10 md:p-16 w-full flex flex-col items-center text-center shadow-xl border border-white/40 backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-900/5 rounded-full blur-3xl -z-10" />

        {/* Circular Logo Stage */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
          className="relative mb-10 p-2 bg-gradient-to-tr from-slate-200/50 via-white to-slate-100 rounded-full shadow-2xl border-4 border-slate-900/10 group hover:scale-105 transition-transform duration-500 cursor-pointer"
        >
          {/* Circular Frame Container */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-inner border-4 border-white relative">
            <img
              src="/images/royal_steel_logo_1783663320363.jpg"
              alt="Sidak Steel Royal Emblem"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none rounded-full" />
          </div>

          {/* Luxury Floating Badge */}
          <div className="absolute -bottom-3 right-10 bg-slate-950 text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase border-2 border-slate-100 shadow-md">
            Premium Seal
          </div>
        </motion.div>

        {/* Royal Crest Typography */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-500 mb-3 bg-white/40 px-3.5 py-1.5 rounded-full border border-slate-200/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-slate-800" />
            <span>Official Identity Emblem</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Sidak Steel Crest
          </h1>
          
          <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base mb-8">
            Our brand mark represents pristine craftsmanship, endurance, and safety. 
            Blending premium food-grade kitchenware curves with the royal calligraphic <span className="font-bold text-slate-950">"SS"</span> monogram, 
            it is a testament to quality that lasts for generations.
          </p>
        </div>

        {/* Quality Values Row */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md pt-8 border-t border-slate-200/40">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center mb-2 border border-white">
              <Shield className="w-5 h-5 text-slate-800" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">100% Food-Safe</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center mb-2 border border-white">
              <Award className="w-5 h-5 text-slate-800" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">High Grade</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center mb-2 border border-white">
              <Calendar className="w-5 h-5 text-slate-800" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Since 2017</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
