
import { Event as EventType } from "@/lib/types";
import { SuggestionCarousel } from "./SuggestionCarousel";
import { cn } from "@/lib/utils";

interface EventProps {
  event: EventType;
}

// Color mapping for different event categories
const categoryColors: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  travel: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  routine: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  focus: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  other: "bg-[hsl(var(--event-background))] text-[hsl(var(--event-foreground))]"
};

export const Event = ({ event }: EventProps) => {
  // Get color based on category, default to "other" if no category is specified
  const categoryColor = event.category ? categoryColors[event.category] : categoryColors.other;

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
        <SuggestionCarousel suggestions={event.suggestions} />
      </div>
    </div>
  );
};
