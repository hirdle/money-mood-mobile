
import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, TrendingDown, Goal, CircleDollarSign, PiggyBank } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

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

// Тематические категории с вопросами и вшитой аналитикой по числам пользователя
const analyticsQa = [
  {
    category: "Бюджет",
    questions: [
      {
        question: "Что отражает блок общего баланса?",
        answer: (
          <div>
            <div className="bg-gradient-to-r from-cyber-purple/10 via-white to-emerald-50 p-4 rounded-xl flex items-center gap-5 mb-3">
              <CircleDollarSign className="text-cyber-purple/60" size={32} />
              <div>
                <div className="text-xs text-cyber-purple/80 mb-1">Ваш баланс за месяц</div>
                <div className="text-2xl font-black text-cyber-purple">{(userStats.savings).toLocaleString()}₽</div>
                <div className="text-xs text-muted-foreground mt-1">Доход: <span className="text-green-500 font-bold">{userStats.income.toLocaleString()}₽</span>, Расход: <span className="text-red-500 font-bold">{userStats.expenses.toLocaleString()}₽</span></div>
              </div>
            </div>
            <div className="mt-2">
              Блок <b>“Общий баланс”</b> показывает разницу между вашими доходами и расходами за месяц. Это ключевой показатель финансовой устойчивости: чем больше в плюсе — тем комфортнее и безопаснее ваша ситуация.
            </div>
          </div>
        ),
      },
      {
        question: "Как рассчитывается “Прогресс к цели” и сколько осталось?",
        answer: (
          <div>
            <div className="bg-gradient-to-r from-emerald-100 via-white to-cyber-purple/10 p-4 rounded-xl flex items-center gap-5 mb-3">
              <Goal className="text-emerald-400" size={28} />
              <div>
                <div className="text-xs mb-1">Ваша цель: <span className="font-bold text-cyber-purple">{userStats.goal.toLocaleString()}₽</span></div>
                <div className="font-bold text-lg text-cyber-purple">{userStats.goalProgress}%</div>
                <div className="text-xs text-muted-foreground mt-1">Cбережено: <span className="font-bold">{userStats.savings.toLocaleString()}₽</span>, осталось — {userStats.goal - userStats.savings}₽</div>
              </div>
            </div>
            Прогресс — это доля накопленной суммы от заданной финансовой цели месяца. Вы прошли уже <b>{userStats.goalProgress}%!</b> Регулярные небольшие пополнения увеличат результат быстрее.
          </div>
        ),
      },
      {
        question: "Рассчитать, сколько можно еще потратить до конца месяца?",
        answer: (
          <div>
            <div className="mb-3">
              Остаток до лимита трат: <span className="font-bold text-green-600 text-lg">{(userStats.income - userStats.expenses).toLocaleString()}₽</span>
            </div>
            Рекомендуем <span className="font-semibold">не тратить всё “под ноль”</span> — направьте часть остатка в сбережения или на пополнение целей, чтобы всегда быть готовы к неожиданным расходам.
          </div>
        ),
      },
    ],
  },
  {
    category: "Доходы",
    questions: [
      {
        question: "Как отображаются доходы и что с ними делать?",
        answer: (
          <div>
            <div className="bg-gradient-to-r from-green-100 via-white to-cyber-purple/10 p-4 rounded-xl flex items-center gap-5 mb-3">
              <TrendingUp className="text-green-500" size={28} />
              <div>
                <div className="text-sm text-green-700">Ваш доход за месяц:</div>
                <div className="text-2xl font-bold text-green-700">{userStats.income.toLocaleString()}₽</div>
              </div>
            </div>
            Доходы учитываются по всем вашим поступлениям за текущий месяц (зарплата, премии, фриланс). Следите за изменением суммы месяц к месяцу — если доход растет, откладывайте долю в сбережения. Если падает — уменьшайте расходы, ищите новые источники или подработки.
          </div>
        ),
      },
      {
        question: "Что делать если доход снизился?",
        answer: (
          <div>
            {userStats.income < 120000 && (
              <div className="bg-red-100 p-3 rounded-md mb-2 flex items-center gap-2"><TrendingDown className="text-red-500" size={18} /> Доход уменьшился по сравнению с прошлым месяцем!</div>
            )}
            Если доход снизился — временно урежьте второстепенные расходы, пересмотрите обязательные траты, дополнительно рассмотрите фриланс или лайтовые онлайн-подработки. Формируйте финансовую подушку — это минимум <b>20%</b> от дохода (для вас — <span className="font-semibold">{Math.round(userStats.income * 0.2).toLocaleString()}₽</span>).
          </div>
        ),
      },
      {
        question: "Как увеличить доход?",
        answer: (
          <div>
            <ul className="list-disc ml-5 mb-2">
              <li>Рассмотрите вакансии с подработкой — даже небольшие суммы важны!</li>
              <li>Обучайтесь новым навыкам онлайн (курсы, soft/hard skills)</li>
              <li>Попросите повышение — приведите свои достижения</li>
              <li>Монетизируйте: сдача комнаты, хобби</li>
            </ul>
            Чем стабильнее рост дохода, тем выше ваш уровень благополучия и накоплений.
          </div>
        ),
      },
    ],
  },
  {
    category: "Расходы",
    questions: [
      {
        question: "На чем сейчас лучше сэкономить?",
        answer: (
          <div>
            <div className="bg-gradient-to-r from-red-100 via-white to-cyber-purple/10 p-4 rounded-xl flex items-center gap-5 mb-3">
              <TrendingDown className="text-red-500" size={28} />
              <div>
                <div className="text-sm">Ваши расходы за месяц:</div>
                <div className="text-2xl font-bold text-red-600">{userStats.expenses.toLocaleString()}₽</div>
              </div>
            </div>
            Больше всего денег обычно уходит на еду вне дома, развлечения и подписки. Проверьте эти разделы бюджета: если траты по ним &gt;15% от дохода (<span className="font-semibold">{Math.round(userStats.income * 0.15).toLocaleString()}₽</span> в месяц) — это место для сокращения!
          </div>
        ),
      },
      {
        question: "Как быстро снизить расходы?",
        answer: (
          <div>
            <ul className="list-disc ml-5 mb-2">
              <li>Готовьте дома вместо ресторанов</li>
              <li>Сократите редко используемые подписки</li>
              <li>Пользуйтесь скидками/акциями</li>
            </ul>
            {economyAdvice}
          </div>
        ),
      },
      {
        question: "Почему перерасход — это опасно?",
        answer: (
          <div>
            {userStats.expenses > userStats.income && (
              <div className="my-2 p-2 rounded-lg bg-red-200 text-red-900 font-semibold drop-shadow">
                Ваши расходы превышают доходы на <b>{(userStats.expenses - userStats.income).toLocaleString()}₽</b>! Это снижает устойчивость и влечет риск долгов.
              </div>
            )}
            Если расходы &gt; доходов — формируется долг, стресс и ухудшается финансовая стабильность. Используйте приложение, чтобы контролировать крупные траты до конца месяца!
          </div>
        ),
      },
    ],
  },
  {
    category: "Цели и сбережения",
    questions: [
      {
        question: "Какая сумма должна быть в сбережениях?",
        answer: (
          <div>
            <div className="bg-gradient-to-r from-emerald-100 via-white to-cyber-purple/10 p-4 rounded-xl flex items-center gap-5 mb-3">
              <PiggyBank className="text-emerald-500" size={32} />
              <div>
                <div className="text-sm">Ваши текущие сбережения:</div>
                <div className="text-2xl font-bold text-emerald-600">{userStats.savings.toLocaleString()}₽</div>
              </div>
            </div>
            Финансовая подушка — это минимум <span className="font-semibold">3 месяца расходов</span>.<br />
            Для вашей ситуации: <span className="font-semibold">{(userStats.expenses * 3).toLocaleString()}₽</span>.
            Чем ближе сумма к этой цифре — тем спокойнее можно реагировать на любые сюрпризы жизни!
          </div>
        ),
      },
      {
        question: "Как ускорить накопления на цель?",
        answer: (
          <div>
            <div className="mb-2">
              Сейчас вы накопили <span className="font-bold">{userStats.savings.toLocaleString()}₽</span> — это <span className="font-bold">{userStats.goalProgress}%</span> от вашей финансовой цели месяца.
            </div>
            <ul className="list-disc ml-5 mb-2">
              <li>Кормите “финансового питомца” небольшими суммами каждую неделю</li>
              <li>Установите автопереводы — меньше соблазнов потратить “лишнее”</li>
              <li>Переводите остаток после ключевых покупок сразу на сберегательный счет</li>
            </ul>
            Частое, пусть даже небольшое пополнение цели, — ключ к уверенности и прогрессу!
          </div>
        ),
      },
      {
        question: "Для чего заводить денежные цели?",
        answer: (
          <div>
            Цели — ваши мини-проекты: отпуск, техника, финансовый запас и многое другое. Это мотивирует регулярно пополнять баланс и видеть рост результата!
          </div>
        ),
      },
    ],
  },
  {
    category: "Графики и инсайты",
    questions: [
      {
        question: "Что показывает график бюджета?",
        answer:
          <div>
            График отображает соотношение доходов и расходов за 3 последних месяца. Это наглядно помогает понять тренды и скорректировать стратегии расходов или накоплений вовремя!
          </div>,
      },
      {
        question: "Как пользоваться разделом 'Инсайты'?",
        answer: (
          <div>
            В инсайтах появляются советы и напоминания с учетом ваших финансовых действий. Если появляется “огонёк” — обязательно ознакомьтесь с новой подсказкой!
          </div>
        ),
      },
      {
        question: "Зачем нужны еженедельные уведомления?",
        answer: (
          <div>
            Они помогают поддерживать финансовую дисциплину и не пропускать возможности для оптимизации бюджета.
          </div>
        ),
      }
    ],
  },
];

