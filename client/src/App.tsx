import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ServiceDetail from "@/pages/ServiceDetail";
import Contact from "@/pages/Contact";
import AboutPage from "@/pages/AboutPage";
import MannedServicesPage from "@/pages/MannedServicesPage";
import SecurityConsultancyPage from "@/pages/SecurityConsultancyPage";
import CashServicesPage from "@/pages/CashServicesPage";
import SecurityTrainingPage from "@/pages/SecurityTrainingPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/services/manned-services" component={MannedServicesPage} />
      <Route path="/manned-services" component={MannedServicesPage} />
      <Route path="/services/security-consultancy" component={SecurityConsultancyPage} />
      <Route path="/security-consultancy" component={SecurityConsultancyPage} />
      <Route path="/services/cash-services" component={CashServicesPage} />
      <Route path="/cash-services" component={CashServicesPage} />
      <Route path="/services/security-training" component={SecurityTrainingPage} />
      <Route path="/security-training" component={SecurityTrainingPage} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/expertise/:area" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
