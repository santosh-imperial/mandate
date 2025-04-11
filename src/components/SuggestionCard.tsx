import { Suggestion, NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AreaChart, ExternalLink, ChevronDown, ChevronUp, ShoppingCart, List, Clock, Map, Ticket, FileText, Calendar, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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

  // Determine content type based on suggestion properties
  const getSuggestionType = () => {
    if (suggestion.type === "news") return "news";
    
    // Food related suggestions
    if (suggestion.title?.toLowerCase().includes("from") || 
        suggestion.description?.toLowerCase().includes("order") ||
        suggestion.description?.toLowerCase().includes("delivery")) {
      return "food-order";
    }
    
    if (suggestion.title?.toLowerCase().includes("recipe") ||
        suggestion.title?.toLowerCase().includes("smoothie") ||
        suggestion.title?.toLowerCase().includes("oatmeal") ||
        suggestion.title?.toLowerCase().includes("homemade")) {
      return "recipe";
    }
    
    // Travel related suggestions
    if (suggestion.title?.toLowerCase().includes("route") ||
        suggestion.title?.toLowerCase().includes("traffic") ||
        suggestion.description?.toLowerCase().includes("traffic") ||
        suggestion.description?.toLowerCase().includes("min drive")) {
      return "route";
    }
    
    // Meeting related suggestions
    if (suggestion.title?.toLowerCase().includes("meeting") ||
        suggestion.title?.toLowerCase().includes("presentation") ||
        suggestion.description?.toLowerCase().includes("meeting") ||
        suggestion.description?.toLowerCase().includes("agenda")) {
      return "meeting";
    }
    
    // Event related suggestions
    if (suggestion.title?.toLowerCase().includes("ticket") ||
        suggestion.title?.toLowerCase().includes("concert") ||
        suggestion.description?.toLowerCase().includes("ticket") ||
        suggestion.description?.toLowerCase().includes("event")) {
      return "event";
    }
    
    // Document related suggestions
    if (suggestion.title?.toLowerCase().includes("document") ||
        suggestion.title?.toLowerCase().includes("file") ||
        suggestion.description?.toLowerCase().includes("document")) {
      return "document";
    }
    
    return "general";
  };
  
  // Expanded content based on suggestion type
  const renderExpandedContent = () => {
    const suggestionType = getSuggestionType();
    
    if (suggestionType === "news") {
      return null; // News items don't need expanded view beyond what they already show
    }
    
    if (suggestionType === "food-order") {
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
    } 
    
    if (suggestionType === "recipe") {
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
    
    if (suggestionType === "route") {
      // Traffic and route details
      const distance = "7.2 miles";
      const trafficCondition = suggestion.title?.includes("traffic") ? "Heavy traffic" : "Light traffic";
      const alternateRoutes = ["Main St → Park Ave → 5th St", "Highway 101 → Exit 24 → Downtown"];
      
      return (
        <div className="mt-3 pt-3 border-t border-muted">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Distance:</span>
            <span>{distance}</span>
          </div>
          <div className="flex items-center text-sm mb-2">
            <Map className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>{trafficCondition}</span>
          </div>
          <div className="mb-2">
            <div className="text-sm font-medium mb-1">Alternate routes:</div>
            <ul className="text-xs pl-2">
              {alternateRoutes.map((route, i) => (
                <li key={i} className="mb-1">{route}</li>
              ))}
            </ul>
          </div>
          <Button 
            size="sm" 
            className="w-full mt-1"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Opening maps for directions`);
            }}
          >
            <Map className="mr-1 h-4 w-4" />
            Get Directions
          </Button>
        </div>
      );
    }
    
    if (suggestionType === "meeting") {
      // Meeting details
      const participants = ["Alex Johnson", "Sarah Chen", "Marco Diaz"];
      const location = "Conference Room B";
      const meetingAgenda = ["Project status update (10 min)", "Resource planning (15 min)", "Timeline review (10 min)"];
      
      return (
        <div className="mt-3 pt-3 border-t border-muted">
          <div className="mb-2">
            <div className="text-sm font-medium mb-1">Participants:</div>
            <p className="text-xs">{participants.join(", ")}</p>
          </div>
          <div className="mb-2">
            <div className="text-sm font-medium mb-1">Location:</div>
            <p className="text-xs">{location}</p>
          </div>
          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Agenda:</div>
            <ul className="text-xs pl-5 list-disc">
              {meetingAgenda.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Joining meeting`);
              }}
            >
              Join
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Meeting agenda sent to your email`);
              }}
            >
              <Mail className="mr-1 h-4 w-4" />
              Email Agenda
            </Button>
          </div>
        </div>
      );
    }
    
    if (suggestionType === "event") {
      // Event details
      const venue = "Civic Center Auditorium";
      const date = "Oct 15, 2025";
      const time = "7:30 PM";
      const price = "$45.00";
      
      return (
        <div className="mt-3 pt-3 border-t border-muted">
          <div className="flex text-sm mb-2">
            <span className="font-medium w-16">Venue:</span>
            <span>{venue}</span>
          </div>
          <div className="flex text-sm mb-2">
            <span className="font-medium w-16">Date:</span>
            <span>{date}</span>
          </div>
          <div className="flex text-sm mb-2">
            <span className="font-medium w-16">Time:</span>
            <span>{time}</span>
          </div>
          <div className="flex text-sm mb-3">
            <span className="font-medium w-16">Price:</span>
            <span>{price}</span>
          </div>
          <Button 
            size="sm" 
            className="w-full mt-1"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Ticket purchase initiated for ${suggestion.title}`);
            }}
          >
            <Ticket className="mr-1 h-4 w-4" />
            Buy Tickets
          </Button>
        </div>
      );
    }
    
    if (suggestionType === "document") {
      // Document details
      const fileType = "PDF";
      const size = "2.4 MB";
      const lastModified = "Yesterday, 3:45 PM";
      const sharedWith = ["Marketing Team", "Project Leads"];
      
      return (
        <div className="mt-3 pt-3 border-t border-muted">
          <div className="flex text-sm mb-1">
            <span className="font-medium w-24">File type:</span>
            <span>{fileType}</span>
          </div>
          <div className="flex text-sm mb-1">
            <span className="font-medium w-24">Size:</span>
            <span>{size}</span>
          </div>
          <div className="flex text-sm mb-1">
            <span className="font-medium w-24">Last modified:</span>
            <span>{lastModified}</span>
          </div>
          <div className="flex text-sm mb-3">
            <span className="font-medium w-24">Shared with:</span>
            <span>{sharedWith.join(", ")}</span>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Opening document: ${suggestion.title}`);
              }}
            >
              <FileText className="mr-1 h-4 w-4" />
              Open
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Document downloaded: ${suggestion.title}`);
              }}
            >
              Download
            </Button>
          </div>
        </div>
      );
    }
    
    // Default expandable content for general suggestions
    return (
      <div className="mt-3 pt-3 border-t border-muted">
        <div className="text-sm mb-3">
          <p>Additional information about this suggestion is not available.</p>
        </div>
        <Button 
          size="sm" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Action taken for: ${suggestion.title}`);
          }}
        >
          <Calendar className="mr-1 h-4 w-4" />
          Add to Calendar
        </Button>
      </div>
    );
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
