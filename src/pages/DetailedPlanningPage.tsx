
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";

// Моковые планы по целям
const goals = [
  { goal: "Отпуск", target: 120000, current: 50000 },
  { goal: "Апгрейд телефона", target: 85000, current: 30000 }
];

// Прогресс по неделям по тратам на «Вкусно и точка».
const vkusnoStreak = 3;

export default function DetailedPlanningPage() {
  return (
    <div className="p-4 animate-fade-in space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center"><Calendar /> Детальное планирование</CardTitle>
          <CardDescription>Визуализация целей и контроль расходов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map(goal => {
            const percent = Math.round(goal.current / goal.target * 100);
            return (
              <div key={goal.goal} className="mb-2">
                <div className="flex justify-between mb-1 text-sm">
                  <span>{goal.goal}</span>
                  <span>{goal.current.toLocaleString()}₽ / {goal.target.toLocaleString()}₽</span>
                </div>
                <Progress value={percent} />
              </div>
            )
          })}
          <div className="mt-6">
            <div className="text-sm font-medium mb-1">Вкусно и точка: {vkusnoStreak} неделя подряд</div>
            <Progress value={vkusnoStreak / 4 * 100} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
