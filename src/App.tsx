import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext"; 
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import CourseManagement from "./components/CourseManagement";
import StudentManagement from "./components/StudentManagement";
import ResultManagement from "./components/ResultManagement";
import ExamManagement from "./components/ExamManagement";
import NotFound from "./pages/NotFound";
import CourseDetailsPage from "./pages/CourseDetails";
import StudentProfilePage from "./pages/StudentProfile";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<CourseManagement />} />
                <Route path="courses/:courseId" element={<CourseDetailsPage />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="students/:studentId" element={<StudentProfilePage />} />
                <Route path="results" element={<ResultManagement />} />
                <Route path="exams" element={<ExamManagement />} />
                <Route path="about" element={<AboutUs />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
