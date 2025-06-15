
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
import { Button } from "@/components/ui/button";
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

const petInitials = [
  { emoji: "🦊", label: "Фокс", amount: "+2 000₽", positive: true },
  { emoji: "🦁", label: "Лев", amount: "+10 000₽", positive: true }
];

const storyData = [
  { emoji: "🍔", title: "Еда", color: "bg-yellow-200" },
  { emoji: "🎁", title: "Подарок", color: "bg-orange-200" },
  { emoji: "🏖️", title: "Отпуск", color: "bg-yellow-100" },
  { emoji: "📱", title: "Связь", color: "bg-orange-100" }
];

export default function HomePage() {
  // История питомцев: каждый новый добавляется в начало массива
  const [pets, setPets] = useState([...petInitials]);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  // Добавить нового питомца (доход)
  const addIncomePet = () => {
    setPets([{ emoji: "🐯", label: "Тигр", amount: "+5 000₽", positive: true }, ...pets]);
  };
  // Добавить нового питомца (расход)
  const addExpensePet = () => {
    setPets([{ emoji: "🐭", label: "Мышь", amount: "-1 500₽", positive: false }, ...pets]);
  };

  // Основной совет
  const mainAdvice = financialAdvice[0];

  return (
    <div className="p-2 sm:p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      {/* STORIES: ВЕРХНИЙ БЛОК */}
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
              "rounded-full border-4 border-orange-300 p-1 shadow-md mb-1",
              s.color,
              "w-14 h-14 flex items-center justify-center text-3xl"
            )}>
              <span>{s.emoji}</span>
            </div>
            <span className="text-xs text-orange-600 font-medium">{s.title}</span>
          </div>
        ))}
      </div>

      {/* "Питомцы" — список операций ДОХОД и РАСХОД */}
      <div className="space-y-2">
        {pets.map((pet, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center gap-3 rounded-xl shadow-sm border border-orange-200 bg-gradient-to-r",
              pet.positive
                ? "from-orange-100 via-yellow-50 to-white"
                : "from-orange-50 to-yellow-100",
              "px-4 py-3 animate-fade-in"
            )}
          >
            <span className="text-2xl">{pet.emoji}</span>
            <span className="font-semibold">{pet.label}</span>
            <span className={cn("ml-auto font-bold", pet.positive ? "text-orange-600" : "text-red-500")}>
              {pet.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Кнопки добавления */}
      <div className="flex gap-4 justify-center mt-2 mb-2">
        <Button
          className="hover-scale rounded-lg px-5 py-2 font-bold bg-gradient-to-r from-orange-400 to-yellow-300 text-white shadow"
          onClick={addIncomePet}
        >
          + Доход
        </Button>
        <Button
          className="hover-scale rounded-lg px-5 py-2 font-bold bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow"
          onClick={addExpensePet}
        >
          + Расход
        </Button>
      </div>

      {/* График бюджета с выбором типа */}
      <div className="flex justify-center mb-2">
        <div className="inline-flex bg-orange-100 rounded-lg p-1 gap-2 shadow">
          <button
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
              chartType === "bar"
                ? "bg-orange-400 text-white shadow"
                : "hover:bg-orange-200"
            }`}
            onClick={() => setChartType("bar")}
          >
            Столбчатые
          </button>
          <button
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
              chartType === "line"
                ? "bg-orange-400 text-white shadow"
                : "hover:bg-orange-200"
            }`}
            onClick={() => setChartType("line")}
          >
            Линейные
          </button>
        </div>
      </div>
      <Card className="border-orange-200 shadow animate-scale-in mb-2">
        <CardHeader>
          <CardTitle>График бюджета</CardTitle>
          <CardDescription>Сравнение доходов и расходов за последние 3 месяца</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#fde68a" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#e58817" fontSize={14} />
                  <Tooltip
                    cursor={{ fill: "#fde68a44" }}
                    formatter={(val: number) => `${val?.toLocaleString()}₽`}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 5, fontSize: 13 }}
                    iconType="circle"
                    payload={[
                      { value: "Доходы", type: "circle", color: "#FFA726" },
                      { value: "Расходы", type: "circle", color: "#FB923C" }
                    ]}
                  />
                  <Bar dataKey="expenses" name="Расходы" fill="#FB923C" radius={7} barSize={28} />
                  <Bar dataKey="income" name="Доходы" fill="#FFA726" radius={7} barSize={28} />
                </BarChart>
              ) : (
                <LineChart data={budgetData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#fde68a" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#e58817" fontSize={14} />
                  <Tooltip
                    cursor={{ stroke: "#FFA726", strokeWidth: 2, opacity: 0.25 }}
                    formatter={(val: number) => `${val?.toLocaleString()}₽`}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 5, fontSize: 13 }}
                    iconType="circle"
                    payload={[
                      { value: "Доходы", type: "circle", color: "#FFA726" },
                      { value: "Расходы", type: "circle", color: "#FB923C" }
                    ]}
                  />
                  <Line type="monotone" dataKey="income" name="Доходы" stroke="#FFA726" strokeWidth={3} dot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expenses" name="Расходы" stroke="#FB923C" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* Совет эксперта — ВНИЗ */}
      <Card className="mx-auto w-full max-w-lg bg-orange-50 border-orange-200 shadow-md">
        <CardContent className="flex items-center gap-2 py-3">
          <Info className="text-orange-400" size={22} />
          <span className="font-medium">{mainAdvice}</span>
        </CardContent>
      </Card>
    </div>
  );
}
