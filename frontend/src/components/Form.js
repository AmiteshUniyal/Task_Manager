import React, { useState } from "react";

export default function Form({ newTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    newTask({title});
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 rounded-xl p-0 md:p-6 w-auto md:w-96 mx-auto m-4 p-2">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Add a Task</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter task..."
          required
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all">
          Add Tasks
        </button>
      </div>
    </form>

  );
}
