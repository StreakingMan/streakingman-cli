#!/usr/bin/env node
const {checkGit} = require('./actions/check-git');
const {program} = require('commander');
const fs = require('fs')
const path = require('path')
const {version} = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')).toString())

const CLINAME = 'skm'

program.version(`${CLINAME}@${version}`, '-v')
    .helpOption('-h', '帮助信息')
    .usage('<command> [options]')
    .name(CLINAME)

program.command('check-git')
    .description('查看当前git配置用户名和邮箱')
    .action(checkGit)

program.showHelpAfterError(`${CLINAME} -h 查看帮助`)
program.addHelpCommand(false)
program.parse(process.argv)
