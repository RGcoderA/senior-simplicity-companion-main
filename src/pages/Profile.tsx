
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, Lock, BellRing } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { toast } = useToast();
  const { user, updateUserProfile, changePassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.displayName || '',
      email: user?.email || '',
      phone: user?.phoneNumber || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleProfileUpdate = async (data: z.infer<typeof profileSchema>) => {
    setIsSubmitting(true);
    try {
      await updateUserProfile({
        displayName: data.fullName,
        email: data.email,
        phoneNumber: data.phone
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (data: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true);
    try {
      await changePassword(data.currentPassword, data.newPassword);
      
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });
      
      passwordForm.reset();
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description: "There was an error changing your password.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center pt-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.photoURL || ''} />
                <AvatarFallback className="bg-companion-blue text-white text-elder-lg">
                  {user?.displayName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-elder-lg font-bold text-companion-dark mb-1">
                {user?.displayName || 'User'}
              </h2>
              <p className="text-elder-base text-gray-500 mb-4">{user?.email}</p>
              
              <Button variant="outline" className="w-full">
                Change Photo
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid grid-cols-3 h-auto p-1 elder-card">
              <TabsTrigger 
                value="account" 
                className="text-elder-base py-3 data-[state=active]:bg-companion-lightBlue data-[state=active]:text-companion-blue"
              >
                <User className="mr-2 h-5 w-5" />
                Account
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="text-elder-base py-3 data-[state=active]:bg-companion-lightBlue data-[state=active]:text-companion-blue"
              >
                <Lock className="mr-2 h-5 w-5" />
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="text-elder-base py-3 data-[state=active]:bg-companion-lightBlue data-[state=active]:text-companion-blue"
              >
                <BellRing className="mr-2 h-5 w-5" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="text-elder-lg font-bold text-companion-dark">
                    Account Information
                  </CardTitle>
                  <CardDescription className="text-elder-base">
                    Update your account details here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-elder-base">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" className="elder-input" {...field} />
                            </FormControl>
                            <FormMessage className="text-elder-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-elder-base">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Your email" 
                                className="elder-input" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-elder-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-elder-base">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your phone number" 
                                className="elder-input" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-elder-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full elder-button bg-companion-blue text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Updating..." : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-elder-lg font-bold text-companion-dark">
                    Change Password
                  </CardTitle>
                  <CardDescription className="text-elder-base">
                    Update your password for better security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-elder-base">Current Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="elder-input" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-elder-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-elder-base">New Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="elder-input" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-elder-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-elder-base">Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                className="elder-input" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-elder-sm" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full elder-button bg-companion-blue text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Changing Password..." : "Change Password"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-elder-lg font-bold text-companion-dark">
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="text-elder-base">
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="text-elder-base font-medium">Medication Reminders</h3>
                        <p className="text-elder-sm text-gray-500">Receive reminders for medication</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="medication"
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-companion-blue"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-t">
                      <div>
                        <h3 className="text-elder-base font-medium">Activity Reminders</h3>
                        <p className="text-elder-sm text-gray-500">Receive reminders for scheduled activities</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="activities"
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-companion-blue"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-t">
                      <div>
                        <h3 className="text-elder-base font-medium">Health Updates</h3>
                        <p className="text-elder-sm text-gray-500">Receive updates about health metrics</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="health"
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-companion-blue"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-t">
                      <div>
                        <h3 className="text-elder-base font-medium">News and Articles</h3>
                        <p className="text-elder-sm text-gray-500">Receive notifications about new health articles</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="news"
                          type="checkbox"
                          defaultChecked={false}
                          className="w-4 h-4 text-companion-blue"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 elder-button bg-companion-blue text-white"
                  >
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
