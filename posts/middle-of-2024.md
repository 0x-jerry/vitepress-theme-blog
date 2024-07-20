---
title: 2024 的中间！？
date: 2024-07-20T02:58:17.578Z
tags: []
---

近日略闲，于是把之前挖的一些坑填了填，随之草草记录一下，好以此合影留念。

## 一个工具库 [Silver]

[Silver] 允许你在写命令行工具的时候，像写文档一样顺畅。

看个 🌰，编写的语法一开始是正则表达式匹配的，所以有很多边界条件无法考虑到，写错了也很难排查。
最近用 [ohm-js] 重写了语法模块，语法匹配起来更加健壮，如果有语法错误，也会有基础的提示，~~然而提示并不是很容易理解~~

```ts
import { silver } from '@0x-jerry/silver'
// @autocompletion will enable `completion` subcommand to generate autocomplete script
// Autocompletion only support zsh for now, and need to install manually
// Manual install: you need to append `source <(silver completion)` to `.zshrc`
const ins = sliver`
v1.0.0 @autocompletion

Silver, let you writing CLI like writing document. ${defaultAction}

-t --test @test:defaultValue, Test autocompletion.

up/upgrade <@test:dir> [...other] #stopEarly, an sub command. ${upgradeAction}

-s --string @string:default, sub command option.
--small @bool, other option.
`

// register autocomplete
ins.type('type', () => ['t1', 't2', 't3'])

function defaultAction(args, options) {
  console.log(args, options)
}

function upgradeAction([dir, ..other], options) {
  console.log(dir, other, options)
}
```

也趁机把一些很早就想做的优化补上了：

- `-h --help` 现在显示的帮助文档更加漂亮，也支持显示版本号了
- 默认支持 `-h --help` 参数，不再需要显式声明
- 默认不再添加 `completion` 子命令，需要显式声明

## 一些公开的 Serverless 接口 [Public API][public-api]

此项目是很早之前为了测试 [deno deploy][deno-deploy] 随手写的，很久没有用了，最近遇到一个 [RSS] 订阅文件([问题 rss.xml](https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fwww.jiqizhixin.com%2Frss))不规范，导致 [FreshRSS] 无法正常获取内容。
为了解决这个问题，所以把 [Public API][public-api] 这个项目宠幸了一番，用 [hono] 重写了一遍，写了一个接口用于把有问题的 rss.xml [转换成合法的 rss.xml](https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fapi.0x-jerry.icu%2Frss%2Fjiqizhixin.com)

目前这个项目有一些可用的 API，具体可查看 [Public API][public-api]，好久没有关注 [Deno Deploy][deno-deploy]，这次重写发现 [Deno] 已经完全兼容 Node 🎉🎉（但使用 Node 模块，还是需要指定 `node:` 标识）。配合 [Deno] 出现的是 [jsr.io]，虽然 [jsr.io] 说是支持 node，不过在 node 项目里使用 [jsr.io] 就像是在当面[牛头人] npm 😂。还是在 [Deno] 项目食用更佳。

不得不说，[Deno Deploy][deno-deploy] 整体使用起来非常流畅，非常适合用来做一些 MVP 项目，毕竟白嫖，且免费额度挺多的（目前 1M Request/month, 100G Bandwidth/month），开箱即用的 [KV][deno-kv] 模块也基本够用。

## Typescript <=> OpenAPI Schema 相互转换

这一块有两个工具：

- [OpenAPI-TS-Define]: 根据 Typescript 声明的类型生成 OpenAPI Schema，用于后端
- [OpenAPI-TS]: 根据 OpenAPI Schema 生成 Typescript 代码，用于前端

[OpenAPI-TS-Define] 还在开发中，基本可用，但项目本身却还没有文档 😂，真是离谱！！！估计又是一个坑，毕竟我自己很后端的时候比较少。

[OpenAPI-TS] 基本稳定，但还是有一些功能想做但还没有做，例如：

- 提供更全面的 CLI，目前的 CLI 工具，真是近期才加上的，基本够用吧 ~~够用了还不够？~~
- 提供平铺函数名称模式（主要区别在于调用方式不用 `ApiUserGet(params)` vs `api.user.$get(params)`），目前默认生成后者

这个工具基本稳定，后续估计会补全一下使用文档，以及处理一些边界条件吧。

## 其它只配一提的工具

- [VSCode VitePress][vscode-vitepress]: [VSCode] 插件，方便实时预览 [VitePress] 页面。
- [VSCode Ohm JS][vscode-ohm]: 增强 [ohm-js] 在 [VSCode] 中的体验，目前是个瘸子，很多想做的功能都没实现，🤔

## 中场小结

在此时一个不上不下的时刻，在安安静静地搬砖之外，也应享受另一片自由的天空！你好陌生人🤝，感谢你花时间看完尘封于世间角落的这片文章，祝你生活愉快，再见陌生人！👋

![此处应有张配图！](https://0x-jerry.icu/api/img)

[silver]: https://github.com/0x-jerry/silver
[ohm-js]: https://ohmjs.org/
[public-api]: https://github.com/0x-jerry/public-apis
[deno-deploy]: https://deno.com/deploy
[FreshRSS]: https://freshrss.org/index.html
[rss]: https://www.wikiwand.com/zh-hans/rss
[hono]: https://hono.dev/
[OpenAPI-TS-Define]: https://github.com/0x-jerry/openapi-ts-define
[OpenAPI-TS]: https://github.com/0x-jerry/openapi-ts
[Deno]: https://deno.com/
[jsr.io]: https://jsr.io
[牛头人]: https://zh.moegirl.org.cn/zh-hans/NTR
[deno-kv]: https://deno.com/kv
[VitePress]: https://vitepress.dev/
[VSCode]: https://code.visualstudio.com/
[vscode-vitepress]: https://github.com/0x-jerry/vscode-vitepress
[vscode-ohm]: https://github.com/0x-jerry/vscode-ohm
