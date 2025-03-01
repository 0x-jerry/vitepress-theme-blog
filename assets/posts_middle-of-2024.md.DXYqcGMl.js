import{_ as i,b as a,o as e,a5 as t}from"./chunks/framework.CAaOUjTN.js";const g=JSON.parse('{"title":"2024 的中间！？","description":"","frontmatter":{"title":"2024 的中间！？","date":"2024-07-20T02:58:17.578Z","tags":[],"read":{"text":"6 min read","minutes":5.065,"time":303900,"words":1013}},"headers":[{"level":2,"title":"一个工具库 Silver","slug":"一个工具库-silver","link":"#一个工具库-silver","children":[]},{"level":2,"title":"一些公开的 Serverless 接口 Public API","slug":"一些公开的-serverless-接口-public-api","link":"#一些公开的-serverless-接口-public-api","children":[]},{"level":2,"title":"Typescript <=> OpenAPI Schema 相互转换","slug":"typescript-openapi-schema-相互转换","link":"#typescript-openapi-schema-相互转换","children":[]},{"level":2,"title":"其它只配一提的工具","slug":"其它只配一提的工具","link":"#其它只配一提的工具","children":[]},{"level":2,"title":"中场小结","slug":"中场小结","link":"#中场小结","children":[]}],"relativePath":"posts/middle-of-2024.md","filePath":"posts/middle-of-2024.md"}'),n={name:"posts/middle-of-2024.md"};function r(l,s,p,h,k,o){return e(),a("div",null,s[0]||(s[0]=[t(`<p>近日略闲，于是把之前挖的一些坑填了填，随之草草记录一下，好以此合影留念。</p><h2 id="一个工具库-silver" tabindex="-1">一个工具库 <a href="https://github.com/0x-jerry/silver" target="_blank" rel="noreferrer">Silver</a> <a class="header-anchor" href="#一个工具库-silver" aria-label="Permalink to &quot;一个工具库 [Silver]&quot;">​</a></h2><p><a href="https://github.com/0x-jerry/silver" target="_blank" rel="noreferrer">Silver</a> 允许你在写命令行工具的时候，像写文档一样顺畅。</p><p>这个库最开始的语法是用正则表达式匹配的，导致很多边界条件无法考虑到，写错了也很难排查。 最近用 <a href="https://ohmjs.org/" target="_blank" rel="noreferrer">ohm-js</a> 重写了语法模块，语法匹配起来更加健壮，如果有语法错误，也会有基础的提示，<s>虽然提示并不是很容易理解</s>。看个例子🌰：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes vitesse-dark vitesse-light vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#4D9375;--shiki-light:#1E754F;">import</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> {</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;"> silver</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> }</span><span style="--shiki-dark:#4D9375;--shiki-light:#1E754F;"> from</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;"> &#39;</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">@0x-jerry/silver</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span></span>
<span class="line"><span style="--shiki-dark:#758575DD;--shiki-light:#A0ADA0;">// @autocompletion will enable \`completion\` subcommand to generate autocomplete script</span></span>
<span class="line"><span style="--shiki-dark:#758575DD;--shiki-light:#A0ADA0;">// Autocompletion only support zsh for now, and need to install manually</span></span>
<span class="line"><span style="--shiki-dark:#758575DD;--shiki-light:#A0ADA0;">// Manual install: you need to append \`source &lt;(silver completion)\` to \`.zshrc\`</span></span>
<span class="line"><span style="--shiki-dark:#CB7676;--shiki-light:#AB5959;">const </span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">ins</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> =</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;"> sliver</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">\`</span></span>
<span class="line"><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">v1.0.0 @autocompletion</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">Silver, let you writing CLI like writing document. </span><span style="--shiki-dark:#4D9375;--shiki-light:#1E754F;">\${</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">defaultAction</span><span style="--shiki-dark:#4D9375;--shiki-light:#1E754F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">-t --test @test:defaultValue, Test autocompletion.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">up/upgrade &lt;@test:dir&gt; [...other] #stopEarly, an sub command. </span><span style="--shiki-dark:#4D9375;--shiki-light:#1E754F;">\${</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">upgradeAction</span><span style="--shiki-dark:#4D9375;--shiki-light:#1E754F;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">-s --string @string:default, sub command option.</span></span>
<span class="line"><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">--small @bool, other option.</span></span>
<span class="line"><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#758575DD;--shiki-light:#A0ADA0;">// register autocomplete</span></span>
<span class="line"><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">ins</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">.</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;">type</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">(</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">type</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> ()</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> =&gt;</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> [</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">t1</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;"> &#39;</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">t2</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;"> &#39;</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">t3</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#CB7676;--shiki-light:#AB5959;">function</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;"> defaultAction</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">(</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">args</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;"> options</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">)</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> {</span></span>
<span class="line"><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">  console</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">.</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;">log</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">(</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">args</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;"> options</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">)</span></span>
<span class="line"><span style="--shiki-dark:#666666;--shiki-light:#999999;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#CB7676;--shiki-light:#AB5959;">function</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;"> upgradeAction</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">([</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">dir</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#DBD7CAEE;--shiki-light:#393A34;"> ..</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">other</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">],</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;"> options</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">)</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> {</span></span>
<span class="line"><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">  console</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">.</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;">log</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">(</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;">dir</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;"> other</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">,</span><span style="--shiki-dark:#BD976A;--shiki-light:#B07D48;"> options</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">)</span></span>
<span class="line"><span style="--shiki-dark:#666666;--shiki-light:#999999;">}</span></span></code></pre></div><p>近期也趁机把一些很早就想做的优化补上了：</p><ul><li><code>-h --help</code> 现在显示的帮助文档更加漂亮，也支持显示版本号了</li><li>默认支持 <code>-h --help</code> 参数，不再需要显式声明</li><li>默认不再添加 <code>completion</code> 子命令，需要显式声明</li></ul><h2 id="一些公开的-serverless-接口-public-api" tabindex="-1">一些公开的 Serverless 接口 <a href="https://github.com/0x-jerry/public-apis" target="_blank" rel="noreferrer">Public API</a> <a class="header-anchor" href="#一些公开的-serverless-接口-public-api" aria-label="Permalink to &quot;一些公开的 Serverless 接口 [Public API][public-api]&quot;">​</a></h2><p>此项目是很早之前为了测试 <a href="https://deno.com/deploy" target="_blank" rel="noreferrer">deno deploy</a> 随手写的，很久没有用了。</p><p>最近遇到一个 <a href="https://www.wikiwand.com/zh-hans/rss" target="_blank" rel="noreferrer">RSS</a> 订阅文件(<a href="https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fwww.jiqizhixin.com%2Frss" target="_blank" rel="noreferrer">问题 rss.xml</a>)不规范，导致 <a href="https://freshrss.org/index.html" target="_blank" rel="noreferrer">FreshRSS</a> 无法正常获取内容。 为了解决这个问题，所以把 <a href="https://github.com/0x-jerry/public-apis" target="_blank" rel="noreferrer">Public API</a> 这个项目宠幸了一番，用 <a href="https://hono.dev/" target="_blank" rel="noreferrer">hono</a> 重写了一遍，写了一个接口用于把有问题的 rss.xml <a href="https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fapi.0x-jerry.icu%2Frss%2Fjiqizhixin.com" target="_blank" rel="noreferrer">转换成合法的 rss.xml</a></p><p>目前这个项目有一些可用的 API，具体可查看 <a href="https://github.com/0x-jerry/public-apis" target="_blank" rel="noreferrer">Public API</a>。</p><p>好久没有关注 <a href="https://deno.com/deploy" target="_blank" rel="noreferrer">Deno Deploy</a>，这次重写发现 <a href="https://deno.com/" target="_blank" rel="noreferrer">Deno</a> 已经完全兼容 Node 🎉🎉（但使用 Node 模块时，还是需要指定 <code>node:</code> 标识）。</p><p>配合 <a href="https://deno.com/" target="_blank" rel="noreferrer">Deno</a> 出现的是 <a href="https://jsr.io" target="_blank" rel="noreferrer">jsr.io</a>，虽然 <a href="https://jsr.io" target="_blank" rel="noreferrer">jsr.io</a> 说是支持 Node，不过在 Node 项目里使用 <a href="https://jsr.io" target="_blank" rel="noreferrer">jsr.io</a> 就像是在当面<a href="https://zh.moegirl.org.cn/zh-hans/NTR" target="_blank" rel="noreferrer">牛头人</a> npm 😂。还是在 <a href="https://deno.com/" target="_blank" rel="noreferrer">Deno</a> 项目里食用更佳。</p><p>不得不说，<a href="https://deno.com/deploy" target="_blank" rel="noreferrer">Deno Deploy</a> 整体使用起来非常流畅，非常适合用来做一些 MVP 项目，毕竟白嫖，且免费额度挺多的（目前 1M Request/month, 100G Bandwidth/month），开箱即用的 <a href="https://deno.com/kv" target="_blank" rel="noreferrer">KV</a> 模块也基本够用。</p><h2 id="typescript-openapi-schema-相互转换" tabindex="-1">Typescript &lt;=&gt; OpenAPI Schema 相互转换 <a class="header-anchor" href="#typescript-openapi-schema-相互转换" aria-label="Permalink to &quot;Typescript &lt;=&gt; OpenAPI Schema 相互转换&quot;">​</a></h2><p>这一块有两个工具：</p><ul><li><a href="https://github.com/0x-jerry/openapi-ts-define" target="_blank" rel="noreferrer">OpenAPI-TS-Define</a>: 根据 Typescript 声明的类型生成 OpenAPI Schema，用于后端。</li><li><a href="https://github.com/0x-jerry/openapi-ts" target="_blank" rel="noreferrer">OpenAPI-TS</a>: 根据 OpenAPI Schema 生成 Typescript 代码，用于前端。</li></ul><p><a href="https://github.com/0x-jerry/openapi-ts-define" target="_blank" rel="noreferrer">OpenAPI-TS-Define</a> 还在开发中，基本可用，但项目本身却还没有文档 😂，真是离谱！！！估计又是一个坑，毕竟我自己写后端的时候比较少。</p><p><a href="https://github.com/0x-jerry/openapi-ts" target="_blank" rel="noreferrer">OpenAPI-TS</a> 基本稳定，但还是有一些功能想做但还没有做，例如：</p><ul><li>提供更全面的 CLI，目前的 CLI 工具，就是近期刚加上的，基本够用吧 <s>够用了还不够？</s></li><li>提供平铺函数名称模式（主要区别在于调用方式不用 <code>ApiUserGet(params)</code> vs <code>api.user.$get(params)</code>），目前默认生成后者</li></ul><p>这个工具基本稳定，后续估计会补全一下使用文档，以及处理一些边界条件吧。</p><h2 id="其它只配一提的工具" tabindex="-1">其它只配一提的工具 <a class="header-anchor" href="#其它只配一提的工具" aria-label="Permalink to &quot;其它只配一提的工具&quot;">​</a></h2><ul><li><a href="https://github.com/0x-jerry/vscode-vitepress" target="_blank" rel="noreferrer">VSCode VitePress</a>: <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">VSCode</a> 插件，方便实时预览 <a href="https://vitepress.dev/" target="_blank" rel="noreferrer">VitePress</a> 页面。</li><li><a href="https://github.com/0x-jerry/vscode-ohm" target="_blank" rel="noreferrer">VSCode Ohm JS</a>: 增强 <a href="https://ohmjs.org/" target="_blank" rel="noreferrer">ohm-js</a> 在 <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">VSCode</a> 中的体验，目前是个瘸子，很多想做的功能都没实现，🤔</li></ul><h2 id="中场小结" tabindex="-1">中场小结 <a class="header-anchor" href="#中场小结" aria-label="Permalink to &quot;中场小结&quot;">​</a></h2><p>在此时一个不上不下的时刻，在安安静静地搬砖之外，也应享受另一片自由的天空！</p><p>你好陌生人🤝，感谢你花时间看完尘封于世间角落的这片文章，祝你生活愉快，再见陌生人！👋</p><figure><img src="https://0x-jerry.icu/api/img" alt="此处应有张配图！" tabindex="0" loading="lazy"><figcaption>此处应有张配图！</figcaption></figure>`,27)]))}const c=i(n,[["render",r]]);export{g as __pageData,c as default};
