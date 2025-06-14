
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Landmark } from "lucide-react";

const jkhData = [
  { name: "Отопление", value: 2800 },
  { name: "Вода", value: 950 },
  { name: "Электричество", value: 1700 },
  { name: "Домофон", value: 350 },
];

const COLORS = ["#60a5fa", "#f472b6", "#faca15", "#34d399"];

const chartConfig: ChartConfig = {
  Отопление: { label: "Отопление", color: COLORS[0] },
  Вода: { label: "Вода", color: COLORS[1] },
  Электричество: { label: "Электричество", color: COLORS[2] },
  Домофон: { label: "Домофон", color: COLORS[3] },
};
const total = jkhData.reduce((sum, i) => sum + i.value, 0);

export default function BudgetJkhPage() {
  return (
    <div className="p-4 animate-fade-in space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center"><Landmark /> ЖКХ: структура расходов</CardTitle>
          <CardDescription>Детализированные расходы по коммунальным услугам</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <PieChart>
              <Pie data={jkhData} dataKey="value" nameKey="name" fill="#8884d8" innerRadius={45} outerRadius={70} label>
                {jkhData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <ul className="mt-3 text-sm text-muted-foreground">
            {jkhData.map(item => (
              <li key={item.name}>{item.name}: <b>{item.value}₽</b> ({Math.round(item.value / total * 100)}%)</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
