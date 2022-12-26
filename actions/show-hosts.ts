export const showHosts: () => void = () => {
    console.log(`将以下内容添加到hosts文件中，通常情况下macOS系统路径为：/etc/hosts，windows系统路径为：C:\\Windows\\System32\\drivers\\etc\\hosts
    
# 国内常用hosts，失效时可自行检查最新IP https://dnschecker.org/
104.16.20.35 registry.npmjs.org
104.16.20.35 registry.yarnpkg.com
140.82.121.5 api.github.com
140.82.121.3 github.com
185.199.109.133 raw.githubusercontent.com
`);
};
