
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paintbrush, Bell, Languages, DollarSign, Trash2, MessageSquare, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
  });

  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Application cache has been successfully cleared.",
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-left">
        <h1 className="text-3xl font-headline font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your app and notification settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Paintbrush className="h-5 w-5 text-primary" />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Customize the look and feel of the app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Choose how you want to be notified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications(p => ({...p, push: checked}))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(p => ({...p, email: checked}))}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            <span>Language & Currency</span>
          </CardTitle>
          <CardDescription>Set your preferred language and currency.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="ml">Malayalam</SelectItem>
                <SelectItem value="pa">Punjabi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="as">Assamese</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="flex items-center justify-between">
            <Label htmlFor="currency" className='flex items-center gap-2'>
              <DollarSign className='h-4 w-4'/>
              <span>Currency</span>
            </Label>
            <Select defaultValue="inr">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inr">INR (₹)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-primary" />
            <span>App Data</span>
          </CardTitle>
          <CardDescription>Manage application data and cache.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="outline" className="w-full justify-between" onClick={handleClearCache}>
                <span>Clear Cache</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Support</span>
          </CardTitle>
          <CardDescription>Get help or provide feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-between">
            <span>Send Feedback</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
