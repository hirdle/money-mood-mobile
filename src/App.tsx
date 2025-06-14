import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={require("./pages/AnalyticsPage").default()} />
          <Route path="/budget-jkh" element={require("./pages/BudgetJkhPage").default()} />
          <Route path="/budget-taxes" element={require("./pages/BudgetTaxesPage").default()} />
          <Route path="/bank-integration" element={require("./pages/BankIntegrationPage").default()} />
          <Route path="/custom-categories" element={require("./pages/CustomCategoriesPage").default()} />
          <Route path="/planning" element={require("./pages/DetailedPlanningPage").default()} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
