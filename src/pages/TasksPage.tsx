import { useState } from "react";
import { tasks as initialTasks } from "@/lib/tasks-data";
import { Task } from "@/lib/types";
import { TaskItem } from "@/components/TaskItem";
import { TaskVoiceInput } from "@/components/TaskVoiceInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Check, List, Mic, Plus } from "lucide-react";
import { toast } from "sonner";
import { CalendarIntegration } from "@/components/CalendarIntegration";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [parentTaskId, setParentTaskId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const completedTasks = tasks.filter(task => 
    task.completed && (filterTag ? task.tags?.includes(filterTag) : true)
  );
  
  const pendingTasks = tasks.filter(task => 
    !task.completed && (filterTag ? task.tags?.includes(filterTag) : true)
  );

  const allTags = Array.from(
    new Set(tasks.flatMap(task => task.tags || []))
  );

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const taskTitle = tasks.find(t => t.id === id)?.title;
    toast(
      tasks.find(t => t.id === id)?.completed 
        ? `Task marked as incomplete: ${taskTitle}` 
        : `Task completed: ${taskTitle}`
    );
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (!taskToDelete) return;
    
    setTasks(tasks.filter(task => task.id !== id));
    toast(`Task deleted: ${taskToDelete.title}`);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    const newTaskObj: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description || undefined,
      completed: false,
      priority: newTask.priority,
      createdAt: new Date(),
      tags: []
    };

    if (parentTaskId) {
      const parentTask = tasks.find(task => task.id === parentTaskId);
      if (parentTask) {
        newTaskObj.title = `${newTaskObj.title} (sub-task of ${parentTask.title})`;
      }
    }

    setTasks([newTaskObj, ...tasks]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
    });
    setIsAddDialogOpen(false);
    setParentTaskId(null);
    toast.success(`New task added: ${newTask.title}`);
  };

  const handleAddSubtask = (parentId: string) => {
    setParentTaskId(parentId);
    setIsAddDialogOpen(true);
  };

  const handleAddTaskViaVoice = (title: string, description?: string) => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    const newTaskObj: Task = {
      id: `task-${Date.now()}`,
      title: title,
      description: description || undefined,
      completed: false,
      priority: "medium",
      createdAt: new Date(),
      tags: []
    };

    setTasks([newTaskObj, ...tasks]);
    setShowVoiceInput(false);
    toast.success(`New task added: ${title}`);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setIsAddDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editTask.id ? editTask : task
    ));
    
    setEditTask(null);
    setIsAddDialogOpen(false);
    toast.success(`Task updated: ${editTask.title}`);
  };

  const handleDialogClose = () => {
    setEditTask(null);
    setParentTaskId(null);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
    });
  };

  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(prev => [...importedTasks, ...prev]);
    toast.success(`Imported ${importedTasks.length} tasks from calendar`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Manage your tasks and stay organized
            </p>
          </header>

          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">
                <span className="mr-2">Task List</span>
                <Badge variant="secondary">{tasks.length}</Badge>
              </h2>
              <p className="text-sm text-muted-foreground">
                {pendingTasks.length} pending, {completedTasks.length} completed
              </p>
            </div>

            <div className="flex gap-2">
              <CalendarIntegration onImportTasks={handleImportTasks} />
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowVoiceInput(true)}
              >
                <Mic className="h-4 w-4" />
                Voice/Chat
              </Button>
              
              <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                setIsAddDialogOpen(open);
                if (!open) handleDialogClose();
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editTask ? "Edit Task" : parentTaskId ? "Add Subtask" : "Add New Task"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input 
                        id="title" 
                        value={editTask ? editTask.title : newTask.title}
                        onChange={(e) => editTask 
                          ? setEditTask({...editTask, title: e.target.value}) 
                          : setNewTask({...newTask, title: e.target.value})
                        }
                        placeholder={parentTaskId ? "Subtask title" : "Task title"}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description (optional)
                      </label>
                      <Input 
                        id="description" 
                        value={editTask ? editTask.description || "" : newTask.description}
                        onChange={(e) => editTask 
                          ? setEditTask({...editTask, description: e.target.value}) 
                          : setNewTask({...newTask, description: e.target.value})
                        }
                        placeholder="Task description"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <div className="flex gap-2">
                        {["low", "medium", "high"].map((priority) => (
                          <Button
                            key={priority}
                            type="button"
                            variant={
                              (editTask ? editTask.priority : newTask.priority) === priority 
                                ? "default" 
                                : "outline"
                            }
                            onClick={() => editTask 
                              ? setEditTask({...editTask, priority: priority as "low" | "medium" | "high"}) 
                              : setNewTask({...newTask, priority: priority as "low" | "medium" | "high"})
                            }
                          >
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={editTask ? handleSaveEdit : handleAddTask}>
                      {editTask ? "Save Changes" : parentTaskId ? "Add Subtask" : "Add Task"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {showVoiceInput && (
            <TaskVoiceInput 
              onAddTask={handleAddTaskViaVoice}
              onClose={() => setShowVoiceInput(false)}
            />
          )}
          
          {allTags.length > 0 && (
            <div className="mb-6">
              <div className="text-sm font-medium mb-2">Filter by tag</div>
              <div className="flex flex-wrap gap-2">
                {filterTag && (
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => setFilterTag(null)}
                  >
                    Clear filter
                  </Badge>
                )}
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={filterTag === tag ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilterTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="gap-2">
                <List className="h-4 w-4" />
                Pending ({pendingTasks.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <Check className="h-4 w-4" />
                Completed ({completedTasks.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-1">
              {pendingTasks.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No pending tasks</h3>
                  <p className="text-muted-foreground mb-6">
                    {filterTag 
                      ? `No pending tasks with tag "${filterTag}"` 
                      : "You're all caught up!"}
                  </p>
                  <Button 
                    onClick={() => setIsAddDialogOpen(true)} 
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add a task
                  </Button>
                </div>
              ) : (
                pendingTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    onAddSubtask={handleAddSubtask}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-1">
              {completedTasks.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No completed tasks</h3>
                  <p className="text-muted-foreground">
                    {filterTag 
                      ? `No completed tasks with tag "${filterTag}"` 
                      : "Complete some tasks to see them here"}
                  </p>
                </div>
              ) : (
                completedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    onAddSubtask={handleAddSubtask}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
