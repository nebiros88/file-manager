import { app } from "../../index.js";
import { currentPath } from "../command-manager/path.js";

const { argv, stdout } = process;

export function greet() {
  let message = "";
  const list = argv.slice(2)[0].split("=");
  const userName = getUserNameFromArgs();

  if (list[0] === "--username" && list[1].length) {
    message = `Welcome to the File Manager, ${userName}!\n`;
  } else {
    message =
      "Wrong user name (please, run from cli -> npm run start -- --username=your_username).\n";
  }
  console.log(list);
  stdout.write(message);
}

export function getUserNameFromArgs() {
  return argv.slice(2)[0].split("=")[1];
}

export function exit(userName) {
  const exitMessage = `Thank you for using File Manager, ${userName}, goodbye!`;
  console.log(exitMessage);
  app.close();
}

export const getCurrentPath = () => {
  const message = `\nYou are currently in ${currentPath.path}\n`;
  console.log(message);
};