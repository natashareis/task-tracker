import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const BASE_URL = 'http://127.0.0.1:5000';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = async (task) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      // After adding a task, fetch the updated list of tasks
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // After successful deletion, fetch the updated list of tasks
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reminder: !tasks.find(task => task.id === id).reminder }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle reminder');
      }

      // After toggling reminder, fetch the updated list of tasks
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No tasks to show'
      )}
    </div>
  );
}

export default App;
