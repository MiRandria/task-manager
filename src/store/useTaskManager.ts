import { SetState, create } from 'zustand';

interface Task {
  id: number;
  title: string;
}

interface TaskManagerState {
  tasks: Task[];
  searchTasks: (searchTerm: string) => void;
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
  setSearchTask: (tasks: Task[]) => void;
}

const useTaskManager = create<TaskManagerState>((set: SetState<TaskManagerState>) => ({
  tasks: [],

  searchTasks: (searchTerm: string) => {
    set((state: TaskManagerState) => ({
      tasks: state.tasks.filter((task: Task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));
  },

  addTask: (newTask: Task) => {
    set((state: TaskManagerState) => ({
      tasks: [...state.tasks, newTask],
    }));
  },

  updateTask: (taskId: number, updatedTask: Partial<Task>) => {
    set((state: TaskManagerState) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    }));
  },

  deleteTask: (taskId: number) => {
    set((state: TaskManagerState) => ({
      tasks: state.tasks.filter((task: Task) => task.id !== taskId),
    }));
  },
  setSearchTask: (tasks: Task[]) => {
    set((state: TaskManagerState) => ({
      tasks: tasks,
    }));
  },
}));

export default useTaskManager;