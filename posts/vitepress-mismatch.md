---
title: VitePress Mismatch 错误
date: 2023-10-08T03:18:46.760Z
tags: [vitepress]
publish: false
---

[Vitepress] 迎来了 RC 阶段，相信 ~~不久~~ 就会迎来 Stable 版本。于此，之前一直挖的坑，也是时候填上了。

之前用 [deno]、[fresh]、[twind] 实现了一次博客的迁移，之后也就基本咕了。

[fresh] 框架的 [island][fresh-islands] 模式能够实现 js 最小化。仅加载动态的 js 部分，静态的部分（非 [island][fresh-islands]）都是 html，非常利于 SEO，性能方面也非常好。但是 Deno Depoly 不支持动态加载（Dynamic import）导致在 markdown 扩展上很有限。且由于 Deno Depoly 是 Serverless，会有冷启动和热启动时间，所以对于加载时间上来说，并不是一件好事情。但是 Serverless 也有其好处，例如可以实现一些状态无关的 API，但貌似对博客来讲，没有什么优势。

其实，很久之前就在尝试把博客迁移到 [vitepress]，但是当时没有很好的搜索方案（其实这个功能可以没有，~~主要是懒~~），就搁置了，最近看到 [pagefind] 纯前端搜索方案，尝试了一下，效果还不错。就把博客主题又用 [vitepress] 写了一遍（加上这一次，博客应该总共重写了有 5，6 次了吧，接下来还是专注在内容上好点）。

然后记一记这次踩的一个坑，Vue 的 `hydration mismatch error`（指 SSG 生成的 HTML 结构在客户端混合时期望的 HTML 结构不一致，从而就会导致这个错误。讲人话就是 ssg 生成的 html 在浏览器里 vue 执行混合阶段时期望的 html 不一样）。一般发生在生成 html 时有一些动态内容，一般解决方案是用 `ClientOnly` 组件包裹包含动态内容的组件。

我遇到的情况呢，却不一般，因为我本地打包（build）之后，本地预览没有问题。放到 Github Actions 里面去打包，然后访问，就遇到了 `hydration mismatch` 错误，嗯...挺离谱的。

之后对比生成的 HTMl，发现两边生成的文件不一样，主要是日期不一样。破案了，原来是因为时区不一致（Github Actions 里的时区和我本地的时区不一致），[dayjs] 在不同时区生成的 `YYYY-MM-DD` 格式的结果就不一样。知道原因之后，解决方案也就比较简单了，增加一个时区配置，用固定的时区生成对应的格式即可。

好了，写的差不多了，该吃饭了，完。

[dayjs]: https://day.js.org/
[pagefind]: https://pagefind.app/
[fresh-islands]: https://fresh.deno.dev/docs/concepts/islands
[vitepress]: https://vitepress.dev/
[deno]: https://deno.com/
[fresh]: https://deno.com/
[twind]: https://twind.dev/
