import request from "supertest";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

/**
 * NOTE: Teste de integração
 */
describe("List Category Controller", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email,driver_license, password, is_admin)
         VALUES ('${id}', 'admin', 'admin@rentx.com.br','ABC123','${password}', true)`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Description Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token.token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);

    /**
     * NOTE: Garante que o retorno seja exatamente igual, não foi aumentado nem diminuído
     * nenhuma propriedade
     */
    expect(response.body[0]).toStrictEqual({
      created_at: expect.any(String),
      description: expect.any(String),
      id: expect.any(String),
      name: expect.any(String),
    });
  });
});
