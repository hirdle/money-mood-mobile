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
import { useMemo, useState } from "react";

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
  // Для выбора типа графика
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  return (
    <div className="p-2 sm:p-6 flex flex-col gap-7 max-w-2xl mx-auto">
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

      {/* Новый низ: График бюджета с возможностью выбора */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex bg-muted rounded-lg p-1 gap-2 shadow">
          <button
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
              chartType === "bar"
                ? "bg-cyber-purple text-white shadow"
                : "hover:bg-cyber-purple/10"
            }`}
            onClick={() => setChartType("bar")}
          >
            Столбики
          </button>
          <button
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
              chartType === "line"
                ? "bg-cyber-purple text-white shadow"
                : "hover:bg-cyber-purple/10"
            }`}
            onClick={() => setChartType("line")}
          >
            Линии
          </button>
        </div>
      </div>

      <Card className="border-cyber-purple/20">
        <CardHeader>
          <CardTitle>График бюджета</CardTitle>
          <CardDescription>Сравнение доходов и расходов за последние 3 месяца</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
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
              ) : (
                <LineChart data={budgetData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#eee" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#999" fontSize={14} />
                  <Tooltip
                    cursor={{ stroke: "#6366f1", strokeWidth: 2, opacity: 0.2 }}
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
                  <Line type="monotone" dataKey="income" name="Доходы" stroke="#34d399" strokeWidth={3} dot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expenses" name="Расходы" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
