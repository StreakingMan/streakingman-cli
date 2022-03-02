const { version } = require('../package.json');
const { execSync } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

const generatorTemplateFileMap = {
    commitlint: '.commitlintrc.js',
    editor: '.editorconfig',
    eslint: '.eslintrc.js',
    eslintignore: '.eslintignore',
    lintstaged: '.lintstagedrc.js',
    prettier: '.prettierrc.js',
    reactCompIndex: 'index.tsx',
    reactCompStyle: 'index.module.scss',
    reactCompInterface: 'interface.ts',
};

const fileGenerator = ({ templateName, pathName = '/', option = {} }) => {
    const { react, ts, compName, CompName } = option;
    const cwd = process.cwd();
    const file = path.join(
        path.join(__dirname, '../templates'),
        `${templateName}.ejs`
    );
    const template = fs.readFileSync(file, 'utf8');
    const data = {
        react,
        ts,
        generatedAt: new Date().toLocaleString(),
        version,
        compName,
        CompName,
    };

    const filename = generatorTemplateFileMap[templateName];

    fse.outputFileSync(
        path.join(path.join(cwd, pathName), filename),
        ejs.render(template, data)
    );

    // TODO 正则判断
    // 格式化生成配置文件
    if (
        filename.endsWith('.js') ||
        filename.endsWith('.jsx') ||
        filename.endsWith('.ts') ||
        filename.endsWith('.tsx')
    ) {
        execSync(
            `prettier --write ${path.join(path.join(cwd, pathName), filename)}`
        );
    }
};

module.exports = {
    fileGenerator,
};
