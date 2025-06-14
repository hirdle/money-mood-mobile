
import { useState } from 'react';
import TabButton from '@/components/ui/TabButton';
import ChatBubble from '@/components/ChatBubble';
import HomePage from './HomePage';
import GoalsPage from './GoalsPage';
import NotificationsPage from './NotificationsPage';
import SocialPage from './SocialPage';
import BudgetPage from './BudgetPage';

const tabs = [
  { id: 'home', label: 'Главная', icon: '🏠', component: HomePage },
  { id: 'goals', label: 'Цели', icon: '🎯', component: GoalsPage },
  { id: 'budget', label: 'Бюджет', icon: '🧾', component: BudgetPage },
  { id: 'insights', label: 'Инсайты', icon: '💡', component: NotificationsPage, hasNotification: true },
  { id: 'social', label: 'Друзья', icon: '👥', component: SocialPage },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || HomePage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Главный контент */}
      <div className="pb-20">
        <ActiveComponent />
      </div>

      {/* Нижняя панель навигации */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/50">
        <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              hasNotification={tab.hasNotification}
            />
          ))}
        </div>
      </div>

      {/* Чат-пузырь */}
      <ChatBubble />
    </div>
  );
};

export default Index;
