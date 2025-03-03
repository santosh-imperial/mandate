
import { Task } from "./types";

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Prepare presentation slides",
    description: "Create PowerPoint slides for the client meeting on Thursday",
    completed: false,
    priority: "high",
    dueDate: new Date(2023, 11, 15),
    tags: ["work", "client", "presentation"],
    createdAt: new Date(2023, 11, 10)
  },
  {
    id: "task-2",
    title: "Complete expense report",
    description: "Submit expense report for the business trip last week",
    completed: true,
    priority: "medium",
    dueDate: new Date(2023, 11, 12),
    tags: ["work", "finance"],
    createdAt: new Date(2023, 11, 8)
  },
  {
    id: "task-3",
    title: "Schedule doctor appointment",
    description: "Annual physical check-up",
    completed: false,
    priority: "medium",
    dueDate: new Date(2023, 11, 20),
    tags: ["health", "personal"],
    createdAt: new Date(2023, 11, 7)
  },
  {
    id: "task-4",
    title: "Pick up dry cleaning",
    description: "Ticket #A45B at Main Street Cleaners",
    completed: false,
    priority: "low",
    dueDate: new Date(2023, 11, 14),
    tags: ["errands"],
    createdAt: new Date(2023, 11, 10)
  },
  {
    id: "task-5",
    title: "Research vacation options",
    description: "Look into beach resorts for spring break",
    completed: false,
    priority: "low",
    tags: ["personal", "vacation"],
    createdAt: new Date(2023, 11, 5)
  },
  {
    id: "task-6",
    title: "Call internet service provider",
    description: "Discuss billing discrepancy on last month's statement",
    completed: false,
    priority: "high",
    dueDate: new Date(2023, 11, 13),
    tags: ["home", "finance"],
    createdAt: new Date(2023, 11, 9)
  },
  {
    id: "task-7",
    title: "Update resume",
    description: "Add recent project experience",
    completed: false,
    priority: "medium",
    tags: ["career", "personal"],
    createdAt: new Date(2023, 11, 6)
  },
  {
    id: "task-8",
    title: "Buy birthday gift",
    description: "Find a gift for Mom's birthday next week",
    completed: false,
    priority: "medium",
    dueDate: new Date(2023, 11, 18),
    tags: ["personal", "shopping"],
    createdAt: new Date(2023, 11, 8)
  }
];
