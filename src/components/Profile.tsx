import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProgressRing } from './ui/ProgressRing';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Leaf, 
  Medal, 
  Settings, 
  TreePine, 
  Recycle, 
  Bike, 
  DropletIcon,
  MessageSquare,
  Info,
  Gift,
  Moon,
  Sun,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { TutorialRestartButton } from './TutorialHelpers';

interface AchievementItemProps {
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked?: boolean;
  progress?: number;
}

function AchievementItem({ 
  title, 
  description, 
  icon: Icon, 
  unlocked = false, 
  progress = 0 
}: AchievementItemProps) {
  return (
    <Card className={cn(
      'glass-card overflow-hidden transition-all duration-300',
      unlocked ? 'border-primary/50' : 'opacity-70'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            'flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center',
            unlocked ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{title}</h3>
              {unlocked && (
                <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                  Unlocked
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            {!unlocked && progress > 0 && (
              <div className="w-full bg-muted h-1.5 rounded-full mt-2">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Profile() {
  const { user, profile, signOut } = useAuth();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [creditsDialogOpen, setCreditsDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setDarkMode(isDark);
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("You've been signed out");
      navigate('/auth');
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const handleRestartTutorial = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          tutorial_completed: false 
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Tutorial will restart", {
        description: "You'll see the tutorial when you go back to the home page."
      });
      setSettingsDialogOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Failed to restart tutorial:", error);
      toast.error("Failed to restart tutorial");
    }
  };

  const points = profile?.points || 0;
  const level = profile?.level || 1;
  const fullName = profile?.full_name || user?.user_metadata?.full_name || 'User';
  
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleSignOut}
          className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSettingsDialogOpen(true)}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="text-center">
        <div className="relative mx-auto">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt={fullName} />
            <AvatarFallback>{fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-2xl font-medium mt-4">{fullName}</h1>
        <p className="text-muted-foreground">Eco Champion</p>
        <div className="flex justify-center mt-2 space-x-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">Level {level}</Badge>
          <Badge variant="outline">{points.toLocaleString()} points</Badge>
        </div>
        
        <Button 
          onClick={() => navigate('/rewards')} 
          className="mt-4 animate-pulse hover:animate-none"
          variant="default"
        >
          <Gift className="mr-2 h-4 w-4" />
          Redeem Your Rewards
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <ProgressRing progress={72} size={80} strokeWidth={3} showPercentage={false}>
            <Leaf className="h-6 w-6 text-primary" />
          </ProgressRing>
          <p className="text-sm mt-2">Eco Score</p>
        </div>
        
        <div className="text-center">
          <ProgressRing progress={86} size={80} strokeWidth={3} showPercentage={false} color="stroke-accent">
            <Award className="h-6 w-6 text-accent" />
          </ProgressRing>
          <p className="text-sm mt-2">Achievements</p>
        </div>
        
        <div className="text-center">
          <ProgressRing progress={64} size={80} strokeWidth={3} showPercentage={false} color="stroke-amber-500">
            <Medal className="h-6 w-6 text-amber-500" />
          </ProgressRing>
          <p className="text-sm mt-2">Challenges</p>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted rounded-lg">
          <TabsTrigger value="achievements" className="py-2">Achievements</TabsTrigger>
          <TabsTrigger value="stats" className="py-2">Impact Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="achievements" className="mt-6 space-y-4">
          <AchievementItem
            title="Tree Hugger"
            description="Plant your first tree"
            icon={TreePine}
            unlocked={true}
          />
          <AchievementItem
            title="Waste Warrior"
            description="Recycle 100kg of materials"
            icon={Recycle}
            unlocked={true}
          />
          <AchievementItem
            title="Road Ranger"
            description="Cycle 50km instead of driving"
            icon={Bike}
            progress={75}
          />
          <AchievementItem
            title="Water Guardian"
            description="Save 1,000L of water"
            icon={DropletIcon}
            progress={45}
          />
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => setFeedbackDialogOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Share your feedback
            </Button>
            
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => setCreditsDialogOpen(true)}
            >
              <Info className="mr-2 h-4 w-4" />
              Credits
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-6">
          <Card className="glass-card">
            <CardContent className="p-4 space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-4">Environmental Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>CO2 Reduced</span>
                    <span className="font-medium">142 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water Saved</span>
                    <span className="font-medium">4,120 L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Waste Reduced</span>
                    <span className="font-medium">78 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Trees Equivalent</span>
                    <span className="font-medium">12 trees</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Challenges Completed</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Habits Streak</span>
                    <span className="font-medium">14 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Community Rank</span>
                    <span className="font-medium">Top 5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Configure your app preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {darkMode ? 
                  <Moon className="h-5 w-5 text-primary" /> : 
                  <Sun className="h-5 w-5 text-amber-500" />
                }
                <span>Dark Mode</span>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={toggleDarkMode} 
              />
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>App Tutorial</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleRestartTutorial}
              >
                Restart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              We'd love to hear your thoughts on how we can improve the app.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <textarea 
              className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background text-sm" 
              placeholder="Tell us what you think about the app..."
            />
            <Button className="w-full">Submit Feedback</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={creditsDialogOpen} onOpenChange={setCreditsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credits</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 text-center">
            <p className="text-muted-foreground">Developed by</p>
            <h3 className="text-xl font-medium">Chrono X Developers</h3>
            <div className="py-2">
              <img 
                src="https://lovable.dev/logo.png" 
                alt="Lovable Logo" 
                className="h-10 mx-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Built with 💚 using Lovable
            </p>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setCreditsDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
