
import { useState } from "react";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { TimeSlot } from "./TimeSlot";
import { events } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/lib/types";
import { userConfiguredMandates } from "@/lib/mandate-templates";

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
  
  // Fixed height for each time slot in pixels
  const TIME_SLOT_HEIGHT = 70;
  
  // Calculate static time position for 8:15 AM
  const getTimePosition = () => {
    // 8:15 AM corresponds to hour index 0 (8AM is our first hour)
    // and 15 minutes = 25% of the hour
    const hourIndex = 0; // 8AM (first hour in our display)
    const minutePercentage = 25; // 15 minutes = 25% of an hour
    
    return { hourIndex, minutePercentage };
  };
  
  const timePosition = getTimePosition();

  // Calculate number of active mandates for the selected day
  const getActiveMandatesCount = () => {
    // Filter mandates that are active for the selected day
    return userConfiguredMandates.filter(mandate => mandate.isActive).length;
  };

  const activeMandatesCount = getActiveMandatesCount();

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-medium tracking-tight">
          {format(selectedDate, "EEEE, MMMM d")}
        </h2>
        
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center mr-4">
            <button 
              onClick={goToToday}
              disabled={isTodaySelected} 
              className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              Today
            </button>
            <div className="text-xs text-muted-foreground mt-1">
              {activeMandatesCount} mandate{activeMandatesCount !== 1 ? 's' : ''} running
            </div>
          </div>
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

      {/* Category legend */}
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="text-sm font-medium mr-2">Event types:</div>
        <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-1 rounded">Meeting</div>
        <div className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-xs px-2 py-1 rounded">Travel</div>
        <div className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs px-2 py-1 rounded">Routine</div>
        <div className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 text-xs px-2 py-1 rounded">Focus</div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-background">
        <div className="calendar-container relative">
          {hours.map(hour => (
            <TimeSlot 
              key={hour} 
              hour={hour} 
              event={getEventsForHour(hour)} 
            />
          ))}
          
          {/* Fixed time indicator at 8:15 AM */}
          <div 
            className="absolute left-0 right-0 border-t-2 border-purple-500 z-10 pointer-events-none"
            style={{
              top: `${(timePosition.hourIndex * TIME_SLOT_HEIGHT) + (timePosition.minutePercentage * TIME_SLOT_HEIGHT / 100)}px`,
            }}
          >
            <div className="absolute -left-1 -top-2 w-4 h-4 rounded-full bg-purple-500" />
            <span className="absolute -left-16 -top-3 text-xs font-medium text-purple-500">8:15 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
