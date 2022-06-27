const crossSpawn = require('cross-spawn');
const spawn = crossSpawn.sync;
const chalk = require('chalk');
const red = chalk.red;
const green = chalk.green;

function isWindows() {
  if (typeof process === 'undefined' || !process) {
    return false;
  }
  return process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys';
}

function downloadByGit(callback, template) {
  console.log(green('start download'));
  const result = spawn(
    'git',
    ['clone', `${template}`],
    { stdio: 'inherit' }
  );
  const error = result.error;
  if (error) {
    console.log(error, 11111111);
    return;
  }
  callback && callback();
}

const currentPath = process.cwd().replace(/\\/g, '/') + '/';


module.exports = {
  downloadByGit,
  isWindows,
  currentPath,
};
