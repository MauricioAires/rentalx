import "dotenv/config";
import express from "express";
import "express-async-errors";

import swaggerUi from "swagger-ui-express";
import createConnection from "@shared/infra/typeorm";

import "@shared/container";

import { handleAppErrors } from "@shared/infra/http/middleware/errors";
import { rateLimitMiddleware } from "@shared/infra/http/middleware/rateLimiterRedis";
import { router } from "@shared/infra/http/routes";
import swaggerFile from "../../../swagger.json";
import upload from "@config/upload";
import cors from "cors";

createConnection();

const app = express();

app.use(rateLimitMiddleware);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

/** Realizar redirecionamento de requisição */
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(
  cors({
    origin: "*",
  }),
);
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
