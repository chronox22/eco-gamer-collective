
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, ChevronRight, Heart, MessageSquare, ThumbsUp, Share } from 'lucide-react';
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
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
            <Share className="h-4 w-4" />
            <span>Share</span>
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
            name="Juan dela Cruz"
            avatar="https://randomuser.me/api/portraits/men/33.jpg"
            time="1 hour ago"
            content="Nagtanim ako ng mga halamang gulay sa aming community garden kahapon! Sobrang nakakasiya pala ang magtanim. #UrbanGardening #SustainableLiving"
            likes={42}
            comments={8}
            image="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=400"
          />
          <PostCard 
            name="Maria Santos"
            avatar="https://randomuser.me/api/portraits/women/42.jpg"
            time="3 hours ago"
            content="May nakita akong zero-waste store sa Makati! Pwede dalhin ang sariling lalagyan para sa rice, beans, at iba pang pantry staples. Sino gusto sumama sa akin next week?"
            likes={36}
            comments={15}
          />
          <PostCard 
            name="Arnel Pineda"
            avatar="https://randomuser.me/api/portraits/men/22.jpg"
            time="Yesterday"
            content="Coastal cleanup drive sa Boracay ngayong weekend! Tara sama-sama tayong maglinis ng beach para mapanatili ang ganda ng ating isla. #CleanSeasPH"
            likes={89}
            comments={23}
            image="https://images.unsplash.com/photo-1618477462146-050d2036391d?auto=format&fit=crop&q=80&w=400"
          />
          <PostCard 
            name="Josephine Reyes"
            avatar="https://randomuser.me/api/portraits/women/28.jpg"
            time="2 days ago"
            content="Binisita ko 'yung bag manufacturing company na gumagamit ng recycled plastic. Ang ganda ng output nila! Sustainable at fashionable pa. Proud ako sa Filipino craftmanship!"
            likes={65}
            comments={12}
            image="https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80&w=400"
          />
          <PostCard 
            name="Carlo Aquino"
            avatar="https://randomuser.me/api/portraits/men/15.jpg"
            time="3 days ago"
            content="Nag-install na ako ng rainwater harvesting system sa bahay namin! Nakakatipid na kami sa tubig, nakakatulong pa sa environment. Win-win!"
            likes={54}
            comments={7}
          />
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-6 space-y-4">
          <ChallengeCard 
            title="30-Day Plastic-Free Challenge"
            description="Iwasan ang single-use plastics sa loob ng 30 araw."
            participants={283}
            daysLeft={18}
            progress={40}
            joined={true}
          />
          <ChallengeCard 
            title="Meatless Monday Challenge"
            description="Walang karne tuwing Lunes para sa kalusugan at kalikasan."
            participants={156}
            daysLeft={25}
            progress={15}
          />
          <ChallengeCard 
            title="Local Food Week"
            description="Kumain ng locally produced foods lang sa loob ng isang linggo."
            participants={97}
            daysLeft={10}
            progress={65}
          />
          <ChallengeCard 
            title="Energy Conservation Month"
            description="Bawasan ang paggamit ng kuryente sa bahay."
            participants={124}
            daysLeft={22}
            progress={30}
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
                  name="Manny Pacquiao"
                  points={2845}
                  avatar="https://randomuser.me/api/portraits/men/43.jpg"
                />
                <LeaderboardItem 
                  position={2}
                  name="Lea Salonga"
                  points={2756}
                  avatar="https://randomuser.me/api/portraits/women/32.jpg"
                />
                <LeaderboardItem 
                  position={3}
                  name="Isko Moreno"
                  points={2630}
                  avatar="https://randomuser.me/api/portraits/men/68.jpg"
                />
                <LeaderboardItem 
                  position={4}
                  name="Angel Locsin"
                  points={2517}
                  avatar="https://randomuser.me/api/portraits/women/75.jpg"
                />
                <LeaderboardItem 
                  position={5}
                  name="Chrono X User"
                  points={2498}
                  avatar="https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png"
                  isCurrentUser={true}
                />
                <LeaderboardItem 
                  position={6}
                  name="Jasmine Curtis"
                  points={2340}
                  avatar="https://randomuser.me/api/portraits/women/4.jpg"
                />
                <LeaderboardItem 
                  position={7}
                  name="Piolo Pascual"
                  points={2285}
                  avatar="https://randomuser.me/api/portraits/men/3.jpg"
                />
                <LeaderboardItem 
                  position={8}
                  name="Liza Soberano"
                  points={2242}
                  avatar="https://randomuser.me/api/portraits/women/23.jpg"
                />
                <LeaderboardItem 
                  position={9}
                  name="Coco Martin"
                  points={2190}
                  avatar="https://randomuser.me/api/portraits/men/53.jpg"
                />
                <LeaderboardItem 
                  position={10}
                  name="Kathryn Bernardo"
                  points={2088}
                  avatar="https://randomuser.me/api/portraits/women/18.jpg"
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
