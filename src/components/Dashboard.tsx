import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText, TrendingUp, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import universityHero from "@/assets/university-hero.jpg";

const Dashboard = () => {
  const stats = [
    { title: "Total Courses", value: "24", icon: BookOpen, color: "text-primary", trend: "+3" },
    { title: "Enrolled Students", value: "482", icon: Users, color: "text-success", trend: "+12" },
    { title: "Results Recorded", value: "1,247", icon: FileText, color: "text-warning", trend: "+89" },
    { title: "Average GPA", value: "3.42", icon: Award, color: "text-primary", trend: "+0.12" },
  ];

  const quickActions = [
    { title: "Add New Course", icon: BookOpen, path: "/courses", description: "Create and manage courses" },
    { title: "Register Student", icon: Users, path: "/students", description: "Add new student enrollment" },
    { title: "Record Results", icon: FileText, path: "/results", description: "Enter academic results" },
  ];

  const recentActivity = [
    { action: "New course 'Database Systems' added", time: "2 hours ago", type: "course" },
    { action: "15 results updated for CS101", time: "4 hours ago", type: "result" },
    { action: "3 new students enrolled", time: "1 day ago", type: "student" },
    { action: "Spring semester results finalized", time: "2 days ago", type: "result" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary text-primary-foreground shadow-strong">
        <div className="absolute inset-0 opacity-20">
          <img src={universityHero} alt="University Campus" className="w-full h-full object-cover" />
        </div>
        <div className="relative px-8 py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold font-heading mb-4">
              Welcome to CourseFlow Campus Suite
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Streamline your university course management with our comprehensive platform. 
              Manage courses, students, and results all in one place.
            </p>
            <div className="flex gap-4">
              <Button size="lg" variant="secondary" asChild className="shadow-medium">
                <Link to="/courses">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Manage Courses
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/students">
                  <Users className="h-5 w-5 mr-2" />
                  Student Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="university-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <span className="text-sm text-success font-medium">
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-muted/50`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="university-card">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <div key={index} className="group">
                  <Link to={action.path}>
                    <div className="flex items-center p-4 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/30 transition-all duration-200 hover-lift">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20">
                        <action.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="university-card">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <div className="p-1.5 rounded-full bg-primary/10 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-5">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;