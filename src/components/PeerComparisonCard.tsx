
import { PeerComparison } from '@/types/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PeerComparisonCardProps {
  comparison: PeerComparison;
}

const PeerComparisonCard = ({ comparison }: PeerComparisonCardProps) => {
  const isSpendingMore = comparison.difference > 0;

  // Повелительные подписи для кнопки
  const buttonText = isSpendingMore ? 'Сократи траты!' : 'Держи курс!';
  const buttonClasses = isSpendingMore
    ? 'bg-gradient-to-r from-orange-400 to-yellow-300 text-white hover:scale-105'
    : 'bg-gradient-to-r from-yellow-400 to-orange-200 text-white hover:scale-105';

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
            ? 'bg-orange-200 text-orange-800'
            : 'bg-yellow-100 text-yellow-800'
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
        className={`w-full mt-2 font-bold rounded-lg shadow-md ${buttonClasses}`}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default PeerComparisonCard;
