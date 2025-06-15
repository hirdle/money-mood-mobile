
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown, Goal, CircleDollarSign, PiggyBank, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Актуальные пользовательские цифры (синхронизированы)
const userStats = {
  income: 125000,
  expenses: 110850,
  savings: 14150,
  savingsPercent: 11, // (14150 / 125000 * 100)
  goal: 25000,
  goalProgress: 57,
};

// Универсальная подсказка для экономии
const economyAdvice =
  userStats.expenses > userStats.income
    ? "Ваши расходы превышают доходы — это тревожный сигнал. Проверьте крупные траты, сокращайте подписки/лишние покупки!"
    : "Вы тратите меньше, чем зарабатываете — отличная привычка! Попробуйте наращивать долю сбережений.";

// Дополнительные вложенные советы по категориям
const extraTips = {
  "Бюджет": [
    "Планируйте бюджет на неделю вперед — это снижает неожиданные траты.",
    "Пользуйтесь приложениями для учёта расходов для автоматизации контроля.",
  ],
  "Доходы": [
    "Регулярно пересматривайте рынок труда — новые предложения появляются часто.",
    "Осваивайте дополнительные навыки: это может повысить ваш доход.",
  ],
  "Расходы": [
    "Устанавливайте лимиты на категории расходов.",
    "Всегда проверяйте промо-акции и скидки перед покупками.",
  ],
  "Цели и сбережения": [
    "Чтобы цель не откладывалась, поставьте автоплатёж на небольшую сумму.",
    "Держите сбережения отдельно от повседневной карты.",
  ],
  "Графики и инсайты": [
    "Ведите свой личный топ-3 трат за месяц — это поможет их осознать.",
    "Задавайте вопросы ИИ для получения персонализированных советов.",
  ],
};

// Часто задаваемые вопросы и быстрые ответы
const faq = [
  {
    question: "Что делать, если не получается копить деньги?",
    answer: "Начните с 5-10% дохода, увеличивайте долю постепенно. Переносите остатки недели в сбережения автоматически."
  },
  {
    question: "Как сократить траты на еду?",
    answer: "Планируйте меню, готовьте дома и покупайте только по списку. Используйте дисконтные карты и кэшбэк."
  },
  {
    question: "Стоит ли инвестировать сразу?",
    answer: "Сначала сформируйте подушку безопасности (3-6 месяцев расходов), затем — пробуйте простые инструменты (накопительный счёт, ОФЗ)."
  },
  {
    question: "Как дисциплинировать себя не тратить лишнего?",
    answer: "Используйте только наличные/лимитированную карту на траты. Отслеживайте расходы ежедневно в приложении."
  },
  {
    question: "Как отслеживать прогресс по целям?",
    answer: "Настройте регулярные уведомления/напоминания и записывайте изменения суммы накоплений раз в неделю/месяц."
  },
];

