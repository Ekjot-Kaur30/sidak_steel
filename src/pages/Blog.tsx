import { useState, useEffect, ReactNode } from 'react';

interface BlogPost {
  title: string;
  content: ReactNode;
  moreContent: ReactNode;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Top 7 Benefits of Using Stainless Steel Utensils',
    content: (
      <span>
        Choosing <span className="text-slate-900 font-bold">durable kitchen utensils</span> is a key step towards an eco-friendly and robust culinary space. Stainless steel utensils are resilient, rust-resistant, hygienic, and long-lasting, making them a smart investment for every household.
      </span>
    ),
    moreContent: 'Unlike other materials, high-quality stainless steel does not chip, bend, or crack easily. It is highly resistant to scratching, which means fewer crevices where bacteria could potentially hide. Stainless steel is also non-reactive with acidic foods, ensuring that your meals taste exactly as they should without any metallic tang. Over time, the durability of stainless steel utensils results in significant cost savings, as you will rarely need to replace them. Furthermore, the modern and sleek appearance of mirror-polished steel fits seamlessly into both traditional and contemporary kitchen designs.',
    date: 'August 14, 2017'
  },
  {
    title: 'How to Keep Stainless Steel Utensils Shiny',
    content: (
      <span>
        Proper <span className="text-slate-900 font-bold">Steel utensils maintenance</span> ensures that your cookware remains immaculate and lasts a lifetime. Clean utensils with mild soap, avoid harsh chemicals, dry them immediately after washing, and polish occasionally with vinegar or baking soda to maintain their shine.
      </span>
    ),
    moreContent: 'Water spots can be a common issue with stainless steel if left to air dry. To prevent this, always use a soft, dry microfiber cloth immediately after washing. For tougher stains or burnt-on food, avoid abrasive scrubbers like steel wool, which can cause permanent micro-scratches. Instead, create a paste using baking soda and warm water, let it sit on the stain for 10-15 minutes, and then wipe it away gently. An occasional wipe-down with white vinegar can also help restore the original luster and remove any lingering cloudiness, keeping your cookware looking brand new for decades.',
    date: 'October 2, 2019'
  },
  {
    title: 'Why Stainless Steel is Better Than Plastic Kitchenware',
    content: 'Unlike plastic, stainless steel does not absorb odors or stains, is safer for food storage, more durable, recyclable, and resistant to bacteria.',
    moreContent: 'Plastic containers have been found to degrade over time, especially when exposed to heat in microwaves or dishwashers. This degradation can lead to harmful chemicals leaching into your food. Stainless steel completely eliminates this risk, offering a 100% food-safe environment. Additionally, plastic often retains the smells and colors of highly pigmented or pungent foods like curries and tomato sauces. Stainless steel remains entirely impervious to these elements. When it eventually reaches the end of its exceptionally long life cycle, stainless steel is fully recyclable without degradation in quality, making it the most environmentally responsible choice for your home.',
    date: 'January 18, 2021'
  },
  {
    title: 'Essential Kitchen Utensils Every Home Should Own',
    content: (
      <span>
        Our ultimate <span className="text-slate-900 font-bold">kitchen utensils buying guide</span> lists everything from quality cookware and serving trays to storage containers, mixing bowls, pressure cookers, and water bottles for efficient cooking and organization.
      </span>
    ),
    moreContent: 'A well-equipped kitchen forms the foundation of great cooking. Starting with high-quality stainless steel mixing bowls ensures you have the right tools for preparation without worrying about them breaking if dropped. Airtight steel storage canisters are essential for keeping spices, grains, and legumes fresh while protecting them from pests. A reliable, heavy-bottomed stainless steel pressure cooker is perhaps the most important investment, drastically reducing cooking times while preserving nutrients. Finally, elegant stainless steel dinner sets and serving trays elevate the dining experience, moving seamlessly from the kitchen counter to the dining table.',
    date: 'May 5, 2023'
  }
];

export default function Blog() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Sidak Steel Blog | Kitchen Tips & Stainless Steel Guides";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read expert tips on stainless steel utensils, kitchen maintenance, cookware care, food storage, and buying guides from Sidak Steel.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Read expert tips on stainless steel utensils, kitchen maintenance, cookware care, food storage, and buying guides from Sidak Steel.";
      document.head.appendChild(meta);
    }
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + '/blog');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', window.location.origin + '/blog');
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

  const togglePost = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 glass p-10 rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-slate-700 font-medium">
            Insights, tips, and guides for maintaining and choosing the best kitchenware.
          </p>
        </div>

        <div className="space-y-12">
          {blogPosts.map((post, index) => (
            <article key={index} className="glass rounded-3xl p-8 hover:bg-white/50 transition-colors shadow-sm">
              <div className="text-sm text-slate-500 font-bold tracking-wider uppercase mb-3">{post.date}</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{post.title}</h2>
              <div className="text-slate-700 font-medium leading-relaxed text-lg">
                <p>{post.content}</p>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p>{post.moreContent}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => togglePost(index)}
                className="mt-6 font-bold text-slate-900 hover:text-slate-700 hover:scale-105 active:scale-95 transition-all self-start"
              >
                {expandedIndex === index ? 'Show less ←' : 'Read full article →'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