// Состояния: выбранная категория, выбранный вопрос
const ChatWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  const [messages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Привет! Нажмите на интересующий вопрос по аналитике — получите сразу развернутый ответ с цифрами и советами.", isUser: false },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<null | number>(null);

  const reset = () => {
    setSelectedCategory(null);
    setSelectedQuestionIdx(null);
  };

  // Находим выбранную категорию
  const category = analyticsQa.find((cat) => cat.category === selectedCategory);

  // Логика выбора: категории → вопросы → ответы
  let currentNode;
  if (!selectedCategory) {
    currentNode = (
      <div>
        <div className="mb-4 text-base font-semibold">Выберите тему аналитики:</div>
        <div className="flex flex-wrap gap-2">
          {analyticsQa.map((cat) => (
            <Button
              key={cat.category}
              variant="outline"
              onClick={() => {
                setSelectedCategory(cat.category);
                setSelectedQuestionIdx(null);
              }}
              className="mb-2 px-5 py-3 rounded-xl font-semibold text-base bg-cyber-purple/5 hover:bg-cyber-purple/20 transition-all animate-scale-in"
            >
              {cat.category}
            </Button>
          ))}
        </div>
      </div>
    );
  } else if (selectedCategory && selectedQuestionIdx === null && category) {
    currentNode = (
      <div>
        <div className="mb-2 font-semibold text-cyber-purple/80">Вопросы по теме: {selectedCategory}</div>
        <div className="space-y-2">
          {category.questions.map((q, idx) => (
            <Button
              key={typeof q.question === "string" ? q.question : idx}
              variant="ghost"
              onClick={() => setSelectedQuestionIdx(idx)}
              className="w-full justify-start whitespace-normal rounded-xl px-4 py-3 hover:bg-cyber-purple/10 transition"
            >
              {typeof q.question === "string" ? q.question : `Вопрос #${idx + 1}`}
            </Button>
          ))}
        </div>
        <Button variant="outline" onClick={reset} className="mt-4 px-5 py-2 rounded-xl hover:bg-cyber-purple/10 transition">← Назад к темам</Button>
      </div>
    );
  } else if (selectedCategory && selectedQuestionIdx !== null && category) {
    const qobj = category.questions[selectedQuestionIdx];
    currentNode = (
      <div>
        <div className="mb-1 text-xs text-muted-foreground">Тема: {selectedCategory}</div>
        <div className="mb-3 font-bold text-base text-cyber-purple">
          {typeof qobj.question === "string" ? qobj.question : "[Вопрос]"}
        </div>
        <div className="bg-muted rounded-xl p-3 mb-4 text-base">
          {typeof qobj.answer === "string"
            ? qobj.answer
            : qobj.answer /* ReactNode для цифр и советов */}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="secondary"
            onClick={() => setSelectedQuestionIdx(null)}
            className="whitespace-nowrap rounded-xl"
          >← К вопросам по теме</Button>
          <Button
            variant="outline"
            onClick={reset}
            className="whitespace-nowrap rounded-xl"
          >← К категориям</Button>
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
            Готовые интерактивные ответы на самые важные вопросы по бюджету, доходам, сбережениям и целям!
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-grow px-4">
          <div className="space-y-2">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
            ))}
            <div className="my-6">
              {currentNode}
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter className="flex-shrink-0" />
      </DrawerContent>
    </Drawer>
  );
};

export default ChatWindow;
