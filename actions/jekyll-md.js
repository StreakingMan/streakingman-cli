const inquirer = require('inquirer');
const { fileGenerator } = require('../utils/file-generator');
const jekyllMD = async (title, category, tags) => {
    if (!(title && category && tags)) {
        const { inputTitle, inputCategory, inputTags } = await inquirer.prompt([
            {
                type: 'input',
                name: 'inputTitle',
                message: '请输入标题',
                default: title || '',
            },
            {
                type: 'input',
                name: 'inputCategory',
                message: '请输入分类',
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
};

module.exports = {
    jekyllMD,
};
