import { useState, useEffect } from 'react';

const backgrounds = [
  "radial-gradient(circle at 0% 0%, #cbd5e1 0%, transparent 50%), radial-gradient(circle at 100% 100%, #94a3b8 0%, transparent 50%), radial-gradient(circle at 50% 50%, #f1f5f9 0%, #e2e8f0 100%)",
  "radial-gradient(circle at 100% 0%, #e2e8f0 0%, transparent 50%), radial-gradient(circle at 0% 100%, #cbd5e1 0%, transparent 50%), radial-gradient(circle at 50% 50%, #f8fafc 0%, #94a3b8 100%)",
  "radial-gradient(circle at 50% 0%, #f1f5f9 0%, transparent 50%), radial-gradient(circle at 50% 100%, #cbd5e1 0%, transparent 50%), radial-gradient(circle at 0% 50%, #e2e8f0 0%, #64748b 100%)",
  "radial-gradient(circle at 0% 100%, #f1f5f9 0%, transparent 50%), radial-gradient(circle at 100% 0%, #cbd5e1 0%, transparent 50%), radial-gradient(circle at 50% 50%, #e2e8f0 0%, #94a3b8 100%)"
];

export default function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-slate-200">
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: bg }}
        />
      ))}
    </div>
  );
}
