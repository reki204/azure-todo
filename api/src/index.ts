import { Hono } from "hono";
import todo from "./todoRouter";

const app = new Hono();

app.get("/api", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/todos", todo);

export default app;
