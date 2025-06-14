
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BankSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const banks = [
  { name: "Альфа банк" },
  { name: "Т-банк" },
  { name: "Сбербанк" },
];

const BankSelectDialog = ({ open, onOpenChange }: BankSelectDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Выберите банк для пополнения</DialogTitle>
        <DialogDescription>Для пополнения просто выберите свой банк.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3 mt-4">
        {banks.map((bank) => (
          <Button
            key={bank.name}
            variant="outline"
            className="w-full"
            type="button"
          >
            {bank.name}
          </Button>
        ))}
      </div>
      <DialogClose asChild>
        <Button type="button" variant="secondary" className="w-full mt-4">Закрыть</Button>
      </DialogClose>
    </DialogContent>
  </Dialog>
);

export default BankSelectDialog;
