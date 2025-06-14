
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart4 } from "lucide-react";

// Мок-данные по категориям
const catData = [
  { name: "Фастфуд", value: 6200 },
  { name: "Мерч", value: 3190 },
  { name: "Дарья: кофе", value: 800 },
  { name: "Еда дома", value: 1100 },
];
const COLORS = ["#60a5fa", "#f472b6", "#faca15", "#5eead4"];
const chartConfig: ChartConfig = {
  "Фастфуд": { label: "Фастфуд", color: COLORS[0] },
  "Мерч": { label: "Мерч", color: COLORS[1] },
  "Дарья: кофе": { label: "Дарья: кофе", color: COLORS[2] },
  "Еда дома": { label: "Еда дома", color: COLORS[3] },
};
const total = catData.reduce((s, i) => s + i.value, 0);

export default function CustomCategoriesPage() {
  return (
    <div className="p-4 animate-fade-in space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-base">
            <BarChart4 /> Распределение по кастомным категориям
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <PieChart>
              <Pie data={catData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} label>
                {catData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <ul className="mt-3 text-sm">
            {catData.map(c =>
              <li key={c.name} className="text-muted-foreground">{c.name}: <b>{c.value}₽</b> ({Math.round(c.value / total * 100)}%)</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
