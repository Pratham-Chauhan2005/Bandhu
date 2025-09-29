
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Lakshadweep', 'Delhi', 'Puducherry', 'Ladakh', 'Jammu and Kashmir'
];

const formSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
  aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar number must be 12 digits.'),
  state: z.string().min(1, 'Please select your state.'),
  city: z.string().min(2, 'City is required.'),
  bio: z.string().min(50, 'Bio must be at least 50 characters.').max(500, 'Bio cannot exceed 500 characters.'),
  profilePicture: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BecomeABandhuPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      aadhaar: '',
      state: '',
      city: '',
      bio: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    console.log(values);

    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Registration Submitted!',
        description: 'Your application to become a Bandhu has been received. We will review it and get back to you soon.',
      });
      form.reset();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Become a Local Bandhu</h1>
        <p className="text-muted-foreground">Join our community of local experts and share your city with the world.</p>
      </div>

      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-8 items-start">
        <Card className="bg-card/50 border-dashed">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary" />
                    <span>Why Join Us?</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/90">
                <div>
                    <h3 className="font-semibold">Guide & Earn</h3>
                    <p className="text-sm text-muted-foreground">Generate a side income while sharing your local expertise with travelers from around the globe.</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Get Discovered</h3>
                    <p className="text-sm text-muted-foreground">Be listed in our app so travelers can easily find and hire you for unique local experiences.</p>
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold">How It Works:</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                        <li>
                            <span className="font-medium text-foreground/90">Register with Aadhaar:</span> Your unique ID ensures authenticity and builds trust.
                        </li>
                        <li>
                            <span className="font-medium text-foreground/90">Set Your Location:</span> Choose the state and city where you want to offer your services.
                        </li>
                        <li>
                            <span className="font-medium text-foreground/90">Create Your Profile:</span> Add your contact details and a compelling bio to help travelers get to know you.
                        </li>
                        <li>
                            <span className="font-medium text-foreground/90">Get Approved:</span> Once approved, your profile goes live, connecting you with travelers.
                        </li>
                    </ol>
                </div>
            </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>Fill out the details below to start your journey as a Bandhu.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Rohan Sharma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 12345 67890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aadhaar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your 12-digit Aadhaar number" {...field} />
                      </FormControl>
                      <FormDescription>Your Aadhaar is used for verification and is kept secure.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {indianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Gwalior" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About You</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell travelers about yourself, your interests, and what makes you a great guide." className="min-h-[100px]" {...field} />
                      </FormControl>
                       <FormDescription>This is your chance to shine. Make it compelling!</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/png, image/jpeg" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Submit Application
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
