import { jekyllMdName } from './jekyll-md-name';
import { version } from '../package.json';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as ejs from 'ejs';

export type TemplateName =
    | 'commitlint'
    | 'editor'
    | 'eslint'
    | 'eslintignore'
    | 'lintstaged'
    | 'prettier'
    | 'stylelint'
    | 'reactCompIndex'
    | 'reactCompStyle'
    | 'reactCompInterface'
    | 'jekyllMarkdown';

const generatorTemplateFileMap: Record<TemplateName, any> = {
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
    jekyllMarkdown: jekyllMdName,
};

type FileGenerator = (option: {
    templateName: TemplateName;
    pathName?: string;
    option?: any;
}) => void;

export const fileGenerator: FileGenerator = ({
    templateName,
    pathName = '/',
    option = {},
}) => {
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
        path.join(__dirname, 'templates'),
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
        try {
            execSync(
                `prettier --write ${path.join(
                    path.join(cwd, pathName),
                    filename
                )}`
            );
        } catch (e) {
            console.warn('prettier 命令失败');
        }
    }
};
