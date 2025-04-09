
import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  important: boolean;
}

const DailyTasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Morning Walk", time: "8:00 AM", completed: false, important: false },
    { id: 2, title: "Take Blood Pressure Medication", time: "9:00 AM", completed: false, important: true },
    { id: 3, title: "Online Exercise Class", time: "10:30 AM", completed: false, important: false },
    { id: 4, title: "Lunch", time: "12:30 PM", completed: false, important: false },
    { id: 5, title: "Video Call with Family", time: "3:00 PM", completed: false, important: true },
    { id: 6, title: "Evening Medication", time: "7:00 PM", completed: false, important: true },
  ]);

  const completeTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    
    const completedTask = tasks.find(task => task.id === taskId);
    if (completedTask) {
      toast({
        title: "Task Completed!",
        description: `You've completed: ${completedTask.title}`,
      });
    }
  };

  const setReminder = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "Reminder Set",
        description: `We'll remind you about "${task.title}" at ${task.time}`,
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-companion-lightBlue rounded-t-xl">
        <CardTitle className="text-elder-lg font-bold flex items-center gap-2 text-companion-dark">
          <Clock className="text-companion-blue" size={28} />
          Daily Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-4 rounded-lg flex items-center justify-between border ${
                task.completed 
                  ? 'bg-gray-100 border-gray-200' 
                  : task.important 
                    ? 'bg-companion-lightBlue border-companion-blue/30' 
                    : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {task.important && !task.completed && (
                  <AlertCircle className="text-companion-blue flex-shrink-0" size={24} />
                )}
                {task.completed && (
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                )}
                <div>
                  <h3 className={`text-elder-base font-medium ${
                    task.completed ? 'text-gray-500 line-through' : 'text-companion-dark'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-elder-sm text-gray-600 flex items-center">
                    <Clock size={16} className="mr-1" /> {task.time}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {!task.completed && (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-full border-gray-300"
                      onClick={() => setReminder(task.id)}
                      aria-label={`Set reminder for ${task.title}`}
                    >
                      <Bell size={20} className="text-companion-orange" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-companion-blue text-white hover:bg-companion-blue/90 border-none"
                      onClick={() => completeTask(task.id)}
                    >
                      Complete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-4">
        <Button 
          variant="outline" 
          className="border-companion-orange text-companion-orange hover:bg-companion-orange/10"
        >
          Add New Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyTasks;
