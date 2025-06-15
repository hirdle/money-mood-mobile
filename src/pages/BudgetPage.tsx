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
import { Calculator, Landmark, Wallet, TrendingUp, TrendingDown, CircleDollarSign, UsersRound, Car, Home } from "lucide-react";

const budgetData = [
  { month: "Май", income: 115000, expenses: 94000 },
  { month: "Июнь", income: 120000, expenses: 102000 },
  { month: "Июль", income: 125000, expenses: 110850 },
];

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

const monthlyCategories = [
  { category: "Еда и продукты", amount: 18000 },
  { category: "Транспорт", amount: 4500 },
  { category: "ЖКХ", amount: 6200 },
  { category: "Связь и интернет", amount: 1100 },
  { category: "Развлечения", amount: 3500 },
  { category: "Одежда и покупки", amount: 2700 },
];

const sharedPurchases = [
  { item: "Подписка на онлайн-кинотеатр", amount: 600, friends: "Настя, Игорь" },
  { item: "Путешествие в Сочи", amount: 48000, friends: "Костя, Лена" },
  { item: "Совместный подарок", amount: 8500, friends: "Друзья" },
];

const BudgetPage = () => {
  const currentMonth = budgetData[budgetData.length - 1];
  const savings = currentMonth.income - currentMonth.expenses;

  // Суммы по категориям на основе секций выше
  const categories = [
    { label: "Еда и продукты", amount: 18000 },
    { label: "Транспорт", amount: 4500 },
    { label: "ЖКХ", amount: 6200 + 1350 + 1200 + 2000 + 850 + 800 }, // из блока "ЖКХ"
    { label: "Связь и интернет", amount: 1100 + 850 },
    { label: "Развлечения", amount: 3500 },
    { label: "Одежда и покупки", amount: 2700 },
    { label: "Совместные покупки с друзьями", amount: 600 + 48000 + 8500 },
    { label: "Крупные покупки", amount: 120000 + 85000 },
    { label: "Налоги", amount: 15600 + 4200 + 6000 }, // НДФЛ + имущество + авто
    { label: "ОСАГО/Штрафы", amount: 11500 + 900 },
  ];
  // Суммарные расходы
  const totalExpenses = categories.reduce((acc, cur) => acc + cur.amount, 0);

  // Для процентов
  const categoriesWithPercent = categories.map(cat => ({
    ...cat,
    percent: ((cat.amount / totalExpenses) * 100).toFixed(1)
  }));

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Бюджет и налоги</h1>
        <p className="text-sm text-muted-foreground">
          Обзор ваших финансовых обязательств и планирование.
        </p>
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

      {/* Налоги */}
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

      {/* Налоги на авто */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Car className="h-5 w-5 text-primary" />
            <span>Налоги на авто</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Транспортный налог (до 01.12)</TableCell>
                <TableCell className="text-right font-medium">6,000₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ОСАГО (страховка, в год)</TableCell>
                <TableCell className="text-right font-medium">11,500₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Штрафы (за 2025 г.)</TableCell>
                <TableCell className="text-right font-medium">900₽</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ЖКХ */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Home className="h-5 w-5 text-primary" />
            <span>ЖКХ</span>
          </CardTitle>
          <CardDescription>Коммунальные услуги за последний месяц</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Услуга</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Электричество</TableCell>
                <TableCell className="text-right font-medium">1,350₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Вода и канализация</TableCell>
                <TableCell className="text-right font-medium">1,200₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Отопление</TableCell>
                <TableCell className="text-right font-medium">2,000₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Интернет</TableCell>
                <TableCell className="text-right font-medium">850₽</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Обслуживание дома/кап. ремонт</TableCell>
                <TableCell className="text-right font-medium">800₽</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Месячные траты по категориям */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Средние расходы по категориям</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Категория</TableHead>
                <TableHead className="text-right">Сумма в месяц</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyCategories.map((item) => (
                <TableRow key={item.category}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right font-medium">{item.amount.toLocaleString()}₽</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Совместные покупки с друзьями */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UsersRound className="h-5 w-5 text-primary" />
            <span>Совместные покупки с друзьями</span>
          </CardTitle>
          <CardDescription>
            Общее участие в оплате или планах с друзьями
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Покупка</TableHead>
                <TableHead>Друзья</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sharedPurchases.map((item) => (
                <TableRow key={item.item}>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.friends}</TableCell>
                  <TableCell className="text-right font-medium">{item.amount.toLocaleString()}₽</TableCell>
                </TableRow>
              ))}
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
