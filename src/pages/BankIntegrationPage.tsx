
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet } from "lucide-react";

// Моковые данные: интеграции с банками
const banks = [
  { name: "Сбербанк", connected: true, lastSync: "2024-06-10" },
  { name: "Тинькофф", connected: true, lastSync: "2024-06-12" },
  { name: "ВТБ", connected: false, lastSync: null }
];

export default function BankIntegrationPage() {
  return (
    <div className="p-4 animate-fade-in space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center"><Wallet /> Интеграция с банками</CardTitle>
          <CardDescription>Выгружайте выписки и анализируйте все финансы в одном окне</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
          {banks.map(b => (
            <li key={b.name} className="flex items-center justify-between py-1">
              <span>{b.name}</span>
              {b.connected ? (
                <span className="text-green-500 text-xs">Подключено (посл. синхр.: {b.lastSync})</span>
              ) : (
                <span className="text-red-500 text-xs">Не подключено</span>
              )}
            </li>
          ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Когда банки связаны, все расходы и доходы автоматически учитываются при анализе бюджета и тратах по категориям.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
