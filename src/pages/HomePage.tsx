
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, CircleDollarSign } from "lucide-react";

// Основные бюджетные данные для графиков
const budgetData = [
  { month: "Май", income: 115000, expenses: 94000 },
  { month: "Июнь", income: 120000, expenses: 102000 },
  { month: "Июль", income: 125000, expenses: 110850 },
];

const dashboardMetrics = (() => {
  // Самый свежий месяц
  const last = budgetData[budgetData.length - 1];
  return {
    income: last.income,
    expenses: last.expenses,
    savings: last.income - last.expenses,
  };
})();

const HomePage = () => {
  // ... можно удалить старый расчет totalSpent, overallMood и всё, что было для "настроения" ...
  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Дашборд бюджета</h1>
        <p className="text-sm text-muted-foreground">
          Ваши ключевые финансовые показатели за последние 3 месяца
        </p>
      </div>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-green-100 via-green-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="text-green-500" size={20} />
              Доходы
            </CardTitle>
            <CardDescription>Последний месяц</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-2xl text-green-600">
              {dashboardMetrics.income.toLocaleString()}₽
            </span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-100 via-red-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="text-red-500" size={20} />
              Расходы
            </CardTitle>
            <CardDescription>Последний месяц</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-2xl text-red-600">
              {dashboardMetrics.expenses.toLocaleString()}₽
            </span>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CircleDollarSign className="text-sky-500" size={20} />
              Сбережения
            </CardTitle>
            <CardDescription>Последний месяц</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="font-bold text-2xl text-sky-600">
              {dashboardMetrics.savings.toLocaleString()}₽
            </span>
          </CardContent>
        </Card>
      </div>

      {/* График бюджета по месяцам */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика бюджета</CardTitle>
          <CardDescription>Сравнение доходов и расходов по месяцам</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#eee" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#999" fontSize={12} />
                <Bar dataKey="expenses" name="Расходы" fill="#ef4444" radius={6} />
                <Bar dataKey="income" name="Доходы" fill="#34d399" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
