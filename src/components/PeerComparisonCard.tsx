import { PeerComparison } from '@/types/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PeerComparisonCardProps {
  comparison: PeerComparison;
}

const PeerComparisonCard = ({ comparison }: PeerComparisonCardProps) => {
  const isSpendingMore = comparison.difference > 0;

  // Повелительная форма для кнопок
  let buttonText = '';
  if (isSpendingMore) {
    buttonText = 'Ограничь!';
  } else {
    buttonText = 'Продолжай!';
  }

  return (
    <Card className="p-4 glass-card hover:scale-105 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{comparison.emoji}</span>
          <div>
            <h3 className="font-bold text-sm">{comparison.category}</h3>
            <p className="text-xs text-muted-foreground">по сравнению с друзьями</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isSpendingMore 
            ? 'bg-sunset-orange/20 text-sunset-orange' 
            : 'bg-warning-yellow/30 text-yellow-700'
        }`}>
          {isSpendingMore ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(comparison.difference)}%
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-xs">
          <span>Ты: {comparison.userSpending}₽</span>
          <span>Друзья: {comparison.peerAverage}₽</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {comparison.suggestion}
        </p>
      </div>
      <Button
        size="sm"
        className={`w-full font-bold rounded-xl shadow hover:scale-105 transition-transform
          ${isSpendingMore
            ? "bg-gradient-to-r from-sunset-orange via-warning-yellow to-sunset-orange text-white"
            : "bg-gradient-to-r from-warning-yellow via-sunset-orange to-warning-yellow text-yellow-900"
          } border-none`}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default PeerComparisonCard;
