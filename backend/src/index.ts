import { Env, Hono } from "hono";
import { todos } from "./db/schema";
import { initDbConnect } from "./db";
import { eq } from "drizzle-orm/sql";
import { cors } from "hono/cors";


const app = new Hono();

app.use(
  cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests','Content-Type'],
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

app.get("/todos",async (c:any)=>{
  const db = initDbConnect(c.env.DB);

  const allTodos=await db.select()
                    .from(todos).all();
  return c.json(allTodos,200);
})


app.post("/todos",async (c:any)=>{
  const db = initDbConnect(c.env.DB);

  const {title}=await c.req.json();

  if(!title)
  {
    return c.json({message:"title is required"},400);
  }

  const newTodo = await db
                      .insert(todos)
                      .values({title,completed:false})
                      .returning();

  return c.json({sucess:true,todo:newTodo},200);
})


app.delete("/todo/:id",async (c:any)=>{
   const db = initDbConnect(c.env.DB);
   const id = Number(c.req.param("id"));

   await db.delete(todos).where(eq(todos.id,id)).run();
   return c.json({ success: true, message: "Todo deleted" },200);
})
export default app;


app.put("/todos/:id", async (c:any) => {
  const db = initDbConnect(c.env.DB);
  const id = Number(c.req.param("id"));
  const { completed } = await c.req.json();

  if (typeof completed !== "boolean") {
    return c.json({ success: false, message: "Completed status is required" }, 400);
  }

  const updatedTodo = await db
    .update(todos)
    .set({ completed })
    .where(eq(todos.id,id))
    .returning(); // Return the updated todo

  return c.json({ success: true, todo: updatedTodo });
});