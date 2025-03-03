
import { ReactNode } from "react";

export interface Event {
  id: string;
  title: string;
  time: string;
  hourIndex: number; // 0-23 for hours of the day
  suggestions: Suggestion[];
}

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
