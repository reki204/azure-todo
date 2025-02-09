import "./App.css";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Todo App
      </h1>
      <AddTodoForm />
      <TodoList />
    </main>
  );
}

export default App;
