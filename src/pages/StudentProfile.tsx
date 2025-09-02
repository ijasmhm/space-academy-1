
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with actual data fetching
const studentData = {
  "S001": {
    name: "Alice Johnson",
    email: "alice.j@university.edu",
    major: "Computer Science",
    enrollmentYear: 2021,
    avatar: "/placeholder.svg",
    enrolledCourses: [
      { id: "CS101", title: "Introduction to Computer Science" },
      { id: "MA201", title: "Calculus I" },
    ],
    academicHistory: [
      { course: "CS101", grade: "A" },
      { course: "MA201", grade: "B+" },
    ],
  },
  "S002": {
    name: "Bob Williams",
    email: "bob.w@university.edu",
    major: "Mechanical Engineering",
    enrollmentYear: 2020,
    avatar: "/placeholder.svg",
    enrolledCourses: [
      { id: "PHY101", title: "General Physics I" },
      { id: "ENG202", title: "Thermodynamics" },
    ],
    academicHistory: [
        { course: "PHY101", grade: "A-" },
        { course: "ENG202", grade: "B" },
    ],
  },
};

type StudentId = keyof typeof studentData;

const StudentProfilePage = () => {
  const { studentId } = useParams<{ studentId: StudentId }>();
  const student = studentId ? studentData[studentId] : null;

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={student.avatar} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold">{student.name}</CardTitle>
            <p className="text-lg text-muted-foreground">{student.email}</p>
            <p className="text-md text-muted-foreground">Enrolled since {student.enrollmentYear}</p>
            <Badge className="mt-2">{student.major}</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {student.enrolledCourses.map(course => (
                <div key={course.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <p className="font-semibold">{course.title}</p>
                  <Badge variant="outline">{course.id}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Academic History</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="space-y-3">
              {student.academicHistory.map(record => (
                <div key={record.course} className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <p className="font-semibold">{record.course}</p>
                  <p>Grade: <span className="font-bold">{record.grade}</span></p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfilePage;
