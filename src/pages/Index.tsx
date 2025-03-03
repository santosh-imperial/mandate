
import { Calendar } from "@/components/Calendar";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border py-4 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-semibold text-sm text-primary-foreground">FP</span>
            </div>
            <h1 className="text-xl font-medium">FlowPlanner</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium transition-colors hover:text-muted-foreground">Calendar</a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Tasks</a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Projects</a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Analytics</a>
          </nav>
          
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
            &copy; {new Date().getFullYear()} FlowPlanner. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
