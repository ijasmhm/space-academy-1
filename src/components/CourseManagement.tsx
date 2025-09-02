import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, BookOpen, Search, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: number;
  code: string;
  title: string;
  studentsEnrolled: number;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, code: "CS101", title: "Introduction to Computer Science", studentsEnrolled: 42 },
    { id: 2, code: "MA201", title: "Calculus I", studentsEnrolled: 35 },
    { id: 3, code: "ENG101", title: "English Composition", studentsEnrolled: 50 },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ code: "", title: "" });
  const [searchQuery, setSearchQuery] = useState("");
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
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, code: formData.code, title: formData.title }
          : course
      ));
      toast({ title: "Success", description: "Course updated successfully" });
    } else {
      const newCourse: Course = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        code: formData.code,
        title: formData.title,
        studentsEnrolled: 0,
      };
      setCourses([...courses, newCourse]);
      toast({ title: "Success", description: "Course created successfully" });
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
    toast({ title: "Success", description: "Course deleted successfully" });
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-2">Explore, add, and manage university courses.</p>
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
                <Input id="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="e.g., CS101" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Introduction to Computer Science" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 university-gradient hover:opacity-90">{editingCourse ? "Update" : "Create"}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Bar */}
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by course code or title..."
          className="pl-10 w-full bg-card border-border shadow-soft focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col university-card hover-lift transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                     <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <Link to={`/courses/${course.code}`} className="text-primary font-bold hover:underline">
                    {course.code}
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <p className="font-semibold text-foreground leading-tight">{course.title}</p>
              <div className="flex items-center text-muted-foreground pt-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{course.studentsEnrolled} students enrolled</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-muted/30 py-3">
              <Button variant="outline" size="sm" onClick={() => handleEdit(course)} className="hover:bg-primary hover:text-primary-foreground">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(course.id)} className="hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
