
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TabButtonProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  hasNotification?: boolean;
}

const TabButton = ({ icon, label, isActive, onClick, hasNotification }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200',
        isActive 
          ? 'bg-gradient-to-r from-neon-pink to-cyber-purple text-white shadow-lg' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      )}
    >
      {hasNotification && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-sunset-orange rounded-full animate-pulse" />
      )}
      <div className={cn('text-lg', isActive && 'animate-bounce-gentle')}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

export default TabButton;
