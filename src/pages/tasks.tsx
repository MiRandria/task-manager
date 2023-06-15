import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'; // Import du hook useLocalStorage
import useTaskManager from '@/store/useTaskManager';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager = () => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const {
    tasks,
    searchTasks,
    addTask,
    updateTask,
    deleteTask,
    setSearchTask,
  } = useTaskManager();

  const searchValue = useRef<string>('');

  // Utilisation du hook useLocalStorage pour stocker les tâches dans le Local Storage
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);

  // Utilisation de useEffect pour mettre à jour les tâches stockées lorsqu'elles changent
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  useEffect(() => {
    // Récupérer les tâches stockées depuis le Local Storage lors du chargement de la page
    setSearchTask(storedTasks);
  }, [setSearchTask, storedTasks]);

  const handleAddTask = () => {
    if (createTaskRef.current) {
      const title = createTaskRef.current.value;
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
      };
      addTask(newTask);
      createTaskRef.current.value = '';
    }
  };

  const handleUpdateTask = (taskId: number, updatedTask: Partial<Task>) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    searchValue.current = searchTerm;
    setSearchTask(tasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.current)
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, { title: e.target.value })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;