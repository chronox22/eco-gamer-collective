
import React, { useEffect } from 'react';
import { toast } from "sonner";

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
  useEffect(() => {
    // Only show reminder on initial load
    const hasShownReminder = sessionStorage.getItem('hasShownReminder');
    
    if (!hasShownReminder) {
      // Get a random reminder
      const randomIndex = Math.floor(Math.random() * reminders.length);
      const reminder = reminders[randomIndex];
      
      // Show the dynamic island-style notification
      toast(
        <div className="flex flex-col">
          <span className="font-semibold text-base">Eco Reminder</span>
          <span className="text-primary font-medium">{reminder}</span>
        </div>,
        {
          duration: 5000,
          className: "animate-scale-in p-4 bg-background/90 backdrop-blur-md border border-border/50 shadow-lg",
          position: "top-center",
          dismissible: true,
          closeButton: true,
          style: {
            width: "auto",
            maxWidth: "90%",
            borderRadius: "16px"
          },
          // Add animation for closing
          dismissClassNames: {
            entered: "animate-scale-in",
            exiting: "animate-scale-out",
            exited: "animate-scale-out"
          }
        }
      );
      
      // Mark that we've shown a reminder this session
      sessionStorage.setItem('hasShownReminder', 'true');
    }
  }, []);

  // This component doesn't render anything directly, it just triggers the toast
  return null;
}
