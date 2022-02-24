const { execSync } = require('child_process');
const { batchInstall } = require('../utils/batch-install');
const { fileGenerator } = require('../utils/file-generator');
const { checkVersion } = require('../utils/check-version');
const inquirer = require('inquirer');

const setProject = async () => {
    checkVersion();
    const {
        hasEslintAndPrettier,
        hasCommitlintAndLintstagedAndHusky,
        hasStandardVersion,
    } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'hasEslintAndPrettier',
            message: '是否使用eslint+prettier',
            default: true,
        },
        {
            type: 'confirm',
            name: 'hasCommitlintAndLintstagedAndHusky',
            message: '是否使用commitlint+lintstaged+husky?',
            default: true,
        },
        {
            type: 'confirm',
            name: 'hasStandardVersion',
            message: '是否使用standard-version管理版本号?',
            default: true,
        },
    ]);
    if (hasEslintAndPrettier) {
        batchInstall(
            [
                'eslint',
                'prettier',
                'eslint-config-prettier',
                'eslint-plugin-prettier',
            ],
            {
                dev: true,
            }
        );
        fileGenerator({ templateName: 'prettier' });
        fileGenerator({ templateName: 'eslint' });
        fileGenerator({ templateName: 'eslintignore' });
    }
    if (hasCommitlintAndLintstagedAndHusky) {
        batchInstall(
            [
                '@commitlint/cli',
                '@commitlint/config-conventional',
                'lint-staged',
                'husky',
            ],
            { dev: true }
        );
        // husky安装与钩子配置
        execSync('npx husky install');
        execSync('npm set-script prepare "husky install"');
        execSync('npx husky add .husky/pre-commit "npx lint-staged"');
        execSync(
            'npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"'
        );
        fileGenerator({ templateName: 'commitlint' });
        fileGenerator({ templateName: 'lintstaged' });
    }
    if (hasStandardVersion) {
        batchInstall(['standard-version'], { dev: true });
        execSync(
            'npm set-script release:first "standard-version -- --first-release"'
        );
        execSync('npm set-script release "standard-version"');
    }
    fileGenerator({ templateName: 'editor' });
    console.log('依赖安装完成，已生成基础配置');
};

module.exports = {
    setProject,
};
