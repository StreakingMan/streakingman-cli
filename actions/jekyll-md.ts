import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { jekyllMdName } from '../utils/jekyll-md-name';
import { fileGenerator } from '../utils/file-generator';

type JekyllMd = (title: string, category: string, tags: string) => void;
export const jekyllMD: JekyllMd = async (title, category, tags) => {
    if (!(title && category && tags)) {
        const { inputTitle, inputCategory, inputTags } = await inquirer.prompt([
            {
                type: 'input',
                name: 'inputTitle',
                message: '请输入标题',
                default: title || '',
            },
            {
                type: 'list',
                name: 'inputCategory',
                message: '请选择分类',
                choices: [
                    'JavaScript',
                    'CSS',
                    '大前端',
                    '计算机网络',
                    '数据结构与算法',
                    '设计模式',
                    '运维部署',
                    '技术相关',
                    '独立游戏',
                    '工作总结',
                    '随笔杂谈',
                    '音乐',
                    '绘画',
                ],
                default: category || '',
            },
            {
                type: 'input',
                name: 'inputTags',
                message: '请输入标签（用英文逗号分隔标签）',
                default: tags || '',
            },
        ]);
        title = inputTitle;
        category = inputCategory;
        tags = inputTags;
    }

    tags = tags.split(',').join(' ');
    fileGenerator({
        templateName: 'jekyllMarkdown',
        option: { title, category, tags },
    });

    execSync(`git add ${jekyllMdName(title)}`);

    console.log(`📚 markdown文件生成完毕`);
};
