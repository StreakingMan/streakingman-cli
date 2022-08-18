import { version } from './package.json';
import { program } from 'commander';
import { checkGit } from './actions/check-git';
import { setGit } from './actions/set-git';
import { setProject } from './actions/set-project';
import { reactComp } from './actions/react-comp';
import { jekyllMD } from './actions/jekyll-md';
import { genDaily } from './actions/gen-daily';
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
    .command('set-git [name] [email]')
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
program
    .command('jekyll-md [title] [category] [tags]')
    .description('生成带front matter的markdown文件')
    .action(jekyllMD);
program
    .command('gen-daily [gitUsername]')
    .description('扫描各工程的git提交信息，自动生成日报')
    .action(genDaily);

program.showHelpAfterError(`${CLINAME} -h 查看帮助`);
program.addHelpCommand(false);
program.parse(process.argv);
