
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, ChevronRight, Heart, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface LeaderboardItemProps {
  position: number;
  name: string;
  points: number;
  avatar: string;
  isCurrentUser?: boolean;
}

function LeaderboardItem({ position, name, points, avatar, isCurrentUser }: LeaderboardItemProps) {
  return (
    <div className={cn(
      'flex items-center p-3 rounded-lg',
      isCurrentUser ? 'bg-primary/10' : 'hover:bg-muted/50',
      'transition-colors duration-200'
    )}>
      <div className="w-8 text-center font-medium">{position}</div>
      <Avatar className="h-10 w-10 mx-2">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 ml-1">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{points.toLocaleString()} points</div>
      </div>
      {isCurrentUser && (
        <Badge variant="outline" className="text-xs">You</Badge>
      )}
    </div>
  );
}

interface ChallengeCardProps {
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  progress: number;
  joined?: boolean;
}

function ChallengeCard({ title, description, participants, daysLeft, progress, joined }: ChallengeCardProps) {
  return (
    <Card className="glass-card overflow-hidden hover-card">
      <CardContent className="p-4 pt-6 space-y-3">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{participants} participants</span>
          </div>
          <div>
            <span className="text-muted-foreground">{daysLeft} days left</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant={joined ? "outline" : "default"} className="w-full">
          {joined ? "View Challenge" : "Join Challenge"}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface PostCardProps {
  name: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  image?: string;
}

function PostCard({ name, avatar, time, content, likes, comments, image }: PostCardProps) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="font-medium">{name}</div>
            <div className="text-xs text-muted-foreground">{time}</div>
          </div>
        </div>
        <div>
          <p className="text-sm">{content}</p>
        </div>
        {image && (
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex items-center justify-between border-t pt-3">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{comments}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Community() {
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">Community</h1>
        <p className="text-muted-foreground">Connect with eco-minded people</p>
      </div>
      
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted rounded-lg">
          <TabsTrigger value="feed" className="py-2">Feed</TabsTrigger>
          <TabsTrigger value="challenges" className="py-2">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard" className="py-2">Leaderboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="mt-6 space-y-4">
          <PostCard 
            name="Emma Thompson"
            avatar="https://randomuser.me/api/portraits/women/33.jpg"
            time="2 hours ago"
            content="Just finished planting trees with the local community group! It's amazing what we can accomplish together. #TreePlanting #CommunityAction"
            likes={24}
            comments={5}
            image="https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=400"
          />
          <PostCard 
            name="Michael Chen"
            avatar="https://randomuser.me/api/portraits/men/15.jpg"
            time="Yesterday"
            content="Found this amazing zero-waste store in my neighborhood. They have everything from food to household items with no packaging waste!"
            likes={42}
            comments={8}
          />
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-6 space-y-4">
          <ChallengeCard 
            title="30-Day Zero Waste Challenge"
            description="Reduce your waste by following our daily actionable steps."
            participants={283}
            daysLeft={18}
            progress={40}
            joined={true}
          />
          <ChallengeCard 
            title="Public Transport Month"
            description="Switch from driving to public transport for 30 days."
            participants={156}
            daysLeft={25}
            progress={15}
          />
          <ChallengeCard 
            title="Local Food Challenge"
            description="Source your food from local producers for 2 weeks."
            participants={97}
            daysLeft={10}
            progress={65}
          />
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-6">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="font-medium">Top Contributors</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-sm">
                  This Month <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <ScrollArea className="h-[350px] pr-4">
                <LeaderboardItem 
                  position={1}
                  name="Olivia Kim"
                  points={2845}
                  avatar="https://randomuser.me/api/portraits/women/43.jpg"
                />
                <LeaderboardItem 
                  position={2}
                  name="Samuel Wilson"
                  points={2756}
                  avatar="https://randomuser.me/api/portraits/men/32.jpg"
                />
                <LeaderboardItem 
                  position={3}
                  name="Sophia Rodriguez"
                  points={2630}
                  avatar="https://randomuser.me/api/portraits/women/68.jpg"
                />
                <LeaderboardItem 
                  position={4}
                  name="Daniel Lee"
                  points={2517}
                  avatar="https://randomuser.me/api/portraits/men/75.jpg"
                />
                <LeaderboardItem 
                  position={5}
                  name="Alex Morgan"
                  points={2498}
                  avatar="https://randomuser.me/api/portraits/women/17.jpg"
                  isCurrentUser={true}
                />
                <LeaderboardItem 
                  position={6}
                  name="James Taylor"
                  points={2340}
                  avatar="https://randomuser.me/api/portraits/men/4.jpg"
                />
                <LeaderboardItem 
                  position={7}
                  name="Emily Davis"
                  points={2285}
                  avatar="https://randomuser.me/api/portraits/women/3.jpg"
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
