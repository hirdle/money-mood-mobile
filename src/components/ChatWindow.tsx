
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown, Goal, CircleDollarSign, PiggyBank } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Актуальные пользовательские цифры (синхронизированы)
const userStats = {
  income: 125000,
  expenses: 110850,
  savings: 14150,
  savingsPercent: 11, // (14150 / 125000 * 100)
  goal: 25000,
  goalProgress: 57,    // Math.round(14150/25000*100)
};

// Универсальная подсказка для экономии
const economyAdvice =
  userStats.expenses > userStats.income
    ? "Ваши расходы превышают доходы — это тревожный сигнал. Проверьте крупные траты, сокращайте подписки/лишние покупки!"
    : "Вы тратите меньше, чем зарабатываете — отличная привычка! Попробуйте наращивать долю сбережений.";

// Тематические категории с детальным текстом и советами, БЕЗ КНОПОК
const categories = [
  {
    category: "Бюджет",
    content: (
      <div className="space-y-4">
        <div className="bg-cyber-purple/10 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <CircleDollarSign className="text-cyber-purple" size={28} />
            <div>
              <span className="text-xs text-cyber-purple/70">Ваш баланс за месяц</span>
              <div className="text-xl font-bold text-cyber-purple">{userStats.savings.toLocaleString()}₽</div>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            Доход: <span className="text-green-500 font-semibold">{userStats.income.toLocaleString()}₽</span> &nbsp;|&nbsp; 
            Расход: <span className="text-red-500 font-semibold">{userStats.expenses.toLocaleString()}₽</span>
          </div>
        </div>
        <div>Общий баланс показывает разницу между вашими доходами и расходами за месяц. Если «в плюсе»— финансовая подушка крепнет и стресс снижается!</div>
        <div className="bg-gradient-to-r from-green-50 to-purple-50/60 rounded-xl p-3 shadow-sm">
          <b>Совет:</b> Старайтесь, чтобы остаток всегда был не меньше <span className="font-semibold">10-20%</span> дохода — это ваш запас прочности.
        </div>
      </div>
    ),
  },
  {
    category: "Доходы",
    content: (
      <div className="space-y-4">
        <div className="bg-green-100 p-4 rounded-xl flex items-center gap-4">
          <TrendingUp className="text-green-500" size={28} />
          <div>
            <div className="text-xs text-green-700 mb-1">Ваш доход за месяц:</div>
            <div className="text-xl font-bold text-green-700">{userStats.income.toLocaleString()}₽</div>
          </div>
        </div>
        <div>Доходы считаются по всем поступлениям за месяц (зарплата, фриланс, премии и т.д). Следите за динамикой: если доход растёт — часть отправляйте в сбережения или на цели.</div>
        <div className="bg-green-50 p-3 rounded-xl text-sm">
          <b>Совет:</b> Старайтесь откладывать хотя бы <span className="font-semibold">20%</span> с любого дохода — это ускорит достижение целей и повысит устойчивость.
        </div>
      </div>
    ),
  },
  {
    category: "Расходы",
    content: (
      <div className="space-y-4">
        <div className="bg-red-100 p-4 rounded-xl flex items-center gap-4">
          <TrendingDown className="text-red-500" size={28} />
          <div>
            <div className="text-xs text-red-600 mb-1">Ваши расходы за месяц:</div>
            <div className="text-xl font-bold text-red-600">{userStats.expenses.toLocaleString()}₽</div>
          </div>
        </div>
        <div>Обычно больше всего уходит на еду, развлечения и подписки. Проверьте эти разделы — если тратите больше <span className="font-semibold">{Math.round(userStats.income * .15).toLocaleString()}₽</span> в месяц на что-то одно, можно подумать об оптимизации.</div>
        <div className="bg-red-50 p-3 rounded-xl text-sm">
          <b>Совет:</b> Готовьте дома, откажитесь от лишней подписки, сверяйте скидки. {economyAdvice}
        </div>
      </div>
    ),
  },
  {
    category: "Цели и сбережения",
    content: (
      <div className="space-y-4">
        <div className="bg-emerald-100 p-4 rounded-xl flex items-center gap-4">
          <PiggyBank className="text-emerald-500" size={28} />
          <div>
            <div className="text-xs mb-1">Сбережено:</div>
            <div className="text-xl font-bold text-emerald-600">{userStats.savings.toLocaleString()}₽</div>
          </div>
        </div>
        <div>Ваша краткосрочная цель: <b>{userStats.goal.toLocaleString()}₽</b>.<br /> Прогресс: <span className="font-semibold">{userStats.goalProgress}%</span></div>
        <div>Рекомендуется иметь финансовую подушку минимум на 3 месяца трат — для вас это <span className="font-semibold">{(userStats.expenses*3).toLocaleString()}₽</span>.</div>
        <div className="bg-emerald-50 p-3 rounded-xl text-sm">
          <b>Совет:</b> Пополняйте цель хоть небольшой суммой каждую неделю. Автопереводы и переводы остатка после покупок помогают быстрее накопить!
        </div>
      </div>
    ),
  },
  {
    category: "Графики и инсайты",
    content: (
      <div className="space-y-4">
        <div className="bg-sky-100 p-4 rounded-xl mb-2">
          <div className="font-semibold mb-1">График бюджета</div>
          <div className="text-sm text-cyber-purple">
            Сравните доходы и расходы за 3 месяца на графике — это поможет понять тренды и вовремя скорректировать стратегию.
          </div>
        </div>
        <div>В разделе «Инсайты» появляются персональные советы, основанные на ваших действиях. Если увидели 🔥 — обязательно ознакомьтесь!</div>
        <div className="bg-gradient-to-r from-cyber-purple/10 to-sky-50 rounded-xl p-3 shadow-sm">
          <b>Совет:</b> Проверяйте инсайты каждую неделю — это поможет не упустить новые возможности для экономии и накоплений.
        </div>
      </div>
    ),
  },
];

