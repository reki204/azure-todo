import app from "./index";

describe("Todo API", () => {
  it("GET: /api", async () => {
    const res = await app.request("/api");
    expect(res.status).toBe(200);
  });

  it("GET: api/todos", async () => {
    const res = await app.request("/api");
    expect(res.status).toBe(200);
  });

  // POST /todos のテスト
  it("POST: api/todos - should create new todo", async () => {
    const res = await app.request("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test Todo",
      }),
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data).toHaveProperty("message", "Created");
  });

  // PUT /todos/:id のテスト
  it("PUT: api/todos/:id - should update todo", async () => {
    const res = await app.request("/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("completed", true);
  });

  // DELETE /todos/:id のテスト
  test("DELETE: api/todos/:id - should delete todo", async () => {
    const res = await app.request("/1", {
      method: "DELETE",
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("message", "Todo deleted");
  });
});
