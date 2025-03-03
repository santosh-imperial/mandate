
import { Event as EventType } from "@/lib/types";
import { Event } from "./Event";

interface TimeSlotProps {
  hour: number;
  event?: EventType;
}

export const TimeSlot = ({ hour, event }: TimeSlotProps) => {
  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour} ${ampm}`;
  };

  return (
    <div className="time-slot group flex w-full min-h-[70px] border-b border-border">
      <div className="w-[60px] flex-shrink-0 pr-2 pt-2">
        <span className="text-sm text-muted-foreground">{formatHour(hour)}</span>
      </div>
      
      <div className="flex-grow py-1">
        {event ? (
          <Event event={event} />
        ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Empty state with subtle indicator */}
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-muted-foreground/20"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
