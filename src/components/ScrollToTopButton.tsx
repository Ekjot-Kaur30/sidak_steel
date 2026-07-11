import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let totalHeight = 0;

    const updateHeight = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      totalHeight = docHeight - viewHeight;
    };

    // Initialize height
    updateHeight();

    // Use ResizeObserver to update height when content size changes without forcing synchronous layout
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      // Calculate progress percentage using precalculated height
      if (totalHeight > 0) {
        setScrollProgress(Math.min(Math.max(scrolled / totalHeight, 0), 1));
      } else {
        setScrollProgress(0);
      }

      // Show button if scrolled more than 300px
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check for position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeight, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-btn"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          title="Scroll to top"
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-slate-900 text-white rounded-full shadow-2xl border border-slate-800 hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        >
          {/* Circular Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <path
              className="text-slate-800"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-white"
              strokeWidth="2.5"
              strokeDasharray={`${scrollProgress * 100}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </svg>

          {/* Icon with subtle bounce effect on parent hover */}
          <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
