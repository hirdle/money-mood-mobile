
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const budgetData = [
  { month: "Май", income: 115000, expenses: 94000 },
  { month: "Июнь", income: 120000, expenses: 102000 },
  { month: "Июль", income: 125000, expenses: 110850 },
];

function getDelta(a: number, b: number) {
  const diff = a - b;
  const percent = b ? ((diff) / b) * 100 : 0;
  return { up: diff > 0, percent: Math.abs(percent).toFixed(1) };
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

const HomePage = () => {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const mainAdvice = financialAdvice[0];

  return (
    <div className="min-h-screen bg-white p-0">
      {/* Приветствие */}
      <div className="pt-10 pb-3 text-center space-y-1">
        <h1 className="text-4xl font-bold text-black" style={{letterSpacing: -1.2}}>Привет, Илья!</h1>
      </div>
      {/* Истории — выравниваем по центру */}
      <div className="flex justify-center w-full mb-3">
        <div className="flex flex-col items-center w-full max-w-xl">
          <div className="w-full flex flex-col items-center">
            <div className="bg-white rounded-3xl shadow-2xl px-5 py-4 flex flex-col items-center w-full gap-3">
              <span className="text-xl font-semibold text-black mb-3 text-center">Истории</span>
              <div className="flex gap-8 justify-center items-center mt-1 mb-1">
                <div className="w-20 h-20 rounded-full border-4 border-[#12C10A] flex items-center justify-center overflow-hidden bg-white shadow-md">
                  <div className="w-14 h-14 bg-[#f3f4f6] rounded-full flex items-center justify-center font-bold text-2xl text-[#12C10A]">₽</div>
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-orange-400 flex items-center justify-center overflow-hidden bg-white shadow-md">
                  <div className="w-14 h-14 bg-[#f3f4f6] rounded-full flex items-center justify-center font-bold text-2xl text-orange-500">💵</div>
                </div>
              </div>
            </div>
          </div>

          {/* Совет дня */}
          <div className="w-full bg-white rounded-3xl shadow-2xl px-5 py-5 flex flex-col gap-1 mt-5">
            <span className="text-xl font-semibold text-black mb-1">Совет дня</span>
            <span className="mt-1 text-[22px] font-bold text-[#11AB0B] leading-tight" style={{lineHeight: "1.15"}}>
              Отмени подписки на кинотеатры и сэкономишь 10+ тыс. рублей
            </span>
          </div>

          {/* Дашборд карточки */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <div className="rounded-3xl bg-white shadow-lg px-6 py-6 flex flex-col items-start gap-2 border border-gray-100">
              <span className="text-black font-semibold text-sm opacity-70">Доходы (Июль)</span>
              <span className="font-bold text-2xl text-black">{dashboardMetrics.income.toLocaleString()}₽</span>
              <span className="text-black text-xs opacity-60">
                {incomeDelta.up ? "Выше" : "Ниже"} прошлого месяца &nbsp;
                <span className={`font-bold ${incomeDelta.up ? "text-[#12C10A]" : "text-red-400"}`}>
                  {incomeDelta.percent}%
                </span>
              </span>
            </div>
            <div className="rounded-3xl bg-white shadow-lg px-6 py-6 flex flex-col items-start gap-2 border border-gray-100">
              <span className="text-black font-semibold text-sm opacity-70">Расходы (Июль)</span>
              <span className="font-bold text-2xl text-black">{dashboardMetrics.expenses.toLocaleString()}₽</span>
              <span className="text-black text-xs opacity-60">
                {expensesDelta.up ? "Больше" : "Меньше"} прошлого месяца &nbsp;
                <span className={`font-bold ${expensesDelta.up ? "text-orange-400" : "text-[#12C10A]"}`}>
                  {expensesDelta.percent}%
                </span>
              </span>
            </div>
            <div className="rounded-3xl bg-white shadow-lg px-6 py-6 flex flex-col items-start gap-2 border border-gray-100">
              <span className="text-black font-semibold text-sm opacity-70">Сбережения</span>
              <span className="font-bold text-2xl text-black">{dashboardMetrics.savings.toLocaleString()}₽</span>
              <span className="text-black text-xs opacity-60">
                {dashboardMetrics.savingsPercent}% от дохода
              </span>
            </div>
          </div>

          {/* График */}
          <div className="w-full bg-white rounded-3xl shadow-2xl px-6 py-5 mt-6 border border-gray-100">
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
