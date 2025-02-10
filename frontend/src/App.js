import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";
import MyPieChart from "./components/Piecharts";
import axios from "axios";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks`);
        setTasks(response.data);
        setCompletedCount(response.data.filter((task) => task.complete).length);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);


  const newTask = async (task) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tasks`, { ...task, complete: false });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };


  const removeTask = async (taskId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      setCompletedCount(updatedTasks.filter((task) => task.complete).length);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  
  const toggleComplete = async (taskId) => {
    try {
      const taskToToggle = tasks.find((task) => task._id === taskId);
      if (!taskToToggle) return;

      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tasks/${taskId}`, { complete: !taskToToggle.complete });
      const updatedTasks = tasks.map((task) => 
        task._id === taskId ? { ...task, complete: response.data.complete } : task
      );
      setTasks(updatedTasks);
      setCompletedCount(updatedTasks.filter((task) => task.complete).length);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 flex flex-col">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white text-center text-3xl font-bold py-6 shadow-lg">
        <h1>Task Manager</h1>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-8 px-6 md:px-10 py-10 flex-grow">
        <div className="flex-1 space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">
            <Form newTask={newTask} />
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-500 h-auto min-h-[200px] max-h-[600px] overflow-y-auto">
            <List tasks={tasks} removeTask={removeTask} toggleComplete={toggleComplete} />
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border-l-4 border-green-500 h-auto min-h-[300px] max-h-[500px]">
            <MyPieChart complete={completedCount} remaining={tasks.length - completedCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
