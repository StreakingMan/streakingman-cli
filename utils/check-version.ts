import { version } from '../package.json';
import { execSync } from 'child_process';
export const checkVersion: () => void = () => {
    const latestVersion = execSync('npm view streakingman-cli version')
        .toString()
        .trim();
    const [x1, y1, z1] = latestVersion.split('.');
    const [x2, y2, z2] = version.split('.');
    if (!(x1 === x2 && y1 === y2 && z1 <= z2)) {
        console.warn(
            `发现新版本 streakingman-cli@${latestVersion}，请及时更新`
        );
    }
};
