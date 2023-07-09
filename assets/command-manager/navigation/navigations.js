import path from "path";
import { access, readdir } from "node:fs/promises";
import { currentPath } from "../path.js";

import { getNormalizedPath } from "../../utils/utils.js";
import { ERRORS } from "../../constants.js";

export const up = () => {
  currentPath.path = path.join(currentPath.path, "..");
};

export const cd = async (...params) => {
  const [receivedPath] = params;
  if (!receivedPath || params.length > 1) return console.log(ERRORS.INVALID_INPUT);
  try {
    const newPath = getNormalizedPath(receivedPath);
    await access(newPath);
    currentPath.path = newPath;
  } catch (err) {
    console.log(ERRORS.OPERATION_FAILED);
  }
};

export const ls = async () => {
  const path = currentPath.path;
  try {
    await access(path);
    const data = await readdir(path, { withFileTypes: true });
    const files = data.filter((el) => el.isFile()).sort((a, b) => a.name < b.name);

    const directories = data.filter((el) => el.isDirectory()).sort((a, b) => a.name < b.name);

    for (const file of files) {
      directories.push(file);
    }

    const tableData = directories.map((el) => {
      const elType = el.isDirectory() ? "directory" : "file";
      return {
        Name: el.name,
        Type: elType,
      };
    });
    console.table(tableData);
  } catch (err) {
    console.log(ERRORS.OPERATION_FAILED);
  }
};
