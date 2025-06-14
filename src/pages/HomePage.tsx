
import { mockExpenseCategories } from '@/data/mockData';
import ExpenseCard from '@/components/ExpenseCard';
import MoodRing from '@/components/MoodRing';

const HomePage = () => {
  const totalSpent = mockExpenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const overallMood = totalSpent > 900 ? 'sad' : totalSpent > 600 ? 'neutral' : 'happy';

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Your Money Mood 💰</h1>
        <p className="text-sm text-muted-foreground">
          This week's vibe check
        </p>
      </div>

      {/* Mood Ring Center */}
      <div className="flex flex-col items-center space-y-4">
        <MoodRing size="lg" mood={overallMood} />
        <div className="text-center">
          <p className="text-3xl font-bold">${totalSpent}</p>
          <p className="text-sm text-muted-foreground">spent this week</p>
          <p className="text-xs mt-1">
            {overallMood === 'happy' && '✨ You\'re crushing it!'}
            {overallMood === 'neutral' && '📈 Pretty solid week'}
            {overallMood === 'sad' && '🚨 Wallet needs a break'}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-money p-3 rounded-2xl text-center">
          <p className="text-white text-lg font-bold">$234</p>
          <p className="text-white/80 text-xs">saved this week</p>
        </div>
        <div className="bg-gradient-sunset p-3 rounded-2xl text-center">
          <p className="text-white text-lg font-bold">3</p>
          <p className="text-white/80 text-xs">goals active</p>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold">Where your money went 📊</h2>
        {mockExpenseCategories.map((category) => (
          <ExpenseCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
