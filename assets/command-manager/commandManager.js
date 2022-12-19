import { up, cd, ls } from "./navigation/navigations.js";
import { cat, add, rn } from "./fs/fs.js";

const COMMANDS = { up, cd, ls, cat, add, rn };

export const commandManager = async (input) => {
  const inputParams = input.trim().split(/\s+/g);
  const cmd = inputParams.shift();

  if (!COMMANDS[cmd]) console.log("Invalid input\n");
  return await COMMANDS[cmd](...inputParams);
};
