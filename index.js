import readline from "readline";
import { greet } from "./utils";

const { stdin, stdout, argv } = process;
const userName = argv.slice(2);

export const app = readline.createInterface({
  input: stdin,
  output: stdout,
});

greet();

app.on("line", (line) => {
  console.log(`Received: ${line}`);
});
