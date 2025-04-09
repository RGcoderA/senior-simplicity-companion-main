
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Phone } from 'lucide-react';
import { useContactsSync, isContactsAuthenticated } from '@/services/contactsService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: syncContacts, isPending: isSyncingContacts } = useContactsSync();
  const [contactsAuthenticated, setContactsAuthenticated] = useState(false);

  React.useEffect(() => {
    // Check if contacts are already authenticated
    setContactsAuthenticated(isContactsAuthenticated());
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      // Login success is handled in useAuth hook which navigates to home
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectContacts = () => {
    syncContacts(undefined, {
      onSuccess: () => {
        setContactsAuthenticated(true);
        toast("Phone contacts connected successfully!");
      },
      onError: () => {
        toast("Failed to connect phone contacts. Please try again.", {
          style: { backgroundColor: '#f44336', color: 'white' }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-companion-lightBlue p-4 rounded-full">
              <Phone size={40} className="text-companion-blue" />
            </div>
          </div>
          <CardTitle className="text-elder-xl text-companion-dark">
            <span className="text-companion-blue">Health</span>
            <span className="text-companion-orange">Companion</span>
          </CardTitle>
          <CardDescription className="text-elder-base mt-2">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button 
                type="submit" 
                className="w-full elder-button bg-companion-blue text-white hover:bg-companion-blue/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            className="w-full elder-button border-companion-orange text-companion-orange hover:bg-companion-orange/10"
            onClick={handleConnectContacts}
            disabled={isSyncingContacts || contactsAuthenticated}
          >
            {isSyncingContacts ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : contactsAuthenticated ? (
              "Phone Contacts Connected"
            ) : (
              "Connect Phone Contacts"
            )}
          </Button>
          <div className="text-center text-elder-base">
            Don't have an account?{" "}
            <Link to="/register" className="text-companion-blue hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
