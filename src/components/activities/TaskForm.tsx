
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
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
import { cn } from '@/lib/utils';
import { useTaskStore } from '@/store/taskStore';

const taskSchema = z.object({
  title: z.string().min(2, { message: 'Task title must be at least 2 characters.' }),
  dueDate: z.date().optional(),
  reminder: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

type TaskFormProps = {
  onTaskAdded: () => void;
};

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
  const { toast } = useToast();
  const addTask = useTaskStore((state) => state.addTask);
  
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      reminder: false,
      priority: 'medium',
    },
  });

  const onSubmit = (values: z.infer<typeof taskSchema>) => {
    addTask({
      id: Date.now().toString(),
      title: values.title,
      completed: false,
      dueDate: values.dueDate,
      reminder: values.reminder,
      priority: values.priority,
      createdAt: new Date(),
    });
    
    toast({
      title: "Task Added",
      description: `${values.title} has been added to your tasks.`,
    });
    
    onTaskAdded();
  };

  return (
    <div className="p-4">
      <h3 className="text-elder-lg font-bold text-companion-dark mb-6">Add New Task</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-elder-base">Task Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task title" className="elder-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-elder-base">Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-elder-base">Priority</FormLabel>
                <FormControl>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-companion-blue"
                    {...field}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-companion-blue text-white">
            Add Task
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
