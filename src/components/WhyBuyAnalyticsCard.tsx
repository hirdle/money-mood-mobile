
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function WhyBuyAnalyticsCard() {
  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Lightbulb /> Почему вы купили это?
        </CardTitle>
        <CardDescription>
          Анализ ваших часто повторяющихся трат (<b>Вкусно и точка — 3 недели подряд</b>)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">
          Возможные мотиваторы покупки: <b>дефицит времени</b>, удобство быстрого питания, влияние рекламы, привычка.
        </div>
        <div className="text-sm text-muted-foreground">
          Совет: попробуйте один день в неделю заменить данный расход альтернативой — это поможет увидеть дополнительные возможности для экономии.
        </div>
      </CardContent>
    </Card>
  );
}
