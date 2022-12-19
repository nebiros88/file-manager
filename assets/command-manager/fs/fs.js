import fs from "fs";
import path from "path";
import { getNormalizedPath } from "../../utils/utils.js";
import { getCurrentPath } from "../../utils/utils.js";
import { currentPath } from "../path.js";

export const cat = async (...params) => {
  const [receivedPath] = params;
  if (!receivedPath || params.length > 1) return console.log("Invalid input");
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
    return console.log("Operation failed");
  }
};

export const add = async (...params) => {
  const [fileName] = params;
  const src = path.join(currentPath.path, fileName);
  try {
    await fs.promises
      .writeFile(src, "", { encoding: "utf-8" })
      .then(() => console.log(`\nFile created: ${src}`));
  } catch (error) {
    console.log("Operation failed");
  }
};

export const rn = async (...params) => {
  const [oldFile, newFile] = params;
  const src = path.join(currentPath.path, oldFile);
  const newFileSrc = path.join(currentPath.path, newFile);
  try {
    await fs.promises
      .access(src)
      .catch(() => console.log("\nCant find file to rename"));
    await fs.promises
      .rename(src, newFileSrc)
      .then(() => console.log("Renamed successfully"));
  } catch (error) {
    console.log("Operation failed");
  }
};

export const rm = async (...params) => {
  const [fileName] = params;
  const src = path.join(currentPath.path, fileName);
  try {
    await fs.promises
      .access(src)
      .catch(() => console.log(`\nCan't find file: ${src}`));
    await fs.promises
      .rm(src)
      .then(() => console.log("\nRemoved successfully!"));
  } catch (error) {
    console.log("Operation failed");
  }
};
