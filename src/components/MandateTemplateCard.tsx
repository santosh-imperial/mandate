
import { MandateTemplate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface MandateTemplateCardProps {
  template: MandateTemplate;
  onClick: () => void;
}

export const MandateTemplateCard = ({ template, onClick }: MandateTemplateCardProps) => {
  // Use a safer approach to dynamically get the icon
  const iconName = template.icon.charAt(0).toUpperCase() + template.icon.slice(1);
  // Cast LucideIcons to any to avoid TypeScript errors with dynamic access
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Bot;

  return (
    <div className="border rounded-lg p-6 hover:border-primary transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-primary/10 rounded-md p-2">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="gap-1" 
          onClick={onClick}
        >
          <Plus className="h-3.5 w-3.5" />
          Configure
        </Button>
      </div>
      
      <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{template.description}</p>
      
      <div className="text-xs text-muted-foreground">
        <span className="uppercase font-medium">Type: </span>
        <span className="capitalize">{template.type}</span>
      </div>
    </div>
  );
};
