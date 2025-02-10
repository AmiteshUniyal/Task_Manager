import Item from "./Item";

export default function List({ tasks, removeTask, toggleComplete }) {
  return (
    <div className="">
      {tasks.map((task) => (
        <Item
          key={task._id}
          id={task._id}
          task={task}
          removeTask={removeTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}
