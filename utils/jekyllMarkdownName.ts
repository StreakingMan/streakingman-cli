export const jekyllMarkdownName: (title: string) => string = (title) => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}-${title.toLowerCase()}.md`;
};
