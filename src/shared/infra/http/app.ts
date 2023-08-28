import express from "express";
import "express-async-errors";

import swaggerUi from "swagger-ui-express";
import createConnection from "@shared/infra/typeorm";

import "@shared/container";

import { handleAppErrors } from "./middleware/errors";
import { router } from "@shared/infra/http/routes";
import swaggerFile from "../../../swagger.json";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(handleAppErrors);

export { app };
/**
 * Testes unitários
 *  -
 * Testes de Integração
 * - Utiliza o banco de dados
 * - Utiliza os serviços externos
 *
 * TDD - Tester Driver Development (Desenvolvimento dirigido por testes)
 */
