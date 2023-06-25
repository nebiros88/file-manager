import { EOL, cpus, homedir, userInfo, arch } from "node:os";

import { ERRORS, OS_PARAMS } from "../../constants.js";

export function os(...params) {
  if (!params.length || params.length > 1) {
    return console.log(ERRORS.INVALID_INPUT);
  }
  const param = params[0].substring(2);
  switch (param) {
    case OS_PARAMS.EOL:
      return console.log(JSON.stringify(EOL));
      break;
    case OS_PARAMS.CPUS:
      const cpusInfo = cpus();
      console.log(`Overall amount of CPUS is ${cpusInfo.length}`);
      return cpusInfo.forEach((el, idx) => console.log(`${idx + 1}. model: ${el.model}`));
      break;
    case OS_PARAMS.HOMEDIR:
      return console.log(homedir());
      break;
    case OS_PARAMS.USERNAME:
      return console.log(userInfo().username);
      break;
    case OS_PARAMS.ARCH:
      return console.log(arch());
      break;
    default:
      return console.log(ERRORS.INVALID_INPUT);
  }
}
