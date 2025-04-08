
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Leaf, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
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
      if (tab === 'signup') {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error("Invalid email format", {
            description: "Please enter a valid email address."
          });
          setIsLoading(false);
          return;
        }

        // Validate password length
        if (formData.password.length < 6) {
          toast.error("Password too short", {
            description: "Password must be at least 6 characters long."
          });
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
            emailRedirectTo: window.location.origin + '/auth'
          }
        });
        
        if (error) {
          throw error;
        }
        
        // Check if user already exists
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          toast.error("Email already registered", {
            description: "This email address is already in use."
          });
        } else {
          // Check if email confirmation is enabled
          const emailConfirmationEnabled = data.user?.confirmation_sent_at;
          
          if (emailConfirmationEnabled) {
            toast.success("Account created! Check your email to verify your account.", {
              description: "Please verify your email to continue.",
              duration: 6000
            });
          } else {
            toast.success("Account created successfully!", {
              description: "You can now sign in with your email and password."
            });
            // Auto-switch to sign in mode after successful registration
            setTab('signin');
          }
        }
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
      
      // Handle specific error messages
      if (error.message.includes("Email not confirmed")) {
        toast.error("Email not verified", {
          description: "Please check your inbox and verify your email before logging in."
        });
      } else if (error.message.includes("Invalid login credentials")) {
        toast.error("Login failed", {
          description: "Invalid email or password. Please try again."
        });
      } else if (error.message.includes("Password should be")) {
        toast.error("Invalid password", {
          description: error.message
        });
      } else if (error.message.includes("User already registered")) {
        toast.error("Registration failed", {
          description: "This email is already registered. Please use a different email or try logging in."
        });
      } else {
        toast.error("Authentication error", {
          description: error.message || "An unexpected error occurred."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
        <CardContent className="px-6 py-8">
          <Tabs value={tab} onValueChange={(v) => setTab(v as 'signin' | 'signup')} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-white/10">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="signin" className="mt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-green-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white/90">Password</Label>
                      <a href="#" className="text-xs text-white/70 hover:text-white">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-green-400"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white/90">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        required={tab === 'signup'}
                        value={formData.fullName}
                        onChange={handleChange}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-green-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-green-400"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/90">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-green-400"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white border-none flex items-center justify-center gap-2 group transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {tab === 'signup' ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  <>
                    <span>{tab === 'signup' ? 'Sign Up' : 'Sign In'}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Tabs>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black/20 px-2 text-white/60 backdrop-blur-sm rounded">
                  or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Google
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
