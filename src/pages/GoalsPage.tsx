
import { useEffect, useState } from "react";
import { mockSavingsGoals } from '@/data/mockDataRu';
import PetGoal from '@/components/PetGoal';
import AddGoalModal from "@/components/AddGoalModal";
import { Button } from "@/components/ui/button";

import { SavingsGoal } from "@/types/financial";

const STORAGE_KEY = "savingsGoals";

const getInitialGoals = (): (SavingsGoal & { completed?: boolean })[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  // mark all mock goals as not completed
  return mockSavingsGoals.map(g => ({ ...g, completed: false }));
};

const GoalsPage = () => {
  const [goals, setGoals] = useState<(SavingsGoal & { completed?: boolean })[]>(getInitialGoals);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  // добавить новую цель
  const handleAddGoal = (goal: SavingsGoal) => {
    setGoals((prev) => [...prev, { ...goal, completed: false }]);
  };

  // отметить выполненной/не выполненной
  const toggleCompleted = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => g.id === id ? { ...g, completed: !g.completed } : g)
    );
  };

  // отметить все как выполненные
  const completeAll = () => {
    setGoals((prev) => prev.map(g => ({ ...g, completed: true })));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Твои денежные питомцы 🐾</h1>
        <p className="text-sm text-muted-foreground">
          Корми их накоплениями и смотри, как они растут!
        </p>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={completeAll}>
          ✅ Отметить всё как выполненное
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className={`${goal.completed ? "opacity-60 grayscale" : ""} relative group transition`}>
            <PetGoal goal={goal} />
            <Button
              variant={goal.completed ? "secondary" : "outline"}
              size="sm"
              className="absolute top-2 right-2 animate-fade-in"
              onClick={() => toggleCompleted(goal.id)}
            >
              {goal.completed ? "В процессе" : "Выполнена 🎉"}
            </Button>
            {goal.completed && (
              <div className="absolute inset-0 bg-white/60 rounded-2xl flex items-center justify-center pointer-events-none text-lg font-bold text-cyber-purple group-hover:bg-white/80 transition">
                Завершено!
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Goal */}
      <div className="bg-gradient-to-r from-electric-blue to-cyber-purple p-4 rounded-2xl text-center">
        <div className="text-4xl mb-2">➕</div>
        <h3 className="text-white font-bold mb-1">Создать новую цель</h3>
        <p className="text-white/80 text-xs mb-3">
          Начни выращивать нового денежного питомца!
        </p>
        <Button className="bg-white text-cyber-purple px-4 py-2 rounded-xl font-medium text-sm hover:scale-105 transition-transform"
          onClick={() => setAddModalOpen(true)}
        >
          Выбрать питомца
        </Button>
      </div>
      <AddGoalModal open={addModalOpen} onOpenChange={setAddModalOpen} onAddGoal={handleAddGoal} />

      {/* Tips */}
      <div className="bg-muted/50 p-4 rounded-2xl">
        <h3 className="font-bold text-sm mb-2">💡 Лайфхаки</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Перетаскивай деньги между целями для перераспределения</li>
          <li>• Питомцы эволюционируют быстрее при регулярном кормлении</li>
          <li>• Настрой автосохранение для ежедневного корма питомца</li>
        </ul>
      </div>
    </div>
  );
};

export default GoalsPage;
