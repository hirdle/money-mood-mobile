
import { useState, useRef, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  text: string;
  isUser: boolean;
}

const faqs = [
    "Как составить бюджет?",
    "Как уменьшить налоги?",
    "Какие есть способы накопления?",
    "Расскажи про инвестиции для новичков"
];

const faqAnswers: { [key: string]: string } = {
    "Как составить бюджет?": "Для составления бюджета следуйте правилу 50/30/20: 50% на необходимые расходы (жилье, еда, транспорт), 30% на желания (развлечения, рестораны), 20% на сбережения и погашение долгов. Ведите учет доходов и расходов, планируйте крупные покупки заранее.",
    "Как уменьшить налоги?": "Используйте налоговые вычеты: стандартные, социальные (лечение, образование, благотворительность), имущественные (покупка жилья). Откройте ИИС для инвестиционного вычета. Ведите документооборот для подтверждения расходов.",
    "Какие есть способы накопления?": "Основные способы: банковские вклады (низкий риск, невысокая доходность), облигации (средний риск и доходность), акции (высокий риск, потенциально высокая доходность), недвижимость, драгоценные металлы. Диверсифицируйте портфель.",
    "Расскажи про инвестиции для новичков": "Начните с изучения основ: облигации федерального займа (ОФЗ) - самый безопасный инструмент, ETF на широкий рынок для диверсификации, постепенно изучайте отдельные акции. Инвестируйте регулярно небольшими суммами, не вкладывайте все сбережения сразу."
};

const GEMINI_API_KEY = "AIzaSyA9yfr1qm-LGmujIFifZwZ0JsQ3a3D9c8I";

const callGemini = async (question: string): Promise<string> => {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: question }]
                }]
            }),
        });

        if (!response.ok) {
            throw new Error('Gemini API error');
        }
        const data = await response.json();
        // Gemini's response structure: data.candidates[0].content.parts[0].text
        if (
            data &&
            Array.isArray(data.candidates) &&
            data.candidates[0]?.content?.parts &&
            data.candidates[0].content.parts[0]?.text
        ) {
            return data.candidates[0].content.parts[0].text;
        }
        return "Ответ от AI не получен. Попробуйте позже.";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Извините, произошла ошибка при обращении к Gemini AI. Попробуйте позже.";
    }
};

const ChatWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const [messages, setMessages] = useState<Message[]>([
        { text: "Здравствуйте! Я ваш финансовый помощник. Чем могу помочь?", isUser: false }
    ]);
    const [input, setInput] = useState('');
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isWaitingForResponse]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = { text, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsWaitingForResponse(true);

        // Check if it's a FAQ question
        if (faqAnswers[text]) {
            setTimeout(() => {
                const botMessage: Message = { text: faqAnswers[text], isUser: false };
                setMessages(prev => [...prev, botMessage]);
                setIsWaitingForResponse(false);
            }, 1000);
        } else {
            // Use Gemini instead of OpenAI!
            const response = await callGemini(text);
            const botMessage: Message = { text: response, isUser: false };
            setMessages(prev => [...prev, botMessage]);
            setIsWaitingForResponse(false);
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="h-[90vh] flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DrawerHeader className="text-left flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <DrawerTitle>Финансовый помощник</DrawerTitle>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-4 w-4" />
                            </Button>
                        </DrawerClose>
                    </div>
                    <DrawerDescription>Задайте любой вопрос о финансах. Я постараюсь помочь.</DrawerDescription>
                </DrawerHeader>

                <ScrollArea className="flex-grow px-4">
                    <div className="space-y-2">
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                        ))}
                        {isWaitingForResponse && <ChatMessage message="..." isUser={false} isLoading={true} />}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
                
                <div className="p-4 border-t flex-shrink-0">
                    <p className="text-sm font-medium mb-2">Часто задаваемые вопросы:</p>
                    <div className="flex flex-wrap gap-2">
                        {faqs.map((faq, index) => (
                            <Button key={index} variant="outline" size="sm" onClick={() => handleSendMessage(faq)} disabled={isWaitingForResponse}>
                                {faq}
                            </Button>
                        ))}
                    </div>
                </div>

                <DrawerFooter className="flex-shrink-0">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="flex gap-2">
                        <Input 
                            placeholder="Напишите ваш вопрос..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isWaitingForResponse}
                        />
                        <Button type="submit" size="icon" disabled={isWaitingForResponse || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ChatWindow;

