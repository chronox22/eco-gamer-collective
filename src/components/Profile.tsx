
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProgressRing } from './ui/ProgressRing';
import { 
  Award, 
  Leaf, 
  Medal, 
  Settings, 
  TreePine, 
  Recycle, 
  Bike, 
  DropletIcon 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

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
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="flex justify-end">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="text-center">
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarImage src="https://scontent.fmnl17-7.fna.fbcdn.net/v/t1.15752-9/485700300_1220675332910388_2057545410610368668_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFairmy4bBLoAjpZPJ0OCTHH66CG-Z29asfroIb5nb1q8Fnh-O6NhN9j8MINdAmZXwe9bEAeGSg0sC-xf7aXs06&_nc_ohc=DuuPvLorEucQ7kNvgF2Qp5a&_nc_oc=Adnv06x0dZiMFGCsxSnYi-AUnjlTot8y4BHvuft47Y_D9YXE2CcQRgGMW8cBeYcRowY&_nc_zt=23&_nc_ht=scontent.fmnl17-7.fna&oh=03_Q7cD1wFHtGdY51_dK4EGtpu3WHRXo88VxC5Z2oc6FT0hH70mJQ&oe=6805B987" alt="Paul Joshua Mamaril" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-medium mt-4">Paul Joshua Mamaril</h1>
        <p className="text-muted-foreground">Certified Kupal</p>
        <div className="flex justify-center mt-2 space-x-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">Level 8</Badge>
          <Badge variant="outline">2,498 points</Badge>
        </div>
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
    </section>
  );
}
