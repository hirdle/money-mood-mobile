
import { cn } from '@/lib/utils';

interface MoodRingProps {
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'neutral' | 'sad';
  className?: string;
}

const MoodRing = ({ size = 'md', mood = 'neutral', className }: MoodRingProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  const moodColors = {
    happy: 'from-money-green via-lime-green to-electric-blue',
    neutral: 'from-warning-yellow via-sunset-orange to-neon-pink',
    sad: 'from-sunset-orange via-neon-pink to-cyber-purple'
  };

  const moodEmojis = {
    happy: '😊',
    neutral: '😐',
    sad: '😢'
  };

  return (
    <div className={cn(
      'relative rounded-full bg-gradient-to-r animate-pulse-mood',
      sizeClasses[size],
      moodColors[mood],
      className
    )}>
      <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
        <span className="text-2xl">{moodEmojis[mood]}</span>
      </div>
    </div>
  );
};

export default MoodRing;
