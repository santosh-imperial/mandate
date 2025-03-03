
import { ReactNode } from "react";

export interface Event {
  id: string;
  title: string;
  time: string;
  hourIndex: number; // 0-23 for hours of the day
  suggestions: Suggestion[];
}

export type ContentType = "text" | "image" | "graph" | "link" | "news";

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
  content?: ReactNode;
}
