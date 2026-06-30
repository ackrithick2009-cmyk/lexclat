import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Scale, BookOpen, FileText, BrainCircuit, BarChart, Menu, ArrowLeft, X } from 'lucide-react';

// @ts-ignore
const wikiFiles = import.meta.glob('../../wiki/**/*.md', { query: '?raw', import: 'default' });

const WIKI_MODULES = [
  { id: 'master_syllabus_index', path: 'index', title: 'Overview', icon: <BookOpen size={16} /> },
  { id: 'legal_vault', path: 'legal', title: 'Legal Reasoning', icon: <Scale size={16} /> },
  { id: 'gk_vault', path: 'gk', title: 'Current Affairs & GK', icon: <GlobeIcon /> },
  { id: 'english_vault', path: 'english', title: 'English', icon: <FileText size={16} /> },
  { id: 'logical_vault', path: 'logic', title: 'Logical Reasoning', icon: <BrainCircuit size={16} /> },
  { id: 'quant_vault', path: 'quant', title: 'Quantitative', icon: <BarChart size={16} /> },
];

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function WikiMaster({ initialRoute, onClose }: { initialRoute?: string; onClose?: () => void }) {
  const [activeModule, setActiveModule] = useState(
    WIKI_MODULES.find(m => m.path === initialRoute) ? initialRoute! : 'index'
  );
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.pushState(null, '', `/wiki/${activeModule}`);
    if (contentRef.current) contentRef.current.scrollTop = 0;

    const loadContent = async () => {
      setLoading(true);
      const mod = WIKI_MODULES.find(m => m.path === activeModule);
      const fileId = mod ? mod.id : activeModule;
      const filePath = `../../wiki/${fileId}.md`;
      try {
        if (wikiFiles[filePath]) {
          const rawContent = await wikiFiles[filePath]();
          setContent(rawContent as unknown as string);
        } else {
          setContent('# Not Found\nThis module could not be loaded.');
        }
      } catch {
        setContent('# Error\nFailed to load content.');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [activeModule]);

  const activeTitle = WIKI_MODULES.find(m => m.path === activeModule)?.title || 'Study Material';

  return (
    <div className="fixed inset-0 top-16 flex z-50 bg-background">
      <aside className={`${sidebarOpen ? 'w-56' : 'w-0'} flex flex-col bg-white border-r border-border transition-all overflow-hidden`}>
        <div className="p-4 flex items-center justify-between border-b border-border">
          <span className="font-serif font-semibold text-foreground">Study Material</span>
          {onClose && (
            <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-primary rounded-lg">
              <ArrowLeft size={16} />
            </button>
          )}
        </div>
        <nav className="p-2 flex-1 overflow-y-auto">
          {WIKI_MODULES.map(mod => {
            const isActive = activeModule === mod.path;
            return (
              <button
                key={mod.path}
                onClick={() => setActiveModule(mod.path)}
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full text-left rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-blue-50 hover:text-primary'
                }`}
              >
                {mod.icon}
                {mod.title}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-12 border-b border-border flex items-center px-4 bg-white gap-3 flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-primary p-1.5 hover:bg-blue-50 rounded-lg">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="text-sm font-medium text-foreground">{activeTitle}</span>
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto bg-background p-6 md:p-10">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-border p-8 md:p-12 shadow-sm min-h-full">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="prose prose-slate max-w-none prose-headings:font-serif prose-a:text-primary prose-blockquote:border-l-accent prose-blockquote:border-l-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children }) => {
                      if (href?.startsWith('.') || href?.endsWith('.md')) {
                        return (
                          <button
                            onClick={() => {
                              const id = href.replace(/^\.\//, '').replace(/\.md$/, '');
                              setActiveModule(id);
                            }}
                            className="text-primary hover:underline font-medium"
                          >
                            {children}
                          </button>
                        );
                      }
                      return <a href={href} className="text-primary">{children}</a>;
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
