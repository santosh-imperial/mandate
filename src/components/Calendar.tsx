
import { useState } from "react";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { TimeSlot } from "./TimeSlot";
import { events } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/lib/types";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM

  const getEventsForHour = (hour: number): Event | undefined => {
    return events.find(event => event.hourIndex === hour);
  };

  const goToPreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isTodaySelected = isSameDay(selectedDate, new Date());
  
  // Calculate static time position for 8:15 AM
  const getTimePosition = () => {
    // 8:15 AM corresponds to hour index 0 (8AM is our first hour)
    // and 15 minutes = 25% of the hour
    const hourIndex = 0; // 8AM (first hour in our display)
    const minutePercentage = 25; // 15 minutes = 25% of an hour
    
    return { hourIndex, minutePercentage };
  };
  
  const timePosition = getTimePosition();

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-medium tracking-tight">
          {format(selectedDate, "EEEE, MMMM d")}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={goToToday}
            disabled={isTodaySelected} 
            className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            Today
          </button>
          <div className="flex items-center">
            <button 
              onClick={goToPreviousDay}
              className="p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={goToNextDay}
              className="p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Next day"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-background relative">
        <div className="calendar-container">
          {hours.map(hour => (
            <TimeSlot 
              key={hour} 
              hour={hour} 
              event={getEventsForHour(hour)} 
            />
          ))}
          
          {/* Fixed time indicator at 8:15 AM */}
          <div 
            className="absolute left-0 right-0 border-t-2 border-red-500 z-10 pointer-events-none"
            style={{
              top: `calc(${timePosition.hourIndex * 70}px + ${timePosition.minutePercentage}% * 70px / 100)`,
            }}
          >
            <div className="absolute -left-1 -top-2 w-4 h-4 rounded-full bg-red-500" />
            <span className="absolute -left-16 -top-3 text-xs font-medium text-red-500">8:15 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
