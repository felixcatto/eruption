export const supressConsoleLog = fn => {
  const consoleLog = console.log;
  console.log = () => {};
  const result = fn();
  console.log = consoleLog;
  return result;
};
