
import { useState, useEffect, Suspense, lazy } from 'react';
import TabButton from '@/components/ui/TabButton';
import ChatBubble from '@/components/ChatBubble';
import HomePage from './HomePage';
import GoalsPage from './GoalsPage';
import NotificationsPage from './NotificationsPage';
import SocialPage from './SocialPage';
import BudgetPage from './BudgetPage';
import { Toaster } from "@/components/ui/sonner";
import ChatWindow from '@/components/ChatWindow';

const ONBOARDING_STORAGE_KEY = "onboarding_passed";

const tabs = [
  { id: 'home', label: 'Главная', icon: '🏠', component: HomePage },
  { id: 'goals', label: 'Цели', icon: '🎯', component: GoalsPage },
  { id: 'budget', label: 'Бюджет', icon: '🧾', component: BudgetPage },
  { id: 'insights', label: 'Инсайты', icon: '💡', component: NotificationsPage, hasNotification: true },
  { id: 'social', label: 'Друзья', icon: '👥', component: SocialPage },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [OnboardingComponent, setOnboardingComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const passed = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!passed) {
      setShowOnboarding(true);
      // Dynamically import onboarding page
      import('./OnboardingPage').then(mod => {
        setOnboardingComponent(() => mod.default);
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeTab]);

  if (showOnboarding) {
    if (OnboardingComponent) {
      return <OnboardingComponent />;
    }
    // loader while waiting for onboarding page to load
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-lg text-gray-400">Загрузка…</div>
      </div>
    );
  }

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
      <ChatBubble onOpen={() => setIsChatOpen(true)} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default Index;

