import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { prettyJSON } from "hono/pretty-json";

import { userRoute } from "./routes/user";

//defining the route type
const app = new Hono({ router: new RegExpRouter() });

//the response json will be formatted.Built in middleware
app.use(prettyJSON());

app.use("*", async (c, next) => {
  await next();
  if (c.error) {
    c.json(c.error);
  }
});

//home page
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

//redirects all requests from /user to user route
app.route("/user", userRoute);

//404 error route
app.notFound((c) => {
  return c.text("Custom 404 not found page", 404);
});

export default app;
