
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTaskStore } from '@/store/taskStore';
import { CheckCircle, Circle } from 'lucide-react';

const TaskProgress = () => {
  const tasks = useTaskStore((state) => state.tasks);
  
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;

  const thisWeekTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    const taskDate = new Date(task.dueDate);
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  const weeklyCompletionRate = thisWeekTasks.length > 0
    ? Math.round((thisWeekTasks.filter(task => task.completed).length / thisWeekTasks.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-elder-lg font-bold text-companion-dark">
            Activity Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-elder-base font-medium">Overall Completion</span>
              <span className="text-elder-base font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-elder-base font-medium">This Week's Tasks</span>
              <span className="text-elder-base font-medium">{weeklyCompletionRate}%</span>
            </div>
            <Progress value={weeklyCompletionRate} className="h-3" />
          </div>
          
          <div className="bg-companion-lightBlue p-4 rounded-lg">
            <h3 className="text-elder-base font-medium mb-4">Recent Achievements</h3>
            {completedTasks.length > 0 ? (
              <ul className="space-y-2">
                {completedTasks.slice(0, 3).map((task) => (
                  <li key={task.id} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{task.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No completed tasks yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-elder-lg font-bold text-companion-dark">
            Task History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-3 rounded-lg border ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </p>
                        {task.dueDate && (
                          <p className="text-sm text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      {task.priority === 'high' && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">No tasks found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskProgress;
