import useTaskManager from '@/store/useTaskManager';
import React, { ChangeEvent, useRef } from 'react';

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
  
  const searchValue = useRef<string>(''); // Variable pour stocker la valeur de recherche

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
    searchValue.current = searchTerm; // Mettre à jour la valeur de recherche
    setSearchTask(tasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.current) // Utiliser la valeur de recherche stockée
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
