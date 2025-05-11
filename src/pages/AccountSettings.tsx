
import React, { useState } from 'react';
import { ArrowLeft, Save, Settings, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import PageLayout from '@/components/dashboard/PageLayout';

const AccountSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { userName, partnerName, weddingHashtag, updateUserAndPartnerNames } = useDashboardData();
  
  const [newUserName, setNewUserName] = useState(userName || '');
  const [newPartnerName, setNewPartnerName] = useState(partnerName || '');
  const [newWeddingHashtag, setNewWeddingHashtag] = useState(weddingHashtag || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    if (!newUserName.trim()) {
      toast({
        title: "Error",
        description: "Your name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Update names
      await updateUserAndPartnerNames(newUserName.trim(), newPartnerName.trim());
      
      toast({
        title: "Success",
        description: "Your account settings have been updated",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update your account settings",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleGoBack = () => {
    navigate('/dashboard');
  };
  
  return (
    <PageLayout 
      title="Account Settings" 
      description="Manage your account preferences"
      icon={<Settings className="w-8 h-8" />}
    >
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="gap-2" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your name and your partner's name</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Your Name</Label>
                <Input 
                  id="userName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner's Name</Label>
                <Input 
                  id="partnerName"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  placeholder="Enter your partner's name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weddingHashtag" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" /> Wedding Hashtag
                </Label>
                <Input 
                  id="weddingHashtag"
                  value={newWeddingHashtag}
                  onChange={(e) => setNewWeddingHashtag(e.target.value)}
                  placeholder="Enter your wedding hashtag"
                />
                <p className="text-xs text-muted-foreground">
                  Your hashtag will be displayed on your dashboard and can be used for social media.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Information</CardTitle>
              <CardDescription>Your account email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">{user?.email || 'No email address available'}</p>
                <p className="text-xs text-muted-foreground mt-1">Email addresses cannot be changed</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Change Password
              </Button>
              
              <Button className="w-full" variant="outline">
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-center text-sm text-muted-foreground py-4">
                No connected accounts
              </p>
              <Button className="w-full" variant="outline">
                Connect Social Accounts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AccountSettings;
