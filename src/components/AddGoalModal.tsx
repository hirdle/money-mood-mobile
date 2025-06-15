
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SavingsGoal } from "@/types/financial";

const petTypes = [
  { type: "plant", emoji: "🌱", label: "Растение" },
  { type: "cat", emoji: "🐱", label: "Кот" },
  { type: "dragon", emoji: "🐉", label: "Дракон" },
  { type: "unicorn", emoji: "🦄", label: "Единорог" },
];

interface AddGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: SavingsGoal) => void;
}

const AddGoalModal = ({ open, onOpenChange, onAddGoal }: AddGoalModalProps) => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [petType, setPetType] = useState("plant");
  const [emoji, setEmoji] = useState("🌱");

  const handleSelectPetType = (pt: typeof petTypes[0]) => {
    setPetType(pt.type);
    setEmoji(pt.emoji);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !targetAmount) return;
    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: name.trim(),
      emoji,
      targetAmount: Number(targetAmount),
      currentAmount: 0,
      petType: petType as SavingsGoal['petType'],
      petStage: 1,
      daysLeft: 30,
    };
    onAddGoal(goal);
    setName("");
    setTargetAmount("");
    setPetType("plant");
    setEmoji("🌱");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новую цель</DialogTitle>
          <DialogDescription>
            Придумай имя, выбери цель накоплений и питомца.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Название цели"
              value={name}
              maxLength={30}
              required
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Сумма (₽)"
              value={targetAmount}
              min={1}
              required
              onChange={e => setTargetAmount(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm mb-2">Выбери питомца</p>
            <div className="flex gap-2">
              {petTypes.map((pt) => (
                <button
                  key={pt.type}
                  type="button"
                  className={`px-3 py-2 rounded-xl border text-xl flex flex-col items-center gap-1 transition ${petType === pt.type
                    ? "border-cyber-purple bg-cyber-purple/10"
                    : "border-muted"}`}
                  onClick={() => handleSelectPetType(pt)}
                >
                  <span>{pt.emoji}</span>
                  <span className="text-xs">{pt.label}</span>
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full bg-cyber-purple text-white">
            Создать
          </Button>
        </form>
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="w-full mt-2">
            Отмена
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
