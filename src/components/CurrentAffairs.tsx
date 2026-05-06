import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  TrendingUp, 
  Clock,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AffairCard from './AffairCard';
import currentAffairsData from '@/src/data/currentAffairs.json';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface Affair {
  date: string;
  category: string;
  headline: string;
  summary: string;
  sourceUrl: string;
  timestamp: number;
}

const CATEGORIES = [
  "All Categories",
  "NATIONAL AFFAIRS",
  "INTERNATIONAL AFFAIRS",
  "BANKING & ECONOMY",
  "SCIENCE & TECHNOLOGY",
  "SPORTS",
  "AWARDS & HONOURS",
  "DEFENCE",
  "ENVIRONMENT",
  "IMPORTANT DAYS",
  "STATE NEWS"
];

const CurrentAffairs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const itemsPerPage = 12;

  // Load bookmarks
  useEffect(() => {
    const saved = localStorage.getItem('lexclat_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  const toggleBookmark = (headline: string) => {
    const newBookmarks = bookmarks.includes(headline)
      ? bookmarks.filter(b => b !== headline)
      : [...bookmarks, headline];
    setBookmarks(newBookmarks);
    localStorage.setItem('lexclat_bookmarks', JSON.stringify(newBookmarks));
  };

  // Filtering logic
  const filteredAffairs = useMemo(() => {
    return (currentAffairsData as Affair[]).filter(item => {
      const matchesSearch = item.headline.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredAffairs.length / itemsPerPage);
  const currentItems = filteredAffairs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Today's Date formatted for comparison (May 6, 2026 -> 6-may-2026)
  const today = new Date();
  const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const todayStr = `${today.getDate()}-${monthNames[today.getMonth()]}-${today.getFullYear()}`;
  
  const todaysAffairs = (currentAffairsData as Affair[]).filter(a => a.date === todayStr);
  const lastYearDate = `${today.getDate()}-${monthNames[today.getMonth()]}-${today.getFullYear() - 1}`;
  const lastYearAffairs = (currentAffairsData as Affair[]).filter(a => a.date === lastYearDate);

  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Current Affairs - " + todayStr, 10, 20);
    
    let y = 40;
    currentItems.forEach((item, i) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 138); // Primary color
      doc.text(`${item.category} | ${item.date}`, 10, y);
      y += 7;
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      const headlineLines = doc.splitTextToSize(item.headline, 180);
      doc.text(headlineLines, 10, y);
      y += (headlineLines.length * 7) + 5;
    });
    
    doc.save(`Current_Affairs_${todayStr}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-background min-h-screen">
      
      {/* Hero Section - Today's Highlights */}
      <section className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <TrendingUp className="w-full h-full rotate-12" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Today's Live Updates
            </span>
            <span className="text-white/60 text-xs">•</span>
            <span className="text-white/60 text-xs flex items-center gap-1">
              <Clock size={12} /> {todaysAffairs.length} New Articles
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Stay Ahead with <span className="text-gold">Daily Current Affairs</span>
          </h1>
          
          <p className="text-primary-light text-lg mb-8 leading-relaxed">
            Curated daily updates from AffairsCloud, optimized for CLAT and competitive exams. 
            Indexed from Jan 2025 for comprehensive research.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={downloadPDF}
              className="bg-white text-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gold hover:text-white transition-all shadow-lg"
            >
              <Download size={18} /> Download Daily PDF
            </button>
            <button className="bg-primary-foreground/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
              <TrendingUp size={18} /> Mock Prep
            </button>
          </div>
        </div>
      </section>

      {/* Control Bar */}
      <section className="sticky top-4 z-40 bg-surface/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by keyword, event, or person..."
            className="w-full pl-12 pr-4 py-3 bg-background border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <select 
              className="w-full pl-10 pr-4 py-3 bg-background border border-border/50 rounded-xl outline-none appearance-none text-sm font-medium focus:ring-2 focus:ring-primary/20"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="flex bg-background border border-border/50 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Feed */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Calendar className="text-primary" /> 
            {searchTerm || selectedCategory !== 'All Categories' ? 'Search Results' : 'Recent Affairs'}
            <span className="text-muted-foreground text-sm font-normal">({filteredAffairs.length} items)</span>
          </h2>
        </div>

        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          <AnimatePresence mode="popLayout">
            {currentItems.map((item, idx) => (
              <AffairCard 
                key={idx}
                {...item}
                isBookmarked={bookmarks.includes(item.headline)}
                onBookmark={() => toggleBookmark(item.headline)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredAffairs.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No matches found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-8">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-muted transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === pageNum ? 'bg-primary text-white' : 'border border-border hover:bg-muted'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="flex items-end px-2 text-muted-foreground">...</span>}
            </div>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-border rounded-lg disabled:opacity-30 hover:bg-muted transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* Footer Comparison - This Day Last Year */}
      {lastYearAffairs.length > 0 && (
        <section className="bg-gold/5 border border-gold/20 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground">This Day Last Year</h2>
              <p className="text-muted-foreground">Revisiting updates from {lastYearDate}</p>
            </div>
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
              <Clock size={24} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lastYearAffairs.slice(0, 4).map((item, idx) => (
              <div key={idx} className="bg-surface p-4 rounded-xl border border-border/50 shadow-sm hover:border-gold/30 transition-all cursor-pointer">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{item.category}</span>
                <h4 className="font-semibold text-sm line-clamp-2 mt-1">{item.headline}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default CurrentAffairs;
