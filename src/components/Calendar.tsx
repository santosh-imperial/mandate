
import { useState, useEffect } from "react";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { TimeSlot } from "./TimeSlot";
import { events } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/lib/types";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM

  // Update current time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60000ms = 1 minute
    
    return () => clearInterval(intervalId);
  }, []);

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
  
  // Calculate current time position
  const getCurrentTimePosition = () => {
    if (!isTodaySelected) return null;
    
    const now = currentTime;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // If current time is outside our calendar range (before 8AM or after 10PM)
    if (hours < 8 || hours >= 23) return null;
    
    // Calculate position as percentage within the time slot
    const hourIndex = hours - 8; // Adjust to our 8AM start time
    const minutePercentage = (minutes / 60) * 100;
    
    return { hourIndex, minutePercentage };
  };
  
  const timePosition = getCurrentTimePosition();

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
          
          {/* Current time indicator */}
          {timePosition && (
            <div 
              className="absolute left-0 right-0 border-t-2 border-red-500 z-10 pointer-events-none"
              style={{
                top: `calc(${timePosition.hourIndex * 70}px + ${timePosition.minutePercentage}% * 70px / 100)`,
              }}
            >
              <div className="absolute -left-1 -top-2 w-4 h-4 rounded-full bg-red-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
