#!/usr/bin/env node
const { execSync } = require("child_process");
const { checkGit } = require("./actions/check-git");
const { setGit } = require("./actions/set-git");
const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./package.json")).toString()
);
const CLINAME = "skm";

// 检查版本
const latestVersion = execSync("npm view @tuya-fe/www-cli version");
const [x1, y1, z1] = latestVersion.toString().trim().split(".");
const [x2, y2, z2] = version.split(".");
if (!(x1 === x2 && y1 === y2 && z1 <= z2)) {
  console.log(`发现新版本${CLINAME}@${version}，请更新`);
}

program
  .version(`${CLINAME}@${version}`, "-v")
  .helpOption("-h", "帮助信息")
  .usage("<command> [options]")
  .name(CLINAME);

program
  .command("check-git")
  .description("查看当前仓库git配置用户名和邮箱")
  .action(checkGit);
program
  .command("set-git")
  .description("配置当前仓库git配置用户名和邮箱")
  .action(setGit);

program.showHelpAfterError(`${CLINAME} -h 查看帮助`);
program.addHelpCommand(false);
program.parse(process.argv);
