import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          className="h-4 w-4 text-blue-600 rounded"
          onChange={() => onToggle(todo.id, todo.isCompleted)}
        />
        <span className={todo.isCompleted ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
      >
        削除
      </button>
    </li>
  );
};
