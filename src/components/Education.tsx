import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, TreePine, Recycle, DropletIcon, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  imageSrc: string;
  readTime: string;
  className?: string;
}

function ArticleCard({
  title,
  excerpt,
  category,
  imageSrc,
  readTime,
  className,
}: ArticleCardProps) {
  return (
    <Card className={cn('glass-card overflow-hidden hover-card', className)}>
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </AspectRatio>
        <div className="absolute top-3 left-3">
          <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-medium">{category}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-medium line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Education() {
  return (
    <section className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight">Learn</h1>
        <p className="text-muted-foreground">Discover sustainability knowledge</p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-5 h-auto p-1 bg-muted rounded-lg">
          <TabsTrigger value="all" className="py-2 text-xs">All</TabsTrigger>
          <TabsTrigger value="climate" className="py-2 text-xs">Climate</TabsTrigger>
          <TabsTrigger value="water" className="py-2 text-xs">Water</TabsTrigger>
          <TabsTrigger value="waste" className="py-2 text-xs">Waste</TabsTrigger>
          <TabsTrigger value="energy" className="py-2 text-xs">Energy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6 space-y-4">
          <ArticleCard
            title="The Surprising Impact of Everyday Choices"
            excerpt="Small daily decisions can add up to significant environmental benefits over time."
            category="Climate"
            imageSrc="https://images.unsplash.com/photo-1536599424071-0b215a388ba7?auto=format&fit=crop&q=80&w=400"
            readTime="4 min read"
          />
          <ArticleCard
            title="Water Conservation at Home: Easy Steps"
            excerpt="Simple ways to reduce your water footprint without disrupting your daily routine."
            category="Water"
            imageSrc="https://images.unsplash.com/photo-1527066236128-2ff79f7b9705?auto=format&fit=crop&q=80&w=400"
            readTime="5 min read"
          />
          <ArticleCard
            title="Zero Waste Lifestyle: Getting Started"
            excerpt="Practical tips for beginners looking to reduce their household waste."
            category="Waste"
            imageSrc="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400"
            readTime="7 min read"
          />
          <ArticleCard
            title="Renewable Energy: The Future is Now"
            excerpt="How renewable energy is transforming our world and how you can be part of it."
            category="Energy"
            imageSrc="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=400"
            readTime="6 min read"
          />
        </TabsContent>
        
        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="climate" className="mt-6 space-y-4">
          <ArticleCard
            title="The Surprising Impact of Everyday Choices"
            excerpt="Small daily decisions can add up to significant environmental benefits over time."
            category="Climate"
            imageSrc="https://images.unsplash.com/photo-1536599424071-0b215a388ba7?auto=format&fit=crop&q=80&w=400"
            readTime="4 min read"
          />
          <ArticleCard
            title="Understanding Carbon Footprints"
            excerpt="A comprehensive guide to understanding and reducing your carbon footprint."
            category="Climate"
            imageSrc="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400"
            readTime="8 min read"
          />
        </TabsContent>
        
        {/* Additional tabs content would be similar */}
      </Tabs>
    </section>
  );
}
