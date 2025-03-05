
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
      },
      {
        id: "suggestion-1-2",
        type: "text",
        title: "Healthy Smoothie Bowl",
        description: "Quick recipe: banana, berries, yogurt and granola",
      },
      {
        id: "suggestion-1-3",
        type: "text",
        title: "Avocado Toast",
        description: "Trending at local cafes, or make at home in 5 min",
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
      },
      {
        id: "suggestion-2-3",
        type: "text",
        title: "Uber Pool - £9.50",
        description: "3 min wait, arrives at work in 22 min",
      },
      {
        id: "suggestion-2-4",
        type: "text",
        title: "Cycle route - 25 mins",
        description: "Weather: 18°C, partly cloudy, bike share available",
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
      },
      {
        id: "suggestion-3-2",
        type: "news",
        title: "Tech sector rallies",
        description: "NVIDIA up 5.2% on new AI chip announcement",
        content: [
          {
            title: "AI chip race heats up with new entrants",
            source: "TechCrunch",
            time: "3h"
          },
          {
            title: "Cloud computing stocks show strong Q2 growth",
            source: "Market Watch",
            time: "5h"
          }
        ],
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [2100, 2000, 2300, 2500, 2400, 2800]
        }
      },
      {
        id: "suggestion-3-3",
        type: "text",
        title: "Market summary",
        description: "S&P 500: +0.8%, NASDAQ: +1.2%, FTSE: +0.3%",
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
      },
      {
        id: "suggestion-4-2",
        type: "text",
        title: "Draft email templates",
        description: "Use AI assistant to create response templates",
      },
      {
        id: "suggestion-4-3",
        type: "text",
        title: "Schedule email follow-ups",
        description: "Set reminders for 5 pending responses",
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
      },
      {
        id: "suggestion-5-2",
        type: "text",
        title: "Presentation deck",
        description: "Share screen - 12 slides ready",
      },
      {
        id: "suggestion-5-3",
        type: "text",
        title: "Meeting agenda",
        description: "1. Project updates 2. Budget review 3. Next steps",
      },
      {
        id: "suggestion-5-4",
        type: "text",
        title: "Video call link",
        description: "Zoom meeting ID: 825 4567 9012",
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
      },
      {
        id: "suggestion-6-2",
        type: "text",
        title: "Meal prep container",
        description: "Quinoa salad in office fridge",
      },
      {
        id: "suggestion-6-3",
        type: "text",
        title: "Order delivery",
        description: "Deliveroo: 20% off at local sushi place",
      },
      {
        id: "suggestion-6-4",
        type: "text",
        title: "Team lunch option",
        description: "Mexican place around the corner has table for 5",
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
      },
      {
        id: "suggestion-7-2",
        type: "text",
        title: "British Airways",
        description: "Premium Economy $650, extra miles with Avios",
      },
      {
        id: "suggestion-7-3",
        type: "text",
        title: "Delta via JFK",
        description: "$380 with 2hr layover, arrives 8:30pm local",
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
      },
      {
        id: "suggestion-8-2",
        type: "text",
        title: "Amazon Prime delivery",
        description: "Order by 8pm for delivery tomorrow",
      },
      {
        id: "suggestion-8-3",
        type: "text",
        title: "Audiobook gift",
        description: "Audible subscription: first month free",
      },
      {
        id: "suggestion-8-4",
        type: "text",
        title: "Local bookshop",
        description: "Daunt Books open until 7pm, can gift wrap",
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
      },
      {
        id: "suggestion-9-2",
        type: "text",
        title: "Debug API issue",
        description: "Check API response formatting in console",
      },
      {
        id: "suggestion-9-3",
        type: "text",
        title: "Update dependencies",
        description: "Run npm audit and update packages",
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
      },
      {
        id: "suggestion-10-2",
        type: "text",
        title: "Language exchange",
        description: "Virtual session with Wei - 30 minutes",
      },
      {
        id: "suggestion-10-3",
        type: "text",
        title: "Chinese podcast",
        description: "ChinesePod: Intermediate business meeting",
      },
      {
        id: "suggestion-10-4",
        type: "text",
        title: "Flashcard review",
        description: "100 most common characters - 15 min",
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
      },
      {
        id: "suggestion-11-2",
        type: "text",
        title: "Order takeaway",
        description: "Thai place has 25% off tonight",
      },
      {
        id: "suggestion-11-3",
        type: "text",
        title: "Dinner reservation",
        description: "Table for 2 at Local Bistro at 8:30pm",
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
      },
      {
        id: "suggestion-12-2",
        type: "text",
        title: "Meditation session",
        description: "10-minute sleep meditation on Headspace",
      },
      {
        id: "suggestion-12-3",
        type: "text",
        title: "Set morning alarm",
        description: "Wake-up time: 7:00am - meetings start at 9",
      },
      {
        id: "suggestion-12-4",
        type: "text",
        title: "Journal entry",
        description: "5 minutes reflection on today's achievements",
      }
    ]
  }
];

