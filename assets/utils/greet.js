import { getUserName } from "../constants/index";

const { stdout } = process;

export default function greet() {
  const userName = getUserName();
  let message = "";
  const list = args[0].split("=");

  if (list[0] === "--username" && list[1].length) {
    message = `Welcome to the File Manager, ${userName}!`;
  } else {
    message =
      "Wrong user name (please, run from cli -> npm run start -- --username=your_username)";
  }
  stdout.write(message);
}
