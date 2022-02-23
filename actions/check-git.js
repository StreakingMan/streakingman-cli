const { execSync } = require('child_process');
const checkGit = () => {
    console.log(
        `git config user.name ${execSync('git config user.name')}`.trim()
    );
    console.log(`git config user.email ${execSync('git config user.email')}`);
};

module.exports = {
    checkGit,
};
