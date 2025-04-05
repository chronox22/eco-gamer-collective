import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { GiftIcon, ShoppingCart, Award, Coins, Coffee, Pizza, User, Home, Bike, Smartphone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

const rewardsCategories = [
  { name: 'Featured', icon: Award },
  { name: 'Food', icon: Pizza },
  { name: 'Transport', icon: Bike },
  { name: 'Tech', icon: Smartphone },
  { name: 'Home', icon: Home },
];

const rewardItems = [
  {
    id: 'gcash50',
    name: 'GCash ₱50',
    description: 'Get ₱50 GCash credits',
    points: 50000,
    image: 'https://i.imgur.com/eGJ5tQ0.png',
    category: 'Featured'
  },
  {
    id: 'coffee',
    name: 'Free Coffee',
    description: 'Free coffee at partner shops',
    points: 25000,
    image: 'https://i.imgur.com/aHHDbWJ.png',
    category: 'Food'
  },
  {
    id: 'movie',
    name: 'Movie Tickets',
    description: 'Two tickets to any movie',
    points: 75000,
    image: 'https://i.imgur.com/CCasoJY.png',
    category: 'Featured'
  },
  {
    id: 'fooddiscount',
    name: '20% Food Discount',
    description: 'At partner restaurants',
    points: 30000,
    image: 'https://i.imgur.com/GbA4cPy.png',
    category: 'Food'
  },
  {
    id: 'transport',
    name: 'Free Ride',
    description: 'One free ride on public transport',
    points: 15000,
    image: 'https://i.imgur.com/VWJLmap.png',
    category: 'Transport'
  },
  {
    id: 'phonediscount',
    name: '15% Tech Discount',
    description: 'On eco-friendly gadgets',
    points: 100000,
    image: 'https://i.imgur.com/oVGy5GK.png',
    category: 'Tech'
  },
];

export function Rewards() {
  const [activeCategory, setActiveCategory] = useState('Featured');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { user, profile } = useAuth();
  
  const userPoints = profile?.points || 9999999;
  
  const filteredRewards = rewardItems.filter(
    reward => activeCategory === 'Featured' ? reward.category === 'Featured' : reward.category === activeCategory
  );
  
  const handleSelectReward = (reward: any) => {
    setSelectedReward(reward);
    setIsDialogOpen(true);
  };
  
  const handleRedeemReward = async () => {
    if (!selectedReward) return;
    
    setIsRedeeming(true);
    
    try {
      // Check if user has enough points
      if (userPoints < selectedReward.points) {
        toast.error("Not enough points", {
          description: "You don't have enough points to redeem this reward."
        });
        setIsRedeeming(false);
        return;
      }
      
      // Update user points in the database
      const newPoints = userPoints - selectedReward.points;
      const { error } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', user?.id);
        
      if (error) {
        throw error;
      }
      
      // Close the dialog
      setIsDialogOpen(false);
      setIsConfirmationOpen(true);
      
      toast.success("Reward redeemed!", {
        description: `You've successfully redeemed ${selectedReward.name}.`
      });
    } catch (error: any) {
      console.error("Error redeeming reward:", error);
      toast.error("Failed to redeem reward", {
        description: error.message || "An unexpected error occurred."
      });
    } finally {
      setIsRedeeming(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Rewards</h1>
          <p className="text-muted-foreground">Redeem your eco-points</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="py-1.5 px-2.5 text-base">
            <Coins className="w-4 h-4 mr-1" />
            {userPoints.toLocaleString()}
          </Badge>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          {rewardsCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            
            return (
              <Button
                key={category.name}
                variant={isActive ? "default" : "outline"}
                className={`flex-shrink-0 transition-all ${isActive ? "" : "opacity-70"}`}
                onClick={() => setActiveCategory(category.name)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {filteredRewards.map((reward) => (
          <Card 
            key={reward.id}
            className="hover-card overflow-hidden cursor-pointer"
            onClick={() => handleSelectReward(reward)}
          >
            <div 
              className="h-32 bg-center bg-cover"
              style={{backgroundImage: `url(${reward.image})`}}
            />
            <CardContent className="p-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{reward.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {reward.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary">
                  <Coins className="w-4 h-4 mr-1" />
                  {reward.points.toLocaleString()} points
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedReward && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedReward.name}</DialogTitle>
              <DialogDescription>
                {selectedReward.description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div 
                className="h-48 bg-center bg-cover rounded-md"
                style={{backgroundImage: `url(${selectedReward.image})`}}
              />
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cost</span>
                  <div className="flex items-center font-medium">
                    <Coins className="w-4 h-4 mr-1 text-primary" />
                    {selectedReward.points.toLocaleString()} points
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Your Points</span>
                  <div className="flex items-center font-medium">
                    <Coins className="w-4 h-4 mr-1 text-primary" />
                    {userPoints.toLocaleString()} points
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
                className="sm:w-auto w-full"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRedeemReward}
                disabled={userPoints < selectedReward.points || isRedeeming}
                className="sm:w-auto w-full"
              >
                {isRedeeming ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2"></div>
                    Redeeming...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Redeem Reward
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {selectedReward && (
        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent className="sm:max-w-md text-center">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <GiftIcon className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
              <DialogTitle className="text-xl">Reward Redeemed!</DialogTitle>
              <DialogDescription className="mt-2 text-center">
                You've successfully redeemed {selectedReward.name}. Check your email for more details on how to claim your reward.
              </DialogDescription>
              
              <div className="mt-6 w-full">
                <Button 
                  onClick={() => setIsConfirmationOpen(false)}
                  className="w-full"
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
    </div>
  );
}
