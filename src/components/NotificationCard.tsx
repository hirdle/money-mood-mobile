
import { SmartNotification } from '@/types/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotificationCardProps {
  notification: SmartNotification;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const typeColors = {
    challenge: 'from-electric-blue to-cyber-purple',
    insight: 'from-warning-yellow to-sunset-orange',
    achievement: 'from-money-green to-lime-green',
    warning: 'from-sunset-orange to-neon-pink'
  };

  return (
    <Card className={cn(
      'p-4 glass-card hover:scale-105 transition-all duration-200',
      notification.isNew && 'ring-2 ring-neon-pink animate-pulse-mood'
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center text-xl',
          typeColors[notification.type]
        )}>
          {notification.emoji}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-sm">{notification.title}</h3>
            {notification.isNew && (
              <span className="px-2 py-1 bg-neon-pink text-white text-xs rounded-full">
                NEW
              </span>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            {notification.message}
          </p>
          
          <Button 
            size="sm" 
            className={cn(
              'bg-gradient-to-r text-white hover:scale-105 transition-transform',
              typeColors[notification.type]
            )}
          >
            {notification.actionText}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;
