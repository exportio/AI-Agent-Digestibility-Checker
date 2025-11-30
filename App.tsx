
import React from 'react';
import { Hero } from './components/Hero';
import { BenefitGrid } from './components/BenefitGrid';
import { Waitlist } from './components/Waitlist';
import { ReportPreview } from './components/ReportPreview';
import { Layout } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-900 selection:bg-brand-200">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 bg-[#E2EF99]/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center">
              <Layout size={18} />
            </div>
            AgentReady
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <a href="#features" className="hover:text-gray-900 transition-colors">How it works</a>
            <a href="#demo" className="hover:text-gray-900 transition-colors">Demo</a>
            <a href="#join" className="px-5 py-2.5 bg-white text-gray-900 rounded-full shadow-sm hover:shadow-md transition-all font-semibold">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <Hero />
        
        {/* Features / Benefits */}
        <div id="features" className="bg-white/50 backdrop-blur-sm rounded-t-[3rem] -mt-10 pt-10 border-t border-white/40">
           <BenefitGrid />
        </div>

        {/* Report Preview / Demo */}
        <ReportPreview />

        {/* Waitlist Section */}
        <div className="bg-white">
          <Waitlist />
        </div>

      </main>

      <footer className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} AgentReady. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
