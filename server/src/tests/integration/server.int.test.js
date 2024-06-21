const request = require("supertest");
const createServer = require("../../server");
const { connectDb, disconnectDb } = require("../../db");

let app;

beforeAll(async () => {
  const pool = await connectDb();
  app = createServer(pool);
});

afterAll(async () => {
  await disconnectDb();
});

describe("Todo API", () => {
  it("should create a todo", async () => {
    await request(app)
      .post("/todos")
      .send({ description: "my first to do" })
      .set("Content-Type", "application/json")
      .expect(201);

    await request(app)
      .get("/todos")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            description: "my first to do",
            id: 1,
          },
        ]);
      });
  });

  it("should read all todos", async () => {
    await request(app)
      .post("/todos")
      .send({ description: "my first to do" })
      .set("Content-Type", "application/json")
      .expect(201);

    await request(app)
      .post("/todos")
      .send({ description: "my second to do" })
      .set("Content-Type", "application/json")
      .expect(201);

    await request(app)
      .get("/todos")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            description: "my first to do",
            id: 1,
          },
          {
            description: "my second to do",
            id: 2,
          },
        ]);
      });
  });

  it("should read a todo", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ description: "my to do to be read" })
      .set("Content-Type", "application/json")
      .expect(201);

    const todoUri = response.headers["location"];

    await request(app)
      .get(todoUri)
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("description", "my to do to be read");
        expect(`${res.body.id}`).toMatch(/[0-9]+/);
      });
  });

  it("should update a todo", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ description: "my to do to be updated" })
      .set("Content-Type", "application/json")
      .expect(201);

    const todoUri = response.headers["location"];

    await request(app)
      .put(todoUri)
      .send({ description: "my updated to do" })
      .set("Content-Type", "application/json")
      .expect(200);

    await request(app)
      .get(todoUri)
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("description", "my updated to do");
        expect(`${res.body.id}`).toMatch(/[0-9]+/);
      });
  });

  it("should delete a todo", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ description: "my todo to delete" })
      .set("Content-Type", "application/json")
      .expect(201);

    const todoUri = response.headers["location"];

    await request(app)
      .get(todoUri)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("description", "my todo to delete");
        expect(`${res.body.id}`).toMatch(/[0-9]+/);
        console.log(res.body); // Log the response body
      });

    await request(app)
      .delete(todoUri)
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual("Todo was deleted!");
      });

    await request(app)
      .get(todoUri)
      .set("Accept", "application/json")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual("Todo not found");
      });
  }, 10000);

  it("should return 400 when todo doesn't exist", async () => {
    await request(app)
      .put("/todos/undefined")
      .send({ description: "my todo that doesn't exist" })
      .set("Content-Type", "application/json")
      .expect(400);
  });

  it("should return 404 when todo doesn't exist", async () => {
    await request(app)
      .put("/todos/99999")
      .send({ description: "my todo that doesn't exist" })
      .set("Accept", "application/json")
      .expect(404);
  });
});
