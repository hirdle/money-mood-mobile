
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

// Основные бюджетные данные для графиков
const budgetData = [
  { month: "Май", income: 115000, expenses: 94000 },
  { month: "Июнь", income: 120000, expenses: 102000 },
  { month: "Июль", income: 125000, expenses: 110850 },
];

// Краткая оценка динамики (рост/падение)
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

const incomeDelta = getDelta(last.income, prev.income);
const expensesDelta = getDelta(last.expenses, prev.expenses);

const dashboardMetrics = {
  income: last.income,
  expenses: last.expenses,
  savings: last.income - last.expenses,
  savingsPercent: Math.max(Math.round(((last.income - last.expenses) / last.income) * 100), 0),
};

const monthlyGoal = 25000; // Например: цель накоплений на этот месяц
const progressValue = Math.min(100, Math.round((dashboardMetrics.savings / monthlyGoal) * 100));

const financialAdvice = [
  "Совет: Откладывайте не менее 20% дохода для финансовой подушки.",
  "Контролируйте категорию «Еда» — часто здесь можно легко экономить.",
  "Рекомендуем оптимизировать подписки: автоматически списываемые расходы иногда незаметны.",
];

const HomePage = () => {
  // Берём совет случайно (или можно сделать с useState, если хотите менять кликом)
  const tip = useMemo(() => financialAdvice[Math.floor(Math.random() * financialAdvice.length)], []);

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-glow">Дашборд бюджета 🏦</h1>
        <p className="text-sm text-muted-foreground">
          Ваши финансовые показатели за июль и динамика
        </p>
      </div>

      {/* Подсказка/Совет */}
      <Card className="max-w-lg mx-auto bg-gradient-to-r from-blue-50 via-white to-emerald-50 shadow-inner">
        <CardContent className="flex items-center gap-2 py-3">
          <Info className="text-sky-400" size={22} />
          <span className="font-medium">{tip}</span>
        </CardContent>
      </Card>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-green-100 via-green-50 to-white animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="text-green-500" size={22} />
              Доходы
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              Последний месяц
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
        <Card className="bg-gradient-to-br from-red-100 via-red-50 to-white animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="text-red-500" size={22} />
              Расходы
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              Последний месяц
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
        <Card className="bg-gradient-to-br from-sky-100 via-sky-50 to-white animate-scale-in">
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
              Прогресс к цели: {progressValue}%
            </div>
            <Progress value={progressValue} className="h-2 bg-emerald-100" />
            <div className="text-xs text-muted-foreground mt-1">
              Цель сбережений на месяц: {monthlyGoal.toLocaleString()}₽
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Кнопки действий (можно доработать по желанию) */}
      <div className="flex gap-4 justify-center">
        <Button className="animate-fade-in shadow hover-scale" variant="outline">
          + Доход
        </Button>
        <Button className="animate-fade-in shadow hover-scale" variant="destructive">
          + Расход
        </Button>
      </div>

      {/* График бюджета по месяцам */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика бюджета</CardTitle>
          <CardDescription>Сравнение доходов и расходов по месяцам</CardDescription>
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
