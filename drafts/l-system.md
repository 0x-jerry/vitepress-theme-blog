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

[L-System]（Lindenmayer 系统） 是由 [Aristid Lindenmayer] 发明的一种用于描述细胞生长的[形式语言][Formal Language]（可简单理解成一种简化版的编程语言）。

其主要是用递归的思想，来描述植物的形状。如一棵树的枝干和树本身具有一定的相似度：

![https://www.wikiwand.com/en/L-system#L-system_structure](https://upload.wikimedia.org/wikipedia/commons/a/af/Fractal_weeds.jpg)

接下来再来了解一下 [L-System] 的三个组成部分

1. `V`，用字母标识的一组符号，用于后续递归计算
2. `ω`，初始状态，由 `V` 中的符号组成
3. `P`，转换规则，`V` 中的每个符号对应一个规则，用于表述转换的结果

看起来比较抽象，就拿上面的生成的树来举个例子

1. 定义 `V` 由 `X F [ ] + -` 6 个符号组成
2. 初始状态 `ω` 为 `X`
3. 规则转换规则 `P` 如下：
   1. `X => F-[[X]+X]+F[+FX]-X`
   2. `F => FF`

则不同迭代的状态分别为

**第 1 个迭代**

```
X
```

**第 2 个迭代**

有规则 `P` 的第一个规则可知，`X => F-[[X]+X]+F[+FX]-X`, `X` 转换成 `F-[[X]+X]+F[+FX]-X`，因此结果为：

```
F-[[X]+X]+F[+FX]-X
```

**第 3 个迭代**

同理，由 `P` 中的两个转换规则可知由如下转换过程，其中无对应转换规则的符号，则直接保留

```
F  -[[ X                  ]+ X                  ]+ F  [+ F  X                  ]- X
-  --- -                  -- -                  -- -  -- -  -                  -- -
|  |   |                  |  |                  |  |  |  |  |                  |  |
FF -[[ F-[[X]+X]+F[+FX]-X ]+ F-[[X]+X]+F[+FX]-X ]+ FF [+ FF F-[[X]+X]+F[+FX]-X ]- F-[[X]+X]+F[+FX]-X
```

因此最后结果为:

```
FF-[[F-[[X]+X]+F[+FX]-X]+F-[[X]+X]+F[+FX]-X]+FF[+FFF-[[X]+X]+F[+FX]-X]-F-[[X]+X]+F[+FX]-X
```

最后，再给每一个字符定义一个对应的绘制规则：

- `X`: 无实际含义
- `F`: 按照当前方向，画固定长度的直线
- `[`: 保存当前状态（位置、角度）
- `]`: 取出上一次保存的状态
- `+`: 当前状态左转 25°
- `-`: 状态状态右转 25°

然后按照从左往右的顺序，按照对应的绘制规则依次执行，则可以绘制出如下效果

:::info
下面演示过程中的相关参数有所不同，且加入了一定的随机性，因此，和上述表述的过程有所不同。
:::

<v-embed :data="{ title: 'Fractal Tree', url: 'https://0x-jerry.github.io/visual-experiment/#/fractal-tree?iteration=3&length=38'}" />

## 参考链接

- [Aristid Lindenmayer]
- [L-System]
- [Formal Language]
- [L-System Example]

[Aristid Lindenmayer]: https://www.wikiwand.com/en/Aristid_Lindenmayer
[L-System]: https://www.wikiwand.com/en/L-system#/Example_7:_Fractal_plant
[Formal Language]: https://www.wikiwand.com/en/Formal_language
[L-System Example]: https://paulbourke.net/fractals/lsys/
