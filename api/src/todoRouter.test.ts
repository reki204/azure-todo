import { prisma } from "./lib/prisma";
import todoApp from "./todoRouter";

describe("Todo API", () => {
  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  describe("GET: /", () => {
    it("Todoが存在しない場合、空の配列を返す", async () => {
      const res = await todoApp.request("/");
      const { todos } = await res.json();

      expect(res.status).toBe(200);
      expect(todos).toEqual([]);
    });

    it("Todoが存在する場合、作成日の降順で返す", async () => {
      const todo1 = await createTestTodo("First todo");
      const todo2 = await createTestTodo("Second todo");

      const res = await todoApp.request("/");
      const { todos } = await res.json();

      expect(res.status).toBe(200);
      expect(todos).toHaveLength(2);
      expect(todos[0].id).toBe(todo2.id);
      expect(todos[1].id).toBe(todo1.id);
    });
  });

  describe("POST: /", () => {
    it("新しいTodoを正常に作成する", async () => {
      const res = await createRequest("/", "POST", {
        title: "Test todo",
      });
      const todos = await prisma.todo.findMany();
      const createdTodo = todos[0];

      expect(res.status).toBe(201);
      expect(todos).toHaveLength(1);
      expect(createdTodo.title).toBe("Test todo");
      expect(createdTodo.isCompleted).toBe(false);
    });

    it("titleが空の場合、バリデーションエラーを返す", async () => {
      const res = await createRequest("/", "POST", { title: "" });
      const errorMessage = await res.json();

      expect(res.status).toBe(400);
      expect(errorMessage.success).toBe(false);
    });

    it("titleが50文字を超えた場合、バリデーションエラーを返す", async () => {
      const longTitle = "a".repeat(51);
      const res = await createRequest("/", "POST", { title: longTitle });
      const errorMessage = await res.json();

      expect(res.status).toBe(400);
      expect(errorMessage.success).toBe(false);
    });
  });

  describe("PUT: /:id", () => {
    it("Todoの完了状態を更新する", async () => {
      const todo = await createTestTodo("Test todo");
      const res = await createRequest(`/${todo.id}`, "PUT", {
        isCompleted: true,
      });
      const updatedTodo = await prisma.todo.findUnique({
        where: { id: todo.id },
      });

      expect(res.status).toBe(200);
      expect(updatedTodo?.isCompleted).toBe(true);
    });

    it("存在しないTodoの場合、404エラーステータスを返す", async () => {
      const res = await createRequest("/999", "PUT", { isCompleted: true });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE: /:id", () => {
    it("Todoを正常に削除する", async () => {
      const todo = await createTestTodo("Test todo");
      const res = await todoApp.request(`/${todo.id}`, { method: "DELETE" });
      const deletedTodo = await prisma.todo.findUnique({
        where: { id: todo.id },
      });

      expect(res.status).toBe(200);
      expect(deletedTodo).toBeNull();
    });

    it("存在しないTodoの場合、404エラーステータスを返す", async () => {
      const res = await todoApp.request("/999", { method: "DELETE" });
      expect(res.status).toBe(404);
    });
  });
});

const createTestTodo = (title: string) => {
  return prisma.todo.create({
    data: { title, isCompleted: false },
  });
};

const createRequest = (path: string, method: string, body: object) => {
  return todoApp.request(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
