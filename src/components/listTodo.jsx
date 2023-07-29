import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  selectTodos,
  fetchTodos,
  deleteTodoAsync,
  editTodoAsync,
} from "../redux/todoSlice";
import { Trash, PencilLine } from "phosphor-react";

function ListTodo({ onEditTodo }) {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const todoStatus = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (todoStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  const handleToggle = (id) => {
    // dispatch(toggleTodo({ id }));
    const checkedTodo = {
      id,
      title: todos.find((todo) => todo.id === id).title,
      completed: !todos.find((todo) => todo.id === id).completed,
    };
    dispatch(editTodoAsync(checkedTodo));
  };

  const handleDelete = (id) => {
    // dispatch(deleteTodo(id));
    dispatch(deleteTodoAsync(id));
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      onEditTodo(todoToEdit);
    }
  };

  const filterByStatus = (status) => {
    if (status === "all") {
      return todos;
    } else if (status === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (status === "completed") {
      return todos.filter((todo) => todo.completed);
    }
  };

  return (
    <div className="px-">
      <div className="flex gap-2  items-center">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-xl px-2 py-1 ${
            filter === "all" ? "bg-green-600 text-white font-medium" : ""
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`rounded-xl px-2 py-1 ${
            filter === "active" ? "bg-green-600 text-white font-medium" : ""
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`rounded-xl px-2 py-1 ${
            filter === "completed" ? "bg-green-600 text-white font-medium" : ""
          }`}
        >
          Completed
        </button>
      </div>
      <ul className="m-2 space-y-3">
        {filterByStatus(filter).map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between border py-3 px-2 cursor-pointer rounded-md"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <p
                className="cursor-pointer w-full"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggle(todo.id)}
              >
                {todo.title}
              </p>
            </div>
            {!todo.completed && (
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(todo.id)}>
                  {" "}
                  <PencilLine size={24} />
                </button>
                <button onClick={() => handleDelete(todo.id)}>
                  <Trash size={24} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTodo;
