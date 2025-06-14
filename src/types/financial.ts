
export interface ExpenseCategory {
  id: string;
  name: string;
  emoji: string;
  amount: number;
  percentage: number;
  mood: 'happy' | 'neutral' | 'sad';
}

export interface SavingsGoal {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  currentAmount: number;
  petType: 'plant' | 'cat' | 'dragon' | 'unicorn';
  petStage: 1 | 2 | 3 | 4 | 5;
  daysLeft: number;
}

export interface SmartNotification {
  id: string;
  type: 'challenge' | 'insight' | 'achievement' | 'warning';
  title: string;
  message: string;
  emoji: string;
  actionText: string;
  isNew: boolean;
}

export interface PeerComparison {
  category: string;
  userSpending: number;
  peerAverage: number;
  difference: number;
  emoji: string;
  suggestion: string;
}
