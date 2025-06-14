
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";

// Моковые данные: влияние
const influenceStats = [
  { friend: "Катя", youSpent: 3500, friendSpent: 4000 },
  { friend: "Данил", youSpent: 4200, friendSpent: 2800 },
];

export default function SocialInfluencePage() {
  return (
    <div className="p-4 animate-fade-in space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center"><Users /> Влияние круга</CardTitle>
          <CardDescription>Сравните свои траты с друзьями и узнавайте у кого лучшие результаты</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {influenceStats.map((stat, idx) => (
              <li key={idx} className="text-sm mb-2 flex items-center gap-3">
                <span className="font-medium">{stat.friend}</span>
                <span className={stat.youSpent < stat.friendSpent ? "text-green-500" : "text-slate-500"}>
                  {stat.youSpent < stat.friendSpent ? "Вы экономичнее" : "Можно взять пример"}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">Траты: <b>{stat.youSpent}₽</b> (вы) / <b>{stat.friendSpent}₽</b></span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-xs text-muted-foreground">
            🚀 Друзья, которые достигли цели: <b>2</b><br />
            🏆 Вы мотивировали: <b>Данила</b>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
