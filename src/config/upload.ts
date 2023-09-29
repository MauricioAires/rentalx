import multer from "multer";
import crypto from "crypto";
import path from "node:path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
