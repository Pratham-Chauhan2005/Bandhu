
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Shield, Edit, Phone, Mail, Home, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialUser = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  phone: '+1 123-456-7890',
  address: '123 Travel Lane, Wanderlust City, 12345',
  avatar: 'https://picsum.photos/seed/user-avatar/200/200',
};

const initialContacts = [
  { id: 1, name: 'Jane Doe', phone: '+1 987-654-3210', relation: 'Spouse' },
  { id: 2, name: 'John Smith', phone: '+1 555-555-5555', relation: 'Friend' },
];

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [contacts, setContacts] = useState(initialContacts);
  const [isEditing, setIsEditing] = useState(false);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-28 w-28 border-4 border-primary/50 shadow-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-3xl font-headline font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span>Personal Information</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={user.name} onChange={handleUserChange} readOnly={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={user.email} onChange={handleUserChange} readOnly={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={user.phone} onChange={handleUserChange} readOnly={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={user.address} onChange={handleUserChange} readOnly={!isEditing} />
            </div>
          </div>
          {isEditing && (
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Emergency Contacts</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={contact.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.relation} - {contact.phone}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {index < contacts.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
