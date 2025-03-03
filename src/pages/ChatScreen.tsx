
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  suggestions?: string[];
}

const ChatScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "How about I help you learn about basics of investing? and every week I will share with you the information that will help you make investment decisions",
      isUser: false,
      suggestions: ["Yes, that sounds good", "help me only learn", "Help me only with information"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const newUserMessage: ChatMessage = {
        id: Date.now().toString(),
        content: inputValue,
        isUser: true
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setInputValue("");
      
      // Simulate AI response after a short delay
      setTimeout(() => {
        const newAiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: "I understand you're interested in that topic. What specific aspects would you like to know more about?",
          isUser: false,
          suggestions: ["Tell me more", "Can you give examples?", "What are the risks?"]
        };
        
        setMessages(prev => [...prev, newAiMessage]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Add the suggestion as a user message
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      content: suggestion,
      isUser: true
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const newAiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Great choice! Here's some information about "${suggestion}"...`,
        isUser: false,
        suggestions: ["Tell me more", "Can you explain differently?", "What should I do next?"]
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/")}
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-medium">MANDATE</h1>
          </div>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`${message.isUser ? 'ml-auto' : ''} max-w-[85%] md:max-w-[75%]`}>
              {/* Message Bubble */}
              <div className={`p-4 rounded-lg ${
                message.isUser 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                <p className="text-base">{message.content}</p>
              </div>
              
              {/* Suggestions */}
              {!message.isUser && message.suggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-2 border border-border rounded-full text-sm hover:bg-accent transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-grow border border-input rounded-lg focus-within:ring-1 focus-within:ring-ring">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Add text"
                className="w-full px-4 py-3 bg-transparent text-foreground resize-none focus:outline-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className={`mb-1 ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-right text-muted-foreground">
            <a href="#" className="hover:underline">Preferences</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
