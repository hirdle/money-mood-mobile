import { useState } from "react";
import { SavingsGoal } from '@/types/financial';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import BankSelectDialog from "./BankSelectDialog";

interface PetGoalProps {
  goal: SavingsGoal;
}

const PetGoal = ({ goal }: PetGoalProps) => {
  const [bankDialogOpen, setBankDialogOpen] = useState(false);
  
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  
  const petEmojis = {
    plant: ['🌱', '🌿', '🌳', '🌲', '🎋'],
    cat: ['🐱', '😸', '😺', '😻', '🦁'],
    dragon: ['🥚', '🦎', '🐲', '🐉', '👑'],
    unicorn: ['🐴', '🦄', '✨', '🌟', '💫']
  };

  const currentPetEmoji = petEmojis[goal.petType][goal.petStage - 1];

  return (
    <Card className="p-4 glass-card transition-none">
      <BankSelectDialog open={bankDialogOpen} onOpenChange={setBankDialogOpen} />
      <div className="text-center mb-3">
        <div className="text-4xl mb-2">{currentPetEmoji}</div>
        <h3 className="font-bold text-sm flex items-center justify-center gap-1">
          <span>{goal.emoji}</span>
          {goal.name}
        </h3>
      </div>
      
      <div className="space-y-3">
        <Progress value={progress} className="h-3 bg-muted" />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{goal.currentAmount}₽</span>
          <span>{goal.targetAmount}₽</span>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            осталось {goal.daysLeft} дней
          </p>
          <Button
            size="sm"
            className="w-full bg-gradient-money transition-none"
            onClick={() => setBankDialogOpen(true)}
            type="button"
          >
            Добавить денег 💰
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PetGoal;
