
import { useState, useRef, useEffect } from "react";
import { SuggestionCard } from "./SuggestionCard";
import { Suggestion } from "@/lib/types";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestionCarouselProps {
  suggestions: Suggestion[];
}

export const SuggestionCarousel = ({ suggestions }: SuggestionCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSuggestions, setVisibleSuggestions] = useState<Suggestion[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddSuggestion = () => {
    if (visibleSuggestions.length < suggestions.length) {
      const nextIndex = visibleSuggestions.length;
      setVisibleSuggestions([...visibleSuggestions, suggestions[nextIndex]]);
      setActiveIndex(nextIndex);
      
      // Scroll to the new card after it's rendered
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            left: containerRef.current.scrollWidth,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  useEffect(() => {
    // Ensure we always start with at least the first suggestion if available
    if (suggestions.length > 0 && visibleSuggestions.length === 0) {
      setVisibleSuggestions([suggestions[0]]);
    }
  }, [suggestions]);

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="suggestion-carousel flex space-x-3 overflow-x-auto py-1 px-0.5 max-w-xl"
      >
        {visibleSuggestions.map((suggestion, index) => (
          <div 
            key={suggestion.id} 
            className={cn(
              "flex-none",
              suggestion.type === 'news' ? "w-[320px]" : "w-[260px]"
            )}
          >
            <SuggestionCard 
              suggestion={suggestion} 
              index={index} 
            />
          </div>
        ))}
        
        {visibleSuggestions.length < suggestions.length && (
          <button 
            onClick={handleAddSuggestion}
            className="flex-none w-10 h-10 rounded-full bg-white text-primary shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Show more suggestions"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
