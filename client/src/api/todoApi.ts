const BASE_URL = "/api/todos";
const HEADERS = {
  "Content-Type": "application/json",
};

export const todoApi = {
  fetchTodos: async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data.todos;
  },

  addTodo: async (title: string) => {
    await fetch(BASE_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ title }),
    });
  },

  updateTodo: async (id: string, isCompleted: boolean) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({ isCompleted }),
    });
  },

  deleteTodo: async (id: string) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
