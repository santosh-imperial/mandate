
import { Calendar } from "@/components/Calendar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { FloatingSearchBar } from "@/components/FloatingSearchBar";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border py-4 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-semibold text-sm text-primary-foreground">M</span>
            </div>
            <h1 className="text-xl font-medium">Mandate</h1>
          </div>
          
          <Navbar />
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
              <span className="text-sm font-medium">JS</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-6">
        <Calendar />
      </main>
      
      <footer className="border-t border-border py-4 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Mandate. All rights reserved.
          </div>
        </div>
      </footer>
      
      <FloatingSearchBar />
    </div>
  );
};

export default Index;
