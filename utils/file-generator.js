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

const fileGenerator = ({ templateName, option = {} }) => {
    const { react, ts, compName } = option;
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
    };

    if (compName) {
        const nameArray = compName.split('');
        nameArray[0] = nameArray[0].toLowerCase();
        data.compName = nameArray.join();
        nameArray[0] = nameArray[0].toUpperCase();
        data.CompName = nameArray.join();
    }

    const filename = generatorTemplateFileMap[templateName];

    fse.outputFileSync(path.join(cwd, filename), ejs.render(template, data));

    // 格式化生成配置文件
    if (filename.endsWith('.js')) {
        execSync(`prettier --write ${path.join(cwd, filename)}`);
    }
};

module.exports = {
    fileGenerator,
};
