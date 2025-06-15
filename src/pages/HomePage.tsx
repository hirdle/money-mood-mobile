import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState } from "react";

const orangeGrad = "from-orange-400 via-yellow-200 to-white";

const budgetData = [
  { month: "Май", income: 115000, expenses: 94000 },
  { month: "Июнь", income: 120000, expenses: 102000 },
  { month: "Июль", income: 125000, expenses: 110850 },
];

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

const monthlyGoal = 25000;
const progressValue = Math.min(100, Math.round((dashboardMetrics.savings / monthlyGoal) * 100));

const financialAdvice = [
  "Откладывайте не менее 20% дохода на финансовую подушку.",
  "Категория «Еда» — здесь часто можно экономить без потерь.",
  "Проверяйте подписки: маленькие суммы незаметно становятся большими!",
];

const storyData = [
  { emoji: "🍔", title: "Еда", color: "bg-yellow-200" },
  { emoji: "🎁", title: "Подарок", color: "bg-orange-200" },
  { emoji: "🏖️", title: "Отпуск", color: "bg-yellow-100" },
  { emoji: "📱", title: "Связь", color: "bg-orange-100" }
];

export default function HomePage() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const mainAdvice = financialAdvice[0];

  return (
    <div className="p-2 sm:p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Stories-стайл "инстаграм": отключены */}
      <div className="flex gap-4 overflow-x-auto pb-2 pt-1">
        {storyData.map((s, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col items-center w-16 select-none",
              "opacity-80 hover:opacity-100 transition"
            )}
          >
            <div className={cn(
              "rounded-full border-4 border-cyber-purple p-1 shadow-md mb-1",
              s.color,
              "w-14 h-14 flex items-center justify-center text-3xl"
            )}>
              <span>{s.emoji}</span>
            </div>
            <span className="text-xs text-cyber-purple font-medium">{s.title}</span>
          </div>
        ))}
      </div>
      {/* Дашборд карточки с метриками */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-0 mb-2">
        <Card className="border-0 bg-gradient-to-br from-cyber-purple via-electric-blue to-white shadow-md">
          <CardHeader>
            <CardTitle className="text-cyber-purple">Доход</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-cyber-purple">{dashboardMetrics.income.toLocaleString()}₽</div>
            <div className={cn(
              "flex items-center text-sm mt-1",
              incomeDelta.up ? "text-money-green" : "text-sunset-orange"
            )}>
              {incomeDelta.up ? "▲" : "▼"} {incomeDelta.percent}%
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-electric-blue via-neon-pink to-white shadow-md">
          <CardHeader>
            <CardTitle className="text-electric-blue">Расходы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-electric-blue">{dashboardMetrics.expenses.toLocaleString()}₽</div>
            <div className={cn(
              "flex items-center text-sm mt-1",
              expensesDelta.up ? "text-sunset-orange" : "text-money-green"
            )}>
              {expensesDelta.up ? "▲" : "▼"} {expensesDelta.percent}%
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-money-green via-cyber-purple to-white shadow-md">
          <CardHeader>
            <CardTitle className="text-money-green">Сбережения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-money-green">{dashboardMetrics.savings.toLocaleString()}₽</div>
            <div className="text-sm mt-1 text-cyber-purple">{dashboardMetrics.savingsPercent}% от дохода</div>
          </CardContent>
        </Card>
      </div>
      {/* Прогресс до цели */}
      <Card className="border-cyber-purple shadow bg-white">
        <CardHeader>
          <CardTitle className="text-cyber-purple font-bold">Прогресс к финансовой цели</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-2">
            <Progress value={progressValue} className="w-full h-3 bg-cyber-purple/10 progress-bar-cyber" />
            <span className="ml-2 font-semibold text-cyber-purple">{progressValue}%</span>
          </div>
          <div className="text-xs text-cyber-purple">Цель: {monthlyGoal.toLocaleString()}₽</div>
        </CardContent>
      </Card>
      {/* График бюджета с выбором типа */}
      <div className="flex justify-center mb-2">
        <div className="inline-flex bg-cyber-purple/10 rounded-lg p-1 gap-2 shadow">
          <button
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
              chartType === "bar"
                ? "bg-cyber-purple text-white shadow"
                : "hover:bg-cyber-purple/30"
            }`}
            onClick={() => setChartType("bar")}
          >
            Столбчатые
          </button>
          <button
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
              chartType === "line"
                ? "bg-cyber-purple text-white shadow"
                : "hover:bg-cyber-purple/30"
            }`}
            onClick={() => setChartType("line")}
          >
            Линейные
          </button>
        </div>
      </div>
      <Card className="border-cyber-purple shadow animate-scale-in mb-2">
        <CardHeader>
          <CardTitle>График бюджета</CardTitle>
          <CardDescription>Сравнение доходов и расходов за последние 3 месяца</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#a084ea" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#b470f3" fontSize={14} />
                  <Tooltip
                    cursor={{ fill: "#ccd7f444" }}
                    formatter={(val: number) => `${val?.toLocaleString()}₽`}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 5, fontSize: 13 }}
                    iconType="circle"
                    payload={[
                      { value: "Доходы", type: "circle", color: "#9B59B6" },
                      { value: "Расходы", type: "circle", color: "#00D4FF" }
                    ]}
                  />
                  <Bar dataKey="expenses" name="Расходы" fill="#00D4FF" radius={7} barSize={28} />
                  <Bar dataKey="income" name="Доходы" fill="#9B59B6" radius={7} barSize={28} />
                </BarChart>
              ) : (
                <LineChart data={budgetData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#a084ea" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#b470f3" fontSize={14} />
                  <Tooltip
                    cursor={{ stroke: "#9B59B6", strokeWidth: 2, opacity: 0.25 }}
                    formatter={(val: number) => `${val?.toLocaleString()}₽`}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 5, fontSize: 13 }}
                    iconType="circle"
                    payload={[
                      { value: "Доходы", type: "circle", color: "#9B59B6" },
                      { value: "Расходы", type: "circle", color: "#00D4FF" }
                    ]}
                  />
                  <Line type="monotone" dataKey="income" name="Доходы" stroke="#9B59B6" strokeWidth={3} dot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expenses" name="Расходы" stroke="#00D4FF" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* Совет эксперта — внизу */}
      <Card className="mx-auto w-full max-w-lg bg-cyber-purple/10 border-cyber-purple shadow-md">
        <CardContent className="flex items-center gap-2 py-3">
          <Info className="text-cyber-purple" size={22} />
          <span className="font-medium">{mainAdvice}</span>
        </CardContent>
      </Card>
    </div>
  );
}
