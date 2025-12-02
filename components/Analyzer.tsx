import React, { useState } from 'react';
import { Card } from './Card';
import { analyzeUrl } from '../utils/analysis';
import { AnalysisReport, Finding } from '../types';
import {
  Search,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Layout,
  FileJson,
  Bot,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const Analyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const data = await analyzeUrl(url);
      setReport(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass': return <CheckCircle2 className="text-green-500" size={18} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={18} />;
      case 'fail': return <XCircle className="text-red-500" size={18} />;
    }
  };

  const getStatusColor = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass': return 'bg-green-50 border-green-100 text-green-700';
      case 'warning': return 'bg-yellow-50 border-yellow-100 text-yellow-700';
      case 'fail': return 'bg-red-50 border-red-100 text-red-700';
    }
  };

  return (
    <section id="analyzer" className="py-20 px-4 relative overflow-hidden">
      {/* Search Input Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter your domain (e.g. agentready.io)"
              className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-transparent focus:ring-0 text-lg placeholder-gray-400 text-gray-900"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze(e)}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="h-14 px-8 bg-brand-400 hover:bg-brand-300 text-brand-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Analyze my Website FREE'}
          </button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg inline-flex items-center gap-2 text-sm font-medium animate-fade-in-up">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}
      </div>

      {/* Report Results */}
      {report && (
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          {/* Browser Window Frame */}
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            {/* Browser Toolbar */}
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center gap-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <div className="flex-1 max-w-2xl bg-white h-9 rounded-lg border border-gray-200 flex items-center px-4 text-sm text-gray-400 font-mono shadow-sm truncate">
                {report.url}
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-400">
                <span>Last scan: just now</span>
              </div>
            </div>

            {/* Dashboard Area */}
            <div className="p-6 md:p-8 lg:p-10 bg-[#FAFAFA]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Sidebar: Score & Navigation */}
                <div className="lg:col-span-4 space-y-6">
                  <Card className="!p-8 flex flex-col items-center text-center bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-300 to-brand-500"></div>
                    <h3 className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-6">Agent Digestibility Score</h3>
                    <div className="relative mb-6 w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke={report.score > 80 ? "#A3CC14" : report.score > 50 ? "#eab308" : "#ef4444"}
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="440"
                          strokeDashoffset={440 - (440 * report.score) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-5xl font-display font-bold text-gray-900">{report.score}</span>
                        <span className="block text-xs font-bold text-gray-400 mt-1">/ 100</span>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${report.score > 80 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      {report.score > 80 ? <><CheckCircle2 size={14} /> Agent Optimized</> : <><AlertTriangle size={14} /> Needs Improvement</>}
                    </div>
                  </Card>

                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                      <h4 className="font-bold text-gray-900 text-sm">Breakdown</h4>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {[
                        { icon: <Layout size={18} />, label: 'Structure', score: report.structureScore, color: 'text-green-500' },
                        { icon: <FileJson size={18} />, label: 'Metadata', score: report.metadataScore, color: 'text-brand-500' },
                        { icon: <Bot size={18} />, label: 'LLM Directives', score: report.llmScore, color: 'text-blue-500' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-default group">
                          <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-900">
                            {item.icon}
                            <span className="font-medium text-sm">{item.label}</span>
                          </div>
                          <span className={`font-bold font-mono text-sm ${item.score > 80 ? 'text-green-600' : item.score > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {item.score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content: Findings */}
                <div className="lg:col-span-8 space-y-6">

                  {/* Summary Card */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2">Executive Summary</h3>
                    <p className="text-gray-600 leading-relaxed">{report.summary}</p>
                  </div>

                  {/* Detailed Findings */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 px-2">Detailed Findings</h3>
                    {report.findings.map((finding, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => setExpandedFinding(expandedFinding === idx ? null : idx)}
                          className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            {getStatusIcon(finding.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-gray-900 text-sm">{finding.category}</span>
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getStatusColor(finding.status)}`}>
                                {finding.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-1">{finding.message}</p>
                          </div>
                          <div className="text-gray-400">
                            {expandedFinding === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </div>
                        </button>

                        {expandedFinding === idx && (
                          <div className="px-14 pb-4 pr-4">
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed">
                              {finding.details}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}

                    {report.findings.length === 0 && (
                      <div className="text-center py-10 text-gray-400">
                        <p>No specific findings to report.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
