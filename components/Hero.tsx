import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { Bot, Search, FileText, Check, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [scanStep, setScanStep] = useState(0);

  // Mock scanning animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setScanStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Parsing Semantic Structure...', icon: <FileText size={16} />, status: 'done' },
    { label: 'Verifying Schema Markup...', icon: <Search size={16} />, status: 'active' },
    { label: 'Checking llms.txt...', icon: <Bot size={16} />, status: 'pending' },
  ];

  return (
    <div className="relative pt-32 pb-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600">Free Live Analyzer</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 leading-[1.1] tracking-tight mb-8">
            Is your website <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">
              agent ready?
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            AI agents are the new power users. 
            <strong> AgentReady</strong> scans your site's structure to verify if LLMs can read, understand, and reference your content accurately.
          </p>

        </div>

        {/* Visual Content - Mock Interface */}
        <div className="relative hidden lg:block">
            {/* Background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full opacity-40 blur-3xl -z-10"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-6 p-4">
              
              {/* Main Score Card */}
              <Card className="col-span-2 shadow-xl !rounded-[2.5rem] transform hover:-translate-y-1 transition-transform duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Agent Digestibility Score</p>
                    <h3 className="text-3xl font-bold text-gray-900">High Reliability</h3>
                  </div>
                  <div className="w-16 h-16 rounded-full border-[6px] border-brand-200 flex items-center justify-center text-xl font-bold text-gray-900">
                    92
                  </div>
                </div>

                {/* Mock List of checks */}
                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-500 ${
                      scanStep === idx 
                        ? 'bg-brand-50 border border-brand-200 scale-105 shadow-sm' 
                        : 'bg-gray-50 border-transparent'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${scanStep === idx ? 'bg-white text-brand-600' : 'bg-gray-200 text-gray-500'}`}>
                          {step.icon}
                        </div>
                        <span className={`text-sm font-medium ${scanStep === idx ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.label}
                        </span>
                      </div>
                      {scanStep > idx ? (
                        <Check size={18} className="text-green-500" />
                      ) : scanStep === idx ? (
                        <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Floating Small Card 1 */}
              <Card className="absolute -right-8 -top-12 w-48 !p-4 shadow-lg animate-float-slow opacity-90">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Bot size={16} />
                    </div>
                    <span className="text-xs font-bold text-gray-500">Gemini 2.5</span>
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                    <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
                </div>
              </Card>

               {/* Floating Small Card 2 */}
               <Card className="absolute -left-12 bottom-20 w-56 !p-4 shadow-lg animate-float-delayed opacity-90">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500">Metadata</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Valid</span>
                </div>
                <div className="font-mono text-[10px] text-gray-400 leading-relaxed bg-gray-50 p-2 rounded-lg">
                    "description": "A tool that..."<br/>
                    "author": "AgentReady"
                </div>
              </Card>

            </div>
        </div>
      </div>
    </div>
  );
};
