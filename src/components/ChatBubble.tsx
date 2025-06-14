
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const ChatBubble = () => {
  const handleClick = () => {
    toast.info("Подключаю ассистента...", {
      description: "Он скоро будет здесь, чтобы помочь вам.",
      duration: 3000,
    });
  };

  return (
    <Button
      size="icon"
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-electric-blue to-cyber-purple shadow-lg hover:scale-110 transition-transform z-50 glow-effect"
      onClick={handleClick}
    >
      <MessageSquare className="w-6 h-6 text-white" />
    </Button>
  );
};

export default ChatBubble;
