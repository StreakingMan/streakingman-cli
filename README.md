# StreakingMan Cli

封装了一些常用操作的命令行工具

## 安装

``` 
# npm
npm install streakingman-cli -g

# yarn
yarn global add streakingman-cli
```

## 使用

### check-git

查看当前仓库git配置名称和邮箱，看似鸡肋，一个命令查看俩，
节省键盘耐久度

```
skm check-git
```

### set-git

配置当前仓库git配置用户名和邮箱，看似鸡肋却有这实际使用场景：
在公司的电脑一般git全局配置都设置公司的git名称和邮箱，
使用这个命令可以在上班摸鱼写自己的项目时
更快捷的配置新项目的个人git名称和邮箱，


```
skm set-git
```

然后根据提示输入名称和邮箱即可

```
? user.name dogEgg
? user.email your@email.com
设置完成，当前配置：
git config user.name dogEgg
git config user.email your@email.com
```

### set-project

快捷安装eslint,prettier,lintstaged,commitlint,husky
等依赖并进行基础配置

```
skm set-project
```

根据需要进行选择

```
? 是否使用eslint+prettier Yes
? 是否使用commitlint+lintstaged+husky? Yes
? 是否使用standard-version管理版本号? Yes
```
