import { app } from "./app";

app.listen(process.env.PORT, () =>
  console.log(`server listening on port ${process.env.PORT}`),
);

/**
 * O que são Storages
 * - São armazenamentos específicos para upload de arquivos (S3 Amazon)
 */
