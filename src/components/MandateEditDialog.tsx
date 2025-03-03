
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ConfiguredMandate, MandateField } from "@/lib/types";

interface MandateEditDialogProps {
  mandate: ConfiguredMandate;
  onSave: (mandate: ConfiguredMandate) => void;
  onCancel: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const MandateEditDialog = ({ 
  mandate, 
  onSave, 
  onCancel,
  open,
  setOpen
}: MandateEditDialogProps) => {
  const [editedMandate, setEditedMandate] = useState<ConfiguredMandate>({ ...mandate });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (id: string, value: string | boolean) => {
    setEditedMandate({
      ...editedMandate,
      fields: editedMandate.fields.map(field => 
        field.id === id ? { ...field, value } : field
      )
    });
    
    // Clear the error for this field if it exists
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: "" });
    }
  };

  const handleFrequencyChange = (frequency: string) => {
    setEditedMandate({
      ...editedMandate,
      frequency: frequency as "daily" | "weekly" | "monthly" | "onDemand"
    });
  };

  const handleTimeOfDayChange = (time: string) => {
    setEditedMandate({
      ...editedMandate,
      timeOfDay: time
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;
    
    editedMandate.fields.forEach(field => {
      if (field.required && (!field.value || field.value === "")) {
        errors[field.id] = "This field is required";
        isValid = false;
      }
    });
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave(editedMandate);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {mandate.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Execution Schedule</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-frequency">Frequency</Label>
                <Select 
                  value={editedMandate.frequency} 
                  onValueChange={handleFrequencyChange}
                >
                  <SelectTrigger id="edit-frequency">
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
              
              {editedMandate.frequency !== "onDemand" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-timeOfDay">Time of Day</Label>
                  <Input
                    id="edit-timeOfDay"
                    type="time"
                    value={editedMandate.timeOfDay || ""}
                    onChange={(e) => handleTimeOfDayChange(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Configuration Details</h3>
            
            <div className="space-y-4">
              {editedMandate.fields.map(field => (
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
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
