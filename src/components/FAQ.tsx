import { useState, ReactNode } from 'react';
import { ChevronDown, ShieldCheck, Truck, Percent, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: ReactNode;
  items: FAQItem[];
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const categories: FAQCategory[] = [
    {
      title: 'Product Care & Quality',
      icon: <Sparkles className="w-5 h-5 text-slate-700" />,
      items: [
        {
          question: 'How do I maintain the shine of my Sidak Steel utensils?',
          answer: 'To keep your utensils looking brand new, wash them with warm soapy water and dry immediately with a soft microfiber cloth to prevent water spots. For tough stains or burnt residue, apply a paste of baking soda and vinegar, let it sit for 10 minutes, and gently wipe off. Avoid steel wool or harsh chemicals, which can scratch the mirror finish.'
        },
        {
          question: 'Are Sidak Steel products 100% food-grade and safe?',
          answer: 'Absolutely. We use premium, high-grade, non-magnetic stainless steel that is completely non-reactive with acidic foods and meets international food safety standards. It does not leach chemicals, metallic taste, or toxins into your food, making it the healthiest choice for your family.'
        },
        {
          question: 'Are your utensils dishwasher safe?',
          answer: 'Yes, all our stainless steel products are dishwasher safe. However, we recommend washing them by hand with mild dishwashing soap occasionally to preserve the exquisite premium mirror-polish shine for decades.'
        }
      ]
    },
    {
      title: 'Bulk & Wholesale Orders',
      icon: <Percent className="w-5 h-5 text-slate-700" />,
      items: [
        {
          question: 'Do you offer special pricing for bulk or wholesale orders?',
          answer: 'Yes, we are major manufacturers and distributors of stainless steel kitchenware. We offer highly competitive, direct-from-factory pricing for wholesale orders, hotels, restaurants, retail shops, and corporate gifting. Please reach out to us via our contact form or call us directly at +91 9354761065 for a custom quote.'
        },
        {
          question: 'What is the minimum order quantity (MOQ) for bulk purchases?',
          answer: 'The minimum order quantity for wholesale pricing typically starts from 50 to 100 units per item, depending on the product category. We also offer custom branding or logo engraving for bulk orders exceeding 500 units.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: <Truck className="w-5 h-5 text-slate-700" />,
      items: [
        {
          question: 'What are your delivery timelines and shipping charges?',
          answer: 'We provide shipping across India. Standard retail orders are processed within 24-48 hours and delivered within 3-7 business days. For bulk commercial orders, shipping rates and timelines are calculated based on the cargo volume and destination. We partner with India’s leading cargo networks to ensure safe and affordable delivery.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we support export shipping for international bulk orders. For international inquiries, please contact our export desk at ekjotkaur570@gmail.com with your detailed product requirements and destination port.'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const targetKey = `${categoryIndex}-${itemIndex}`;
    setOpenIndex(openIndex === targetKey ? null : targetKey);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-20" id="faq-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-slate-700 font-medium">
          Have questions about care, wholesale orders, or shipping? Find your answers here.
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category, catIdx) => (
          <div key={catIdx} className="glass p-6 md:p-8 rounded-3xl shadow-sm border border-white/20 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200/50 pb-3">
              {category.icon}
              <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
            </div>

            <div className="space-y-4">
              {category.items.map((item, itemIdx) => {
                const itemKey = `${catIdx}-${itemIdx}`;
                const isOpen = openIndex === itemKey;

                return (
                  <div
                    key={itemIdx}
                    className="border border-slate-200/30 rounded-2xl bg-white/30 hover:bg-white/50 transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(catIdx, itemIdx)}
                      className="w-full flex items-center justify-between text-left px-5 py-4 font-bold text-slate-800 hover:text-slate-900 outline-none"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-slate-900' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-80 border-t border-slate-200/20' : 'max-h-0'
                      } overflow-hidden`}
                    >
                      <p className="px-5 py-4 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
