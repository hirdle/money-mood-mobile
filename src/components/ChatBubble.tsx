
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatBubble = () => {
  return (
    <Button
      size="icon"
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-electric-blue to-cyber-purple shadow-lg hover:scale-110 transition-transform z-50 glow-effect"
    >
      <MessageSquare className="w-6 h-6 text-white" />
    </Button>
  );
};

export default ChatBubble;
