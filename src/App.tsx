import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import FreelancerProjects from "./pages/FreelancerProjects";
import FreelancerDeliverables from "./pages/FreelancerDeliverables";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProjects from "./pages/ClientProjects";
import ClientDeliverables from "./pages/ClientDeliverables";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectDetails from "./pages/ProjectDetails";
import DeliverableDetails from "./pages/DeliverableDetails";
import NotFound from "./pages/NotFound";

// ✅ TestDB page for DB connection testing
import TestDB from "./pages/TestDB";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Test DB route */}
          <Route path="/test-db" element={<TestDB />} />

          <Route path="/" element={<Index />} />

          {/* Freelancer routes */}
          <Route path="/freelancer" element={<FreelancerDashboard />} />
          <Route path="/freelancer/projects" element={<FreelancerProjects />} />
          <Route path="/freelancer/deliverables" element={<FreelancerDeliverables />} />
          <Route path="/freelancer/notifications" element={<NotificationsPage role="freelancer" />} />
          <Route path="/freelancer/profile" element={<ProfilePage role="freelancer" />} />
          <Route path="/freelancer/project/:id" element={<ProjectDetails role="freelancer" />} />
          <Route path="/freelancer/project/:id/deliverable/:deliverableId" element={<DeliverableDetails role="freelancer" />} />

          {/* Client routes */}
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/projects" element={<ClientProjects />} />
          <Route path="/client/deliverables" element={<ClientDeliverables />} />
          <Route path="/client/notifications" element={<NotificationsPage role="client" />} />
          <Route path="/client/profile" element={<ProfilePage role="client" />} />
          <Route path="/client/project/:id" element={<ProjectDetails role="client" />} />
          <Route path="/client/project/:id/deliverable/:deliverableId" element={<DeliverableDetails role="client" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;