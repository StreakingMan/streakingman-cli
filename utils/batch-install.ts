import { execSync } from 'child_process';

type BatchInstall = (
    deps: string[],
    option: {
        dev: boolean;
    }
) => void;

export const batchInstall: BatchInstall = (deps, { dev }) => {
    for (const dep of deps) {
        console.log(`🚓 正在安装 ${dep} ...`);
        try {
            execSync(`yarn add ${dep} ${dev ? '--dev' : ''}`);
        } catch (e) {
            console.error(`❌ ${dep} 安装失败：${e}`);
        }
    }
};
