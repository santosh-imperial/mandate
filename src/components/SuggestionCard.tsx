
import { Suggestion, NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AreaChart, ExternalLink, ChevronDown, ChevronUp, ShoppingCart, List, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SuggestionCardProps {
  suggestion: Suggestion;
  index: number;
}

export const SuggestionCard = ({ suggestion, index }: SuggestionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

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

  // Determine if it's a food order or recipe suggestion
  const isFoodOrder = suggestion.title?.toLowerCase().includes("from") || 
                      suggestion.description?.toLowerCase().includes("order") ||
                      suggestion.description?.toLowerCase().includes("delivery");
  
  // Expanded content based on suggestion type
  const renderExpandedContent = () => {
    if (suggestion.type === "news") {
      return null; // News items don't need expanded view beyond what they already show
    }
    
    if (isFoodOrder) {
      // Food order details
      const price = suggestion.title?.includes("pancakes") ? "$12.99" :
                    suggestion.title?.includes("bagel") ? "$7.50" :
                    suggestion.title?.includes("coffee") ? "$5.25" : "$10.99";
      
      const deliveryTime = "15-25 min";
      
      return (
        <div className="mt-3 pt-3 border-t border-muted">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Price:</span>
            <span>{price}</span>
          </div>
          <div className="flex items-center text-sm mb-3">
            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>Delivery in {deliveryTime}</span>
          </div>
          <Button 
            size="sm" 
            className="w-full mt-1"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Order placed for ${suggestion.title}`);
            }}
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Place Order
          </Button>
        </div>
      );
    } else {
      // Recipe details
      const ingredients = suggestion.title?.includes("smoothie") ? 
        ["1 frozen banana", "1/2 cup frozen berries", "1 cup almond milk", "1 tbsp chia seeds", "1/4 cup granola"] :
        suggestion.title?.includes("oatmeal") ?
        ["1 cup rolled oats", "2 cups milk", "1 tbsp honey", "Cinnamon to taste", "Fresh fruits"] :
        ["2 eggs", "1/4 cup milk", "Salt and pepper", "Vegetables of choice", "1/4 cup cheese"];
      
      const instructions = suggestion.title?.includes("smoothie") ? 
        "Blend all ingredients except granola until smooth. Pour into bowl and top with granola." :
        suggestion.title?.includes("oatmeal") ?
        "Cook oats with milk for 5 minutes. Stir in honey and cinnamon. Top with fresh fruits." :
        "Whisk eggs and milk. Cook in a pan on medium heat. Add vegetables and cheese. Fold and serve.";
      
      return (
        <div className="mt-3 pt-3 border-t border-muted">
          <div className="mb-2">
            <div className="flex items-center text-sm font-medium mb-1">
              <List className="w-4 h-4 mr-1" />
              Ingredients:
            </div>
            <ul className="text-xs pl-5 list-disc">
              {ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Instructions:</div>
            <p className="text-xs">{instructions}</p>
          </div>
        </div>
      );
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
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{suggestion.title}</h3>
            {suggestion.description && (
              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
            )}
          </div>
          {(suggestion.title && !suggestion.type.includes("news")) && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="p-1 rounded-full hover:bg-muted/50"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
        
        {expanded && renderExpandedContent()}
        
        {suggestion.linkUrl && (
          <a 
            href={suggestion.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            onClick={(e) => e.stopPropagation()}
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
        "suggestion-card p-4 rounded-lg shadow-sm animate-scale-in relative group cursor-pointer transition-all",
        getCardVariant(index),
        expanded && "shadow-md"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => {
        if (!suggestion.type.includes("news")) {
          toggleExpand();
        }
      }}
    >
      {renderContent()}
    </div>
  );
};
