
import React, { useState } from 'react';
import { Calendar as CalendarIcon, BarChart3, Users, List, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DailyTasks from '@/components/activities/DailyTasks';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import TaskForm from '@/components/activities/TaskForm';
import TaskProgress from '@/components/activities/TaskProgress';
import SocialActivities from '@/components/activities/SocialActivities';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const Activities = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Sample important dates
  const importantDates = [
    { date: new Date(2025, 3, 15), title: "Doctor Appointment" },
    { date: new Date(2025, 3, 20), title: "Family Visit" },
    { date: new Date(2025, 3, 25), title: "Medication Refill" },
  ];

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    // Check if selected date is an important date
    const importantDate = importantDates.find(
      (item) => selectedDate && item.date.toDateString() === selectedDate.toDateString()
    );
    
    if (importantDate) {
      toast({
        title: "Important Date",
        description: importantDate.title,
      });
    }
  };

  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">Activities</h1>
      
      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid grid-cols-4 h-auto p-1 elder-card">
          <TabsTrigger 
            value="daily" 
            className="text-elder-base py-3 data-[state=active]:bg-companion-lightBlue data-[state=active]:text-companion-blue"
          >
            <List className="mr-2 h-5 w-5" />
            Daily Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="calendar" 
            className="text-elder-base py-3 data-[state=active]:bg-companion-lightBlue data-[state=active]:text-companion-blue"
          >
            <CalendarIcon className="mr-2 h-5 w-5" />
            Calendar
          </TabsTrigger>
          <TabsTrigger 
            value="progress" 
            className="text-elder-base py-3 data-[state=active]:bg-companion-lightBlue data-[state=active]:text-companion-blue"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Progress
          </TabsTrigger>
          <TabsTrigger 
            value="social" 
            className="text-elder-base py-3 data-[state=active]:bg-companion-lightBlue data-[state=active]:text-companion-blue"
          >
            <Users className="mr-2 h-5 w-5" />
            Social
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-elder-lg font-bold text-companion-dark">Daily Tasks</h2>
            <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
              <DialogTrigger asChild>
                <Button className="bg-companion-blue text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <TaskForm onTaskAdded={() => setIsAddTaskOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          
          <DailyTasks />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-elder-lg font-bold text-companion-dark">
                Health Habits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-companion-lightBlue rounded-lg">
                  <h3 className="text-elder-base font-medium text-companion-dark mb-2">Hydration</h3>
                  <p className="text-elder-sm">Drink 8 glasses of water daily</p>
                </div>
                <div className="p-4 bg-companion-lightBlue rounded-lg">
                  <h3 className="text-elder-base font-medium text-companion-dark mb-2">Walking</h3>
                  <p className="text-elder-sm">Walk at least 30 minutes per day</p>
                </div>
                <div className="p-4 bg-companion-lightBlue rounded-lg">
                  <h3 className="text-elder-base font-medium text-companion-dark mb-2">Sleep</h3>
                  <p className="text-elder-sm">Maintain 7-8 hours of sleep nightly</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="text-elder-lg font-bold text-companion-dark">
                Activity Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="p-3 pointer-events-auto"
                  modifiers={{
                    important: importantDates.map(item => item.date)
                  }}
                  modifiersStyles={{
                    important: { fontWeight: 'bold', color: '#ea384c', border: '1px solid #ea384c' }
                  }}
                />
                <div className="mt-4 w-full">
                  <h3 className="text-elder-base font-medium mb-2">Important Dates</h3>
                  <div className="space-y-2">
                    {importantDates.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-companion-lightBlue rounded-md">
                        <Badge className="bg-companion-orange">{item.date.toLocaleDateString()}</Badge>
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <TaskProgress />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialActivities />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Activities;
