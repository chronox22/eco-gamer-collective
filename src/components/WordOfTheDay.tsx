
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

// List of environmental words with their definitions
const environmentalWords = [
  {
    word: "Sustainability",
    definition: "Meeting the needs of the present without compromising future generations' ability to meet their own needs."
  },
  {
    word: "Biodiversity",
    definition: "The variety of plant and animal life in the world or in a particular habitat."
  },
  {
    word: "Conservation",
    definition: "Protection, preservation, and careful management of natural resources and environment."
  },
  {
    word: "Renewable",
    definition: "A natural resource or source of energy that is not depleted when used."
  },
  {
    word: "Ecosystem",
    definition: "A biological community of interacting organisms and their physical environment."
  },
  {
    word: "Compost",
    definition: "Decayed organic material used as a fertilizer for growing plants."
  },
  {
    word: "Recycling",
    definition: "Converting waste materials into new materials and objects."
  },
  {
    word: "Carbon Footprint",
    definition: "The amount of carbon dioxide released into the atmosphere as a result of one's activities."
  },
  {
    word: "Upcycling",
    definition: "Reusing discarded objects or material to create a product of higher quality or value."
  },
  {
    word: "Zero-waste",
    definition: "A philosophy that encourages the redesign of resource life cycles so that all products are reused."
  },
  {
    word: "Permaculture",
    definition: "The development of agricultural ecosystems intended to be sustainable and self-sufficient."
  },
  {
    word: "Greenwashing",
    definition: "Disinformation disseminated by an organization to present an environmentally responsible public image."
  }
];

export function WordOfTheDay() {
  const [wordOfDay, setWordOfDay] = useState<{ word: string; definition: string } | null>(null);
  
  // Function to get a random word
  const getRandomWord = () => {
    // Generate a new random word
    const randomIndex = Math.floor(Math.random() * environmentalWords.length);
    const todaysWord = environmentalWords[randomIndex];
    
    // Get today's date
    const today = new Date().toDateString();
    
    // Store in localStorage
    localStorage.setItem('wordOfTheDay', JSON.stringify({
      date: today,
      word: todaysWord.word,
      definition: todaysWord.definition
    }));
    
    setWordOfDay(todaysWord);
    
    // Log for debugging
    console.log('New random word selected:', todaysWord.word);
  };
  
  useEffect(() => {
    const today = new Date().toDateString();
    
    // Check if we already generated a word today
    const storedWordData = localStorage.getItem('wordOfTheDay');
    
    if (storedWordData) {
      try {
        const { date, word, definition } = JSON.parse(storedWordData);
        
        // If the stored date is today, use the stored word
        if (date === today) {
          console.log('Using existing word for today:', word);
          setWordOfDay({ word, definition });
        } else {
          // Date is different, get a new word
          console.log('Date changed, getting new word');
          getRandomWord();
        }
      } catch (error) {
        console.error('Error parsing stored word data:', error);
        getRandomWord();
      }
    } else {
      // No stored word, get a new one
      console.log('No stored word found, getting new word');
      getRandomWord();
    }
  }, []);
  
  if (!wordOfDay) return null;
  
  return (
    <Card className="mb-6 border-green-100 dark:border-green-900 bg-green-50/50 dark:bg-green-950/30">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-700">
              Word of the Day
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-lg text-green-800 dark:text-green-300">{wordOfDay.word}</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              {wordOfDay.definition}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
