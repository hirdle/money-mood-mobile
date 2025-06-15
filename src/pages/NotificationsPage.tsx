
import { mockNotifications } from '@/data/mockDataRu';
import NotificationCard from '@/components/NotificationCard';

const NotificationsPage = () => {
  const newNotifications = mockNotifications.filter(n => n.isNew);
  const oldNotifications = mockNotifications.filter(n => !n.isNew);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Умные инсайты 🧠</h1>
        <p className="text-sm text-muted-foreground">
          Твой ИИ-коуч по деньгам поделился мыслями...
        </p>
      </div>

      {/* New Notifications */}
      {newNotifications.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            🔥 Горячие новости
            <span className="bg-neon-pink text-white text-xs px-2 py-1 rounded-full">
              {newNotifications.length}
            </span>
          </h2>
          {newNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}

      {/* Previous Insights */}
      {oldNotifications.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold">📚 Предыдущие инсайты</h2>
          {oldNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}

      {/* Settings */}
      <div className="bg-muted/50 p-4 rounded-2xl">
        <h3 className="font-bold text-sm mb-2">⚙️ Настройки уведомлений</h3>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span>Уведомления о тратах</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span>Напоминания о целях</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span>Еженедельные вызовы</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
