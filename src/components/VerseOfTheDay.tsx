
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen } from 'lucide-react';

// List of Bible verses
const bibleVerses = [
  {
    verse: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me."
  },
  {
    verse: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
  },
  {
    verse: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."
  },
  {
    verse: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
  },
  {
    verse: "Isaiah 40:31",
    text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
  },
  {
    verse: "Psalm 23:1",
    text: "The LORD is my shepherd, I lack nothing."
  },
  {
    verse: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
  },
  {
    verse: "Romans 12:2",
    text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."
  },
  {
    verse: "Matthew 6:33",
    text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well."
  },
  {
    verse: "1 Corinthians 13:4-5",
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking."
  },
  {
    verse: "Psalm 91:11",
    text: "For he will command his angels concerning you to guard you in all your ways."
  },
  {
    verse: "2 Corinthians 5:17",
    text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"
  }
];

export function VerseOfTheDay() {
  const [verseOfDay, setVerseOfDay] = useState<{ verse: string; text: string } | null>(null);
  
  // Function to get a random verse
  const getRandomVerse = () => {
    // Generate a new random verse
    const randomIndex = Math.floor(Math.random() * bibleVerses.length);
    const todaysVerse = bibleVerses[randomIndex];
    
    // Get today's date
    const today = new Date().toDateString();
    
    // Store in localStorage
    localStorage.setItem('verseOfTheDay', JSON.stringify({
      date: today,
      verse: todaysVerse.verse,
      text: todaysVerse.text
    }));
    
    setVerseOfDay(todaysVerse);
    
    // Log for debugging
    console.log('New random verse selected:', todaysVerse.verse);
  };
  
  useEffect(() => {
    const today = new Date().toDateString();
    
    // Check if we already generated a verse today
    const storedVerseData = localStorage.getItem('verseOfTheDay');
    
    if (storedVerseData) {
      try {
        const { date, verse, text } = JSON.parse(storedVerseData);
        
        // If the stored date is today, use the stored verse
        if (date === today) {
          console.log('Using existing verse for today:', verse);
          setVerseOfDay({ verse, text });
        } else {
          // Date is different, get a new verse
          console.log('Date changed, getting new verse');
          getRandomVerse();
        }
      } catch (error) {
        console.error('Error parsing stored verse data:', error);
        getRandomVerse();
      }
    } else {
      // No stored verse, get a new one
      console.log('No stored verse found, getting new verse');
      getRandomVerse();
    }
  }, []);
  
  if (!verseOfDay) return null;
  
  return (
    <Card className="mb-6 border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-700">
              Verse of the Day
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-lg text-blue-800 dark:text-blue-300">{verseOfDay.verse}</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              "{verseOfDay.text}"
            </p>
            <div className="flex items-center mt-2">
              <BookOpen className="h-3 w-3 mr-1 text-blue-500 dark:text-blue-400" />
              <span className="text-xs text-blue-500 dark:text-blue-400">Holy Bible</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
