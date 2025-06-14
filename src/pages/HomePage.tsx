
import { mockExpenseCategories } from '@/data/mockDataRu';
import ExpenseCard from '@/components/ExpenseCard';
import MoodRing from '@/components/MoodRing';

const HomePage = () => {
  const totalSpent = mockExpenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const overallMood = totalSpent > 900 ? 'sad' : totalSpent > 600 ? 'neutral' : 'happy';

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Настроение твоих денег 💰</h1>
        <p className="text-sm text-muted-foreground">
          Проверка настроения за эту неделю
        </p>
      </div>

      {/* Mood Ring Center */}
      <div className="flex flex-col items-center space-y-4">
        <MoodRing size="lg" mood={overallMood} />
        <div className="text-center">
          <p className="text-3xl font-bold">{totalSpent}₽</p>
          <p className="text-sm text-muted-foreground">потрачено за неделю</p>
          <p className="text-xs mt-1">
            {overallMood === 'happy' && '✨ Ты красавчик!'}
            {overallMood === 'neutral' && '📈 Неплохая неделя'}
            {overallMood === 'sad' && '🚨 Кошелек просит пощады'}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-money p-3 rounded-2xl text-center">
          <p className="text-white text-lg font-bold">15670₽</p>
          <p className="text-white/80 text-xs">накоплено за неделю</p>
        </div>
        <div className="bg-gradient-sunset p-3 rounded-2xl text-center">
          <p className="text-white text-lg font-bold">3</p>
          <p className="text-white/80 text-xs">активных цели</p>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold">Куда потратил деньги 📊</h2>
        {mockExpenseCategories.map((category) => (
          <ExpenseCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
