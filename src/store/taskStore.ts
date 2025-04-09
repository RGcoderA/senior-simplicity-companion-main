
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  reminder: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, task] 
      })),
      toggleTaskCompletion: (taskId) => set((state) => ({ 
        tasks: state.tasks.map((task) => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ) 
      })),
      removeTask: (taskId) => set((state) => ({ 
        tasks: state.tasks.filter((task) => task.id !== taskId) 
      })),
      updateTask: (taskId, updatedTask) => set((state) => ({ 
        tasks: state.tasks.map((task) => 
          task.id === taskId ? { ...task, ...updatedTask } : task
        ) 
      })),
    }),
    {
      name: 'tasks-storage',
    }
  )
);
