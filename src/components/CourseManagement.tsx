import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: number;
  code: string;
  title: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, code: "CS101", title: "Introduction to Computer Science" },
    { id: 2, code: "MATH201", title: "Calculus I" },
    { id: 3, code: "ENG101", title: "English Composition" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ code: "", title: "" });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ code: "", title: "" });
    setEditingCourse(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.code.trim() || !formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingCourse) {
      // Update course
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, code: formData.code, title: formData.title }
          : course
      ));
      toast({
        title: "Success",
        description: "Course updated successfully",
      });
    } else {
      // Add new course
      const newCourse: Course = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        code: formData.code,
        title: formData.title,
      };
      setCourses([...courses, newCourse]);
      toast({
        title: "Success",
        description: "Course created successfully",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({ code: course.code, title: course.title });
    setIsDialogOpen(true);
  };

  const handleDelete = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast({
      title: "Success",
      description: "Course deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-2">Manage university courses and curriculum</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="university-gradient hover:opacity-90 shadow-medium" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                {editingCourse ? "Edit Course" : "Add New Course"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., CS101"
                  className="focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to Computer Science"
                  className="focus:ring-primary"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 university-gradient hover:opacity-90">
                  {editingCourse ? "Update Course" : "Create Course"}
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
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            All Courses ({courses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Course Code</TableHead>
                  <TableHead className="font-semibold">Course Title</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(course)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(course.id)}
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

export default CourseManagement;