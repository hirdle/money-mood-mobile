
import { useState } from 'react';
import TabButton from '@/components/ui/TabButton';
import ChatBubble from '@/components/ChatBubble';
import HomePage from './HomePage';
import GoalsPage from './GoalsPage';
import NotificationsPage from './NotificationsPage';
import SocialPage from './SocialPage';

const tabs = [
  { id: 'home', label: 'Home', icon: '🏠', component: HomePage },
  { id: 'goals', label: 'Goals', icon: '🎯', component: GoalsPage },
  { id: 'insights', label: 'Insights', icon: '💡', component: NotificationsPage, hasNotification: true },
  { id: 'social', label: 'Social', icon: '👥', component: SocialPage },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || HomePage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Main Content */}
      <div className="pb-20">
        <ActiveComponent />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/50">
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

      {/* Chat Bubble */}
      <ChatBubble />
    </div>
  );
};

export default Index;
