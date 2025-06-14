
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, CartesianGrid } from "recharts";
import WhyBuyAnalyticsCard from "@/components/WhyBuyAnalyticsCard";
import { BarChart4, TrendingDown, TrendingUp } from "lucide-react";

const data = [
  { категория: "Вкусно и точка", расходы: 3000 },
  { категория: "ЖКХ", расходы: 5800 },
  { категория: "Перекресток", расходы: 4120 },
  { категория: "Такси", расходы: 1200 },
];

const chartConfig: ChartConfig = {
  расходы: {
    label: "Расходы по категориям",
    color: "hsl(var(--chart-1))",
  },
};

export default function AnalyticsPage() {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-base"><BarChart4 /> Общая аналитика расходов</CardTitle>
          <CardDescription>Ваши расходы по категориям за последние 30 дней.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="категория" tickLine={false} axisLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="расходы" fill="var(--color-расходы)" radius={4} />
            </BarChart>
          </ChartContainer>
          <div className="flex gap-2 mt-3 text-sm">
            <div className="flex items-center gap-1 text-green-500"><TrendingUp size={16}/> +12% рост в «Перекресток»</div>
            <div className="flex items-center gap-1 text-red-400"><TrendingDown size={16}/>  -8% в «Такси»</div>
          </div>
        </CardContent>
      </Card>
      <WhyBuyAnalyticsCard />
    </div>
  );
}
