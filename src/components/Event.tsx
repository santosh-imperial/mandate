
import { Event as EventType } from "@/lib/types";
import { SuggestionCarousel } from "./SuggestionCarousel";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface EventProps {
  event: EventType;
}

// Color mapping for different event categories
const categoryColors: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  travel: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  routine: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  focus: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  lunch: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  other: "bg-[hsl(var(--event-background))] text-[hsl(var(--event-foreground))]"
};

export const Event = ({ event }: EventProps) => {
  const [isLunchLoading, setIsLunchLoading] = useState(false);
  const [lunchSuggestions, setLunchSuggestions] = useState(event.suggestions);

  // Get color based on category, default to "other" if no category is specified
  const categoryColor = event.category ? categoryColors[event.category] : categoryColors.other;

  useEffect(() => {
    // Only fetch lunch suggestions if this is a lunch category event
    if (event.category === 'lunch') {
      const fetchLunchRecommendations = async () => {
        setIsLunchLoading(true);
        try {
          // Fetch most recent 3 lunch recommendations
          const { data, error } = await supabase
            .from('mandate_lunch')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);

          if (error) {
            console.error('Error fetching lunch recommendations:', error);
            return;
          }

          // Transform the lunch data to match the Suggestion type
          if (data && data.length > 0) {
            const lunchSuggestions = data.map(item => ({
              id: item.id,
              type: item.type || 'food-order',
              title: item.title,
              description: item.description,
              imageUrl: item.image_url,
              // Additional properties that might be used by the SuggestionCard
              price: item.price,
              deliveryTime: item.delivery_time,
              restaurant: item.restaurant,
              ingredients: item.ingredients,
              instructions: item.instructions
            }));
            
            setLunchSuggestions(lunchSuggestions);
          }
        } catch (error) {
          console.error('Unexpected error fetching lunch recommendations:', error);
        } finally {
          setIsLunchLoading(false);
        }
      };

      fetchLunchRecommendations();
    }
  }, [event.category]);

  return (
    <div className="group flex gap-4 pt-1 w-full min-h-[70px]">
      <div 
        className={cn(
          "w-full max-w-[250px] rounded-lg p-3 flex items-center",
          categoryColor
        )}
      >
        <h3 className="font-medium">{event.title}</h3>
      </div>
      
      <div className="flex-grow">
        {isLunchLoading ? (
          <div className="flex space-x-3">
            <Skeleton className="h-20 w-60 rounded-lg" />
            <Skeleton className="h-20 w-60 rounded-lg" />
            <Skeleton className="h-20 w-60 rounded-lg" />
          </div>
        ) : (
          <SuggestionCarousel suggestions={lunchSuggestions} />
        )}
      </div>
    </div>
  );
};
