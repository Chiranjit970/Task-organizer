import { PriorityLevel } from '@/types/task';

const PRIORITY_KEYWORDS = {
  critical: 5,
  urgent: 4,
  asap: 4,
  'as soon as possible': 4,
  deadline: 4,
  important: 3,
  priority: 3,
  'high priority': 4,
  emergency: 5,
  'time sensitive': 4,
  'due today': 4,
  'due tomorrow': 3,
  meeting: 3,
  presentation: 3,
  interview: 4,
  exam: 4,
  test: 3,
  project: 2,
  review: 2,
  call: 2,
  email: 1,
  research: 1,
  read: 1,
  later: 1,
  someday: 1,
  maybe: 1
};

export function calculatePriority(name: string, description: string): number {
  const text = `${name} ${description}`.toLowerCase();
  let priorityScore = PriorityLevel.MEDIUM; // Default priority
  
  // Check for priority keywords
  Object.entries(PRIORITY_KEYWORDS).forEach(([keyword, score]) => {
    if (text.includes(keyword)) {
      priorityScore = Math.max(priorityScore, score);
    }
  });
  
  // Check for time-related urgency indicators
  const timePatterns = [
    /today/i,
    /tomorrow/i,
    /this week/i,
    /end of day/i,
    /eod/i,
    /by \d+/i, // "by 5pm", "by Monday"
    /due/i,
    /deadline/i
  ];
  
  timePatterns.forEach(pattern => {
    if (pattern.test(text)) {
      priorityScore = Math.max(priorityScore, PriorityLevel.HIGH);
    }
  });
  
  // Check for exclamation marks (indicates urgency)
  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount > 0) {
    priorityScore = Math.max(priorityScore, PriorityLevel.HIGH);
  }
  
  // Check for ALL CAPS words (indicates emphasis/urgency)
  const capsWords = text.match(/\b[A-Z]{3,}\b/g);
  if (capsWords && capsWords.length > 0) {
    priorityScore = Math.max(priorityScore, PriorityLevel.HIGH);
  }
  
  return Math.min(priorityScore, PriorityLevel.CRITICAL); // Cap at critical level
}

export function getPriorityLabel(priority: number): string {
  switch (priority) {
    case PriorityLevel.CRITICAL:
      return 'Critical';
    case PriorityLevel.URGENT:
      return 'Urgent';
    case PriorityLevel.HIGH:
      return 'High';
    case PriorityLevel.MEDIUM:
      return 'Medium';
    case PriorityLevel.LOW:
      return 'Low';
    default:
      return 'Medium';
  }
}

export function getPriorityColor(priority: number): string {
  switch (priority) {
    case PriorityLevel.CRITICAL:
      return 'text-red-600 bg-red-50 border-red-200';
    case PriorityLevel.URGENT:
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case PriorityLevel.HIGH:
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case PriorityLevel.MEDIUM:
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case PriorityLevel.LOW:
      return 'text-gray-600 bg-gray-50 border-gray-200';
    default:
      return 'text-blue-600 bg-blue-50 border-blue-200';
  }
}