
import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

// Категории -> вопросы -> ответы
const analyticsQa = [
  {
    category: "Бюджет",
    questions: [
      {
        question: "Что отображает блок общего баланса?",
        answer:
          "Блок 'Общий баланс' на главной странице показывает разницу между вашими доходами и расходами за последний месяц. Если доходы превышают расходы, вы в плюсе, если наоборот — в минусе. Это главный показатель вашей финансовой стабильности.",
      },
      {
        question: "Как рассчитывается 'Прогресс к цели'?",
        answer:
          "Прогресс рассчитывается как процент ваших сбережений (доходы минус расходы) от заданной финансовой цели на месяц. Например, если цель накопить 25 000₽, а вы сберегли 14 150₽, прогресс — 57%.",
      },
      {
        question: "Почему важен анализ бюджета по месяцам?",
        answer:
          "Посмотрев как меняются доходы и расходы по месяцам, вы заметите тренды (рост, снижение, стабильность) и сможете вовремя принимать решения: где экономить, куда выгодно направить лишние средства и как наращивать накопления.",
      }
    ],
  },
  {
    category: "Доходы",
    questions: [
      {
        question: "Как отображаются доходы?",
        answer:
          "Доходы выводятся в разделе 'Доходы' и на графике «Бюджет». Везде используются актуальные числа по месяцам. Можно увидеть изменение доходов (рост/падение в процентах относительно прошлого месяца) для отслеживания динамики.",
      },
      {
        question: "Что делать если доход уменьшился?",
        answer:
          "Если доход снизился — пересмотрите обязательные траты, урежьте второстепенные расходы и найдите временные подработки/источники дохода. Всегда держите финансовую подушку (не менее 20% ежемесячного дохода).",
      },
      {
        question: "Как можно увеличить доход?",
        answer:
          "Рассмотрите вакансии с подработкой, обучение новым навыкам (онлайн-курсы), прокачку профессиональных компетенций для карьерного роста. Сдавайте квартирантам свободную комнату или монетизируйте хобби.",
      },
    ],
  },
  {
    category: "Расходы",
    questions: [
      {
        question: "Как снизить расходы?",
        answer:
          "Проанализируйте все траты из раздела 'Расходы'. Часто больше всего уходит на еду вне дома, подписки, транспорт, рестораны. Уберите лишние подписки, готовьте дома, ищите скидки и акции. Запланируйте крупные расходы заранее.",
      },
      {
        question: "Почему перерасход — это опасно?",
        answer:
          "Если расходы превышают доходы, копится долг. Это снижает вашу финансовую устойчивость и увеличивает стресс — важно как можно раньше увидеть такие тенденции и скорректировать бюджет.",
      },
      {
        question: "Как вести учёт расходов эффективно?",
        answer:
          "Пользуйтесь встроенной аналитикой приложения — она помогает автоматически сравнивать траты в разных категориях и советует, где можно сэкономить.",
      },
    ],
  },
  {
    category: "Цели и сбережения",
    questions: [
      {
        question: "Для чего заводить денежные цели?",
        answer:
          "Финансовые цели (питомцы) накапливают деньги на важные желания: отпуск, техника, страховка, резерв на чёрный день. Это мотивирует регулярно откладывать и соблюдать финансовую дисциплину.",
      },
      {
        question: "Какая сумма должна быть в сбережениях?",
        answer:
          "Наиболее безопасно — держать резерв в размере не меньше 3 месячных расходов (например, ваши траты 100 000₽ в месяц, значит, резерв — минимум 300 000₽).",
      },
      {
        question: "Как ускорить накопление на цель?",
        answer:
          "Отложите небольшую сумму сразу после получения дохода, используйте автоматические переводы, откажитесь от пары импульсивных покупок. Помните: частое пополнение, даже маленькими суммами, работает лучше крупных, но редких взносов.",
      },
    ],
  },
  {
    category: "Графики и инсайты",
    questions: [
      {
        question: "Что показывает график бюджета?",
        answer:
          "График на главной иллюстрирует соотношение доходов и расходов за 3 последних месяца. По нему легко обнаружить неожиданные скачки расходов или доходов и своевременно отреагировать.",
      },
      {
        question: "Как пользоваться разделом 'Инсайты'?",
        answer:
          "В разделе 'Инсайты' появляются важные советы и напоминания, основанные на ваших финансовых действиях. Если появляется горящий значок — обязательно ознакомьтесь с новыми подсказками.",
      },
      {
        question: "Зачем нужны еженедельные уведомления?",
        answer:
          "Они поддерживают дисциплину — так вы получаете своевременный анализ бюджета и не пропустите перекосы трат или возможностей для накоплений.",
      }
    ],
  }
];

// Состояния: выбранная категория, выбранный вопрос
const ChatWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Привет! Вместо чата выберите интересующий вас аналитический вопрос — и сразу получите подробный ответ.", isUser: false },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<null | number>(null);

  const reset = () => {
    setSelectedCategory(null);
    setSelectedQuestionIdx(null);
  };

  // Отображаем список категорий или конкретный вопрос
  const category = analyticsQa.find((cat) => cat.category === selectedCategory);

  // Если выбрали вопрос — показываем ответ и кнопки 'ещё вопросы этой категории' / 'назад к категориям'
  let currentNode;
  if (!selectedCategory) {
    currentNode = (
      <div>
        <div className="mb-4 text-base font-semibold">Выберите тему:</div>
        <div className="flex flex-wrap gap-2">
          {analyticsQa.map((cat, i) => (
            <Button
              key={cat.category}
              variant="outline"
              onClick={() => {
                setSelectedCategory(cat.category);
                setSelectedQuestionIdx(null);
              }}
              className="mb-2"
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
        <div className="mb-2 font-semibold">Вопросы по теме: {selectedCategory}</div>
        <div className="space-y-2">
          {category.questions.map((q, idx) => (
            <Button
              key={q.question}
              variant="ghost"
              onClick={() => setSelectedQuestionIdx(idx)}
              className="w-full justify-start whitespace-normal"
            >
              {q.question}
            </Button>
          ))}
        </div>
        <Button variant="outline" onClick={reset} className="mt-4">← Назад к выбору тем</Button>
      </div>
    );
  } else if (selectedCategory && selectedQuestionIdx !== null && category) {
    const qobj = category.questions[selectedQuestionIdx];
    currentNode = (
      <div>
        <div className="mb-1 text-xs text-muted-foreground">Тема: {selectedCategory}</div>
        <div className="mb-2 font-bold">{qobj.question}</div>
        <div className="bg-muted rounded-xl p-3 mb-4 text-base">{qobj.answer}</div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="secondary"
            onClick={() => setSelectedQuestionIdx(null)}
            className="whitespace-nowrap"
          >← К вопросам по теме</Button>
          <Button
            variant="outline"
            onClick={reset}
            className="whitespace-nowrap"
          >← К категориям</Button>
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DrawerHeader className="text-left flex-shrink-0">
          <div className="flex justify-between items-center">
            <DrawerTitle>Финансовая аналитика</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Пользуйтесь готовыми ответами на самые важные вопросы по вашему бюджету, целям и аналитике!
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

