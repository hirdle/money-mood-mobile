
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Landmark } from "lucide-react";

const taxData = [
  { name: "НДФЛ", amount: 15600, due: "01.12", desc: "15% от з/п, желательно оплатить до декабря." },
  { name: "Имущество", amount: 4200, due: "01.12", desc: "Налог на имущество." },
];

export default function BudgetTaxesPage() {
  return (
    <div className="p-4 animate-fade-in space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center"><Landmark /> Аналитика налогов</CardTitle>
          <CardDescription>Текущие налоги и рекомендуемые действия</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Налог</TableHead>
                <TableHead>Срок</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxData.map(tax =>
                <TableRow key={tax.name}>
                  <TableCell>{tax.name}</TableCell>
                  <TableCell>{tax.due}</TableCell>
                  <TableCell className="text-right">{tax.amount.toLocaleString()}₽</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={3} className="text-green-500 text-center">
                  Доступно к возврату: 52,000₽
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-3 text-xs text-muted-foreground">
            Рекомендация: следите за сроками оплаты, чтобы избежать штрафов. Подробнее <a className="text-blue-500 underline" href="https://www.nalog.gov.ru/rn77/" rel="noopener noreferrer" target="_blank">на сайте ФНС</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