const insights = [
  "Откладывайте не менее 20% дохода на финансовую подушку.",
  "Внимательно следите за категориями «Еда» и «Развлечения» — здесь чаще всего можно сэкономить.",
  "Регулярно проверяйте свои подписки: иногда маленькие расходы незаметно становятся большими!",
];

const ChatWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  // Получаем выбранную категорию
  const categoryData = categories.find((cat) => cat.category === selectedCategory);

  return (
    <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col" onOpenAutoFocus={e => e.preventDefault()}>
        <DrawerHeader className="text-left flex-shrink-0">
          <div className="flex justify-between items-center">
            <DrawerTitle>Финансовый помощник</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Готовые разборы по бюджету, доходам, расходам, целям и лайфхаки!
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex-grow px-4">
          <div className="space-y-5 my-6">
            {!selectedCategory ? (
              <div>
                <div className="mb-3 text-base font-semibold">Выберите интересующую тему:</div>
                <div className="grid gap-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.category}
                      className="cursor-pointer bg-muted p-4 rounded-2xl shadow hover:bg-cyber-purple/10 transition group"
                      onClick={() => setSelectedCategory(cat.category)}
                    >
                      <span className="text-cyber-purple font-bold text-base group-hover:underline">{cat.category}</span>
                      <div className="text-xs text-muted-foreground mt-1 opacity-70">Подробнее</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="font-bold text-cyber-purple mb-2">Инсайты и советы недели</div>
                  <ul className="list-disc ml-5 space-y-2">
                    {insights.map((tip, idx) => (
                      <li key={idx} className="bg-cyber-purple/10 rounded-md px-3 py-2">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-3 text-muted-foreground text-xs cursor-pointer" onClick={() => setSelectedCategory(null)}>
                  ← Назад к темам
                </div>
                <div>
                  <div className="text-lg font-bold text-cyber-purple mb-4">{selectedCategory}</div>
                  {categoryData?.content}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <DrawerFooter className="flex-shrink-0" />
      </DrawerContent>
    </Drawer>
  );
};

export default ChatWindow;
