
import { mockSavingsGoals } from '@/data/mockDataRu';
import PetGoal from '@/components/PetGoal';

const GoalsPage = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Твои денежные питомцы 🐾</h1>
        <p className="text-sm text-muted-foreground">
          Корми их накоплениями и смотри, как они растут!
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 gap-4">
        {mockSavingsGoals.map((goal) => (
          <PetGoal key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Add New Goal */}
      <div className="bg-gradient-to-r from-electric-blue to-cyber-purple p-4 rounded-2xl text-center">
        <div className="text-4xl mb-2">➕</div>
        <h3 className="text-white font-bold mb-1">Создать новую цель</h3>
        <p className="text-white/80 text-xs mb-3">
          Начни выращивать нового денежного питомца!
        </p>
        <button className="bg-white text-cyber-purple px-4 py-2 rounded-xl font-medium text-sm hover:scale-105 transition-transform">
          Выбрать питомца
        </button>
      </div>

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
