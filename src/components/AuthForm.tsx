
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Leaf, Mail, Lock, User, Sun, ArrowRight } from 'lucide-react';

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        });
        
        if (error) {
          throw error;
        }
        
        toast.success("Account created! Check your email to verify your account.", {
          description: "Please verify your email to continue."
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        
        if (error) {
          throw error;
        }
        
        toast.success("Welcome back!", {
          description: "Successfully logged in."
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error("Authentication error", {
        description: error.message || "An unexpected error occurred."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Card className="w-full max-w-md glass-card overflow-hidden animate-float-card shadow-xl border-white/20">
      {/* Animated card background */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl"></div>
      
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm z-0"></div>
      
      <CardHeader className="space-y-2 text-center relative z-10">
        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center mb-2 shadow-lg animate-pulse-slow">
          <Sun className="h-8 w-8 text-white animate-spin-slow" />
          <Leaf className="h-6 w-6 text-white absolute animate-float-medium" />
        </div>
        <CardTitle className="text-2xl text-foreground">{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {isSignUp
            ? 'Join our eco-friendly community'
            : 'Continue your sustainable journey'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required={isSignUp}
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-all"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-all"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white border-none flex items-center justify-center gap-2 group transition-all duration-300" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              <>
                <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 relative z-10">
        <div className="text-center text-sm text-muted-foreground">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
          <Button variant="link" className="p-0 h-auto ml-1 text-primary hover:text-primary/80" onClick={toggleAuthMode}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
