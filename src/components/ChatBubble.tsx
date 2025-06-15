
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatBubble = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Button
      size="icon"
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-sunset-orange via-warning-yellow to-warning-yellow shadow-lg hover:scale-110 transition-transform z-50 glow-effect border-2 border-warning-yellow drop-shadow-xl"
      onClick={onOpen}
    >
      <MessageSquare className="w-6 h-6 text-white" />
    </Button>
  );
};

export default ChatBubble;
