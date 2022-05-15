const { version } = require('../package.json');
const { execSync } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

const jekyllMarkdownName = (title) => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}-${title.toLowerCase()}.md`;
};

const generatorTemplateFileMap = {
    commitlint: '.commitlintrc.js',
    editor: '.editorconfig',
    eslint: '.eslintrc.js',
    eslintignore: '.eslintignore',
    lintstaged: '.lintstagedrc.js',
    prettier: '.prettierrc.js',
    stylelint: '.stylelintrc.js',
    reactCompIndex: 'index.tsx',
    reactCompStyle: 'index.module.scss',
    reactCompInterface: 'interface.ts',
    jekyllMarkdown: jekyllMarkdownName,
};

const fileGenerator = ({ templateName, pathName = '/', option = {} }) => {
    const {
        prettier,
        stylelint,
        react,
        ts,
        compName,
        CompName,
        title,
        category,
        tags,
    } = option;
    const cwd = process.cwd();
    const file = path.join(
        path.join(__dirname, '../templates'),
        `${templateName}.ejs`
    );
    const template = fs.readFileSync(file, 'utf8');
    const data = {
        react,
        ts,
        prettier,
        stylelint,
        generatedAt: new Date().toLocaleString(),
        version,
        // react-comp
        compName,
        CompName,
        // jekyllMarkdown
        title,
        category,
        tags,
    };

    let filename = generatorTemplateFileMap[templateName];
    if (typeof filename === 'function') {
        filename = filename(title);
    }

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
