
import { MandateTemplate } from './types';

export const mandateTemplates: MandateTemplate[] = [
  {
    id: 'travel-planner',
    type: 'travel',
    name: 'Daily Commute Planner',
    description: 'Plan your daily commute between home and work with real-time traffic updates',
    icon: 'map-pin',
    fields: [
      {
        id: 'home-address',
        name: 'homeAddress',
        type: 'location',
        label: 'Home Address',
        placeholder: 'Enter your home address',
        required: true
      },
      {
        id: 'work-address',
        name: 'workAddress',
        type: 'location',
        label: 'Work Address',
        placeholder: 'Enter your work address',
        required: true
      },
      {
        id: 'transport-mode',
        name: 'transportMode',
        type: 'select',
        label: 'Preferred Mode of Transport',
        required: true,
        options: ['Drive', 'Public Transport', 'Walk', 'Cycle']
      },
      {
        id: 'arrival-time',
        name: 'arrivalTime',
        type: 'time',
        label: 'Preferred Arrival Time',
        required: true
      }
    ]
  },
  {
    id: 'meeting-prep',
    type: 'meeting',
    name: 'Meeting Preparation',
    description: 'Get AI-powered meeting briefs and relevant documents before your meetings',
    icon: 'users',
    fields: [
      {
        id: 'calendar-integration',
        name: 'calendarIntegration',
        type: 'select',
        label: 'Calendar Integration',
        required: true,
        options: ['Google Calendar', 'Microsoft Outlook', 'Apple Calendar']
      },
      {
        id: 'prep-time',
        name: 'prepTime',
        type: 'select',
        label: 'Preparation Time',
        required: true,
        options: ['30 minutes before', '1 hour before', '2 hours before', '1 day before']
      },
      {
        id: 'include-documents',
        name: 'includeDocuments',
        type: 'toggle',
        label: 'Include Relevant Documents',
        required: false
      }
    ]
  },
  {
    id: 'news-summary',
    type: 'news',
    name: 'Daily News Digest',
    description: 'Receive a personalized summary of top news stories based on your interests',
    icon: 'newspaper',
    fields: [
      {
        id: 'interests',
        name: 'interests',
        type: 'text',
        label: 'Interests (comma separated)',
        placeholder: 'e.g., Technology, Finance, Science',
        required: true
      },
      {
        id: 'delivery-time',
        name: 'deliveryTime',
        type: 'time',
        label: 'Delivery Time',
        required: true
      },
      {
        id: 'max-stories',
        name: 'maxStories',
        type: 'select',
        label: 'Maximum Stories',
        required: true,
        options: ['3', '5', '10', '15']
      }
    ]
  },
  {
    id: 'weather-forecast',
    type: 'weather',
    name: 'Weather Alert',
    description: 'Get weather forecasts and alerts for your day',
    icon: 'cloud',
    fields: [
      {
        id: 'location',
        name: 'location',
        type: 'location',
        label: 'Location',
        placeholder: 'Enter a location',
        required: true
      },
      {
        id: 'alert-time',
        name: 'alertTime',
        type: 'time',
        label: 'Alert Time',
        required: true
      },
      {
        id: 'alert-conditions',
        name: 'alertConditions',
        type: 'select',
        label: 'Alert for Conditions',
        required: false,
        options: ['Rain', 'Snow', 'Extreme Heat', 'Extreme Cold', 'All']
      }
    ]
  },
  {
    id: 'task-prioritizer',
    type: 'task',
    name: 'Task Prioritizer',
    description: 'Automatically prioritize your tasks based on deadlines and importance',
    icon: 'list-checks',
    fields: [
      {
        id: 'task-source',
        name: 'taskSource',
        type: 'select',
        label: 'Task Source',
        required: true,
        options: ['Mandate Tasks', 'Google Tasks', 'Microsoft To Do', 'Apple Reminders']
      },
      {
        id: 'prioritization-time',
        name: 'prioritizationTime',
        type: 'time',
        label: 'When to Prioritize',
        required: true
      },
      {
        id: 'consider-calendar',
        name: 'considerCalendar',
        type: 'toggle',
        label: 'Consider Calendar Availability',
        required: false
      }
    ]
  },
  {
    id: 'research-assistant',
    type: 'research',
    name: 'Research Assistant',
    description: 'Get AI-powered research on topics relevant to your upcoming meetings or tasks',
    icon: 'search',
    fields: [
      {
        id: 'research-topics',
        name: 'researchTopics',
        type: 'text',
        label: 'Research Keywords',
        placeholder: 'Enter keywords or topics',
        required: true
      },
      {
        id: 'depth',
        name: 'depth',
        type: 'select',
        label: 'Research Depth',
        required: true,
        options: ['Brief overview', 'Detailed summary', 'Comprehensive analysis']
      },
      {
        id: 'sources',
        name: 'sources',
        type: 'select',
        label: 'Preferred Sources',
        required: false,
        options: ['Academic', 'News', 'Industry Reports', 'All']
      }
    ]
  }
];

export const userConfiguredMandates: ConfiguredMandate[] = [
  {
    ...mandateTemplates[0],
    isActive: true,
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24),
    frequency: 'daily',
    timeOfDay: '07:00',
    fields: [
      {
        id: 'home-address',
        name: 'homeAddress',
        type: 'location',
        label: 'Home Address',
        placeholder: 'Enter your home address',
        required: true,
        value: '123 Home Street, San Francisco, CA'
      },
      {
        id: 'work-address',
        name: 'workAddress',
        type: 'location',
        label: 'Work Address',
        placeholder: 'Enter your work address',
        required: true,
        value: '456 Office Building, San Francisco, CA'
      },
      {
        id: 'transport-mode',
        name: 'transportMode',
        type: 'select',
        label: 'Preferred Mode of Transport',
        required: true,
        options: ['Drive', 'Public Transport', 'Walk', 'Cycle'],
        value: 'Public Transport'
      },
      {
        id: 'arrival-time',
        name: 'arrivalTime',
        type: 'time',
        label: 'Preferred Arrival Time',
        required: true,
        value: '09:00'
      }
    ]
  }
];
