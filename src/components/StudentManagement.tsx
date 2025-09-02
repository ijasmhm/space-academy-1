import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Users, Search, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
}

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: "S001", name: "Alice Johnson", email: "alice.j@university.edu", major: "Computer Science" },
    { id: "S002", name: "Bob Smith", email: "bob.s@university.edu", major: "Mathematics" },
    { id: "S003", name: "Carol Williams", email: "carol.w@university.edu", major: "English Literature" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", major: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: "", email: "", major: "" });
    setEditingStudent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.major.trim()) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Error", description: "Invalid email address", variant: "destructive" });
      return;
    }

    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...formData } : s));
      toast({ title: "Success", description: "Student updated successfully" });
    } else {
      const newStudent: Student = { 
        id: `S${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
        ...formData
      };
      setStudents([...students, newStudent]);
      toast({ title: "Success", description: "Student added successfully" });
    }
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ name: student.name, email: student.email, major: student.major });
    setIsDialogOpen(true);
  };

  const handleDelete = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast({ title: "Success", description: "Student removed successfully" });
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Student Roster</h1>
          <p className="text-muted-foreground mt-2">Browse and manage student profiles.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="university-gradient hover:opacity-90 shadow-medium" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader><DialogTitle className="flex items-center"><Users className="h-5 w-5 mr-2 text-primary" />{editingStudent ? "Edit Profile" : "New Student"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" />
              <Input id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" />
              <Input id="major" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} placeholder="Major" />
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 university-gradient hover:opacity-90">{editingStudent ? "Save Changes" : "Add Student"}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, email, or major..."
          className="pl-10 w-full bg-card border-border shadow-soft focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="text-center university-card hover-lift transition-all duration-300 flex flex-col">
            <CardHeader className="flex flex-col items-center pt-8">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link to={`/students/${student.id}`} className="text-primary font-bold text-lg hover:underline">
                {student.name}
              </Link>
              <p className="text-muted-foreground text-sm">{student.major}</p>
              <div className="flex items-center justify-center text-muted-foreground pt-3">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${student.email}`} className="text-xs hover:underline">{student.email}</a>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-2 bg-muted/30 py-3">
              <Button variant="outline" size="sm" onClick={() => handleEdit(student)} className="hover:bg-primary hover:text-primary-foreground">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(student.id)} className="hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentManagement; 
