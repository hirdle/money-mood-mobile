
import { ExpenseCategory } from '@/types/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MoodRing from './MoodRing';

interface ExpenseCardProps {
  category: ExpenseCategory;
}

const ExpenseCard = ({ category }: ExpenseCardProps) => {
  return (
    <Card className="p-4 glass-card hover:scale-105 transition-all duration-200 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MoodRing size="sm" mood={category.mood} />
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-1">
              <span className="text-xl">{category.emoji}</span>
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {category.percentage}% of spending
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">${category.amount}</p>
          <Button size="sm" className="mt-1 bg-gradient-to-r from-neon-pink to-cyber-purple hover:from-cyber-purple hover:to-neon-pink">
            Optimize
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseCard;
