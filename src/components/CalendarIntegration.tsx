
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Check, RefreshCw, X } from "lucide-react";
import type { CalendarIntegration as CalendarIntegrationType, Task } from "@/lib/types";
import { toast } from "sonner";

interface CalendarIntegrationProps {
  onImportTasks: (tasks: Task[]) => void;
}

export function CalendarIntegration({ onImportTasks }: CalendarIntegrationProps) {
  const [integrations, setIntegrations] = useState<CalendarIntegrationType[]>([
    { id: "google", type: "google", connected: false },
    { id: "outlook", type: "outlook", connected: false },
    { id: "apple", type: "apple", connected: false }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async (id: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to connect calendar
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update integration status
      setIntegrations(prev => prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: true, lastSynced: new Date() } 
          : integration
      ));
      
      toast.success(`Successfully connected to ${id.charAt(0).toUpperCase() + id.slice(1)} Calendar`);
      
      // Simulate fetching events that can become tasks
      if (id === "google") {
        const mockTasks: Task[] = [
          {
            id: `calendar-${Date.now()}-1`,
            title: "Weekly Team Meeting",
            description: "Discuss project progress and next steps",
            completed: false,
            priority: "medium",
            createdAt: new Date(),
            tags: ["meeting", "imported"]
          },
          {
            id: `calendar-${Date.now()}-2`,
            title: "Client Presentation",
            description: "Present Q2 results to the client",
            completed: false,
            priority: "high",
            createdAt: new Date(),
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            tags: ["presentation", "imported"]
          }
        ];
        onImportTasks(mockTasks);
      }
    } catch (error) {
      console.error("Error connecting calendar:", error);
      toast.error("Failed to connect calendar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, connected: false, lastSynced: undefined } 
        : integration
    ));
    toast(`Disconnected from ${id.charAt(0).toUpperCase() + id.slice(1)} Calendar`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          Connect Calendar
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calendar Integrations</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">
                  {integration.type.charAt(0).toUpperCase() + integration.type.slice(1)} Calendar
                </h4>
                {integration.connected && integration.lastSynced && (
                  <p className="text-sm text-muted-foreground">
                    Last synced: {integration.lastSynced.toLocaleString()}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {integration.connected ? (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                      onClick={() => handleConnect(integration.id)}
                      disabled={isLoading}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Sync
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive gap-1"
                      onClick={() => handleDisconnect(integration.id)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleConnect(integration.id)}
                    disabled={isLoading}
                    className="gap-1"
                  >
                    <Check className="h-4 w-4" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
