
import { Event } from "./types";

export const events: Event[] = [
  {
    id: "event-1",
    title: "Breakfast",
    time: "8 AM",
    hourIndex: 8,
    category: "routine",
    suggestions: [
      {
        id: "suggestion-1-1",
        type: "text",
        title: "Pancakes from Angie's",
        description: "Top-rated breakfast spot, 10 min away",
      }
    ]
  },
  {
    id: "event-2",
    title: "Travel to Work",
    time: "9 AM",
    hourIndex: 9,
    category: "travel",
    suggestions: [
      {
        id: "suggestion-2-1",
        type: "text",
        title: "Overground in 40 mins",
        description: "Regular service, minor delays at King's Cross",
      },
      {
        id: "suggestion-2-2",
        type: "text",
        title: "Tube in 30 mins",
        description: "Victoria Line running normally",
      }
    ]
  },
  {
    id: "event-3",
    title: "Check Market & News",
    time: "11 AM",
    hourIndex: 11,
    category: "routine",
    suggestions: [
      {
        id: "suggestion-3-1",
        type: "news",
        title: "Your portfolio is up by 2%",
        description: "Trump introduces tariffs on steel from UK - Impacts TTST (-2.21%)",
        content: [
          {
            title: "Newsletter: Case-Shiller: National House Price Index Up 3.9%",
            source: "Calculated Risk",
            time: "10h"
          },
          {
            title: "How to capture the next S-curve in commodity trading",
            source: "Gas and LNG profits surpass oil",
            attribution: "McKinsey",
            time: "1d"
          }
        ],
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [1200, 1300, 1150, 1400, 1300, 1500]
        }
      }
    ]
  },
  {
    id: "event-4",
    title: "Respond to emails",
    time: "12 PM",
    hourIndex: 12,
    category: "routine",
    suggestions: [
      {
        id: "suggestion-4-1",
        type: "text",
        title: "3 priority emails",
        description: "From client regarding project timeline",
      }
    ]
  },
  {
    id: "event-5",
    title: "Call with Team",
    time: "1 PM",
    hourIndex: 13,
    category: "meeting",
    suggestions: [
      {
        id: "suggestion-5-1",
        type: "text",
        title: "Meeting Notes",
        description: "Prepare quarterly review points",
      }
    ]
  },
  {
    id: "event-6",
    title: "Lunch",
    time: "2 PM",
    hourIndex: 14,
    category: "routine",
    suggestions: [
      {
        id: "suggestion-6-1",
        type: "text",
        title: "Pret A Manger",
        description: "New seasonal menu available",
      }
    ]
  },
  {
    id: "event-7",
    title: "Book Flight for US Trip",
    time: "4 PM",
    hourIndex: 16,
    category: "travel",
    suggestions: [
      {
        id: "suggestion-7-1",
        type: "text",
        title: "United Airlines",
        description: "Direct flight $430 return",
      }
    ]
  },
  {
    id: "event-8",
    title: "Buy Book for Friend's Birthday",
    time: "5 PM",
    hourIndex: 17,
    category: "routine",
    suggestions: [
      {
        id: "suggestion-8-1",
        type: "text",
        title: "The Silent Patient",
        description: "Bestseller, available at Waterstones",
      }
    ]
  },
  {
    id: "event-9",
    title: "1 hour of code",
    time: "6 PM",
    hourIndex: 18,
    category: "focus",
    suggestions: [
      {
        id: "suggestion-9-1",
        type: "text",
        title: "Finish React project",
        description: "Complete authentication module",
      }
    ]
  },
  {
    id: "event-10",
    title: "1 hour of Chinese",
    time: "7 PM",
    hourIndex: 19,
    category: "focus",
    suggestions: [
      {
        id: "suggestion-10-1",
        type: "text",
        title: "Duolingo lesson 5",
        description: "Focus on business vocabulary",
      }
    ]
  },
  {
    id: "event-11",
    title: "Dinner",
    time: "8 PM",
    hourIndex: 20,
    category: "routine",
    suggestions: [
      {
        id: "suggestion-11-1",
        type: "text",
        title: "Pasta recipe",
        description: "Quick carbonara, ingredients ready",
      }
    ]
  },
  {
    id: "event-12",
    title: "Get Ready for bed",
    time: "10 PM",
    hourIndex: 22,
    category: "routine",
    suggestions: [
      {
        id: "suggestion-12-1",
        type: "text",
        title: "Read 30 minutes",
        description: "Continue 'Thinking Fast and Slow'",
      }
    ]
  }
];
