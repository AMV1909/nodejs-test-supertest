import { app } from "../src/app.js";
import request from "supertest";

describe("GET /tasks", () => {
    it("should respond with a 200 status code", async () => {
        const response = await request(app).get("/tasks");
        expect(response.statusCode).toBe(200);
    });

    it("should respond with an array", async () => {
        const response = await request(app).get("/tasks");
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe("POST /tasks", () => {
    describe("given a title and description", () => {
        const newTask = {
            title: "Test title",
            description: "Test description",
        };

        it("should respond with a 200 status code", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.statusCode).toBe(200);
        });
    
        it("should respond with a content-type: application/json in header", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("application/json")
            );
        });
    
        // should respond with an object containing the new task with an id
        it("should respond with an object containing the new task with an id", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.body).toHaveProperty("id");
        });
    });

    describe("given an empty body", () => {
        const fields = [
            {},
            { title: "Test title" },
            { description: "Test description" },
        ]

        fields.forEach((field) => {
            it("should respond with a 400 status code", async () => {
                const response = await request(app).post("/tasks").send(field);
                expect(response.statusCode).toBe(400);
            });
        });
    });
});