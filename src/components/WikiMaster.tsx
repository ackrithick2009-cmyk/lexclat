import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookMarked, Scale, BookOpen, FileText, BrainCircuit, BarChart, Menu, ArrowLeft, X } from 'lucide-react';
import CurrentAffairs from './CurrentAffairs';

// Import all markdown files in the /wiki directory as raw strings at build time
// @ts-ignore
const wikiFiles = import.meta.glob('../../wiki/*.md', { query: '?raw', import: 'default' });

const WIKI_MODULES = [
  { id: 'master_syllabus_index', path: 'index', title: 'Master Syllabus Index', icon: <BookMarked size={16} /> },
  { id: 'legal_reasoning_vault', path: 'legal', title: 'Legal Reasoning Vault', icon: <Scale size={16} /> },
  { id: 'current_affairs_gk_hub', path: 'gk-vault', title: 'GK & Static Vault', icon: <BookOpen size={16} /> },
  { id: 'daily_feed', path: 'current-affairs', title: 'Daily Current Affairs', icon: <BookOpen size={16} /> },
  { id: 'english_comprehension', path: 'english', title: 'English Comprehension', icon: <FileText size={16} /> },
  { id: 'logical_reasoning_logic', path: 'logic', title: 'Logical Reasoning', icon: <BrainCircuit size={16} /> },
  { id: 'quantitative_techniques', path: 'quant', title: 'Quantitative Techniques', icon: <BarChart size={16} /> },
];

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
      const mod = WIKI_MODULES.find(m => m.path === activeModule) || WIKI_MODULES[0];
      const filePath = `../../wiki/${mod.id}.md`;
      try {
        if (wikiFiles[filePath]) {
          const rawContent = await wikiFiles[filePath]();
          setContent(rawContent as unknown as string);
        } else {
          setContent('# Content Not Found\nThe requested module could not be loaded.');
        }
      } catch (err) {
        setContent('# Error\nFailed to load module content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [activeModule]);

  const activeTitle = WIKI_MODULES.find(m => m.path === activeModule)?.title || 'Module';

  return (
    <div className="fixed inset-0 top-16 flex z-50 bg-background text-foreground font-sans">
      {/* ── Sidebar ── */}
      <aside
        className={`${sidebarOpen ? 'w-72' : 'w-0'} flex flex-col bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden shadow-sm`}
      >
        {/* Sidebar header */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <div>
            <div className="text-[9px] text-primary font-black tracking-[0.25em] uppercase">LexCLAT</div>
            <div className="text-lg font-serif italic text-foreground mt-0.5">Master Wiki</div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
          )}
        </div>

        {/* Module list */}
        <nav className="p-2 flex-1 overflow-y-auto">
          {WIKI_MODULES.map(mod => {
            const isActive = activeModule === mod.path;
            return (
              <button
                key={mod.path}
                onClick={() => setActiveModule(mod.path)}
                className={`flex items-center gap-3 p-3.5 w-full text-left transition-all rounded-sm mb-1 ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-muted-foreground hover:bg-primary-light hover:text-primary'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-primary'}>{mod.icon}</span>
                <span className="text-[13px] font-medium">{mod.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-14 border-b border-gray-200 flex items-center px-5 bg-white/80 backdrop-blur-md flex-shrink-0 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary p-1 hover:bg-gray-100 rounded-sm transition-colors"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
            {activeTitle}
          </span>
        </div>

        {/* Scrollable content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto bg-background scroll-smooth"
        >
          {activeModule === 'current-affairs' ? (
            <CurrentAffairs />
          ) : (
            <div className="p-8 md:p-12">
              <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 shadow-xl border border-gray-100 rounded-sm min-h-full">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-primary font-black tracking-widest uppercase">Analyzing Archive...</span>
                  </div>
                ) : (
                  <div className="prose prose-blue max-w-none prose-p:text-foreground prose-p:leading-[1.8] prose-p:font-sans prose-headings:font-serif prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary prose-a:font-bold prose-strong:text-foreground prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary-light prose-blockquote:text-primary prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:not-italic prose-table:border prose-th:bg-gray-50 prose-th:text-foreground prose-td:text-foreground prose-img:rounded-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
