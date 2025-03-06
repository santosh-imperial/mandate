
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, Send, Check, Book, Info, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
      suggestions: ["Yes, that sounds good", "Help me only learn", "Help me only with information"]
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
        let newAiMessage: ChatMessage;
        
        // Check the message count to determine which response to send
        if (messages.length === 1) {
          newAiMessage = {
            id: (Date.now() + 1).toString(),
            content: "Perfect! This is the plan, I am thinking. I will create a learning flow and email you when it is ready.",
            isUser: false,
          };
          
          setMessages(prev => [...prev, newAiMessage]);
          
          // Add the second AI message after another short delay
          setTimeout(() => {
            const secondAiMessage: ChatMessage = {
              id: (Date.now() + 2).toString(),
              content: "For helping you with the investment decisions, I need some more information from you. I would recommend going over them after a week or two of learning but If you prefer to get started now? I can go ahead",
              isUser: false,
              suggestions: ["What do you think of the plan?"]
            };
            
            setMessages(prev => [...prev, secondAiMessage]);
          }, 1500);
        } else if (messages.length === 3) {
          newAiMessage = {
            id: (Date.now() + 1).toString(),
            content: "The first choice we need to make is",
            isUser: false,
          };
          
          setMessages(prev => [...prev, newAiMessage]);
          
          // Add the model selection message
          setTimeout(() => {
            const modelSelectionMessage: ChatMessage = {
              id: (Date.now() + 2).toString(),
              content: "Choose the intelligence your mandate should have",
              isUser: false,
              suggestions: ["GPT", "Claude"]
            };
            
            setMessages(prev => [...prev, modelSelectionMessage]);
          }, 1500);
        } else {
          newAiMessage = {
            id: (Date.now() + 1).toString(),
            content: "I understand. Let's proceed with that option.",
            isUser: false,
            suggestions: ["Tell me more", "What's next?", "Can I change my mind later?"]
          };
          
          setMessages(prev => [...prev, newAiMessage]);
        }
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
      let newAiMessage: ChatMessage;
      
      // Check specific suggestion clicks
      if (suggestion === "Yes, that sounds good") {
        newAiMessage = {
          id: (Date.now() + 1).toString(),
          content: "Perfect! This is the plan, I am thinking. I will create a learning flow and email you when it is ready.",
          isUser: false,
        };
        
        setMessages(prev => [...prev, newAiMessage]);
        
        // Add the second AI message after another short delay
        setTimeout(() => {
          const secondAiMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            content: "For helping you with the investment decisions, I need some more information from you. I would recommend going over them after a week or two of learning but If you prefer to get started now? I can go ahead",
            isUser: false,
            suggestions: ["What do you think of the plan?"]
          };
          
          setMessages(prev => [...prev, secondAiMessage]);
        }, 1500);
      } else if (suggestion === "Help me only learn") {
        newAiMessage = {
          id: (Date.now() + 1).toString(),
          content: "Great! I'll focus on teaching you the basics of investing. Let's start with some fundamental concepts.",
          isUser: false,
          suggestions: ["Tell me about stocks", "Explain bonds", "What are mutual funds?"]
        };
        
        setMessages(prev => [...prev, newAiMessage]);
      } else if (suggestion === "Help me only with information") {
        newAiMessage = {
          id: (Date.now() + 1).toString(),
          content: "I'll help you with investment information and decision-making. To provide the most relevant guidance, I need to understand your goals.",
          isUser: false,
          suggestions: ["Long-term investing", "Short-term trading", "Retirement planning"]
        };
        
        setMessages(prev => [...prev, newAiMessage]);
      } else if (suggestion === "What do you think of the plan?") {
        newAiMessage = {
          id: (Date.now() + 1).toString(),
          content: "The first choice we need to make is",
          isUser: false,
        };
        
        setMessages(prev => [...prev, newAiMessage]);
        
        // Add the model selection message
        setTimeout(() => {
          const modelSelectionMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            content: "Choose the intelligence your mandate should have",
            isUser: false,
            suggestions: ["GPT", "Claude"]
          };
          
          setMessages(prev => [...prev, modelSelectionMessage]);
        }, 1500);
      } else {
        newAiMessage = {
          id: (Date.now() + 1).toString(),
          content: "Great! I'll help you with that next step.",
          isUser: false,
          suggestions: ["Tell me more", "What's next?", "Can I change my mind later?"]
        };
        
        setMessages(prev => [...prev, newAiMessage]);
      }
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
      <Header />

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
                      className={`px-3 py-2 border border-border rounded-full text-sm hover:bg-accent transition-colors flex items-center gap-2`}
                    >
                      {suggestion === "Yes, that sounds good" && <Check className="h-4 w-4" />}
                      {suggestion === "Help me only learn" && <Book className="h-4 w-4" />}
                      {suggestion === "Help me only with information" && <Info className="h-4 w-4" />}
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              {/* "or something else?" text for first message */}
              {message.id === "1" && message.suggestions && (
                <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
                  <MoreHorizontal className="h-3 w-3" />
                  <span>or something else?</span>
                </div>
              )}
              
              {/* Model Selection Cards */}
              {!message.isUser && message.content === "Choose the intelligence your mandate should have" && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleSuggestionClick("GPT")}
                    className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="w-12 h-12 bg-muted flex items-center justify-center rounded mb-2">
                      <span className="text-muted-foreground">🖼️</span>
                    </div>
                    <span className="font-medium">GPT</span>
                    <span className="text-xs text-muted-foreground">Get the best reasoning models from OpenAI</span>
                  </button>
                  <button 
                    onClick={() => handleSuggestionClick("Claude")}
                    className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="w-12 h-12 bg-muted flex items-center justify-center rounded mb-2">
                      <span className="text-muted-foreground">🖼️</span>
                    </div>
                    <span className="font-medium">Claude</span>
                    <span className="text-xs text-muted-foreground">Get the best reasoning models from Anthropic</span>
                  </button>
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
