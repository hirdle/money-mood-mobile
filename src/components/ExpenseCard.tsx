import { ExpenseCategory } from '@/types/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MoodRing from './MoodRing';
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface ExpenseCardProps {
  category: ExpenseCategory;
}

const ExpenseCard = ({ category }: ExpenseCardProps) => {
  const [showWhyModal, setShowWhyModal] = useState(false);
  // Example: Show progress on "Вкусно и точка"
  const showProgress =
    category.name === "Вкусно и точка";
  const streak = 3;
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
            {showProgress && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1 text-xs">
                  <span>🥤 Прогресс: {streak} неделя подряд</span>
                </div>
                <Progress value={(streak / 4) * 100} />
              </div>
            )}
          </div>
        </div>
        <div className="text-right w-full sm:w-fit flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-2 mt-2 sm:mt-0">
          <p className="font-bold text-lg">{category.amount}₽</p>
          <Button
            size="sm"
            className="bg-gradient-to-r from-neon-pink to-cyber-purple hover:from-cyber-purple hover:to-neon-pink transition-none"
            onClick={() => setShowWhyModal(true)}
          >
            Оптимизировать
          </Button>
        </div>
      </div>
      {/* Modal for purchase reason */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-2xl shadow-lg p-6 min-w-[320px] mx-2">
            <h2 className="text-lg font-bold mb-2">Аналитика покупки</h2>
            <p className="mb-2 text-muted-foreground text-sm">
              Мы определили, что вы заказываете "Вкусно и точка" уже 3 недели подряд. Возможные причины: дефицит времени, удобство быстрого питания, влияние рекламы или окружающей среды.
            </p>
            <Button size="sm" onClick={() => setShowWhyModal(false)}>Понятно</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExpenseCard;
