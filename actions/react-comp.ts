import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { checkVersion } from '../utils/check-version';
import { fileGenerator, TemplateName } from '../utils/file-generator';

export const reactComp: (compName: string) => void = async (compName) => {
    checkVersion();
    if (!compName) {
        const { compName: inputCompName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'compName',
                message: '请输入组件名',
                default: 'MyComp',
            },
        ]);
        compName = inputCompName;
    }

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
    ] as TemplateName[]) {
        fileGenerator({
            templateName,
            pathName: CompName,
            option: { compName, CompName },
        });
    }

    console.log(`📦 react组件${CompName}文件生成完毕`);
};
