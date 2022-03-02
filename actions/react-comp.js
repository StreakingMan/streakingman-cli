const { execSync } = require('child_process');
const inquirer = require('inquirer');
const { fileGenerator } = require('../utils/file-generator');

const reactComp = async () => {
    let { compName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'compName',
            message: '请输入组件名',
            default: 'MyComp',
        },
    ]);

    const nameArray = compName.split('');
    nameArray[0] = nameArray[0].toLowerCase();
    compName = nameArray.join('');
    nameArray[0] = nameArray[0].toUpperCase();
    const CompName = nameArray.join('');

    execSync(`mkdir ${CompName}`);

    for (const templateName of [
        'reactCompIndex',
        'reactCompInterface',
        'reactCompStyle',
    ]) {
        fileGenerator({
            templateName,
            path: CompName,
            option: { compName, CompName },
        });
    }
};

module.exports = {
    reactComp,
};
