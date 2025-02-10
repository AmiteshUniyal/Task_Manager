import React from "react";
import { FaCheckCircle, FaTrash, FaUndo } from "react-icons/fa";

export default function Item({ id, task, removeTask, toggleComplete }) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg flex flex-row items-center justify-between bg-gray-100">
      
      <div className="flex-1 break-all w-96">
        <h1
          className={`font-semibold text-lg transition-all ${
            task.complete ? "text-gray-400 blur-sm line-through" : "text-gray-800"}`}
        >
          {task.title}
        </h1>
      </div>

      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => toggleComplete(id)}
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          {task.complete ? <FaUndo size={20} /> : <FaCheckCircle size={20} />}
        </button>

        <button
          onClick={() => removeTask(id)}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
}
