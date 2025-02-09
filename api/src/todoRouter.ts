import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "./lib/prisma";

const todo = new Hono();

// バリデーションスキーマ
const todoSchema = z.object({
  title: z.string().min(1).max(50),
});

// Todo一覧取得
todo.get("/", async (c) => {
  const todos = await prisma.todo.findMany({
    orderBy: { id: "desc" },
  });
  return c.json({ todos });
});

// Todo作成
todo.post("/", zValidator("json", todoSchema), async (c) => {
  const { title } = c.req.valid("json");

  await prisma.todo.create({
    data: {
      title,
      isCompleted: false,
    },
  });

  return c.json({ message: "Created" }, 201);
});

// Todo更新
todo.put("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const { isCompleted } = await c.req.json();

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { isCompleted },
    });
    return c.json(updatedTodo);
  } catch (error) {
    return c.json({ message: "Todo not found" }, 404);
  }
});

// Todo削除
todo.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  try {
    await prisma.todo.delete({
      where: { id },
    });
    return c.json({ message: "Todo deleted" });
  } catch (error) {
    return c.json({ message: "Todo not found" }, 404);
  }
});

export default todo;
