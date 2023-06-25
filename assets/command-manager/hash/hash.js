import fs from "fs";
import crypto from "crypto";

import { getNormalizedPath } from "../../utils/utils.js";
import { ERRORS } from "../../constants.js";

export const hash = async (...params) => {
  const [filePath] = params;
  if (!filePath || params.length > 1) return console.log(ERRORS.INVALID_INPUT);

  const src = getNormalizedPath(filePath);
  try {
    await fs.promises.access(src).catch(() => console.log("\nCant find file to rename"));
    const readableStream = await fs.promises.readFile(src);
    const hash = crypto.createHash("sha256");
    hash.update(readableStream);
    const hex = hash.digest("hex");
    console.log(hex);
  } catch (error) {
    console.log();
  }
};
