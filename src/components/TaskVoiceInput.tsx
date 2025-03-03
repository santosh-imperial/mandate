
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, X } from "lucide-react";
import { toast } from "sonner";

interface TaskVoiceInputProps {
  onAddTask: (taskTitle: string, taskDescription?: string) => void;
  onClose: () => void;
}

export function TaskVoiceInput({ onAddTask, onClose }: TaskVoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptValue = result[0].transcript;
        setTranscript(transcriptValue);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        toast.error("Failed to recognize speech. Please try again.");
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
      toast("Listening... Speak now");
    }
  };

  const handleSubmitVoice = () => {
    if (transcript.trim()) {
      // Parse for task title and description
      let title = transcript;
      let description = "";
      
      // If transcript contains "called" or "named", try to extract title/description
      const separators = [" with description ", " with details ", " with note ", ": ", " - "];
      
      for (const separator of separators) {
        if (transcript.includes(separator)) {
          const parts = transcript.split(separator);
          title = parts[0].trim();
          description = parts.slice(1).join(separator).trim();
          break;
        }
      }
      
      onAddTask(title, description);
      setTranscript("");
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      toast.error("Please speak a task title");
    }
  };

  const handleSubmitTyped = () => {
    if (inputValue.trim()) {
      // Parse for task title and description
      let title = inputValue;
      let description = "";
      
      // Check for common separators to split title and description
      const separators = [" with description ", " with details ", " with note ", ": ", " - "];
      
      for (const separator of separators) {
        if (inputValue.includes(separator)) {
          const parts = inputValue.split(separator);
          title = parts[0].trim();
          description = parts.slice(1).join(separator).trim();
          break;
        }
      }
      
      onAddTask(title, description);
      setInputValue("");
    } else {
      toast.error("Please enter a task title");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitTyped();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Add Task via Voice or Text</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Voice Input Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button 
                onClick={toggleListening}
                variant={isListening ? "destructive" : "default"}
                className="gap-2"
              >
                <Mic className="h-4 w-4" />
                {isListening ? "Stop Listening" : "Start Speaking"}
              </Button>
              
              <Button
                onClick={() => setShowTyping(true)}
                variant="outline"
                className="gap-2"
              >
                Prefer typing?
              </Button>
            </div>
            
            {isListening && (
              <div className="text-sm text-muted-foreground mt-1">
                Speak clearly. You can say "Buy milk with description Get 2% milk from the store"
              </div>
            )}
            
            {transcript && (
              <div className="mt-4 space-y-2">
                <div className="p-3 border rounded-lg bg-muted">
                  <p className="font-medium">Recognized speech:</p>
                  <p className="text-sm">{transcript}</p>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSubmitVoice}>
                    Add This Task
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Text Input Section */}
          {showTyping && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Type your task. Format: "Task title: Task description" or "Task title - Task description"
              </p>
              
              <div className="flex gap-2 items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter task details..."
                  className="flex-1"
                />
                <Button onClick={handleSubmitTyped} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
