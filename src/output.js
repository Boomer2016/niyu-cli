const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const utils = require('./utils');

const { currentPath, downloadByGit } = utils;

const log = console.log
const red = chalk.red;
const green = chalk.green;

// 暂时拿electron-vue这个项目作为模板，具体可根据团队技术栈初始化各种模板
let tempName = 'https://github.com/SimulatedGREG/electron-vue.git';
let projectName;

// 重写package.json
const rewriteJson = async() => {
  try {
    const path = currentPath + projectName + '/package.json';
    const isExist = await fse.pathExists(path);
    if (!isExist) {
      return;
    }
    const json = await fse.readJson(path);
    json.name = projectName;
    json.description = `this project is based on ${tempName}`;
    await fse.writeJson(path, json, { spaces: '\t' });
    log(green('format package.json success!'));
  } catch (err) {
    console.error(red(err));
  }
}

// 删除不相关的文件
const unrelatedFileRemove = async (parentFile, callback) => {
  try {
    await fse.remove(parentFile + '/.git');
    await fse.remove(parentFile + '/package-lock.json');
    callback && callback();
    rewriteJson();
    log(green('remove unrelated file success!'));
  } catch (err) {
    console.error(red(err));
  }
}

// 重命名gitClone下来的文件为项目文件名
const renameFile = async() => {
  // const oldPath = currentPath + tempName;
  const oldPath = 'electron-vue';
  const nowPath = currentPath + projectName;
  try {
    await fse.rename(oldPath, nowPath);
    unrelatedFileRemove(nowPath);
  } catch (error) {
    console.error(red(error));
  }
}

const output = creation => {
  return new Promise((resolve, reject) => {
    // 拿配置信息
    const setting = creation._setting
    // const {projectName} = setting
    projectName = setting.projectName;

    // 获取当前命令行执行环境所在文件夹
    const tempCwdDir = process.cwd()

    // 初始化文件夹path
    const projectPath = path.join(tempCwdDir, projectName)

    // 新建项目文件夹
    fse.mkdirSync(projectPath)

    // git clone模板项目
    downloadByGit(renameFile, tempName)

    // 将内存中的文件，输出到硬盘上
    resolve()
  })
}

module.exports = output
