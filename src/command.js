const commander = require('commander')
const chalk = require('chalk')

const packageJson = require('../package.json')


function initCommand() {
  commander
    .version(packageJson.version)
    .on('--help', () => {
      console.log(chalk.green('  run testcli and edit the setting.'))
    })
    .parse(process.argv)
}

module.exports = initCommand
