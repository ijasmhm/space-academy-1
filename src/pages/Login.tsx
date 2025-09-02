
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useUser();

  const handleLogin = () => {
    // **Mock Authentication**
    if (email === "admin@spaceacademy.com" && password === "password") {
      login(email);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate('/');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Space Academy Login</CardTitle>
          <p className='text-muted-foreground pt-2'>Enter your credentials to access the admin dashboard</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@spaceacademy.com" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleLogin} className="w-full mt-6 university-gradient hover:opacity-90">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
