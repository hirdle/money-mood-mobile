
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Importing components directly for each page route
import AnalyticsPage from "./pages/AnalyticsPage";
import BudgetJkhPage from "./pages/BudgetJkhPage";
import BudgetTaxesPage from "./pages/BudgetTaxesPage";
import BankIntegrationPage from "./pages/BankIntegrationPage";
import CustomCategoriesPage from "./pages/CustomCategoriesPage";
import DetailedPlanningPage from "./pages/DetailedPlanningPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/budget-jkh" element={<BudgetJkhPage />} />
          <Route path="/budget-taxes" element={<BudgetTaxesPage />} />
          <Route path="/bank-integration" element={<BankIntegrationPage />} />
          <Route path="/custom-categories" element={<CustomCategoriesPage />} />
          <Route path="/planning" element={<DetailedPlanningPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
