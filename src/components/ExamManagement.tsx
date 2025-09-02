import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Book, Clock, MapPin, PlusCircle } from 'lucide-react';
import AdmissionCard from './AdmissionCard';

const initialExams = [
  { id: 1, course: 'CS101', date: new Date(2024, 5, 15), time: '10:00 AM', location: 'Hall A' },
  { id: 2, course: 'MA201', date: new Date(2024, 5, 18), time: '2:00 PM', location: 'Hall B' },
];

const ExamManagement = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [exams, setExams] = useState(initialExams);
  const [showAdmissionCard, setShowAdmissionCard] = useState(false);

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

  if (showAdmissionCard) {
    return <AdmissionCard />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Exam Timetable</h1>
          <p className="text-muted-foreground mt-2">Schedule and view upcoming examinations.</p>
        </div>
        <Button onClick={() => setShowAdmissionCard(true)} className="university-gradient">View Admission Card</Button>
      </div>

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
