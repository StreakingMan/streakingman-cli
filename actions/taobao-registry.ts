import { writeFileSync } from 'fs-extra';
import * as path from 'path';

export const taobaoRegistry = () => {
    writeFileSync(
        path.join(process.cwd(), '.npmrc'),
        'registry=https://registry.npmmirror.com'
    );
    console.log('.npmrc生成完毕');
};
