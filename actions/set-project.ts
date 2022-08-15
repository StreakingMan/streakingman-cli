import { checkVersion } from '../utils/check-version';
import inquirer from 'inquirer';
import { batchInstall } from '../utils/batch-install';
import { execSync } from 'child_process';
import { fileGenerator } from '../utils/file-generator';

export const setProject: () => void = async () => {
    checkVersion();
    // TODO 优化配置选择方式
    const {
        hasReact,
        hasTypeScript,
        hasEslintAndPrettier,
        hasCommitlintAndLintstagedAndHusky,
        hasStandardVersion,
        hasStylelint,
    } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'hasReact',
            message: '是否react项目',
            default: true,
        },
        {
            type: 'confirm',
            name: 'hasTypeScript',
            message: '是否使用了typescript',
            default: true,
        },
        {
            type: 'confirm',
            name: 'hasEslintAndPrettier',
            message: '是否使用eslint+prettier',
            default: true,
        },
        {
            type: 'confirm',
            name: 'hasStylelint',
            message: '是否使用stylelint(SCSS配置)',
            default: true,
        },
        {
            type: 'confirm',
            name: 'hasCommitlintAndLintstagedAndHusky',
            message: '是否使用commitlint+lintstaged+husky',
            default: true,
        },
        {
            type: 'confirm',
            name: 'hasStandardVersion',
            message: '是否使用standard-version管理版本号',
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
        if (hasReact) {
            batchInstall(['eslint-plugin-react'], { dev: true });
        }
        if (hasTypeScript) {
            batchInstall(
                [
                    '@typescript-eslint/parser',
                    '@typescript-eslint/eslint-plugin',
                ],
                { dev: true }
            );
        }
        fileGenerator({ templateName: 'prettier' });
        fileGenerator({
            templateName: 'eslint',
            option: { react: hasReact, ts: hasTypeScript },
        });
        fileGenerator({ templateName: 'eslintignore' });
    }
    if (hasStylelint) {
        const deps = ['stylelint ', 'stylelint-config-standard-scss'];
        if (hasEslintAndPrettier) {
            deps.push('stylelint-config-prettier-scss');
        }
        batchInstall(deps, { dev: true });
        fileGenerator({
            templateName: 'stylelint',
            option: { prettier: hasEslintAndPrettier },
        });
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
        execSync('npx husky set .husky/pre-commit "npx lint-staged"');
        execSync(
            'npx husky set .husky/commit-msg "npx --no-install commitlint --edit $1"'
        );
        fileGenerator({ templateName: 'commitlint' });
        fileGenerator({
            templateName: 'lintstaged',
            option: { stylelint: hasStylelint },
        });
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
