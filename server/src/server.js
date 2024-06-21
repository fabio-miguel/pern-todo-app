const express = require("express");
const cors = require("cors");

function createServer(pool) {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  /* ROUTES - CRUD Methods */

  // Create a todo
  app.post("/todos", async (req, res) => {
    console.log("creating todo");
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );
      console.log("todo was created");
      res
        .status(201)
        .location(`/todos/${newTodo.rows[0].id}`)
        .json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  // Read all todos
  app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.status(200).json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  // Read a todo
  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);

      if (todo.rows.length === 0) {
        res.status(404).json("Todo not found");
      } else {
        res.status(200).json(todo.rows[0]);
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  // Update a todo
  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(parseInt(id))) {
        console.log("Invalid id");
        res.status(400).json("Invalid id");
        return;
      }

      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE id = $2",
        [description, id]
      );

      if (updateTodo.rowCount === 0) {
        res.status(404).json("Todo not found");
        return;
      }

      res.json("Todo was updated!");
    } catch (err) {
      console.error(err);
    }
  });

  // Delete a todo
  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [
        id,
      ]);

      res.status(200).json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

  app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
  });

  return app;
}

module.exports = createServer;
