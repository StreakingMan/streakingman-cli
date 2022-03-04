#!/usr/bin/env node
const { checkGit } = require('./actions/check-git');
const { setGit } = require('./actions/set-git');
const { setProject } = require('./actions/set-project');
const { reactComp } = require('./actions/react-comp');
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, './package.json')).toString()
);
const CLINAME = 'skm';

program
    .version(`${CLINAME}@${version}`, '-v')
    .helpOption('-h', '帮助信息')
    .usage('<command> [options]')
    .name(CLINAME);

program
    .command('check-git')
    .description('查看当前仓库git配置用户名和邮箱')
    .action(checkGit);
program
    .command('set-git')
    .description('配置当前仓库git配置用户名和邮箱')
    .action(setGit);
program
    .command('set-project')
    .description('安装lint和工程化依赖以及简单配置')
    .action(setProject);
program
    .command('react-comp [compName]')
    .description('快速生成react组件相关文件')
    .action(reactComp);

program.showHelpAfterError(`${CLINAME} -h 查看帮助`);
program.addHelpCommand(false);
program.parse(process.argv);
