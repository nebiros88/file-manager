import readline from "readline";
import { greet, getUserNameFromArgs, exit, getCurrentPath} from "./assets/utils/utils.js";
import { commandManager } from "./assets/command-manager/commandManager.js";

const { stdin, stdout } = process;
const userName = getUserNameFromArgs();

export const app = readline.createInterface({
  input: stdin,
  output: stdout,
});

greet();
getCurrentPath();

app.on("line", (userInput) => {
  if (userInput === ".exit") {
    exit(userName);
  } else {
    commandManager(userInput);
  }
});

app.on("SIGINT", () => {
  exit(userName);
});
