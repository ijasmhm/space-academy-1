import { NavLink, Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, FileText } from "lucide-react";

const Layout = () => {
  const navItems = [
    { path: "/", icon: GraduationCap, label: "Dashboard" },
    { path: "/courses", icon: BookOpen, label: "Courses" },
    { path: "/students", icon: Users, label: "Students" },
    { path: "/results", icon: FileText, label: "Results" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="university-gradient text-primary-foreground shadow-strong">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold font-heading">CourseFlow</h1>
                <p className="text-sm opacity-90">Campus Suite</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">University Course Management</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-4 text-sm font-medium transition-colors hover:text-primary ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;