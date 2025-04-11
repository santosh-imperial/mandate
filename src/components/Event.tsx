
import { Event as EventType } from "@/lib/types";
import { SuggestionCarousel } from "./SuggestionCarousel";
import { cn } from "@/lib/utils";
import { ExpandableCard } from "./ExpandableCard";

interface EventProps {
  event: EventType;
}

export const Event = ({ event }: EventProps) => {
  // Convert event category to ExpandableCard type
  const cardType = event.category === 'meeting' || event.category === 'travel' 
    ? 'order' 
    : 'recipe';

  // Prepare details based on event type
  const details = {
    price: event.category === 'meeting' || event.category === 'travel' ? "$15.99" : undefined,
    vendor: event.category === 'meeting' ? "Meeting Room Services" : 
            event.category === 'travel' ? "Travel Services" : undefined,
    ingredients: event.category === 'routine' || event.category === 'focus' ? 
      ["Focus", "Preparation", "Execution", "Review"] : undefined,
    instructions: event.category === 'routine' || event.category === 'focus' ? 
      "Follow the process steps in order and take notes during each phase." : undefined
  };

  return (
    <div className="group flex flex-col gap-4 pt-1 w-full min-h-[70px]">
      <ExpandableCard
        title={event.title}
        type={cardType}
        description={`Scheduled at ${event.time}`}
        details={details}
      />
      
      <div className="flex-grow mt-2">
        <SuggestionCarousel suggestions={event.suggestions} />
      </div>
    </div>
  );
};
