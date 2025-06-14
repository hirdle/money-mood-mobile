
import PagePlaceholder from "@/components/PagePlaceholder";
import { CalendarCheck } from "lucide-react";
export default function DetailedPlanningPage() {
  return <PagePlaceholder
    title="Детальное планирование"
    icon={<CalendarCheck />}
    description="Планируйте бюджет по дням, неделям и категориям."
  />;
}
