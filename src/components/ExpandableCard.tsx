
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Utensils, Coffee, Salad } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpandableCardProps {
  title: string;
  type: 'order' | 'recipe';
  image?: string;
  description?: string;
  details: {
    price?: string;
    ingredients?: string[];
    instructions?: string;
    vendor?: string;
  };
}

export const ExpandableCard = ({
  title,
  type,
  image,
  description,
  details,
}: ExpandableCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const getIcon = () => {
    switch (type) {
      case 'order':
        return <Coffee className="h-5 w-5" />;
      case 'recipe':
        return <Salad className="h-5 w-5" />;
      default:
        return <Utensils className="h-5 w-5" />;
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 overflow-hidden hover:shadow-md", 
      expanded ? "max-h-[500px]" : "max-h-[100px]"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              {description && !expanded && (
                <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full" 
            onClick={toggleExpand}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3 animate-fade-in">
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            
            {type === 'order' && details.price && (
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Price</span>
                  <span className="font-semibold">{details.price}</span>
                </div>
                {details.vendor && (
                  <p className="text-xs text-muted-foreground mt-1">From {details.vendor}</p>
                )}
              </div>
            )}
            
            {type === 'recipe' && details.ingredients && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Ingredients</h4>
                <ul className="text-sm space-y-1">
                  {details.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
                {details.instructions && (
                  <>
                    <h4 className="text-sm font-semibold pt-2">Instructions</h4>
                    <p className="text-sm">{details.instructions}</p>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {expanded && (
        <CardFooter className="p-4 pt-0 animate-fade-in">
          {type === 'order' && (
            <Button className="w-full">Place Order</Button>
          )}
          {type === 'recipe' && (
            <Button variant="outline" className="w-full">
              Save Recipe
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
