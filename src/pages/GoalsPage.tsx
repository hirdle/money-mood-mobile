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
    <div className="min-h-screen bg-white p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-black">Твои денежные питомцы 🐾</h1>
        <p className="text-base text-neutral-500">
          Корми их накоплениями и смотри, как они растут!
        </p>
      </div>

      <div className="flex justify-end">
        <Button variant="default" size="sm">
          ✅ Отметить всё как выполненное
        </Button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className={`${goal.completed ? "opacity-60 grayscale" : ""} relative group transition`}>
            <div className="bg-white rounded-3xl shadow-lg p-3">
              <PetGoal goal={goal} />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 animate-fade-in"
              onClick={() => toggleCompleted(goal.id)}
            >
              {goal.completed ? "В процессе" : "Выполнена 🎉"}
            </Button>
            {goal.completed && (
              <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center pointer-events-none text-lg font-bold text-cyber-purple group-hover:bg-white/90 transition">
                Завершено!
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Goal */}
      <div className="bg-white shadow-md rounded-3xl p-4 text-center">
        <div className="text-4xl mb-2">➕</div>
        <h3 className="text-black font-bold mb-1">Создать новую цель</h3>
        <p className="text-neutral-500 text-xs mb-3">
          Начни выращивать нового денежного питомца!
        </p>
        <Button className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white px-4 py-2 rounded-xl font-medium text-base hover:scale-105 transition-transform"
          onClick={() => setAddModalOpen(true)}
        >
          Выбрать питомца
        </Button>
      </div>
      <AddGoalModal open={addModalOpen} onOpenChange={setAddModalOpen} onAddGoal={handleAddGoal} />

      {/* Tips */}
      <div className="bg-neutral-50 p-4 rounded-2xl">
        <h3 className="font-bold text-black mb-2">💡 Лайфхаки</h3>
        <ul className="text-xs text-neutral-500 space-y-1">
          <li>• Перетаскивай деньги между целями для перераспределения</li>
          <li>• Питомцы эволюционируют быстрее при регулярном кормлении</li>
          <li>• Настрой автосохранение для ежедневного корма питомца</li>
        </ul>
      </div>
    </div>
  );
};

export default GoalsPage;
