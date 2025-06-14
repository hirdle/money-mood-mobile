
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

// Моковые данные по совместным покупкам
const purchases = [
  { item: "Пицца", total: 1800, people: ["Ты", "Катя", "Маша"], payed: "Катя" },
  { item: "Такси", total: 950, people: ["Ты", "Алексей"], payed: "Ты" },
  { item: "Кино", total: 1250, people: ["Ты", "Данил", "Маша", "Катя"], payed: "Маша" },
];

export default function JointPurchasesPage() {
  return (
    <div className="p-4 animate-fade-in space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center"><Users /> Совместные покупки</CardTitle>
          <CardDescription>Кто сколько внес, средний чек, инициатор</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {purchases.map((p, i) => (
              <li key={i} className="mb-2 border-b py-2 flex items-center justify-between text-sm">
                <span>
                  <b>{p.item}</b> ({p.people.length} чел)
                  <span className="ml-2 text-muted-foreground">Кто оплатил: {p.payed}</span>
                </span>
                <span className="font-medium">{(p.total / p.people.length).toFixed()}₽/чел</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
