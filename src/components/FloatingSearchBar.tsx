import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const FloatingSearchBar = () => {
  const [position, setPosition] = useState({ 
    x: window.innerWidth / 2 - 200, // Center horizontally by default
    y: window.innerHeight / 2 // Center vertically by default
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (searchBarRef.current) {
      const rect = searchBarRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  // Handle mouse move event for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Update position on window resize to keep it centered
  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle key press for search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      navigate('/chat');
    }
  };

  return (
    <div
      ref={searchBarRef}
      className={cn(
        "fixed z-50 flex items-center gap-2 px-4 py-3 rounded-xl glass shadow-lg transition-all",
        isDragging ? "cursor-grabbing" : "cursor-grab hover:shadow-xl"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "400px", // Increased width from 280px to 400px
      }}
      onMouseDown={handleMouseDown}
    >
      <Search className="w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Would you like to set up a new mandate?"
        className="bg-transparent border-none outline-none flex-1 text-sm placeholder-muted-foreground text-foreground"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onClick={(e) => e.stopPropagation()} // Prevent triggering mouseDown on the container
      />
    </div>
  );
};
