
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  syncContacts: z.boolean().default(false),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      syncContacts: false,
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register(data.email, data.password, data.name);
      
      if (data.syncContacts) {
        toast("Contact sync enabled. Your phone contacts will be synchronized");
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      toast("Registration failed. Please check your information and try again.", {
        style: { backgroundColor: '#f44336', color: 'white' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-companion-lightBlue p-4 rounded-full">
              <UserPlus size={40} className="text-companion-blue" />
            </div>
          </div>
          <CardTitle className="text-elder-xl text-companion-dark">
            <span className="text-companion-blue">Create</span> Account
          </CardTitle>
          <CardDescription className="text-elder-base mt-2">
            Join Health Companion today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-elder-base">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Smith" 
                        className="elder-input" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-elder-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-elder-base">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        className="elder-input" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-elder-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-elder-base">Password</FormLabel>
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
                control={form.control}
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
              <FormField
                control={form.control}
                name="syncContacts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-companion-lightBlue">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-elder-sm font-medium">
                        Synchronize Phone Contacts
                      </FormLabel>
                      <p className="text-elder-sm text-gray-600">
                        Allow access to your phone contacts for easier video calls
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-elder-sm">
                        I agree to the <Link to="/terms" className="text-companion-blue hover:underline">Terms and Conditions</Link>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full elder-button bg-companion-blue text-white hover:bg-companion-blue/90 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center text-elder-base">
          Already have an account?{" "}
          <Link to="/login" className="text-companion-blue hover:underline">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
