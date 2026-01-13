import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WhatWeDo from "./pages/WhatWeDo";
import OurThinking from "./pages/OurThinking";
import Projects from "./pages/Projects";
import Careers from "./pages/Careers";
import Location from "./pages/Location";
import OurTeam from "./pages/OurTeam";

const queryClient = new QueryClient();

// Get base path from environment or use empty string for root
// Handle GitHub Pages 404.html redirect
const basePath = import.meta.env.BASE_URL || "/";

// Handle GitHub Pages SPA redirect
if (window.location.search.includes('?/')) {
  const path = window.location.search.replace('?/', '').replace(/~and~/g, '&');
  window.history.replaceState({}, '', basePath + path);
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basePath}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/our-thinking" element={<OurThinking />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/location" element={<Location />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
