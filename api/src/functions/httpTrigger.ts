import { app } from "@azure/functions";
import { azureHonoHandler } from "@marplex/hono-azurefunc-adapter";
import honoApp from "../index.js";

app.http("httpTrigger", {
  methods: ["GET", "POST", "DELETE", "PUT"],
  authLevel: "anonymous",
  route: "{*proxy}",
  handler: async (request, context) => {
    return { jsonBody: { message: "API is working!" } };
  },
});
