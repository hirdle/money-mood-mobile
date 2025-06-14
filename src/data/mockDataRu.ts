
import { ExpenseCategory, SavingsGoal, SmartNotification, PeerComparison } from '@/types/financial';

export const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: '1',
    name: 'Еда и рестораны',
    emoji: '🍕',
    amount: 245,
    percentage: 35,
    mood: 'neutral'
  },
  {
    id: '2', 
    name: 'Развлечения',
    emoji: '🎮',
    amount: 189,
    percentage: 27,
    mood: 'happy'
  },
  {
    id: '3',
    name: 'Транспорт',
    emoji: '🚇',
    amount: 156,
    percentage: 22,
    mood: 'neutral'
  },
  {
    id: '4',
    name: 'Покупки',
    emoji: '👕',
    amount: 134,
    percentage: 19,
    mood: 'sad'
  }
];

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    emoji: '📱',
    targetAmount: 85000,
    currentAmount: 23500,
    petType: 'cat',
    petStage: 2,
    daysLeft: 45
  },
  {
    id: '2',
    name: 'Отпуск в Турции',
    emoji: '🏖️', 
    targetAmount: 120000,
    currentAmount: 67800,
    petType: 'dragon',
    petStage: 3,
    daysLeft: 89
  },
  {
    id: '3',
    name: 'Новый ноутбук',
    emoji: '💻',
    targetAmount: 150000,
    currentAmount: 12000,
    petType: 'plant',
    petStage: 1,
    daysLeft: 156
  }
];

export const mockNotifications: SmartNotification[] = [
  {
    id: '1',
    type: 'challenge',
    title: 'Вызов недели!',
    message: 'Ты заказывал еду 4 раза на этой неделе. Попробуй готовить дома 3 дня подряд и получи бонус 500₽!',
    emoji: '🍳',
    actionText: 'Принять вызов',
    isNew: true
  },
  {
    id: '2',
    type: 'insight', 
    title: 'Инсайт дня',
    message: 'В среднем ты тратишь 340₽ в день на кофе. За месяц это 10200₽ - почти треть твоей цели на iPhone!',
    emoji: '☕',
    actionText: 'Посмотреть план',
    isNew: true
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Достижение разблокировано!',
    message: 'Поздравляем! Ты впервые за месяц уложился в бюджет на развлечения. Твой дракончик эволюционировал!',
    emoji: '🏆',
    actionText: 'Забрать награду',
    isNew: false
  },
  {
    id: '4',
    type: 'warning',
    title: 'Внимание!',
    message: 'До конца месяца осталось 8 дней, а ты уже потратил 85% бюджета. Время включить режим экономии!',
    emoji: '⚠️',
    actionText: 'Показать советы',
    isNew: false
  }
];

export const mockPeerComparisons: PeerComparison[] = [
  {
    category: 'Кофе',
    userSpending: 8500,
    peerAverage: 6200,
    difference: 28,
    emoji: '☕',
    suggestion: 'Попробуй готовить кофе дома 2-3 раза в неделю'
  },
  {
    category: 'Доставка еды',
    userSpending: 12400,
    peerAverage: 15600,
    difference: -18,
    emoji: '🍕',
    suggestion: 'Отлично! Ты экономишь на доставке'
  },
  {
    category: 'Развлечения',
    userSpending: 7800,
    peerAverage: 9200,
    difference: -15,
    emoji: '🎮',
    suggestion: 'Твои траты на развлечения под контролем!'
  },
  {
    category: 'Одежда',
    userSpending: 18900,
    peerAverage: 14200,
    difference: 33,
    emoji: '👕',
    suggestion: 'Можно сэкономить на брендовых вещах'
  }
];
