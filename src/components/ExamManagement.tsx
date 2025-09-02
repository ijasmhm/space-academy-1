import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Book, Clock, MapPin, PlusCircle, FileCheck2 } from 'lucide-react';
import AdmissionCard from './AdmissionCard';

const initialExams = [
  { id: 1, course: 'CS101', date: new Date(2024, 5, 15), time: '10:00 AM', location: 'Hall A' },
  { id: 2, course: 'MA201', date: new Date(2024, 5, 18), time: '2:00 PM', location: 'Hall B' },
];

const ExamManagement = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [exams, setExams] = useState(initialExams);
  const [showAdmissionCard, setShowAdmissionCard] = useState(false);
  const [isReevaluationOpen, setIsReevaluationOpen] = useState(false);

  const handleAddExam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExam = {
      id: exams.length + 1,
      course: formData.get('course') as string,
      date: date || new Date(),
      time: formData.get('time') as string,
      location: formData.get('location') as string,
    };
    setExams([...exams, newExam]);
    toast({
      title: "Exam Scheduled!",
      description: `Exam for ${newExam.course} has been added to the timetable.`,
    });
    e.currentTarget.reset();
  };
  
  const handleReevaluationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reevaluationData = {
      studentName: formData.get('studentName') as string,
      studentId: formData.get('studentId') as string,
      course: formData.get('course') as string,
      reason: formData.get('reason') as string,
    };
    console.log("Re-evaluation Request:", reevaluationData); // In a real app, send this to a server
    toast({
      title: "Request Submitted!",
      description: "Your re-evaluation request has been submitted for review.",
    });
    setIsReevaluationOpen(false);
    e.currentTarget.reset();
  };

  if (showAdmissionCard) {
    return <AdmissionCard />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Exam Timetable</h1>
          <p className="text-muted-foreground mt-2">Schedule and view upcoming examinations.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsReevaluationOpen(true)} variant="secondary">
            <FileCheck2 className="h-4 w-4 mr-2" />
            Request Re-evaluation
          </Button>
          <Button onClick={() => setShowAdmissionCard(true)} className="university-gradient">View Admission Card</Button>
        </div>
      </div>

      {/* Re-evaluation Dialog */}
      <Dialog open={isReevaluationOpen} onOpenChange={setIsReevaluationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Exam Re-evaluation Request</DialogTitle>
            <DialogDescription>Please fill out the form below to request an exam re-evaluation.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReevaluationSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="studentName" className="text-right">Full Name</Label>
                <Input id="studentName" name="studentName" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="studentId" className="text-right">Student ID</Label>
                <Input id="studentId" name="studentId" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">Course</Label>
                <Select name="course">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CS101">CS101 - CompSci</SelectItem>
                    <SelectItem value="MA201">MA201 - Calculus</SelectItem>
                    <SelectItem value="ENG101">ENG101 - English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">Reason</Label>
                <Textarea id="reason" name="reason" placeholder="Briefly explain your reason for the re-evaluation request." className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="university-card hover-lift">
            <CardHeader>
              <CardTitle>Exam Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="university-card">
            <CardHeader>
              <CardTitle className='flex items-center'>
                <PlusCircle className='h-5 w-5 mr-2' /> Add New Exam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddExam} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select name="course">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CS101">CS101 - CompSci</SelectItem>
                      <SelectItem value="MA201">MA201 - Calculus</SelectItem>
                      <SelectItem value="ENG101">ENG101 - English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="e.g. Exam Hall A" required />
                </div>
                <Button type="submit" className="w-full university-gradient">Add Exam</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground mb-4">Upcoming Exams</h2>
        <div className="space-y-4">
          {exams.map(exam => (
            <Card key={exam.id} className="university-card hover-lift">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Book className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{exam.course}</h3>
                    <p className="text-muted-foreground text-sm">{exam.date.toDateString()}</p>
                  </div>
                </div>
                <div className='flex space-x-6'>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{exam.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamManagement;
