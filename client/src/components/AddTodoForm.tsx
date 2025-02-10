import { useTodos } from "../hooks/useTodos";

export const AddTodoForm = () => {
  const { title, setTitle, addTodo } = useTodos();

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
        onClick={addTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        追加
      </button>
    </div>
  );
};
