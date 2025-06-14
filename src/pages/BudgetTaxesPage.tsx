
import PagePlaceholder from "@/components/PagePlaceholder";
import { Calculator } from "lucide-react";
export default function BudgetTaxesPage() {
  return <PagePlaceholder
    title="Налоги"
    icon={<Calculator />}
    description="Обзор налоговых обязательств и возможность отслеживания сроков оплаты."
  />;
}
