
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
