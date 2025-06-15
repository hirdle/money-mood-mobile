import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, CircleDollarSign, Info, Goal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

// Современные бюджетные данные — СИНХРОНИЗИРОВАНЫ с цифрами на BudgetPage!
const budgetData = [
  { month: "Май", income: 115000, expenses: 94000 },
  { month: "Июнь", income: 120000, expenses: 102000 },
  { month: "Июль", income: 125000, expenses: 110850 },
];

// Проверяем вычисления (ниже исправлены названия и формулы для достоверности)
function getDelta(a: number, b: number) {
  const diff = a - b;
  const percent = b ? ((diff) / b) * 100 : 0;
  return {
    up: diff > 0,
    percent: Math.abs(percent).toFixed(1),
  };
}

const last = budgetData[budgetData.length - 1];
const prev = budgetData[budgetData.length - 2];

// Все показатели согласованы: доходы, расходы, сбережения
const incomeDelta = getDelta(last.income, prev.income);
const expensesDelta = getDelta(last.expenses, prev.expenses);

const dashboardMetrics = {
  income: last.income,
  expenses: last.expenses,
  savings: last.income - last.expenses,
  savingsPercent: Math.max(Math.round(((last.income - last.expenses) / last.income) * 100), 0),
};

const monthlyGoal = 25000;
const progressValue = Math.min(100, Math.round((dashboardMetrics.savings / monthlyGoal) * 100));

const financialAdvice = [
  "Откладывайте не менее 20% дохода на финансовую подушку.",
  "Категория «Еда» — здесь часто можно экономить без потерь.",
  "Проверяйте подписки: маленькие суммы незаметно становятся большими!",
];

const HomePage = () => {
  const tip = useMemo(() => financialAdvice[Math.floor(Math.random() * financialAdvice.length)], []);

  return (
    <div className="p-2 sm:p-6 flex flex-col gap-7 max-w-2xl mx-auto">
      {/* Супер заметный баланс/шапка */}
      <div className="w-full bg-gradient-to-br from-cyber-purple via-sky-200/80 to-emerald-100 shadow-xl rounded-3xl p-6 relative overflow-hidden flex flex-col gap-2 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <CircleDollarSign size={32} className="text-cyber-purple drop-shadow" />
          <div className="flex-1">
            <span className="uppercase tracking-wide text-xs text-cyber-purple/70">Общий баланс</span>
            <div className="text-3xl font-bold text-cyber-purple drop-shadow-sm">{dashboardMetrics.savings.toLocaleString()}₽</div>
          </div>
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <div>
            Доход: <span className="text-green-500 font-semibold">{dashboardMetrics.income.toLocaleString()}₽</span>
          </div>
          <div>
            Расход: <span className="text-red-500 font-semibold">{dashboardMetrics.expenses.toLocaleString()}₽</span>
          </div>
        </div>
        <Progress value={progressValue} className="mt-4 h-2 bg-emerald-100" />
        <div className="flex items-center mt-2 gap-3 text-sm">
          <Goal className="text-emerald-400" size={18} />
          Прогресс к цели: <span className="font-semibold">{progressValue}%</span>
          <span className="ml-auto text-xs text-cyber-purple/70">Цель: {monthlyGoal.toLocaleString()}₽</span>
        </div>
        <div className="absolute right-3 top-2 opacity-30 text-cyber-purple text-8xl pointer-events-none select-none">🏦</div>
      </div>

      {/* Совет эксперта */}
      <Card className="mx-auto w-full max-w-lg bg-cyber-purple/10 border-cyber-purple/20 shadow-md">
        <CardContent className="flex items-center gap-2 py-3">
          <Info className="text-cyber-purple" size={22} />
          <span className="font-medium">{tip}</span>
        </CardContent>
      </Card>

      {/* Витрина метрик с анимированными картами */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-green-100 via-green-50 to-white animate-scale-in border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="text-green-500" size={22} />
              Доходы
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              Июль
              <span className={cn("ml-2 flex items-center", incomeDelta.up ? "text-green-600" : "text-red-500")}>
                {incomeDelta.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {incomeDelta.percent}%
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-2xl text-green-600">
              {dashboardMetrics.income.toLocaleString()}₽
            </span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-100 via-red-50 to-white animate-scale-in border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="text-red-500" size={22} />
              Расходы
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              Июль
              <span className={cn("ml-2 flex items-center", expensesDelta.up ? "text-red-600" : "text-green-600")}>
                {expensesDelta.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {expensesDelta.percent}%
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-2xl text-red-600">
              {dashboardMetrics.expenses.toLocaleString()}₽
            </span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-sky-100 via-sky-50 to-white animate-scale-in border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CircleDollarSign className="text-sky-500" size={22} />
              Сбережения
            </CardTitle>
            <CardDescription>
              {dashboardMetrics.savings.toLocaleString()}₽ ({dashboardMetrics.savingsPercent}% от дохода)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-1">
              <Goal className="text-emerald-400" size={18} />
              Прогресс: {progressValue}%
            </div>
            <Progress value={progressValue} className="h-2 bg-emerald-100" />
            <div className="text-xs text-muted-foreground mt-1">
              Цель: {monthlyGoal.toLocaleString()}₽
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Кнопки быстро добавления (экшон бар) */}
      <div className="flex gap-4 justify-center">
        <Button className="animate-fade-in shadow hover-scale rounded-lg bg-gradient-to-r from-cyber-purple to-neon-pink text-white px-5 py-2">
          + Доход
        </Button>
        <Button className="animate-fade-in shadow hover-scale rounded-lg bg-gradient-to-r from-red-400 to-sunset-orange text-white px-5 py-2">
          + Расход
        </Button>
      </div>

      {/* График бюджета — синхронизирован с BudgetPage */}
      <Card className="border-cyber-purple/20">
        <CardHeader>
          <CardTitle>График бюджета</CardTitle>
          <CardDescription>Сравнение доходов и расходов за последние 3 месяца</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#eee" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#999" fontSize={14} />
                <Tooltip
                  cursor={{ fill: "#e0e7ef33" }}
                  formatter={(val: number) => `${val?.toLocaleString()}₽`}
                />
                <Legend
                  wrapperStyle={{ paddingTop: 5, fontSize: 13 }}
                  iconType="circle"
                  payload={[
                    { value: "Доходы", type: "circle", color: "#34d399" },
                    { value: "Расходы", type: "circle", color: "#ef4444" }
                  ]}
                />
                <Bar dataKey="expenses" name="Расходы" fill="#ef4444" radius={7} barSize={28} />
                <Bar dataKey="income" name="Доходы" fill="#34d399" radius={7} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
