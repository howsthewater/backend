const request = require("supertest");
const index = require("./index");

describe("index.js", () => {
  it("should return status cod 200 ok", async () => {
    const expected = 200;
    const res = await request(index).get("/");
    expect(res.status).toEqual(expected);
  });
});
