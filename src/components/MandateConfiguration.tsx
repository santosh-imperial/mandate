
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfiguredMandate, MandateField, MandateTemplate } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface MandateConfigurationProps {
  template: MandateTemplate;
  onSave: (mandate: ConfiguredMandate) => void;
  onCancel: () => void;
  existingMandates: ConfiguredMandate[];
}

export const MandateConfiguration = ({ 
  template, 
  onSave, 
  onCancel,
  existingMandates 
}: MandateConfigurationProps) => {
  const [mandateFields, setMandateFields] = useState<MandateField[]>(
    template.fields.map(field => ({ ...field, value: field.value || "" }))
  );
  
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly" | "onDemand">("daily");
  const [timeOfDay, setTimeOfDay] = useState("08:00");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (id: string, value: string | boolean) => {
    setMandateFields(
      mandateFields.map(field => field.id === id ? { ...field, value } : field)
    );
    
    // Clear the error for this field if it exists
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: "" });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;
    
    mandateFields.forEach(field => {
      if (field.required && (!field.value || field.value === "")) {
        errors[field.id] = "This field is required";
        isValid = false;
      }
    });
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const configuredMandate: ConfiguredMandate = {
      ...template,
      isActive: true,
      frequency,
      timeOfDay,
      fields: mandateFields,
    };
    
    onSave(configuredMandate);
  };

  const renderFieldInput = (field: MandateField) => {
    switch (field.type) {
      case 'text':
      case 'location':
      case 'date':
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            value={field.value as string || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={formErrors[field.id] ? "border-destructive" : ""}
          />
        );
      
      case 'time':
        return (
          <Input
            id={field.id}
            type="time"
            value={field.value as string || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={formErrors[field.id] ? "border-destructive" : ""}
          />
        );
      
      case 'select':
        return (
          <Select 
            value={field.value as string || ""} 
            onValueChange={(value) => handleFieldChange(field.id, value)}
          >
            <SelectTrigger className={formErrors[field.id] ? "border-destructive" : ""}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'toggle':
        return (
          <Switch
            id={field.id}
            checked={field.value as boolean || false}
            onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">{template.name}</h2>
      <p className="text-muted-foreground mb-8">{template.description}</p>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Execution Schedule</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select 
                value={frequency} 
                onValueChange={(value) => setFrequency(value as any)}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="onDemand">On Demand</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {frequency !== "onDemand" && (
              <div className="space-y-2">
                <Label htmlFor="timeOfDay">Time of Day</Label>
                <Input
                  id="timeOfDay"
                  type="time"
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Configuration Details</h3>
          
          <div className="space-y-6">
            {mandateFields.map(field => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={field.id} className="flex items-center gap-1">
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {field.type === 'toggle' && renderFieldInput(field)}
                </div>
                {field.type !== 'toggle' && renderFieldInput(field)}
                {formErrors[field.id] && (
                  <p className="text-xs text-destructive">{formErrors[field.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Configuration
        </Button>
      </div>
    </Card>
  );
};
