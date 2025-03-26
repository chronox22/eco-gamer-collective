
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ArticleViewProps {
  article: {
    title: string;
    category: string;
    content: string[];
    author?: string;
    date?: string;
    imageSrc: string;
  };
  onBack: () => void;
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 mr-auto"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="inline-block bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">{article.category}</span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight">{article.title}</h1>
        {(article.author || article.date) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {article.author && <span>{article.author}</span>}
            {article.author && article.date && <span>•</span>}
            {article.date && <span>{article.date}</span>}
          </div>
        )}
      </div>
      
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={article.imageSrc} 
          alt={article.title} 
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      </div>
      
      <Card className="glass-card">
        <CardContent className="p-6 space-y-6">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
