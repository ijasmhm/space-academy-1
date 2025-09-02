import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, BookOpen, Search, Users, Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseFile {
  name: string;
  url: string;
}

interface Course {
  id: number;
  code: string;
  title: string;
  studentsEnrolled: number;
  files: CourseFile[];
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1, 
      code: "CS101", 
      title: "Introduction to Computer Science", 
      studentsEnrolled: 42, 
      files: [
        { name: "Syllabus.pdf", url: "#" },
        { name: "Lecture 1 Slides.pptx", url: "#" },
      ]
    },
    {
      id: 2, 
      code: "MA201", 
      title: "Calculus I", 
      studentsEnrolled: 35, 
      files: [
        { name: "Homework 1.docx", url: "#" }
      ]
    },
    {
      id: 3, 
      code: "ENG101", 
      title: "English Composition", 
      studentsEnrolled: 50, 
      files: []
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [uploadingCourse, setUploadingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ code: "", title: "" });
  const [uploadFormData, setUploadFormData] = useState({ fileName: "", file: null as File | null });
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ code: "", title: "" });
    setEditingCourse(null);
  };
  
  const resetUploadForm = () => {
    setUploadFormData({ fileName: "", file: null });
    setUploadingCourse(null);
  }

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
        files: [],
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
  
  const handleUpload = (course: Course) => {
    setUploadingCourse(course);
    setIsUploadDialogOpen(true);
  }
  
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFormData.file || !uploadFormData.fileName.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and provide a name.",
        variant: "destructive",
      });
      return;
    }
    
    if(uploadingCourse) {
        const newFile: CourseFile = { name: uploadFormData.fileName, url: URL.createObjectURL(uploadFormData.file) };
        setCourses(courses.map(course => 
            course.id === uploadingCourse.id 
                ? { ...course, files: [...course.files, newFile] }
                : course
        ));
        toast({ title: "Success", description: `File '${uploadFormData.fileName}' uploaded to ${uploadingCourse.code}.` });
    }

    resetUploadForm();
    setIsUploadDialogOpen(false);
  }

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading">Course Management</h1>
            <p className="text-muted-foreground">Create, edit, and manage all university courses.</p>
          </div>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add New Course
          </Button>
        </div>
      </div>

      {/* Add/Edit Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            <DialogDescription>
              {editingCourse ? "Update the details of the course." : "Fill in the details for the new course."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">Course Code</Label>
                <Input id="code" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Course Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{editingCourse ? "Save Changes" : "Create Course"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload File Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload File to {uploadingCourse?.code}</DialogTitle>
            <DialogDescription>Select a file and provide a name for it.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUploadSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileName" className="text-right">File Name</Label>
                <Input id="fileName" value={uploadFormData.fileName} onChange={(e) => setUploadFormData({...uploadFormData, fileName: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileUpload" className="text-right">File</Label>
                <Input id="fileUpload" type="file" onChange={(e) => setUploadFormData({...uploadFormData, file: e.target.files ? e.target.files[0] : null})} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


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

              {course.files && course.files.length > 0 && (
                <div className="pt-4">
                  <h4 className="font-semibold text-sm mb-2 text-foreground/80">Uploaded Files</h4>
                  <div className="space-y-2">
                    {course.files.map((file, index) => (
                      <a
                        key={index}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <File className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-muted/30 py-3">
              <Button variant="outline" size="sm" onClick={() => handleEdit(course)} className="hover:bg-primary hover:text-primary-foreground">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(course.id)} className="hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
               <Button variant="outline" size="sm" onClick={() => handleUpload(course)} className="hover:bg-primary hover:text-primary-foreground">
                <Upload className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
