import { execSync } from 'child_process';
export const checkGit: () => void = () => {
    console.log(
        `git config user.name ${execSync('git config user.name')}`.trim()
    );
    console.log(`git config user.email ${execSync('git config user.email')}`);
};
