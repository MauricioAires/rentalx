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

import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

createConnection();

const app = express();

app.use(rateLimitMiddleware);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

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

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(err) {
      if (err.statusCode === 404 || err.statusCode === 500) {
        return true;
      }

      return false;
    },
  }),
);

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
