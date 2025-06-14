
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Landmark, Wallet } from "lucide-react";

const BudgetPage = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-glow">Бюджет и налоги</h1>
        <p className="text-sm text-muted-foreground">
          Обзор ваших финансовых обязательств и планирование.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Месячный бюджет</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Здесь будет информация о вашем месячном бюджете. Планируемые доходы, расходы и сбережения.</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Landmark className="h-5 w-5 text-primary" />
            <span>Налоги</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Информация о налоговых вычетах, предстоящих платежах и советы по оптимизации.</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wallet className="h-5 w-5 text-primary" />
            <span>Крупные покупки</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Сюда можно добавить информацию о крупных нерегулярных тратах, таких как отпуск, покупка техники и т.д.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPage;
