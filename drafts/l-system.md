---
title: 用分形学生成一棵树
date: 2024-06-01 12:24:29
tags: [fractal, l-system]
publish: false
---

分形，数学中的一个比较有趣的概念，是一种图形，却又和普通的图形有所区别。主要区分在于，分形的一部分，放大之后，和原来的形状一样。就像俄罗斯套娃一样，打开一个，出现一个新的套娃，再打开一个，又出现一个新的套娃，一直循环下去。这就是分形。

分形，可以用来创造很多有趣的图形，例如下面的一棵树：

<v-embed :data="{ title: 'Fractal Tree', url: 'https://0x-jerry.github.io/visual-experiment/#/fractal-tree'}" />

::: tip
鼠标移入上面图中，可显示生成动画
:::

接下来，就记录一下，如何实现这样的一棵树。在实现的过程中，需要用到 [L-System]，所以先来了解一下什么是 [L-System]。

## L-System

Lindenmayer 系统（[L-System]） 是由 [Aristid Lindenmayer] 发明的一种用于描述细胞生长的[形式语言][Formal Language]（可简单理解成一种简化版的编程语言）。

[Aristid Lindenmayer]: https://www.wikiwand.com/en/Aristid_Lindenmayer
[L-System]: https://www.wikiwand.com/en/L-system#/Example_7:_Fractal_plant
[Formal Language]: https://www.wikiwand.com/en/Formal_language
