
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

const ChatWindow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const [messages, setMessages] = useState<Message[]>([
        { text: "Здравствуйте! Я ваш финансовый помощник на базе Perplexity AI. Чем могу помочь?", isUser: false }
    ]);
    const [input, setInput] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const scrollAreaViewport = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaViewport.current) {
            scrollAreaViewport.current.scrollTo({ top: scrollAreaViewport.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isWaitingForResponse]);
    
    useEffect(() => {
        const storedApiKey = localStorage.getItem('perplexity-api-key');
        if (storedApiKey) {
            setApiKey(storedApiKey);
        }
    }, []);

    const handleApiKeyChange = (key: string) => {
        setApiKey(key);
        localStorage.setItem('perplexity-api-key', key);
    }

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = { text, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        
        if (!apiKey) {
            setTimeout(() => {
                setMessages(prev => [...prev, { text: "Пожалуйста, введите ваш API ключ для Perplexity AI в поле выше, чтобы я мог вам ответить.", isUser: false }]);
            }, 1000);
            return;
        }

        setIsWaitingForResponse(true);

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama-3.1-sonar-small-128k-online',
                    messages: [
                        { role: 'system', content: 'You are a helpful financial assistant. Be precise and concise. Respond in Russian.' },
                        { role: 'user', content: text }
                    ],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error:", errorData);
                throw new Error(errorData.error?.message || 'API call failed');
            }

            const data = await response.json();
            const botMessage: Message = { text: data.choices[0].message.content, isUser: false };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error calling Perplexity API:", error);
            const errorMessage: Message = { text: `Извините, произошла ошибка при обращении к API. ${error instanceof Error ? error.message : ''}`, isUser: false };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
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

                <div className="px-4 pb-2 flex-shrink-0">
                    <Input 
                        type="password"
                        placeholder="Ваш Perplexity AI API ключ"
                        value={apiKey}
                        onChange={(e) => handleApiKeyChange(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Ваш ключ хранится только в вашем браузере.{" "}
                        <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="underline">Получить ключ</a>
                    </p>
                </div>

                <ScrollArea className="flex-grow p-4" viewportRef={scrollAreaViewport}>
                    <div className="pr-4">
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
                        ))}
                        {isWaitingForResponse && <ChatMessage message="..." isUser={false} isLoading={true} />}
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
