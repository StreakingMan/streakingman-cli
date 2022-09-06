import { opendir } from 'fs/promises';
import * as path from 'path';
import { execSync } from 'child_process';

export const genReport: (gitUsername: string) => void = async (gitUsername) => {
    try {
        const dir = await opendir('./');
        for await (const dirent of dir) {
            if (dirent.isFile()) {
                console.log(`${dirent.name}类型为文件，跳过`);
            } else {
                console.log(`${dirent.name}类型为文件夹，开始检索git提交`);
                process.chdir(path.join('./', dirent.name));

                // 检查是否git仓库

                // 检查当前是否有未提交内容

                // 遍历分支，检索commit

                // 汇总，数据分类

                // 输出日报

                const gitMessage = execSync(
                    `git log --pretty=format:"%s" --since=1.day --author=${gitUsername} --no-merges --all`
                )
                    .toString()
                    .trim();
                console.log(gitMessage);
                process.chdir('..');
            }
        }
    } catch (err) {
        console.error(err);
    }
};
