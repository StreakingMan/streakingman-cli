const { execSync } = require('child_process');
const inquirer = require('inquirer');
const { fileGenerator } = require('../utils/file-generator');

const reactComp = async () => {
    const { compName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'compName',
            message: '请输入组件名',
            default: 'MyComp',
        },
    ]);

    execSync(`touch ${name}`);
    execSync(`cd ${name}`);
    fileGenerator({
        templateName: 'reactCompIndex',
        option: { compName },
    });
    fileGenerator({
        templateName: 'reactCompInterface',
        option: { compName },
    });
    fileGenerator({
        templateName: 'reactCompStyle',
        option: { compName },
    });
};

module.exports = {
    reactComp,
};
