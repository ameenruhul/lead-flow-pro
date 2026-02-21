import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Features from "./pages/Features";
import Integrations from "./pages/Integrations";
import PricingPage from "./pages/PricingPage";
import Onboarding from "./pages/Onboarding";
import AppDashboard from "./pages/AppDashboard";
import AppIntegrations from "./pages/AppIntegrations";
import AppSheets from "./pages/AppSheets";
import AppSheetMapping from "./pages/AppSheetMapping";
import AppAutomations from "./pages/AppAutomations";
import AppAutomationBuilder from "./pages/AppAutomationBuilder";
import AppTemplates from "./pages/AppTemplates";
import AppTemplateEditor from "./pages/AppTemplateEditor";
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/features" element={<Features />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/app/onboarding" element={<Onboarding />} />
          <Route path="/app/dashboard" element={<AppDashboard />} />
          <Route path="/app/integrations" element={<AppIntegrations />} />
          <Route path="/app/sheets" element={<AppSheets />} />
          <Route path="/app/sheets/:sheetId/mapping" element={<AppSheetMapping />} />
          <Route path="/app/automations" element={<AppAutomations />} />
          <Route path="/app/automations/new" element={<AppAutomationBuilder />} />
          <Route path="/app/templates" element={<AppTemplates />} />
          <Route path="/app/templates/new" element={<AppTemplateEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
