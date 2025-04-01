import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Wallet, 
  CreditCard, 
  ShoppingBag, 
  Phone, 
  Tag,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const rewardOptions = {
  eWallet: [
    { name: "GCash", points: 100, icon: Wallet },
    { name: "PayMaya", points: 100, icon: Wallet },
    { name: "PayPal", points: 150, icon: CreditCard }
  ],
  vouchers: [
    { name: "Shopee", points: 80, icon: ShoppingBag },
    { name: "Lazada", points: 80, icon: ShoppingBag },
    { name: "Move It", points: 70, icon: Tag }
  ],
  load: [
    { name: "Globe", points: 50, icon: Phone },
    { name: "Smart", points: 50, icon: Phone },
    { name: "TM", points: 40, icon: Phone },
    { name: "TNT", points: 40, icon: Phone },
    { name: "DITO", points: 45, icon: Phone }
  ]
};

const denominations = {
  eWallet: ["₱50", "₱100", "₱200", "₱500"],
  vouchers: ["₱50", "₱100", "₱200", "₱300"],
  load: ["Regular ₱10", "Regular ₱20", "Regular ₱50", "Regular ₱100"]
};

export function Rewards() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('eWallet');
  const [selectedReward, setSelectedReward] = useState('');
  const [selectedDenomination, setSelectedDenomination] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleRedeemClick = () => {
    if (!selectedReward || !selectedDenomination) {
      toast.error("Please select both a reward and denomination");
      return;
    }
    
    setIsDialogOpen(true);
  };
  
  const handleConfirmRedeem = () => {
    setIsDialogOpen(false);
    
    const selectedRewardObj = rewardOptions[selectedCategory].find(r => r.name === selectedReward);
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-semibold">Reward Redeemed!</span>
        <span className="text-sm">{selectedReward} {selectedDenomination} has been redeemed for {selectedRewardObj?.points} eco-points</span>
      </div>,
      {
        duration: 5000,
        className: "animate-scale-in p-4 bg-background/90 backdrop-blur-md border border-border/50 shadow-lg",
      }
    );
    
    setSelectedReward('');
    setSelectedDenomination('');
  };

  return (
    <section className="space-y-6 pb-16 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/profile')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          Available: 999 Eco-Points
        </Badge>
      </div>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold">Redeem Your Rewards</h1>
        <p className="text-muted-foreground mt-2">
          Convert your eco-points into valuable rewards
        </p>
      </div>
      
      <Tabs defaultValue="eWallet" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-3 h-auto p-1 bg-muted rounded-lg">
          <TabsTrigger value="eWallet" className="py-2">
            <Wallet className="mr-2 h-4 w-4" />
            e-Wallet
          </TabsTrigger>
          <TabsTrigger value="vouchers" className="py-2">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Vouchers
          </TabsTrigger>
          <TabsTrigger value="load" className="py-2">
            <Phone className="mr-2 h-4 w-4" />
            Load
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="eWallet" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select e-Wallet</CardTitle>
              <CardDescription>Choose your preferred e-wallet platform</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                onValueChange={setSelectedReward} 
                value={selectedReward}
                className="space-y-3"
              >
                {rewardOptions.eWallet.map((wallet) => (
                  <div 
                    key={wallet.name} 
                    className={cn(
                      "flex items-center space-x-3 rounded-md border p-4 transition-all",
                      selectedReward === wallet.name ? "border-primary/50 bg-primary/5" : "border-border"
                    )}
                  >
                    <RadioGroupItem value={wallet.name} id={wallet.name} />
                    <Label htmlFor={wallet.name} className="flex-1 cursor-pointer flex items-center justify-between">
                      <div className="flex items-center">
                        <wallet.icon className="h-5 w-5 mr-2 text-primary" />
                        {wallet.name}
                      </div>
                      <Badge variant="outline">{wallet.points} points</Badge>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <Separator className="my-2" />
            
            <CardHeader>
              <CardTitle>Select Amount</CardTitle>
              <CardDescription>Choose denomination to redeem</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDenomination} onValueChange={setSelectedDenomination}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  {denominations.eWallet.map((amount) => (
                    <SelectItem key={amount} value={amount}>
                      {amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleRedeemClick} 
                className="w-full"
                disabled={!selectedReward || !selectedDenomination}
              >
                Redeem Reward
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="vouchers" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Voucher</CardTitle>
              <CardDescription>Choose your preferred shopping platform</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                onValueChange={setSelectedReward}
                value={selectedReward}
                className="space-y-3"
              >
                {rewardOptions.vouchers.map((voucher) => (
                  <div 
                    key={voucher.name} 
                    className={cn(
                      "flex items-center space-x-3 rounded-md border p-4 transition-all",
                      selectedReward === voucher.name ? "border-primary/50 bg-primary/5" : "border-border"
                    )}
                  >
                    <RadioGroupItem value={voucher.name} id={voucher.name} />
                    <Label htmlFor={voucher.name} className="flex-1 cursor-pointer flex items-center justify-between">
                      <div className="flex items-center">
                        <voucher.icon className="h-5 w-5 mr-2 text-primary" />
                        {voucher.name}
                      </div>
                      <Badge variant="outline">{voucher.points} points</Badge>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <Separator className="my-2" />
            
            <CardHeader>
              <CardTitle>Select Amount</CardTitle>
              <CardDescription>Choose voucher denomination</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDenomination} onValueChange={setSelectedDenomination}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  {denominations.vouchers.map((amount) => (
                    <SelectItem key={amount} value={amount}>
                      {amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleRedeemClick} 
                className="w-full"
                disabled={!selectedReward || !selectedDenomination}
              >
                Redeem Reward
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="load" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Network</CardTitle>
              <CardDescription>Choose your preferred mobile network</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                onValueChange={setSelectedReward}
                value={selectedReward}
                className="space-y-3"
              >
                {rewardOptions.load.map((network) => (
                  <div 
                    key={network.name} 
                    className={cn(
                      "flex items-center space-x-3 rounded-md border p-4 transition-all",
                      selectedReward === network.name ? "border-primary/50 bg-primary/5" : "border-border"
                    )}
                  >
                    <RadioGroupItem value={network.name} id={network.name} />
                    <Label htmlFor={network.name} className="flex-1 cursor-pointer flex items-center justify-between">
                      <div className="flex items-center">
                        <network.icon className="h-5 w-5 mr-2 text-primary" />
                        {network.name}
                      </div>
                      <Badge variant="outline">{network.points} points</Badge>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <Separator className="my-2" />
            
            <CardHeader>
              <CardTitle>Select Amount</CardTitle>
              <CardDescription>Choose load denomination</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedDenomination} onValueChange={setSelectedDenomination}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  {denominations.load.map((amount) => (
                    <SelectItem key={amount} value={amount}>
                      {amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleRedeemClick} 
                className="w-full"
                disabled={!selectedReward || !selectedDenomination}
              >
                Redeem Reward
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to redeem {selectedReward} {selectedDenomination}?
              
              {selectedReward && (
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="font-medium">Redemption Details:</p>
                  <p className="text-sm">
                    Reward: {selectedReward} {selectedDenomination}<br />
                    Points Required: {rewardOptions[selectedCategory].find(r => r.name === selectedReward)?.points}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRedeem}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
