# StreakingMan Cli

封装了一些常用操作的命令行工具

## 安装

```
# npm
npm install streakingman-cli -g

# yarn
yarn global add streakingman-cli
```

## 功能

-   [check-git: 查看当前仓库 git 配置名称和邮箱](#check-git)
-   [set-git: 设置当前仓库 git 配置名称和邮箱](#set-git)
-   [set-project: 快速配置项目](#set-project)
-   [react-comp: 快速生成 react 组件相关文件](#react-comp)
-   [jekyll-md: 生成带 front matter 的 markdown 文件](#jekyll-md)
-   [type-it: 对文本文件重新进行逐字输入](#type-it)
-   [taobao-registry: 生成淘宝源npmrc文件](#taobao-registry)

## 使用

### check-git

查看当前仓库 git 配置名称和邮箱，看似鸡肋，一个命令查看俩，
节省键盘耐久度

```
skm check-git
```

### set-git

配置当前仓库 git 配置用户名和邮箱，看似鸡肋却有这实际使用场景：
在公司的电脑一般 git 全局配置都设置公司的 git 名称和邮箱，
使用这个命令可以在上班摸鱼写自己的项目时
更快捷的配置新项目的个人 git 名称和邮箱，

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

或者携带参数

```
skm set-git dogEgg your@email.com

设置完成，当前配置：
git config user.name dogEgg
git config user.email your@email.com
```

### set-project

快捷安装 eslint,prettier,lintstaged,commitlint,husky
等依赖并进行基础配置

```
skm set-project
```

根据需要进行选择

```
? 是否react项目 Yes
? 是否使用了typescript Yes
? 是否使用eslint+prettier Yes
? 是否使用commitlint+lintstaged+husky Yes
? 是否使用standard-version管理版本号 Yes
```

### react-comp

快速生成 react 组件相关文件
包含组件、样式以及类型声明

```
skm set-project

? 请输入组件名 (MyComp)

或者

skm set-project MyComp
```

命令将生成相应的组件文件夹，文件夹内包含文件如下

index.tsc

```

import React, { FC } from 'react'
import classNames from 'classnames'
import style from './index.module.scss'
import { MyCompProps } from './interface'

const MyComp: FC< MyCompProps > = () => {
    return <div className={classnames(style.myComp)}}"></div>
}

export default MyComp
```

index.module.scss

```
.myComp {
    //
}
```

interface.ts

```
export interface MyCompProps {
    className?: string
}
```

### jekyll-md

```
skm jekyll-md
? 请输入标签 标题
? 请输入分类 分类
? 请输入标签（用英文逗号分隔标签）标签1,标签2,标签3

或者

skm jekyll-md 标题 分类 标签1,标签2,标签3
```

生成如下 md 文件

2022-05-15-标题.md

```
---
layout: post
title: 标题
author: Max
categories: 分类
tags: 标签1 标签2 标签3
---


generated at <%- generatedAt %> by streakingman-cli@<%- version %>
```

### type-it

对文本文件重新进行逐字输入

```shell
Usage: skm type-it [options] [filePath] [speed] [breakBySpace]
```

https://user-images.githubusercontent.com/30397306/202643861-6f507cda-819b-40a0-9131-9883d9a9b978.mov

### taobao-registry

生成淘宝源npmrc文件

```shell
skm taobao-registry

.npmrc生成完毕
```

## TODO

-   [ ] 测试用例
-   [x] 使用 ts 重写
-   [ ] 支持配置文件
