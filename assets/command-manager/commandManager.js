const COMMANDS = {};

export const commandManager = async (input) => {
  const inputParams = input.trim().split(/\s+/g);
  const cmd = inputParams.shift();

  if (!COMMANDS[cmd]) console.log("Invalid input\n");
  return await COMMANDS[cmd](...inputParams);
};