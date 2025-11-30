import React, { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Card } from './Card';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setName('');
    }, 1500);
  };

  return (
    <section className="py-24 px-4" id="join">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-brand-900 text-white overflow-hidden relative !p-0 !rounded-4xl">
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500 rounded-full opacity-20 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-300 rounded-full opacity-10 blur-3xl"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-brand-200 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                Early Access
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                Get your Agent Score.
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Join the waitlist today to be the first to audit your website's AI readiness. We are rolling out access in batches.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/${i * 123}/100/100`} 
                      alt="User" 
                      className="w-8 h-8 rounded-full border-2 border-brand-900"
                    />
                  ))}
                </div>
                <span>Joined by 2,000+ developers</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              {status === 'success' ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                    <Check className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                  <p className="text-gray-300">We'll notify you as soon as AgentReady is live.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm text-brand-300 hover:text-white transition-colors underline"
                  >
                    Add another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white/20 transition-all"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white/20 transition-all"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 px-6 bg-brand-400 hover:bg-brand-300 text-brand-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group mt-4"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <>
                        Join Waiting List
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-4">
                    We respect your inbox. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};