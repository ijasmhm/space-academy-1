
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - replace with actual data fetching
const courseData = {
  "CS101": {
    title: "Introduction to Computer Science",
    description: "A foundational course on the principles of computer science, covering topics like algorithms, data structures, and programming fundamentals.",
    instructor: {
      name: "Dr. Alan Turing",
      avatar: "/placeholder.svg",
    },
    prerequisites: ["None"],
    enrolledStudents: [
      { id: "S001", name: "Alice Johnson" },
      { id: "S002", name: "Bob Williams" },
      { id: "S003", name: "Charlie Brown" },
    ],
  },
  "MA201": {
    title: "Calculus I",
    description: "An introductory course to differential and integral calculus.",
    instructor: {
      name: "Dr. Isaac Newton",
      avatar: "/placeholder.svg",
    },
    prerequisites: ["High School Math"],
    enrolledStudents: [
        { id: "S004", name: "David Davis" },
        { id: "S005", name: "Eve Evans" },
    ],
  },
};

type CourseId = keyof typeof courseData;

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: CourseId }>();
  const course = courseId ? courseData[courseId] : null;

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
            <Badge>Computer Science</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructor</h3>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-medium">{course.instructor.name}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((prereq) => (
                  <Badge key={prereq} variant="outline">{prereq}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enrolled Students</h3>
            <div className="space-y-4">
              {course.enrolledStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <p>{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.id}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailsPage;
