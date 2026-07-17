/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundSlideshow from './components/BackgroundSlideshow';

// Lazy load page components to split the bundle and reduce unused JavaScript
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const LogoDetail = lazy(() => import('./pages/LogoDetail'));
const Orders = lazy(() => import('./pages/Orders'));

// Loading spinner fallback for Suspense
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center" id="page-loading-spinner">
      <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">Loading amazing steelware...</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 selection:bg-slate-200">
        <BackgroundSlideshow />
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/logo" element={<LogoDetail />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
