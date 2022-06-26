const inquirer = require('inquirer')
const fse = require('fs-extra')

const initSetting = () => {
  const prompt = [
    {
      type: 'input',
      name: 'projectName',
      message: 'project name',
      validate(input) {
        if (!input) {
          return 'project name is required.'
        }
        if (fse.existsSync(input)) {
          return 'project name of folder is exist.'
        }
        return true
      },
    },
    // other prompt
  ]

  return inquirer.prompt(prompt)
}

module.exports = initSetting
