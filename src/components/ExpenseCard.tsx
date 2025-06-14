
import { ExpenseCategory } from '@/types/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MoodRing from './MoodRing';

interface ExpenseCardProps {
  category: ExpenseCategory;
}

const ExpenseCard = ({ category }: ExpenseCardProps) => {
  return (
    <Card className="p-4 glass-card transition-none w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full">
          <MoodRing size="sm" mood={category.mood} />
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-1">
              <span className="text-xl">{category.emoji}</span>
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {category.percentage}% от расходов
            </p>
          </div>
        </div>
        <div className="text-right w-full sm:w-fit flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-2 mt-2 sm:mt-0">
          <p className="font-bold text-lg">{category.amount}₽</p>
          <Button size="sm" className="bg-gradient-to-r from-neon-pink to-cyber-purple hover:from-cyber-purple hover:to-neon-pink transition-none">
            Оптимизировать
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseCard;
