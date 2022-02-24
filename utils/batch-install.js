const { execSync } = require('child_process');

const batchInstall = (deps, { dev }) => {
    for (const dep of deps) {
        console.log(`🚓 正在安装 ${dep} ...`);
        try {
            execSync(`yarn add ${dep} ${dev ? '--dev' : ''}`, { stdio: [2] });
        } catch (e) {
            console.error(`❌ ${dep} 安装失败：${e}`);
        }
    }
};

module.exports = {
    batchInstall,
};