const categories = [
  {
    category: "Бюджет",
    content: (
      <div className="space-y-3">
        <div className="bg-orange-100 p-4 rounded-xl flex items-center gap-3">
          <CircleDollarSign className="text-orange-500" size={26} />
          <div>
            <span className="text-xs text-orange-500/70">Ваш баланс за месяц</span>
            <div className="text-xl font-bold text-orange-500">{userStats.savings.toLocaleString()}₽</div>
          </div>
        </div>
        <div>Общий баланс показывает разницу между вашими доходами и расходами за месяц. Если «в плюсе» — финансовая подушка крепнет и стресс снижается!</div>
        <div className="bg-gradient-to-r from-orange-200 to-yellow-100 rounded-xl p-3 shadow-sm">
          <b>Совет:</b> Старайтесь, чтобы остаток всегда был не меньше <span className="font-semibold">10-20%</span> дохода — это ваш запас прочности.
        </div>
      </div>
    ),
  },
  {
    category: "Доходы",
    content: (
      <div className="space-y-3">
        <div className="bg-orange-100 p-4 rounded-xl flex items-center gap-4">
          <TrendingUp className="text-orange-500" size={26} />
          <div>
            <div className="text-xs text-orange-700 mb-1">Ваш доход за месяц:</div>
            <div className="text-xl font-bold text-orange-700">{userStats.income.toLocaleString()}₽</div>
          </div>
        </div>
        <div>Доходы считаются по всем поступлениям за месяц. Если доход растёт — увеличьте размер сбережений или попробуйте реализовать дополнительный источник дохода.</div>
        <div className="bg-orange-50 p-3 rounded-xl text-sm">
          <b>Совет:</b> Откладывайте <span className="font-semibold">20%</span> с любого дохода — так путь к финансовым целям станет короче!
        </div>
      </div>
    ),
  },
  {
    category: "Расходы",
    content: (
      <div className="space-y-3">
        <div className="bg-orange-100 p-4 rounded-xl flex items-center gap-4">
          <TrendingDown className="text-orange-500" size={26} />
          <div>
            <div className="text-xs text-orange-700 mb-1">Расходы за месяц:</div>
            <div className="text-xl font-bold text-orange-700">{userStats.expenses.toLocaleString()}₽</div>
          </div>
        </div>
        <div>Проверьте: на что уходит больше всего? Лимитируйте подписки и импульсивные покупки.</div>
        <div className="bg-orange-50 p-3 rounded-xl text-sm">
          <b>Совет:</b> Используйте приложения для трекинга. {economyAdvice}
        </div>
      </div>
    ),
  },
  {
    category: "Цели и сбережения",
    content: (
      <div className="space-y-3">
        <div className="bg-orange-100 p-4 rounded-xl flex items-center gap-4">
          <PiggyBank className="text-orange-500" size={26} />
          <div>
            <div className="text-xs mb-1 text-orange-700">Сбережено:</div>
            <div className="text-xl font-bold text-orange-700">{userStats.savings.toLocaleString()}₽</div>
          </div>
        </div>
        <div>Ваша краткосрочная цель: <b>{userStats.goal.toLocaleString()}₽</b>.<br /> Прогресс: <span className="font-semibold">{userStats.goalProgress}%</span></div>
        <div className="bg-orange-50 p-3 rounded-xl text-sm">
          <b>Совет:</b> Маленькие и регулярные пополнения — залог того, что цель не будет "миражом".
        </div>
      </div>
    ),
  },
  {
    category: "Графики и инсайты",
    content: (
      <div className="space-y-3">
        <div className="bg-orange-100 p-3 rounded-xl mb-2">
          <div className="font-semibold mb-1">График бюджета</div>
          <div className="text-sm text-orange-500">
            В разделе «Бюджет» проверьте динамику за 3 месяца и найдите, куда уходят основные суммы.
          </div>
        </div>
        <div>В разделе «Инсайты» появляются персональные советы, основанные на ваших действиях.</div>
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-3 shadow-sm">
          <b>Совет:</b> Проверяйте инсайты каждую неделю — это путь к дополнительной экономии!
        </div>
      </div>
    ),
  },
];

const insights = [
  "Откладывайте минимум 20% дохода — даже если сумма кажется маленькой.",
  "Категории «Еда» и «Развлечения» — часто драйвер лишних трат.",
  "Периодически проверяйте подписки, чтобы не платить за ненужное.",
];

const ChatWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [showExtra, setShowExtra] = useState(false);

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
            Быстрые разборы, советы и ответы на частые вопросы по личным финансам
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex-grow px-4">
          <div className="space-y-6 my-6">
            {!selectedCategory ? (
              <div>
                <div className="mb-3 text-base font-semibold">Выберите интересующую тему:</div>
                <div className="grid gap-3">
                  {categories.map((cat) => (
                    <Button
                      key={cat.category}
                      className="w-full !bg-orange-400 !text-white !rounded-xl font-bold shadow hover:scale-105 transition flex justify-between items-center"
                      onClick={() => {
                        setSelectedCategory(cat.category);
                        setShowExtra(false);
                      }}
                    >
                      <span>{cat.category}</span>
                      <ChevronRight size={20} />
                    </Button>
                  ))}
                </div>

                {/* Советы недели */}
                <div className="mt-8">
                  <div className="font-bold text-orange-500 mb-2">Инсайты и советы недели</div>
                  <ul className="list-disc ml-5 space-y-2">
                    {insights.map((tip, idx) => (
                      <li key={idx} className="bg-orange-100 rounded-md px-3 py-2">{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* FAQ блог */}
                <div className="mt-10">
                  <div className="font-bold text-orange-500 mb-2">Часто задаваемые вопросы</div>
                  <Accordion type="single" collapsible className="w-full">
                    {faq.map((item, i) => (
                      <AccordionItem key={i} value={"faq" + i}>
                        <AccordionTrigger className="text-base font-semibold">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-sm">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-3 text-muted-foreground text-xs cursor-pointer inline-block" onClick={() => setSelectedCategory(null)}>
                  ← Назад к темам
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-500 mb-4">{selectedCategory}</div>
                  {categoryData?.content}
                </div>
                {/* Вложенные советы */}
                {selectedCategory && extraTips[selectedCategory]?.length > 0 && (
                  <div className="mt-5">
                    <Button
                      onClick={() => setShowExtra(!showExtra)}
                      className="w-full !bg-orange-300 !text-white rounded-xl font-semibold text-sm shadow mb-2"
                    >
                      {showExtra ? "Скрыть дополнительные советы" : "Показать дополнительные советы"}
                    </Button>
                    <div className={showExtra ? "block" : "hidden"}>
                      <ul className="list-disc ml-5 space-y-2">
                        {extraTips[selectedCategory].map((tip, idx) => (
                          <li key={idx} className="bg-orange-100 rounded-md px-3 py-2 text-sm">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
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
