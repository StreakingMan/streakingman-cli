import { execSync } from 'child_process';
import inquirer from 'inquirer';

type SetGit = (name: string, email: string) => void;
export const setGit: SetGit = async (name, email) => {
    if (!(name && email)) {
        const { name: inputName, email: inputEmail } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'user.name',
                default: 'streakingman',
            },
            {
                type: 'input',
                name: 'email',
                message: 'user.email',
                default: 'z_max_y@163.com',
            },
        ]);
        name = inputName;
        email = inputEmail;
    }

    execSync(`git config user.name ${name}`);
    execSync(`git config user.email ${email}`);
    console.log('设置完成，当前配置：');
    console.log(
        `git config user.name ${execSync('git config user.name')}`.trim()
    );
    console.log(`git config user.email ${execSync('git config user.email')}`);
};
