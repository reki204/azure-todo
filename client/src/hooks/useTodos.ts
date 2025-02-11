import { useEffect, useState } from "react";
import { todoApi } from "../api/todoApi";
import { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const data = await todoApi.fetchTodos();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;

    await todoApi.addTodo(title);
    setTitle("");
  };

  const toggleTodo = async (id: string, isCompleted: boolean) => {
    await todoApi.updateTodo(id, !isCompleted);
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const deleteTodo = async (id: string) => {
    const isConfirmed = window.confirm("本当に削除しますか？");
    if (!isConfirmed) return;

    await todoApi.deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    title,
    setTitle,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
