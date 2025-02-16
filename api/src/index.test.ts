import app from "./index";

describe("GET: /api", () => {
  it("Hello Hono!を返す", async () => {
    const res = await app.request("/api");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
  });
});
