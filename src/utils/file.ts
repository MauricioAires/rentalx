import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // NOTE: Verifica se o arquivo existe
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }

  // NOTE: Exclui o arquivo
  await fs.promises.unlink(filename);
};
