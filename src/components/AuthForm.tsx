
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Leaf, 
  Mail, 
  Lock, 
  User, 
  Sun, 
  ArrowRight, 
  Phone, 
  Check, 
  Loader2 
} from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [phoneStep, setPhoneStep] = useState<'phone' | 'otp'>('phone');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '+639',
    fullName: '',
    otp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOTPChange = (value: string) => {
    setFormData({ ...formData, otp: value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure it starts with +639
    if (!value.startsWith('+639')) {
      value = '+639';
    }
    
    // Only allow digits after the +639 prefix
    const regex = /^\+639\d*$/;
    if (value.length > 4 && !regex.test(value)) {
      return;
    }
    
    setFormData({ ...formData, phone: value });
  };

  const validatePhone = (phone: string) => {
    // Philippine mobile numbers should be +639XXXXXXXXX (13 characters total)
    const regex = /^\+639\d{9}$/;
    return regex.test(phone);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) throw error;
      
      // The redirect happens automatically, no need for toast here
    } catch (error: any) {
      console.error("Google auth error:", error);
      toast.error("Authentication error", {
        description: error.message || "An unexpected error occurred."
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (authMethod === 'email') {
          // Email signup
          const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                full_name: formData.fullName,
              }
            }
          });
          
          if (error) throw error;
          
          toast.success("Account created! Check your email to verify your account.", {
            description: "Please verify your email to continue."
          });
        } else {
          // Phone signup - first step is to request OTP
          if (phoneStep === 'phone') {
            if (!validatePhone(formData.phone)) {
              throw new Error("Please enter a valid Philippine mobile number (+639XXXXXXXXX)");
            }
            
            const { error } = await supabase.auth.signInWithOtp({
              phone: formData.phone,
              options: {
                data: {
                  full_name: formData.fullName,
                }
              }
            });
            
            if (error) throw error;
            
            setPhoneStep('otp');
            toast.success("Verification code sent", {
              description: "Please check your phone for the verification code."
            });
            setIsLoading(false);
            return;
          } else {
            // Verify OTP
            const { error } = await supabase.auth.verifyOtp({
              phone: formData.phone,
              token: formData.otp,
              type: 'sms'
            });
            
            if (error) throw error;
            
            toast.success("Phone number verified!", {
              description: "You're successfully signed in."
            });
          }
        }
      } else {
        // Sign in
        if (authMethod === 'email') {
          // Email signin
          const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
          });
          
          if (error) throw error;
          
          toast.success("Welcome back!", {
            description: "Successfully logged in."
          });
        } else {
          // Phone signin - first step is to request OTP
          if (phoneStep === 'phone') {
            if (!validatePhone(formData.phone)) {
              throw new Error("Please enter a valid Philippine mobile number (+639XXXXXXXXX)");
            }
            
            const { error } = await supabase.auth.signInWithOtp({
              phone: formData.phone
            });
            
            if (error) throw error;
            
            setPhoneStep('otp');
            toast.success("Verification code sent", {
              description: "Please check your phone for the verification code."
            });
            setIsLoading(false);
            return;
          } else {
            // Verify OTP
            const { error } = await supabase.auth.verifyOtp({
              phone: formData.phone,
              token: formData.otp,
              type: 'sms'
            });
            
            if (error) throw error;
            
            toast.success("Welcome back!", {
              description: "Successfully logged in."
            });
          }
        }
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
    setPhoneStep('phone');
  };

  const resetOtp = () => {
    setPhoneStep('phone');
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
        <Tabs 
          defaultValue="email" 
          value={authMethod}
          onValueChange={(value) => {
            setAuthMethod(value as 'email' | 'phone');
            setPhoneStep('phone');
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="phone">
              <Phone className="mr-2 h-4 w-4" />
              Phone
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
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
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full text-foreground border-border" 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign {isSignUp ? 'up' : 'in'} with Google
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="phone">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullNamePhone" className="text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullNamePhone"
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
              
              {phoneStep === 'phone' ? (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Philippine mobile number"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-all"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Format: +639XXXXXXXXX</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h4 className="font-medium text-foreground">Verification Code</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter the 6-digit code sent to {formData.phone}
                    </p>
                  </div>
                  
                  <InputOTP maxLength={6} value={formData.otp} onChange={handleOTPChange}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  
                  <Button 
                    type="button" 
                    variant="link" 
                    className="w-full text-primary" 
                    onClick={resetOtp}
                  >
                    Use different phone number
                  </Button>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white border-none flex items-center justify-center gap-2 group transition-all duration-300"
                disabled={isLoading || (phoneStep === 'otp' && formData.otp.length < 6)}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {phoneStep === 'phone' 
                      ? (isSignUp ? 'Sending Code...' : 'Sending Code...') 
                      : 'Verifying...'}
                  </div>
                ) : (
                  <>
                    <span>
                      {phoneStep === 'phone'
                        ? (isSignUp ? 'Send Verification Code' : 'Send Verification Code')
                        : 'Verify Code'}
                    </span>
                    {phoneStep === 'phone' ? (
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
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
