
import { ExpenseCategory, SavingsGoal, SmartNotification, PeerComparison } from '@/types/financial';

export const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: '1',
    name: 'Food & Drinks',
    emoji: '🍕',
    amount: 342,
    percentage: 35,
    mood: 'happy'
  },
  {
    id: '2',
    name: 'Entertainment',
    emoji: '🎮',
    amount: 156,
    percentage: 16,
    mood: 'happy'
  },
  {
    id: '3',
    name: 'Shopping',
    emoji: '👟',
    amount: 289,
    percentage: 29,
    mood: 'neutral'
  },
  {
    id: '4',
    name: 'Transport',
    emoji: '🚗',
    amount: 98,
    percentage: 10,
    mood: 'neutral'
  },
  {
    id: '5',
    name: 'Coffee',
    emoji: '☕',
    amount: 95,
    percentage: 10,
    mood: 'sad'
  }
];

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    emoji: '📱',
    targetAmount: 1200,
    currentAmount: 450,
    petType: 'dragon',
    petStage: 2,
    daysLeft: 45
  },
  {
    id: '2',
    name: 'Europe Trip',
    emoji: '✈️',
    targetAmount: 3000,
    currentAmount: 890,
    petType: 'unicorn',
    petStage: 1,
    daysLeft: 120
  },
  {
    id: '3',
    name: 'Gaming Setup',
    emoji: '🎮',
    targetAmount: 800,
    currentAmount: 640,
    petType: 'cat',
    petStage: 4,
    daysLeft: 20
  }
];

export const mockNotifications: SmartNotification[] = [
  {
    id: '1',
    type: 'challenge',
    title: 'Cooking Challenge',
    message: 'You ate out 3x this week. Wanna try a cooking challenge?',
    emoji: '👨‍🍳',
    actionText: 'Start Challenge',
    isNew: true
  },
  {
    id: '2',
    type: 'insight',
    title: 'Coffee Addiction Alert',
    message: 'Your daily Starbucks is costing you $95/week. That\'s like... a lot of ramen 🍜',
    emoji: '☕',
    actionText: 'Set Coffee Budget',
    isNew: true
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Streak Master!',
    message: 'You\'ve been under budget for 7 days straight! Your dragon is proud 🐉',
    emoji: '🔥',
    actionText: 'Celebrate',
    isNew: false
  },
  {
    id: '4',
    type: 'warning',
    title: 'Weekend Splurge',
    message: 'Bro, your wallet\'s crying 🥲 You spent 150% more this weekend',
    emoji: '💸',
    actionText: 'Review Spending',
    isNew: false
  }
];

export const mockPeerComparisons: PeerComparison[] = [
  {
    category: 'Coffee',
    userSpending: 95,
    peerAverage: 74,
    difference: 28,
    emoji: '☕',
    suggestion: 'Try making coffee at home 2x per week?'
  },
  {
    category: 'Entertainment',
    userSpending: 156,
    peerAverage: 180,
    difference: -13,
    emoji: '🎮',
    suggestion: 'You\'re actually doing great here!'
  },
  {
    category: 'Food',
    userSpending: 342,
    peerAverage: 298,
    difference: 15,
    emoji: '🍕',
    suggestion: 'Maybe cook one more meal per week?'
  }
];
