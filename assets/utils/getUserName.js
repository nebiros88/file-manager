const { argv } = process;

export default function getUserName() {
  return argv.slice(2);
}
