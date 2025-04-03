
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
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
    { name: "GCash", icon: Wallet },
    { name: "PayMaya", icon: Wallet },
    { name: "PayPal", icon: CreditCard }
  ],
  vouchers: [
    { name: "Shopee", points: 80, icon: ShoppingBag, discount: "10% cashback on purchases" },
    { name: "Lazada", points: 80, icon: ShoppingBag, discount: "₱100 off on min. ₱500 purchase" },
    { name: "Move It", points: 70, icon: Tag, discount: "20% discount on your next ride" }
  ],
  load: [
    { name: "Globe", icon: Phone, image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Globe_Telecom_logo.svg/200px-Globe_Telecom_logo.svg.png" },
    { name: "Smart", icon: Phone, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/SMART_Communications_logo.svg/200px-SMART_Communications_logo.svg.png" },
    { name: "TM", icon: Phone, image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Touch_Mobile_logo.svg/200px-Touch_Mobile_logo.svg.png" },
    { name: "TNT", icon: Phone, image: "https://upload.wikimedia.org/wikipedia/en/5/55/Talk_%27N_Text_logo.png" },
    { name: "DITO", icon: Phone, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/DITO_Telecommunity_logo.svg/200px-DITO_Telecommunity_logo.svg.png" }
  ]
};

const denominations = {
  eWallet: [
    { amount: "₱50", points: 500 },
    { amount: "₱100", points: 1000 },
    { amount: "₱200", points: 2000 },
    { amount: "₱500", points: 5000 }
  ],
  load: [
    { amount: "Regular ₱10", points: 1000 },
    { amount: "Regular ₱20", points: 2000 },
    { amount: "Regular ₱50", points: 5000 },
    { amount: "Regular ₱100", points: 10000 }
  ]
};

export function Rewards() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('eWallet');
  const [selectedReward, setSelectedReward] = useState('');
  const [selectedDenomination, setSelectedDenomination] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleRedeemClick = () => {
    if (selectedCategory === 'eWallet' || selectedCategory === 'load') {
      if (!selectedReward || !selectedDenomination || !phoneNumber || phoneNumber.trim() === '') {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (selectedCategory === 'vouchers') {
      if (!selectedReward) {
        toast.error("Please select a voucher");
        return;
      }
    }
    
    setIsDialogOpen(true);
  };
  
  const handleConfirmRedeem = () => {
    setIsDialogOpen(false);
    
    let denominationPoints = 0;
    let rewardName = selectedReward;
    let amountText = selectedCategory !== 'vouchers' ? selectedDenomination : '';
    
    if (selectedCategory === 'eWallet' || selectedCategory === 'load') {
      denominationPoints = denominations[selectedCategory].find(d => d.amount === selectedDenomination)?.points || 0;
    } else {
      const selectedVoucher = rewardOptions.vouchers.find(v => v.name === selectedReward);
      denominationPoints = selectedVoucher?.points || 0;
      amountText = selectedVoucher?.discount || '';
    }
    
    toast.success(
      <div className="flex flex-col">
        <span className="font-semibold">Reward Redeemed!</span>
        <span className="text-sm">
          {rewardName} {amountText} 
          {(selectedCategory === 'eWallet' || selectedCategory === 'load') && phoneNumber && 
            ` for +63${phoneNumber}`} 
          has been redeemed for {denominationPoints} eco-points
        </span>
      </div>,
      {
        duration: 5000,
        className: "animate-scale-in p-4 bg-background/90 backdrop-blur-md border border-border/50 shadow-lg",
      }
    );
    
    setSelectedReward('');
    setSelectedDenomination('');
    setPhoneNumber('');
  };

  const handlePhoneNumberChange = (e) => {
    // Only allow digits and limit to 10 digits (excluding the country code)
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
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
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <CardHeader>
              <CardTitle>Mobile Number</CardTitle>
              <CardDescription>Enter your mobile number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-md px-3 py-2 bg-muted/50">
                  <span className="text-sm font-medium">+63</span>
                </div>
                <Input
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="9XX XXX XXXX"
                  className="flex-1"
                  type="tel"
                />
              </div>
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
                  {denominations.eWallet.map((item) => (
                    <SelectItem key={item.amount} value={item.amount}>
                      <span className="flex items-center justify-between w-full">
                        {item.amount} <Badge variant="outline" className="ml-2">{item.points} points</Badge>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleRedeemClick} 
                className="w-full"
                disabled={!selectedReward || !selectedDenomination || !phoneNumber}
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
                    <Label htmlFor={voucher.name} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <voucher.icon className="h-5 w-5 mr-2 text-primary" />
                          {voucher.name}
                        </div>
                        <Badge variant="outline">{voucher.points} points</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{voucher.discount}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleRedeemClick} 
                className="w-full"
                disabled={!selectedReward}
              >
                Redeem Voucher
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
                        <img 
                          src={network.image} 
                          alt={network.name} 
                          className="h-6 w-6 mr-2 object-contain" 
                        />
                        {network.name}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            
            <CardHeader>
              <CardTitle>Mobile Number</CardTitle>
              <CardDescription>Enter your mobile number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-md px-3 py-2 bg-muted/50">
                  <span className="text-sm font-medium">+63</span>
                </div>
                <Input
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="9XX XXX XXXX"
                  className="flex-1"
                  type="tel"
                />
              </div>
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
                  {denominations.load.map((item) => (
                    <SelectItem key={item.amount} value={item.amount}>
                      <span className="flex items-center justify-between w-full">
                        {item.amount} <Badge variant="outline" className="ml-2">{item.points} points</Badge>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleRedeemClick} 
                className="w-full"
                disabled={!selectedReward || !selectedDenomination || !phoneNumber}
              >
                Redeem Load
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
              {selectedCategory === 'vouchers' ? (
                <>
                  Are you sure you want to redeem {selectedReward} voucher?
                  
                  {selectedReward && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="font-medium">Redemption Details:</p>
                      <p className="text-sm">
                        Reward: {selectedReward}<br />
                        Points Required: {rewardOptions.vouchers.find(v => v.name === selectedReward)?.points || 0}<br />
                        Benefit: {rewardOptions.vouchers.find(v => v.name === selectedReward)?.discount}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  Are you sure you want to redeem {selectedReward} {selectedDenomination} for +63{phoneNumber}?
                  
                  {selectedReward && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="font-medium">Redemption Details:</p>
                      <p className="text-sm">
                        Reward: {selectedReward} {selectedDenomination}<br />
                        Mobile Number: +63{phoneNumber}<br />
                        Points Required: {denominations[selectedCategory].find(d => d.amount === selectedDenomination)?.points || 0}
                      </p>
                    </div>
                  )}
                </>
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
