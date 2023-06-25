import fs from "fs";
import path from "path";

import { getNormalizedPath, getCurrentPath } from "../../utils/utils.js";
import { currentPath } from "../path.js";
import { ERRORS } from "../../constants.js";

export const cat = async (...params) => {
  const [receivedPath] = params;
  if (!receivedPath || params.length > 1) return console.log(ERRORS.INVALID_INPUT);
  try {
    const newPath = getNormalizedPath(receivedPath);

    let data = "";
    const readableStream = fs.createReadStream(newPath, "utf-8");
    readableStream.on("data", (chunk) => (data += chunk));
    readableStream.on("end", () => {
      console.log(data);
      return getCurrentPath();
    });
    readableStream.on("error", (error) => console.log("Error", error.message));
  } catch (err) {
    return console.log(ERRORS.OPERATION_FAILED);
  }
};

export const add = async (...params) => {
  const [fileName] = params;
  const src = path.join(currentPath.path, fileName);
  try {
    await fs.promises.writeFile(src, "", { encoding: "utf-8" }).then(() => console.log(`\nFile created: ${src}`));
  } catch (error) {
    console.log(ERRORS.OPERATION_FAILED);
  }
};

export const rn = async (...params) => {
  const [oldFile, newFile] = params;
  const src = getNormalizedPath(oldFile);
  const newFileSrc = getNormalizedPath(newFile);
  try {
    await fs.promises.access(src).catch(() => console.log("\nCant find file to rename"));
    await fs.promises.rename(src, newFileSrc).then(() => console.log("Renamed successfully"));
  } catch (error) {
    console.log(ERRORS.OPERATION_FAILED);
  }
};

export const cp = async (...params) => {
  const [pathToFile, pathToNewDirectory] = params;
  if (!pathToFile || !pathToNewDirectory || params.length > 2) {
    console.log(ERRORS.INVALID_INPUT);
    return;
  }

  const srcFile = getNormalizedPath(pathToFile);
  const fileName = path.basename(srcFile);
  const srcDirectory = getNormalizedPath(pathToNewDirectory);

  try {
    await fs.promises
      .access(srcFile)
      .then(() => {
        const readStream = fs.createReadStream(srcFile, "utf-8");
        const writeStream = fs.createWriteStream(srcDirectory + "/" + fileName);
        readStream.pipe(writeStream).on("finish", () => console.log("Copied successfully"));
      })
      .catch(() => console.log(ERRORS.INVALID_FILE_NAME));
  } catch (error) {
    console.log(ERRORS.OPERATION_FAILED);
  }
};

export const mv = async (...params) => {
  const [pathToFile, pathToNewDirectory] = params;
  if (!pathToFile || !pathToNewDirectory || params.length > 2) {
    console.log(ERRORS.INVALID_INPUT);
    return;
  }

  const srcFile = getNormalizedPath(pathToFile);
  const fileName = path.basename(srcFile);
  const srcDirectory = getNormalizedPath(pathToNewDirectory);

  try {
    await fs.promises
      .access(srcFile)
      .then(() => {
        const readStream = fs.createReadStream(srcFile, "utf-8");
        const writeStream = fs.createWriteStream(srcDirectory + "/" + fileName);
        readStream.pipe(writeStream).on("finish", () => console.log("Copied successfully"));
      })
      .then(async () => {
        await fs.promises.rm(srcFile);
      })
      .catch(() => console.log(ERRORS.INVALID_FILE_NAME));
  } catch (error) {
    console.log(ERRORS.OPERATION_FAILED);
  }
};

export const rm = async (...params) => {
  const [fileName] = params;
  const src = getNormalizedPath(fileName);
  try {
    await fs.promises.access(src).catch(() => console.log(`\nCan't find file: ${src}`));
    await fs.promises.rm(src).then(() => console.log("\nRemoved successfully!"));
  } catch (error) {
    console.log(ERRORS.OPERATION_FAILED);
  }
};
