
import React from 'react';
import { Card } from './Card';
import { 
  CheckCircle2, 
  Code2, 
  FileJson, 
  Layout, 
  Zap,
  Bot
} from 'lucide-react';

export const ReportPreview: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden" id="demo">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-100 rounded-full opacity-30 blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gray-100 rounded-full opacity-50 blur-3xl translate-x-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            See what the agents see.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our comprehensive report visualizes how AI crawlers interpret your content, highlighting gaps in semantic structure and data definitions.
          </p>
        </div>

        {/* Browser Window Frame */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Browser Toolbar */}
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center gap-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
            <div className="flex-1 max-w-2xl bg-white h-9 rounded-lg border border-gray-200 flex items-center px-4 text-sm text-gray-400 font-mono shadow-sm">
              <span className="text-gray-300 mr-2">https://</span>agentready.io/report/example.com
            </div>
            <div className="hidden sm:flex gap-4">
              <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Dashboard Area */}
          <div className="p-6 md:p-8 lg:p-10 bg-[#FAFAFA]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sidebar: Score & Navigation */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="!p-8 flex flex-col items-center text-center bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-300 to-brand-500"></div>
                   <h3 className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-6">Readability Score</h3>
                   <div className="relative mb-6">
                     <svg className="w-40 h-40 transform -rotate-90">
                       <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                       <circle cx="80" cy="80" r="70" stroke="#A3CC14" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="44" strokeLinecap="round" />
                     </svg>
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                       <span className="text-5xl font-display font-bold text-gray-900">92</span>
                       <span className="block text-xs font-bold text-gray-400 mt-1">/ 100</span>
                     </div>
                   </div>
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                     <CheckCircle2 size={14} /> AI Optimized
                   </div>
                </Card>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <h4 className="font-bold text-gray-900 text-sm">Breakdown</h4>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { icon: <Layout size={18} />, label: 'Structure', score: 98, color: 'text-green-500' },
                      { icon: <FileJson size={18} />, label: 'Metadata', score: 85, color: 'text-brand-500' },
                      { icon: <Bot size={18} />, label: 'LLM Directives', score: 100, color: 'text-green-500' },
                      { icon: <Zap size={18} />, label: 'Token Efficiency', score: 72, color: 'text-yellow-500' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-900">
                          {item.icon}
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <span className={`font-bold font-mono text-sm ${item.color}`}>{item.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content: Tabs/Details */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Section 1: Semantic Analysis */}
                <Card className="!p-0 border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                        <Code2 size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Semantic Structure</h3>
                        <p className="text-xs text-gray-500">DOM Analysis</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">Passed</span>
                  </div>
                  
                  <div className="p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Visualization */}
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Document Outline</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-mono">&lt;main&gt;</span>
                            <div className="h-px bg-gray-200 flex-1"></div>
                          </div>
                          <div className="pl-6 space-y-3 border-l-2 border-gray-100 ml-3">
                             <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono">&lt;h1&gt;</span>
                              <span className="text-xs text-gray-500 truncate">Understanding AI Agents</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-mono">&lt;article&gt;</span>
                              <div className="h-px bg-gray-200 flex-1"></div>
                              <CheckCircle2 size={14} className="text-green-500" />
                            </div>
                            <div className="pl-6 border-l-2 border-gray-100 ml-3">
                               <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono">&lt;h2&gt;</span>
                                <span className="text-xs text-gray-500 truncate">Key Benefits</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right: Insights */}
                      <div className="space-y-3">
                         <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex gap-3">
                           <div className="mt-0.5"><CheckCircle2 size={16} className="text-green-500" /></div>
                           <div>
                             <p className="text-sm font-bold text-gray-900">Proper Hierarchy</p>
                             <p className="text-xs text-gray-500 mt-1">Headings follow a logical H1-H3 progression, allowing agents to map context correctly.</p>
                           </div>
                         </div>
                         <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex gap-3">
                           <div className="mt-0.5"><CheckCircle2 size={16} className="text-green-500" /></div>
                           <div>
                             <p className="text-sm font-bold text-gray-900">Landmark Roles</p>
                             <p className="text-xs text-gray-500 mt-1">Main, Nav, and Footer regions are explicitly defined.</p>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Section 2: Schema */}
                <Card className="!p-0 border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileJson size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Schema Markup</h3>
                        <p className="text-xs text-gray-500">Structured Data</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full border border-yellow-100">Warning</span>
                  </div>
                  
                  <div className="p-6 bg-white">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-mono text-sm font-medium text-gray-700">Organization</span>
                        </div>
                        <span className="text-xs text-gray-400">Valid</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-mono text-sm font-medium text-gray-700">WebPage</span>
                        </div>
                        <span className="text-xs text-gray-400">Valid</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="font-mono text-sm font-medium text-red-900">Product</span>
                        </div>
                        <span className="text-xs font-bold text-red-600">Missing Price Property</span>
                      </div>
                    </div>
                  </div>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
