
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link 
        to="/" 
        className={`text-sm font-medium transition-colors ${
          isActiveRoute('/') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Calendar
      </Link>
      <Link 
        to="/tasks" 
        className={`text-sm font-medium transition-colors ${
          isActiveRoute('/tasks') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Tasks
      </Link>
      <Link 
        to="/mandates" 
        className={`text-sm font-medium transition-colors ${
          isActiveRoute('/mandates') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Mandate Templates
      </Link>
      <Link 
        to="#" 
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Analytics
      </Link>
      <Link 
        to="/about" 
        className={`text-sm font-medium transition-colors ${
          isActiveRoute('/about') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        About
      </Link>
    </nav>
  );
};
