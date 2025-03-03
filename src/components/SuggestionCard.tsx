import { Suggestion, NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AreaChart, ExternalLink } from "lucide-react";

interface SuggestionCardProps {
  suggestion: Suggestion;
  index: number;
}

export const SuggestionCard = ({ suggestion, index }: SuggestionCardProps) => {
  const getCardVariant = (index: number) => {
    switch (index % 3) {
      case 0:
        return "bg-[hsl(var(--suggestion-1))]";
      case 1:
        return "bg-[hsl(var(--suggestion-2))]";
      case 2:
        return "bg-[hsl(var(--suggestion-3))]";
      default:
        return "bg-[hsl(var(--suggestion-1))]";
    }
  };

  const renderContent = () => {
    if (suggestion.type === "news") {
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{suggestion.title}</h3>
          </div>
          <p className="text-sm font-medium">{suggestion.description}</p>
          
          {suggestion.chartData && (
            <div className="mt-4 h-20 relative">
              <div className="absolute top-0 right-0">
                <AreaChart className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="w-full h-full flex items-end">
                {suggestion.chartData.values.map((value: number, i: number) => {
                  const max = Math.max(...suggestion.chartData.values);
                  const height = (value / max) * 100;
                  const isUp = i > 0 && value > suggestion.chartData.values[i - 1];
                  return (
                    <div 
                      key={i} 
                      className="flex-1 mx-0.5 rounded-t-sm transition-all duration-500"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: isUp ? 'hsl(var(--chart-green))' : 'hsl(var(--chart-red))'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
          
          {suggestion.content && suggestion.content.length > 0 && (
            <div className="mt-3 space-y-2">
              {suggestion.content.map((item: NewsItem, idx: number) => (
                <div key={idx} className="border-t pt-2">
                  <div className="text-xs font-medium mb-1">{item.title}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    {item.attribution && (
                      <>
                        <span>•</span>
                        <span>{item.attribution}</span>
                      </>
                    )}
                    {item.time && (
                      <>
                        <span>•</span>
                        <span>{item.time}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <>
        <h3 className="font-medium">{suggestion.title}</h3>
        {suggestion.description && (
          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
        )}
        {suggestion.linkUrl && (
          <a 
            href={suggestion.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View details</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        )}
      </>
    );
  };

  return (
    <div 
      className={cn(
        "suggestion-card p-4 rounded-lg shadow-sm animate-scale-in relative group",
        getCardVariant(index)
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {renderContent()}
    </div>
  );
};
