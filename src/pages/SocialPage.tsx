import { mockPeerComparisons } from '@/data/mockDataRu';
import PeerComparisonCard from '@/components/PeerComparisonCard';

const SocialPage = () => {
  return (
    <div className="min-h-screen bg-white p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-black">Сравнение с друзьями 👥</h1>
        <p className="text-base text-neutral-500">
          Как ты на фоне своих друзей
        </p>
      </div>

      {/* Overall Rank */}
      <div className="bg-white shadow-lg p-4 rounded-2xl text-center">
        <div className="text-4xl mb-2">🏆</div>
        <h3 className="text-yellow-900 font-bold text-lg mb-1">Топ 23%</h3>
        <p className="text-yellow-800/90 text-sm">
          Ты делаешь лучше чем 77% своих друзей!
        </p>
      </div>

      {/* Comparisons */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-black">📊 Разбор по категориям</h2>
        {mockPeerComparisons.map((comparison, index) => (
          <PeerComparisonCard key={index} comparison={comparison} />
        ))}
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-black">🎯 Копилки этой недели</h2>
        <div className="space-y-2">
          {['Алексей 🥇', 'Маша 🥈', 'Ты 🥉', 'Данил', 'Катя'].map((name, index) => (
            <div key={name} className="flex items-center justify-between p-3 bg-yellow-100 rounded-xl">
              <span className="font-medium text-black text-sm">{name}</span>
              <span className="text-xs text-neutral-500">
                {[15670, 12890, 9560, 8340, 6980][index]}₽ накоплено
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Anonymous Toggle */}
      <div className="bg-yellow-50 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-black text-sm">Анонимный режим</h3>
            <p className="text-xs text-neutral-500">Скрыть свои траты от друзей</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-orange-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
