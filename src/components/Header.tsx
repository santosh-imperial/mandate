
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navbar } from "@/components/Navbar";

export const Header = () => {
  return (
    <header className="border-b border-border py-4 px-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-semibold text-sm text-primary-foreground">M</span>
            </div>
            <h1 className="text-xl font-medium">Mandate</h1>
          </Link>
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
  );
};
