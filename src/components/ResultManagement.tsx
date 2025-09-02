import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, TrendingUp, Users } from "lucide-react";

const gradeData = [
  { name: 'A', value: 4 },
  { name: 'B', value: 8 },
  { name: 'C', value: 3 },
  { name: 'D', value: 1 },
];

const performanceData = [
  { course: 'CS101', avgGrade: 85 },
  { course: 'MA201', avgGrade: 78 },
  { course: 'ENG101', avgGrade: 92 },
  { course: 'PHY202', avgGrade: 81 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ResultManagement = () => {
  const [selectedCourse, setSelectedCourse] = useState("All Courses");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Academic Results</h1>
          <p className="text-muted-foreground mt-2">Visualize and analyze student performance data.</p>
        </div>
         <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-[220px] bg-card shadow-soft">
            <SelectValue placeholder="Filter by Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Courses">All Courses</SelectItem>
            <SelectItem value="CS101">CS101 - CompSci</SelectItem>
            <SelectItem value="MA201">MA201 - Calculus</SelectItem>
            <SelectItem value="ENG101">ENG101 - English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="university-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Course Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgGrade" fill="#8884d8" name="Average Grade" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="university-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={gradeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultManagement;
