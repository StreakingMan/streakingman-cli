const { execSync } = require('child_process');
const { version } = require('../package.json');
const checkVersion = () => {
    const latestVersion = execSync('npm view streakingman-cli version');
    const [x1, y1, z1] = latestVersion.toString().trim().split('.');
    const [x2, y2, z2] = version.split('.');
    if (!(x1 === x2 && y1 === y2 && z1 <= z2)) {
        console.warn(
            `发现新版本 streakingman-cli@${latestVersion}，请及时更新`
        );
    }
};

module.exports = {
    checkVersion,
};
