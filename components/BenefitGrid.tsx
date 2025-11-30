import React from 'react';
import { Card } from './Card';
import { 
  Code2, 
  FileJson, 
  LayoutList, 
  Type, 
  Image as ImageIcon, 
  FileText, 
  Bot, 
  CheckCircle2,
  Search
} from 'lucide-react';

export const BenefitGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
          Speaking "Machine" Fluently
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          AI agents don't see your website like humans do. AgentReady ensures your content is structured for maximum machine comprehension.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Large Feature 1: Semantic HTML */}
        <Card className="md:col-span-2 lg:col-span-2 row-span-2 flex flex-col justify-between bg-white/95">
          <div>
            <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center mb-6 text-brand-900">
              <Code2 size={24} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Semantic Architecture</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We analyze your DOM to ensure you're using proper HTML5 tags. &lt;article&gt;, &lt;nav&gt;, and &lt;section&gt; aren't just for developers—they tell agents exactly what role each piece of content plays.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 font-mono text-sm text-gray-500">
             &lt;main&gt;<br/>
             &nbsp;&nbsp;&lt;article&gt;<br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Agent Ready&lt;/h1&gt;<br/>
             &nbsp;&nbsp;&lt;/article&gt;<br/>
             &lt;/main&gt;
          </div>
        </Card>

        {/* Feature 2: Schema */}
        <Card className="md:col-span-1 lg:col-span-1 bg-white/90">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
            <FileJson size={20} />
          </div>
          <h3 className="text-lg font-bold mb-2">Schema.org Rich Data</h3>
          <p className="text-sm text-gray-600">
            Implement structured data to provide explicit context. Make your products, FAQs, and articles unambiguous to crawlers.
          </p>
        </Card>

        {/* Feature 3: Clear Headings */}
        <Card className="md:col-span-1 lg:col-span-1 bg-white/90">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-orange-600">
            <Type size={20} />
          </div>
          <h3 className="text-lg font-bold mb-2">Hierarchical Clarity</h3>
          <p className="text-sm text-gray-600">
            Logical H1-H6 structures guide AI through your content's narrative without confusion.
          </p>
        </Card>

         {/* Wide Feature: Accessibility */}
         <Card className="md:col-span-2 lg:col-span-2 flex flex-row items-center gap-6">
          <div className="flex-1">
             <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-700">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-xl font-bold mb-2">Accessibility = Readability</h3>
            <p className="text-gray-600">
              Adhering to WCAG standards often results in a more structured, machine-readable website.
            </p>
          </div>
          <div className="hidden sm:flex h-32 w-32 bg-green-50 rounded-full items-center justify-center shrink-0">
             <span className="text-3xl font-bold text-green-700">100%</span>
          </div>
        </Card>

        {/* Feature 4: Images */}
        <Card className="md:col-span-1 bg-white/90">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-600">
            <ImageIcon size={20} />
          </div>
          <h3 className="text-lg font-bold mb-2">Visual Context</h3>
          <p className="text-sm text-gray-600">
            Descriptive Alt Text ensures visual elements aren't invisible to text-based agents.
          </p>
        </Card>

         {/* Feature 5: Robots/LLMs */}
         <Card className="md:col-span-1 bg-white/90">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4 text-gray-600">
            <Bot size={20} />
          </div>
          <h3 className="text-lg font-bold mb-2">llms.txt Standard</h3>
          <p className="text-sm text-gray-600">
            Validate your `llms.txt` to give explicit instructions to Large Language Models.
          </p>
        </Card>

      </div>
    </section>
  );
};