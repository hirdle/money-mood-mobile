import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Calculator, Landmark, Wallet, TrendingUp, TrendingDown, CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const budgetData = [
  { month: "Май", income: 110000, expenses: 78000 },
  { month: "Июнь", income: 120000, expenses: 85000 },
  { month: "Июль", income: 125000, expenses: 92000 },
]

const chartConfig = {
  income: {
    label: "Доходы",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Расходы",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const BudgetPage = () => {
  const currentMonth = budgetData[budgetData.length - 1];
  const savings = currentMonth.income - currentMonth.expenses;
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button className="glass-card p-2 flex items-center gap-2 hover:bg-muted/40"
          onClick={() => navigate('/analytics')}>
          📈 <span>Аналитика</span>
        </button>
        <button className="glass-card p-2 flex items-center gap-2 hover:bg-muted/40"
          onClick={() => navigate('/budget-jkh')}>
          🏢 <span>ЖКХ</span>
        </button>
        <button className="glass-card p-2 flex items-center gap-2 hover:bg-muted/40"
          onClick={() => navigate('/budget-taxes')}>
          🧾 <span>Налоги</span>
        </button>
        <button className="glass-card p-2 flex items-center gap-2 hover:bg-muted/40"
          onClick={() => navigate('/bank-integration')}>
          🏦 <span>Интеграция банков</span>
        </button>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Месячный бюджет (Июль)</span>
          </CardTitle>
          <CardDescription>Динамика доходов и расходов за последние 3 месяца.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <p className="text-muted-foreground">Доходы</p>
              <p className="font-bold text-green-400 flex items-center justify-center gap-1"><TrendingUp size={16} /> {currentMonth.income.toLocaleString()}₽</p>
            </div>
            <div>
              <p className="text-muted-foreground">Расходы</p>
              <p className="font-bold text-red-400 flex items-center justify-center gap-1"><TrendingDown size={16} /> {currentMonth.expenses.toLocaleString()}₽</p>
            </div>
            <div>
              <p className="text-muted-foreground">Сбережения</p>
              <p className="font-bold text-sky-400 flex items-center justify-center gap-1"><CircleDollarSign size={16} /> {savings.toLocaleString()}₽</p>
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <BarChart accessibilityLayer data={budgetData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
              <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Landmark className="h-5 w-5 text-primary" />
            <span>Налоги</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Налог</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>НДФЛ (до 01.12)</TableCell>
                <TableCell className="text-right font-medium">15,600₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Налог на имущество (до 01.12)</TableCell>
                <TableCell className="text-right font-medium">4,200₽</TableCell>
              </TableRow>
               <TableRow>
                <TableCell>Доступный вычет</TableCell>
                <TableCell className="text-right font-medium text-green-400">52,000₽</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wallet className="h-5 w-5 text-primary" />
            <span>Крупные покупки</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Цель</TableHead>
                <TableHead className="text-right">Стоимость</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Отпуск в августе</TableCell>
                <TableCell className="text-right font-medium">120,000₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Новый телефон</TableCell>
                <TableCell className="text-right font-medium">85,000₽</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPage;
