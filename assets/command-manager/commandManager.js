import { up, cd, ls } from "./navigation/navigations.js";
import { cat, add, rn, cp, mv, rm } from "./fs/fs.js";
import { hash } from "./hash/hash.js";
import { os } from "./os/os.js";

const NAV_CMD = { up, cd, ls };
const FS_CMD = { cat, add, rn, cp, mv, rm };

const COMMANDS = {
  ...NAV_CMD,
  ...FS_CMD,
  hash,
  os,
};

export const commandManager = async (input) => {
  const inputParams = input.trim().split(/\s+/g);
  const cmd = inputParams.shift();

  if (!COMMANDS[cmd]) console.log("Invalid input\n");
  return await COMMANDS[cmd](...inputParams);
};
