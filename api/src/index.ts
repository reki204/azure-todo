import { Hono } from "hono";
import { cors } from "hono/cors";
import todo from "./todoRouter";

const app = new Hono();

// CORSの設定
app.use(
  "/api/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://delightful-mud-0f3bf9b00.4.azurestaticapps.net",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/api", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/todos", todo);

export default app;
