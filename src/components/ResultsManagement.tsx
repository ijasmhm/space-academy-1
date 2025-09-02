import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Result {
  id: number;
  studentId: number;
  studentName: string;
  courseId: number;
  courseCode: string;
  grade: string;
}

const courses = [
  { id: 1, code: "CS101", title: "Introduction to Computer Science" },
  { id: 2, code: "MATH201", title: "Calculus I" },
  { id: 3, code: "ENG101", title: "English Composition" },
];

const students = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Carol Williams" },
];

const gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];

const ResultsManagement = () => {
  const [results, setResults] = useState<Result[]>([
    { id: 1, studentId: 1, studentName: "Alice Johnson", courseId: 1, courseCode: "CS101", grade: "A" },
    { id: 2, studentId: 2, studentName: "Bob Smith", courseId: 1, courseCode: "CS101", grade: "B+" },
    { id: 3, studentId: 1, studentName: "Alice Johnson", courseId: 2, courseCode: "MATH201", grade: "A-" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [formData, setFormData] = useState({ studentId: "", courseId: "", grade: "" });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ studentId: "", courseId: "", grade: "" });
    setEditingResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentId || !formData.courseId || !formData.grade) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const student = students.find(s => s.id === parseInt(formData.studentId));
    const course = courses.find(c => c.id === parseInt(formData.courseId));

    if (!student || !course) {
      toast({
        title: "Error",
        description: "Invalid student or course selection",
        variant: "destructive",
      });
      return;
    }

    if (editingResult) {
      // Update result
      setResults(results.map(result => 
        result.id === editingResult.id 
          ? { 
              ...result, 
              studentId: parseInt(formData.studentId),
              studentName: student.name,
              courseId: parseInt(formData.courseId),
              courseCode: course.code,
              grade: formData.grade
            }
          : result
      ));
      toast({
        title: "Success",
        description: "Result updated successfully",
      });
    } else {
      // Check if result already exists for this student-course combination
      const existingResult = results.find(r => 
        r.studentId === parseInt(formData.studentId) && r.courseId === parseInt(formData.courseId)
      );
      
      if (existingResult) {
        toast({
          title: "Error",
          description: "Result already exists for this student-course combination",
          variant: "destructive",
        });
        return;
      }

      // Add new result
      const newResult: Result = {
        id: Math.max(...results.map(r => r.id), 0) + 1,
        studentId: parseInt(formData.studentId),
        studentName: student.name,
        courseId: parseInt(formData.courseId),
        courseCode: course.code,
        grade: formData.grade,
      };
      setResults([...results, newResult]);
      toast({
        title: "Success",
        description: "Result created successfully",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (result: Result) => {
    setEditingResult(result);
    setFormData({ 
      studentId: result.studentId.toString(), 
      courseId: result.courseId.toString(), 
      grade: result.grade 
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (resultId: number) => {
    setResults(results.filter(result => result.id !== resultId));
    toast({
      title: "Success",
      description: "Result deleted successfully",
    });
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-success';
    if (grade.startsWith('B')) return 'text-primary';
    if (grade.startsWith('C')) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Results Management</h1>
          <p className="text-muted-foreground mt-2">Manage student grades and academic results</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="university-gradient hover:opacity-90 shadow-medium" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Result
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                {editingResult ? "Edit Result" : "Add New Result"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student</Label>
                <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.code} - {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 university-gradient hover:opacity-90">
                  {editingResult ? "Update Result" : "Create Result"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="university-card hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            All Results ({results.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Student</TableHead>
                  <TableHead className="font-semibold">Course</TableHead>
                  <TableHead className="font-semibold">Grade</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{result.studentName}</TableCell>
                    <TableCell>{result.courseCode}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(result)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(result.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsManagement;