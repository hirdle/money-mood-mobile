import { mockNotifications } from '@/data/mockDataRu';
import NotificationCard from '@/components/NotificationCard';

const NotificationsPage = () => {
  const newNotifications = mockNotifications.filter(n => n.isNew);
  const oldNotifications = mockNotifications.filter(n => !n.isNew);

  return (
    <div className="min-h-screen bg-white p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-black">Умные инсайты 🧠</h1>
        <p className="text-base text-neutral-500">
          Твой ИИ-коуч по деньгам поделился мыслями...
        </p>
      </div>

      {/* New Notifications */}
      {newNotifications.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2 text-black">
            🔥 Горячие новости
            <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded-full">
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
          <h2 className="text-lg font-bold text-black">📚 Предыдущие инсайты</h2>
          {oldNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
