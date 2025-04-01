
import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';

const reminders = [
  "Today is plastic waste collection day! Segregate your trash properly.",
  "Turn off lights in empty rooms to save energy and reduce your carbon footprint.",
  "Remember to carry a reusable bag for shopping today.",
  "Try to eat less meat today! Animal agriculture is a major contributor to greenhouse gases.",
  "Check your tap for leaks and fix them to save water.",
  "Walk or bike for short trips instead of driving.",
  "Unplug electronics when not in use to save standby power.",
  "Wash clothes in cold water to save energy.",
  "Air-dry your clothes instead of using a dryer.",
  "Use a reusable water bottle instead of buying plastic bottles.",
  "Consider planting a tree or supporting a tree-planting organization today.",
  "Try to reduce your shower time by 2 minutes to save water.",
  "Use natural light when possible instead of turning on lights.",
  "Support local farmers by buying local produce.",
  "Download and use an app to track your carbon footprint."
];

export function ReminderNotification() {
  const [open, setOpen] = useState(false);
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    // Only show reminder on initial load
    const hasShownReminder = sessionStorage.getItem('hasShownReminder');
    
    if (!hasShownReminder) {
      // Get a random reminder
      const randomIndex = Math.floor(Math.random() * reminders.length);
      setReminder(reminders[randomIndex]);
      setOpen(true);
      
      // Mark that we've shown a reminder this session
      sessionStorage.setItem('hasShownReminder', 'true');
    }
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Eco Reminder</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <p className="text-lg font-medium text-primary">{reminder}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction onClick={() => setOpen(false)} className="w-full sm:w-auto">
            Got it!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
