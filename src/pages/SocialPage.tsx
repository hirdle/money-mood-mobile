
import { SidebarProvider } from "@/components/ui/sidebar"
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom"
import SocialSidebar from "./social/SocialSidebar"
import SocialPlaceholder from "./social/SocialPlaceholder"
import { mockPeerComparisons } from "@/data/mockDataRu"
import PeerComparisonCard from "@/components/PeerComparisonCard"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const Leaderboard = () => (
  <div className="space-y-3 px-2 pt-4">
    <h2 className="text-lg font-bold">🏆 Лидерборд недели</h2>
    <div className="space-y-2">
      {['Алексей 🥇', 'Маша 🥈', 'Ты 🥉', 'Данил', 'Катя'].map((name, idx) => (
        <div key={name} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-muted-foreground">{[15670, 12890, 9560, 8340, 6980][idx]}₽ накоплено</span>
        </div>
      ))}
    </div>
  </div>
);

const CategoryComparison = () => (
  <div className="space-y-3 px-2 pt-4">
    <h2 className="text-lg font-bold">📊 Сравнение по категориям</h2>
    {mockPeerComparisons.map((comparison, index) => (
      <PeerComparisonCard key={index} comparison={comparison} />
    ))}
  </div>
);

// Переключатель анонимности:
const AnonToggle = () => {
  const [anon, setAnon] = useState(false)
  return (
    <div className="bg-muted/50 p-4 rounded-2xl mt-6 flex items-center justify-between max-w-xl mx-auto">
      <div>
        <h3 className="font-bold text-sm">Анонимный режим</h3>
        <p className="text-xs text-muted-foreground">Скрывать мои траты от друзей</p>
      </div>
      <Switch checked={anon} onCheckedChange={setAnon} />
    </div>
  )
}

export default function SocialPage() {
  // Для маршрутизации подстраниц меню друзей
  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="flex min-h-screen w-full">
        <SocialSidebar />
        <main className="flex-1 min-h-screen py-6">
          <Routes>
            <Route path="/" element={<Navigate to="friends" replace />} />
            <Route path="friends" element={
              <SocialPlaceholder title="Друзья" subtitle="Список ваших друзей появится здесь" />
            } />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="comparison" element={<CategoryComparison />} />
            <Route path="invite" element={
              <SocialPlaceholder title="Пригласить друга" subtitle="Отправьте ссылку для приглашения своих друзей" />
            } />
            <Route path="settings" element={
              <>
                <SocialPlaceholder title="Настройки" subtitle="Измените параметры приватности или уведомлений" />
                <AnonToggle />
              </>
            } />
            <Route path="*" element={<SocialPlaceholder title="Раздел не найден" />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  )
}
