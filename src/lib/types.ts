import { ReactNode } from "react";

export interface Event {
  id: string;
  title: string;
  time: string;
  hourIndex: number; // 0-23 for hours of the day
  suggestions: Suggestion[];
  category?: EventCategory; // Adding category field for color coding
}

export type EventCategory = 
  | 'meeting'
  | 'travel'
  | 'reminder'
  | 'errand'
  | 'goal'
  | 'routine';

export type ContentType = "text" | "image" | "graph" | "link" | "news";

export interface NewsItem {
  title: string;
  source: string;
  attribution?: string;
  time: string;
}

export interface Suggestion {
  id: string;
  type: ContentType;
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  chartData?: any;
  source?: string;
  date?: string;
  content?: NewsItem[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  source: 'google' | 'outlook' | 'apple' | 'manual';
}

export interface CalendarIntegration {
  id: string;
  type: 'google' | 'outlook' | 'apple';
  connected: boolean;
  lastSynced?: Date;
}

export type MandateType = 
  | 'travel'
  | 'meeting'
  | 'task'
  | 'reminder'
  | 'research'
  | 'weather'
  | 'news'
  | 'finance'
  | 'health'
  | 'custom';

export interface MandateTemplate {
  id: string;
  type: MandateType;
  name: string;
  description: string;
  icon: string;
  fields: MandateField[];
  isActive?: boolean;
  lastRun?: Date;
}

export interface MandateField {
  id: string;
  name: string;
  type: 'text' | 'select' | 'time' | 'date' | 'location' | 'toggle';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  value?: string | boolean;
}

export interface ConfiguredMandate extends MandateTemplate {
  isActive: boolean;
  lastRun?: Date;
  frequency: 'daily' | 'weekly' | 'monthly' | 'onDemand';
  timeOfDay?: string;
  daysOfWeek?: number[];
  fields: MandateField[];
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
}

export interface CustomMandateConfig {
  id: string;
  name: string;
  description: string;
  userCase: string;
  intelligence: {
    model: string;
  };
  conditioning: {
    instructions: string;
    knowledgeBase: {
      enabled: boolean;
      documents: string[];
    };
    finetuning: {
      enabled: boolean;
      examples: Array<{
        input: string;
        output: string;
      }>;
    };
  };
  access: {
    tools: {
      enabled: boolean;
      connectedApis: string[];
    };
    computerAccess: {
      enabled: boolean;
      permissions: string[];
    };
  };
  memory: {
    shortTerm: {
      conversationCount: number;
    };
    longTermWrite: boolean;
    longTermRead: boolean;
  };
  preferences: string[];
  type: MandateType;
  icon: string;
  isActive: boolean;
}
