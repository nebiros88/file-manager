import { up, cd, ls } from "./navigation/navigations.js";

const COMMANDS = { up, cd, ls };

export const commandManager = async (input) => {
  const inputParams = input.trim().split(/\s+/g);
  const cmd = inputParams.shift();

  if (!COMMANDS[cmd]) console.log("Invalid input\n");
  return await COMMANDS[cmd](...inputParams);
};
