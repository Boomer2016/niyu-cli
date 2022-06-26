const initCommand = require('./command')
const initSetting = require('./setting')
const output = require('./output')

class Creation {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    // code
  }
  do() {
    initCommand()

    initSetting().then(setting => {
      // 用户输入完成后，会得到全部输入信息的json数据 setting
      this._setting = Object.assign({}, this._setting, setting)
      // 输出文件
      output(this).then(res => {
        // 项目输出完成
      })
    })
  }
  // other function
}


module.exports = Creation
