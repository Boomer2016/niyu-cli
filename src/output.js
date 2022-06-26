const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')

const log = console.log

const output = creation => {
  return new Promise((resolve, reject) => {
    // 拿配置信息
    const setting = creation._setting
    const {projectName} = setting

    // 获取当前命令行执行环境所在文件夹
    const tempCwdDir = process.cwd()

    // 初始化文件夹path
    const projectPath = path.join(tempCwdDir, projectName)
    const projectResolve = getProjectResolve(projectPath)

    // 新建项目文件夹
    fse.mkdirSync(projectPath)
    // copy文件夹
    creation.copy('src', projectResolve('src'))

    //  根据配置信息，替换文件内容
    creation.copyTpl('package.json', projectResolve('package.json'), setting)

    // 将内存中的文件，输出到硬盘上
    creation._mfs.commit(() => {
      resolve()
    })
  })
}

module.exports = output
