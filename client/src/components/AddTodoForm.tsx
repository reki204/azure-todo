import { useState } from "react";
import { todoApi } from "../api/todoApi";

export const AddTodoForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await todoApi.addTodo(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2 justify-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスク"
        className="border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        追加
      </button>
    </div>
  );
};
