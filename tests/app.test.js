
const request = require("supertest");
const app = require("../app");

describe("SecureAccess API", () => {

    test("should return welcome message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("should return health status", async () => {
        const response = await request(app)
            .get("/api/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("Online");
    });

    test("should return 404 for unknown routes", async () => {
        const response = await request(app)
            .get("/api/unknown");

        expect(response.statusCode).toBe(404);
    });

});
