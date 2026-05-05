import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookMarked, Scale, BookOpen, FileText, BrainCircuit, BarChart, Menu, ArrowLeft, X } from 'lucide-react';

// Import all markdown files in the /wiki directory as raw strings at build time
// @ts-ignore
const wikiFiles = import.meta.glob('../../wiki/*.md', { query: '?raw', import: 'default' });

const WIKI_MODULES = [
  { id: 'master_syllabus_index', path: 'index', title: 'Master Syllabus Index', icon: <BookMarked size={16} /> },
  { id: 'legal_reasoning_vault', path: 'legal', title: 'Legal Reasoning Vault', icon: <Scale size={16} /> },
  { id: 'current_affairs_gk_hub', path: 'current-affairs', title: 'Current Affairs & GK', icon: <BookOpen size={16} /> },
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
    // Scroll content to top when switching module
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
    <div
      style={{ position: 'fixed', inset: 0, top: '64px', display: 'flex', zIndex: 50 }}
      className="bg-background text-white font-sans"
    >
      {/* ── Sidebar ── */}
      <aside
        style={{
          width: sidebarOpen ? '280px' : '0',
          minWidth: sidebarOpen ? '280px' : '0',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s, min-width 0.3s',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        {/* Sidebar header */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '9px', color: '#C2A35D', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase' }}>LexCLAT</div>
            <div style={{ fontSize: '18px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'white', marginTop: '2px' }}>Master Wiki</div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              style={{ padding: '6px', color: '#666', cursor: 'pointer', background: 'none', border: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = '#666')}
            >
              <ArrowLeft size={16} />
            </button>
          )}
        </div>

        {/* Module list */}
        <nav style={{ padding: '8px', flex: 1 }}>
          {WIKI_MODULES.map(mod => {
            const isActive = activeModule === mod.path;
            return (
              <button
                key={mod.path}
                onClick={() => setActiveModule(mod.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: 'none',
                  background: isActive ? '#C2A35D' : 'transparent',
                  color: isActive ? '#000' : '#9ca3af',
                  fontWeight: isActive ? '700' : '500',
                  borderRadius: '2px',
                  marginBottom: '2px',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'white'; }}}
                onMouseOut={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}}
              >
                <span style={{ color: isActive ? '#000' : '#C2A35D', flexShrink: 0 }}>{mod.icon}</span>
                <span style={{ fontSize: '13px', fontFamily: 'Georgia, serif' }}>{mod.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: '52px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          flexShrink: 0,
          gap: '12px',
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ color: '#C2A35D', cursor: 'pointer', background: 'none', border: 'none', padding: '4px' }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.2em', color: '#6b7280' }}>
            {activeTitle}
          </span>
        </div>

        {/* Scrollable content — native overflow-y: auto */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '40px 32px 80px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px', opacity: 0.5 }}>
                <div style={{ width: '28px', height: '28px', border: '2px solid #C2A35D', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span style={{ fontSize: '10px', color: '#C2A35D', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading Module...</span>
              </div>
            ) : (
              <div className="prose prose-invert prose-p:text-gray-400 prose-headings:font-serif prose-headings:italic prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:text-gray-300 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:not-italic prose-th:bg-surface prose-th:text-white prose-td:text-gray-400 prose-tr:border-white/5 max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
