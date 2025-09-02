import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="space-y-8 font-sans">
      <header className="text-center py-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight">About Our University</h1>
        <p className="mt-2 text-lg text-indigo-100">A Tradition of Excellence and Innovation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-3xl font-bold text-gray-800">
                <Building className="mr-3 text-indigo-500" size={32}/>
                Our Legacy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>Founded in 1950, our university has been a beacon of knowledge and a pillar of the community for over 70 years. We are dedicated to fostering a challenging and supportive environment where students can push the boundaries of their understanding and develop into the leaders of tomorrow.</p>
              <p className="mt-4">Our mission is to provide a comprehensive and liberal arts and sciences education, to promote research and discovery, and to prepare our students for a life of learning, leadership, and service in a global society.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">University Details</CardTitle>
            </CardHeader>
            <CardContent>
                <img src="/university.jpg" alt="University Campus" className="w-full h-auto rounded-lg shadow-md mb-6"/>
                <div className="space-y-4 text-gray-700">
                    <p><strong>Type:</strong> Public Research University</p>
                    <p><strong>Established:</strong> 1950</p>
                    <p><strong>President:</strong> Dr. Jane Smith</p>
                    <p><strong>Students:</strong> ~25,000 (undergraduate and postgraduate)</p>
                    <p><strong>Motto:</strong> "Knowledge for a Better World"</p>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-800">Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700">
                    <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4 border-2 border-indigo-500">
                            <AvatarImage src="/avatars/01.png" alt="Admin Avatar"/>
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-lg">University Administration</p>
                            <p className="text-sm text-gray-500">General Inquiries</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Mail className="mr-4 mt-1 text-indigo-500"/>
                        <p><a href="mailto:contact@university.edu" className="hover:text-indigo-600 transition-colors">contact@university.edu</a></p>
                    </div>
                    <div className="flex items-start">
                        <Phone className="mr-4 mt-1 text-indigo-500"/>
                        <p>+1 (123) 456-7890</p>
                    </div>
                    <div className="flex items-start">
                        <MapPin className="mr-4 mt-1 text-indigo-500"/>
                        <p>123 University Avenue, Knowledge City, 12345, USA</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;