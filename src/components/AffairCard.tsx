import React from 'react';
import { Bookmark, Share2, ExternalLink, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface AffairCardProps {
  date: string;
  category: string;
  headline: string;
  summary: string;
  sourceUrl: string;
  isBookmarked: boolean;
  onBookmark: () => void;
}

const AffairCard: React.FC<AffairCardProps> = ({
  date,
  category,
  headline,
  summary,
  sourceUrl,
  isBookmarked,
  onBookmark
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-surface border border-border/50 rounded-lg overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="p-5 flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 bg-primary/5 text-primary text-[10px] font-bold tracking-wider rounded uppercase flex items-center gap-1.5">
            <Tag size={10} />
            {category}
          </span>
          <span className="text-muted-foreground text-[11px] flex items-center gap-1.5 ml-auto">
            <Calendar size={10} />
            {date}
          </span>
        </div>
        
        <h3 className="text-foreground font-semibold text-lg leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {headline}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {summary}
        </p>
      </div>
      
      <div className="px-5 py-4 bg-background/50 border-t border-border/30 flex items-center justify-between">
        <div className="flex gap-4">
          <button 
            onClick={onBookmark}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          
          <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
            <Share2 size={14} />
            Share
          </button>
        </div>
        
        <a 
          href={sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
          title="Read full article on source"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
};

export default AffairCard;
