
import { Event as EventType } from "@/lib/types";
import { SuggestionCarousel } from "./SuggestionCarousel";

interface EventProps {
  event: EventType;
}

export const Event = ({ event }: EventProps) => {
  return (
    <div className="group flex gap-4 pt-1 w-full min-h-[70px]">
      <div 
        className="w-full max-w-[250px] bg-[hsl(var(--event-background))] text-[hsl(var(--event-foreground))] rounded-lg p-3 flex items-center"
      >
        <h3 className="font-medium">{event.title}</h3>
      </div>
      
      <div className="flex-grow">
        <SuggestionCarousel suggestions={event.suggestions} />
      </div>
    </div>
  );
};
