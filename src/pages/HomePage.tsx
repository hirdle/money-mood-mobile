import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from "recharts";
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

  // Используем первый совет
  const mainAdvice = financialAdvice[0];

  return (
    <div className="bg-white min-h-screen p-0">
      {/* Крупный минималистичный приветственный заголовок */}
      <div className="pt-10 pb-3 text-center space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold text-black" style={{letterSpacing: -1.2}}>Привет, Илья!</h1>
      </div>

      {/* Истории */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl flex flex-col items-center gap-6">
          {/* Блок ИСТОРИИ */}
          <div className="w-full bg-white rounded-3xl shadow-lg px-6 py-5 mb-2 flex flex-col gap-2">
            <span className="text-xl font-medium text-black mb-3">Истории</span>
            <div className="flex gap-5 justify-start items-center mt-1 mb-1">
              {/* В реальном проекте заменить SVG кружочки на иконки или изображения */}
              <div className="w-20 h-20 rounded-full border-4 border-[#12C10A] flex items-center justify-center overflow-hidden bg-white shadow">
                {/* можно заменить на <img src=... /> */}
                <div className="w-14 h-14 bg-[#f3f4f6] rounded-full flex items-center justify-center font-bold text-2xl text-[#12C10A]">₽</div>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-orange-400 flex items-center justify-center overflow-hidden bg-white shadow">
                <div className="w-14 h-14 bg-[#f3f4f6] rounded-full flex items-center justify-center font-bold text-2xl text-orange-500">💵</div>
              </div>
              {/* ...можно добавить больше */}
            </div>
          </div>
          
          {/* Блок СОВЕТ ДНЯ */}
          <div className="w-full bg-white rounded-3xl shadow-lg px-6 py-5 flex flex-col gap-0">
            <span className="text-xl font-medium text-black mb-1">Совет дня</span>
            <span className="mt-1 text-[22px] font-bold text-[#12C10A] leading-tight" style={{lineHeight: "1.15"}}>
              Отмени подписки на кинотеатры и сэкономишь 10+ тыс. рублей
            </span>
          </div>

          {/* Блок Дашборда с метриками — простой cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 mt-1">
            <div className="bg-white rounded-3xl shadow-lg px-6 py-6 flex flex-col items-start gap-2">
              <span className="text-black font-semibold text-sm opacity-70">Доходы (Июль)</span>
              <span className="font-bold text-2xl text-black">{dashboardMetrics.income.toLocaleString()}₽</span>
              <span className="text-black text-xs opacity-60">
                {incomeDelta.up ? "Выше" : "Ниже"} прошлого месяца &nbsp;
                <span className={`font-bold ${incomeDelta.up ? "text-[#12C10A]" : "text-red-400"}`}>
                  {incomeDelta.percent}%
                </span>
              </span>
            </div>
            <div className="bg-white rounded-3xl shadow-lg px-6 py-6 flex flex-col items-start gap-2">
              <span className="text-black font-semibold text-sm opacity-70">Расходы (Июль)</span>
              <span className="font-bold text-2xl text-black">{dashboardMetrics.expenses.toLocaleString()}₽</span>
              <span className="text-black text-xs opacity-60">
                {expensesDelta.up ? "Больше" : "Меньше"} прошлого месяца &nbsp;
                <span className={`font-bold ${expensesDelta.up ? "text-orange-400" : "text-[#12C10A]"}`}>
                  {expensesDelta.percent}%
                </span>
              </span>
            </div>
            <div className="bg-white rounded-3xl shadow-lg px-6 py-6 flex flex-col items-start gap-2">
              <span className="text-black font-semibold text-sm opacity-70">Сбережения</span>
              <span className="font-bold text-2xl text-black">{dashboardMetrics.savings.toLocaleString()}₽</span>
              <span className="text-black text-xs opacity-60">
                {dashboardMetrics.savingsPercent}% от дохода
              </span>
            </div>
          </div>

          {/* Самый минимальный график — карточка с белым фоном */}
          <div className="w-full bg-white rounded-3xl shadow-lg px-6 py-5 mt-2">
            <span className="text-base text-black font-medium block mb-2">График доходов и расходов</span>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} margin={{ top: 16, right: 16, left: -8, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#F2F2F2" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#222" fontSize={15} />
                  <Tooltip
                    cursor={{ fill: "#E9E9E9" }}
                    contentStyle={{ borderRadius: 16, fontWeight: 500, border: "none", background: "#fff" }}
                    labelStyle={{ color: "#11AB0B" }}
                    formatter={(val: number) => `${val?.toLocaleString()}₽`}
                  />
                  <Bar dataKey="income" name="Доходы" fill="#12C10A" radius={12} barSize={32} />
                  <Bar dataKey="expenses" name="Расходы" fill="#FFD93D" radius={12} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
