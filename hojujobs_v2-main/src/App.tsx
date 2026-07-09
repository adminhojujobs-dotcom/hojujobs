import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { MainLayout } from "@/components/MainLayout";
import Index from "./pages/Index";
import JobDetail from "./pages/JobDetail";
import Auth from "./pages/Auth";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import EditJob from "./pages/EditJob";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminActivity from "./pages/AdminActivity";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Sales from "./pages/Sales";
import SaleDetail from "./pages/SaleDetail";
import News from "./pages/News";
import Events from "./pages/Events";
import Directory from "./pages/Directory";
import Jobs from "./pages/Jobs";
import CompanyKmall09 from "./pages/CompanyKmall09";
import CompanyJobDetail from "./pages/CompanyJobDetail";
import CompanyOpeningManage from "./pages/CompanyOpeningManage";
import CompanyBunsik from "./pages/CompanyBunsik";
import CompanySushiYuzen from "./pages/CompanySushiYuzen";
import CompanyChickenV from "./pages/CompanyChickenV";
import CompanyParkBongsook from "./pages/CompanyParkBongsook";
import CompanyYanggaDeli from "./pages/CompanyYanggaDeli";
import CompanyStoneage from "./pages/CompanyStoneage";
import CompanyDkHairStudio from "./pages/CompanyDkHairStudio";
import CompanyBbqCode from "./pages/CompanyBbqCode";
import CompanyPaiksBbq from "./pages/CompanyPaiksBbq";
import CompanyDooboo from "./pages/CompanyDooboo";
import CompanySamSamChicken from "./pages/CompanySamSamChicken";
import CompanyBornga from "./pages/CompanyBornga";
import { DevPreviewAuthProvider, DevPreviewLayout } from "@/components/DevPreviewAuth";
import DevPreviewHub from "./pages/dev/DevPreviewHub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index key="all" />} />
              <Route path="/sydney" element={<Index key="NSW" cityFilter="NSW" />} />
              <Route path="/melbourne" element={<Index key="VIC" cityFilter="VIC" />} />
              <Route path="/brisbane" element={<Index key="QLD" cityFilter="QLD" />} />
              <Route path="/adelaide" element={<Index key="SA" cityFilter="SA" />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/my-jobs/:id" element={<CompanyOpeningManage />} />
              <Route path="/company/kmall09" element={<CompanyKmall09 />} />
              <Route path="/company/:slug/opening/:openingId" element={<CompanyJobDetail />} />
              <Route path="/company/bunsik" element={<CompanyBunsik />} />
              <Route path="/company/sushiyuzen" element={<CompanySushiYuzen />} />
              <Route path="/company/chickenv" element={<CompanyChickenV />} />
              <Route path="/company/parkbongsook" element={<CompanyParkBongsook />} />
              <Route path="/company/yanggadeli" element={<CompanyYanggaDeli />} />
              <Route path="/company/stoneage" element={<CompanyStoneage />} />
              <Route path="/company/dkhairstudio" element={<CompanyDkHairStudio />} />
              <Route path="/company/bbqcode" element={<CompanyBbqCode />} />
              <Route path="/company/paiksbbq" element={<CompanyPaiksBbq />} />
              <Route path="/company/dooboo" element={<CompanyDooboo />} />
              <Route path="/company/samsamchicken" element={<CompanySamSamChicken />} />
              <Route path="/company/bornga" element={<CompanyBornga />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/my-posts" element={<Profile />} />
              <Route path="/edit-job/:id" element={<EditJob />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/activity" element={<AdminActivity />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<Events />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/:rank" element={<SaleDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {import.meta.env.DEV && (
                <Route path="/dev/preview" element={<DevPreviewLayout />}>
                  <Route index element={<DevPreviewHub />} />
                  <Route
                    path="onboarding"
                    element={
                      <DevPreviewAuthProvider mode="onboarding">
                        <Onboarding />
                      </DevPreviewAuthProvider>
                    }
                  />
                  <Route
                    path="profile/job-seeker"
                    element={
                      <DevPreviewAuthProvider mode="job_seeker">
                        <Profile />
                      </DevPreviewAuthProvider>
                    }
                  />
                  <Route
                    path="profile/business"
                    element={
                      <DevPreviewAuthProvider mode="business">
                        <Profile />
                      </DevPreviewAuthProvider>
                    }
                  />
                  <Route
                    path="post-job"
                    element={
                      <DevPreviewAuthProvider mode="business">
                        <PostJob />
                      </DevPreviewAuthProvider>
                    }
                  />
                </Route>
              )}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
