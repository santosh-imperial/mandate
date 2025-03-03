
import { ConfiguredMandate } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarDays, Clock, MoreVertical, Play, Trash, Edit } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { format, formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { MandateEditDialog } from "./MandateEditDialog";

interface ConfiguredMandateCardProps {
  mandate: ConfiguredMandate;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (mandate: ConfiguredMandate) => void;
}

export const ConfiguredMandateCard = ({ 
  mandate, 
  onToggleStatus, 
  onDelete, 
  onEdit 
}: ConfiguredMandateCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (mandate.lastRun) {
      setTimeAgo(formatDistance(mandate.lastRun, new Date(), { addSuffix: true }));
      
      // Update the time ago every minute
      const intervalId = setInterval(() => {
        setTimeAgo(formatDistance(mandate.lastRun!, new Date(), { addSuffix: true }));
      }, 60000);
      
      return () => clearInterval(intervalId);
    }
  }, [mandate.lastRun]);

  // Use a safer approach to dynamically get the icon
  const iconName = mandate.icon.charAt(0).toUpperCase() + mandate.icon.slice(1);
  // Cast LucideIcons to any to avoid TypeScript errors with dynamic access
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Bot;

  const handleSaveEdit = (updatedMandate: ConfiguredMandate) => {
    onEdit(updatedMandate);
    setIsEditing(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`rounded-md p-2 ${mandate.isActive ? 'bg-primary/10' : 'bg-muted'}`}>
                <IconComponent className={`h-5 w-5 ${mandate.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <h3 className="font-semibold">{mandate.name}</h3>
                <p className="text-xs text-muted-foreground capitalize">{mandate.type} mandate</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                checked={mandate.isActive} 
                onCheckedChange={() => onToggleStatus(mandate.id)}
              />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(mandate.id)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground mb-4">{mandate.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Runs {mandate.frequency}</span>
              {mandate.timeOfDay && <span className="ml-1">at {mandate.timeOfDay}</span>}
            </div>
            
            {mandate.lastRun && (
              <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Last ran {timeAgo}</span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full gap-2"
            disabled={!mandate.isActive}
          >
            <Play className="h-4 w-4" />
            Run Now
          </Button>
        </CardFooter>
      </Card>
      
      {isEditing && (
        <MandateEditDialog
          mandate={mandate}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditing(false)}
          open={isEditing}
          setOpen={setIsEditing}
        />
      )}
    </>
  );
};
