
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Check, Trash, Edit, Calendar, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onAddSubtask?: (parentId: string) => void;
}

export const TaskItem = ({ 
  task, 
  onComplete, 
  onDelete, 
  onEdit, 
  onAddSubtask = () => {} 
}: TaskItemProps) => {
  const priorityClasses = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };

  return (
    <div className={cn(
      "p-4 mb-3 border rounded-lg transition-all hover:shadow-md",
      task.completed ? "bg-muted/50" : "bg-card"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Button 
            size="icon" 
            variant={task.completed ? "default" : "outline"} 
            className="mt-0.5 h-6 w-6 rounded-full"
            onClick={() => onComplete(task.id)}
          >
            {task.completed && <Check className="h-4 w-4" />}
          </Button>
          
          <div className="space-y-1">
            <h3 className={cn(
              "font-medium text-base",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-muted-foreground max-w-md">
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={priorityClasses[task.priority]}>
                {task.priority}
              </Badge>
              
              {task.dueDate && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(task.dueDate, "MMM d")}
                </Badge>
              )}
              
              {task.tags?.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            size="icon"
            variant="ghost"
            className="text-primary hover:bg-primary/10"
            onClick={() => onAddSubtask(task.id)}
            title="Add subtask"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(task)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(task.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
