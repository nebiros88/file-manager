import { up, cd, ls } from "./navigation/navigations.js";
import { cat, add, rn, rm } from "./fs/fs.js";
import { hash } from "./hash/hash.js";

const COMMANDS = { up, cd, ls, cat, add, rn, rm, hash };

export const commandManager = async (input) => {
  const inputParams = input.trim().split(/\s+/g);
  const cmd = inputParams.shift();

  if (!COMMANDS[cmd]) console.log("Invalid input\n");
  return await COMMANDS[cmd](...inputParams);
};
