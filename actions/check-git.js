const {execSync} = require('child_process')
export const checkGit = (propName) => {
    if (!propName || propName === 'username') {
        console.log(`git config user.name ${execSync('git config user.name')}`)
    }
    if (!propName || propName === 'email') {
        console.log(`git config user.email ${execSync('git config user.email')}`)
    }
}
