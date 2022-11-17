import { appendFileSync, readFileSync, writeFileSync } from 'fs-extra';

export const typeIt: (
    filePath: string,
    speed: string,
    mode?: string
) => void = (filePath, speed = '50', mode) => {
    const _speed = Number(speed);
    if (isNaN(_speed)) return console.error('speed 请输入数字');
    if (_speed < 50) return console.error('speed 请输入大于50的数字');

    const data = readFileSync(filePath).toString();
    let dataArray: string[] = [];
    const wordMode = mode === 'word';
    if (wordMode) {
        dataArray = data.split(' ');
    } else {
        dataArray = data.split('');
    }

    // 合并空格
    for (let i = 0; i < dataArray.length; i++) {
        const space = wordMode ? '' : ' ';
        if (dataArray[i].endsWith(space) && dataArray[i + 1] === space) {
            dataArray[i] += ' ';
            dataArray.splice(i + 1, 1);
            i--;
        }
    }

    writeFileSync(filePath, '');
    const timer = setInterval(() => {
        if (!dataArray.length) {
            clearInterval(timer);
            return;
        }
        let appendString = dataArray.shift() || '';
        if (dataArray.length && wordMode) appendString += ' ';
        appendFileSync(filePath, appendString);
    }, _speed);
};
