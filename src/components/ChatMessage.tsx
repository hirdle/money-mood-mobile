
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatMessage = ({ message, isUser, isLoading = false }: { message: string, isUser: boolean, isLoading?: boolean }) => {
    const wrapperClasses = cn(
        'flex items-start gap-3 my-4',
        isUser ? 'justify-end' : 'justify-start'
    );
    const bubbleClasses = cn(
        'p-3 rounded-lg max-w-[80%]',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
    );

    return (
        <div className={wrapperClasses}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-secondary-foreground" />
                </div>
            )}
            <div className={bubbleClasses}>
                {isLoading ? (
                    <div className="flex items-center space-x-1 p-1">
                        <span className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-current rounded-full animate-bounce"></span>
                    </div>
                ) : (
                    <p className="text-sm whitespace-pre-wrap">{message}</p>
                )}
            </div>
            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                </div>
            )}
        </div>
    );
}

export default ChatMessage;
