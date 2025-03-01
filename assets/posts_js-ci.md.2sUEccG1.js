import{_ as s,b as e,o as i,a5 as t}from"./chunks/framework.CAaOUjTN.js";const n="/assets/icon.B61cb5X9.png",r="/assets/build.DDiguZOE.png",l="/assets/test.Cx0AA-CR.png",p="/assets/project.B4IGhmKD.png",o="/assets/test1.boCO3QVt.png",c="/assets/testProject.B-dvcbD2.png",h="/assets/testProject1.DQzC78z1.png",d="/assets/testResult.BxW2zMSa.png",g="/assets/cover.CnX41fV4.png",C=JSON.parse('{"title":"JavaScript 持续集成","description":"","frontmatter":{"title":"JavaScript 持续集成","date":"2017-09-29T01:25:18.000Z","tags":["JavaScript","Coveralls","Travis CI"],"license":"CC BY-NC 4.0","read":{"text":"4 min read","minutes":3.075,"time":184500,"words":615}},"headers":[{"level":2,"title":"持续集成","slug":"持续集成","link":"#持续集成","children":[]},{"level":2,"title":"测试覆盖率","slug":"测试覆盖率","link":"#测试覆盖率","children":[]},{"level":2,"title":"项目地址","slug":"项目地址","link":"#项目地址","children":[]}],"relativePath":"posts/js-ci.md","filePath":"posts/js-ci.md"}'),k={name:"posts/js-ci.md"};function u(m,a,f,v,b,_){return i(),e("div",null,a[0]||(a[0]=[t('<p>这篇文章的目标就是在 GitHub 上显示如下图标。当然不是简单的显示两张图片，而是显示当前项目的一些状态。</p><figure><img src="'+n+'" alt="icon" tabindex="0" loading="lazy"><figcaption>icon</figcaption></figure><p>持续集成官网： <a href="https://travis-ci.org/" target="_blank" rel="noreferrer">Travis-ci</a> 测试覆盖率官网：<a href="https://coveralls.io/" target="_blank" rel="noreferrer">COVERALLS</a></p><figure><img src="'+r+'" alt="Build 状态" tabindex="0" loading="lazy"><figcaption>Build 状态</figcaption></figure><figure><img src="'+l+'" alt="测试状态" tabindex="0" loading="lazy"><figcaption>测试状态</figcaption></figure><h2 id="持续集成" tabindex="-1">持续集成 <a class="header-anchor" href="#持续集成" aria-label="Permalink to &quot;持续集成&quot;">​</a></h2><p>如果项目中没有测试，那么就不需要包含测试覆盖率这一块。</p><p>首先创建一个简单的项目</p><figure><img src="'+p+`" alt="项目" tabindex="0" loading="lazy"><figcaption>项目</figcaption></figure><p>那么第一步，当然是选择跟着<a href="https://docs.travis-ci.com/user/languages/javascript-with-nodejs/" target="_blank" rel="noreferrer">官方文档</a>走啦，先创建 <code>.travis.yml</code> 文件，查看 <code>node</code> 版本 <code>node -v</code>。然后填进去，我的是 8.5.0，所以我的文件是这样的：</p><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki shiki-themes vitesse-dark vitesse-light vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#B8A965;--shiki-light:#998418;">language</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">:</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;"> node_js</span></span>
<span class="line"><span style="--shiki-dark:#B8A965;--shiki-light:#998418;">node_js</span><span style="--shiki-dark:#666666;--shiki-light:#999999;">:</span></span>
<span class="line"><span style="--shiki-dark:#666666;--shiki-light:#999999;">  -</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;"> &#39;</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;">8</span><span style="--shiki-dark:#C98A7D77;--shiki-light:#B5695977;">&#39;</span></span></code></pre></div><p>然后 <code>git push</code> 到 GitHub ，然后刷新 Travis CI 的页面：</p><figure><img src="`+o+'" alt="Test" tabindex="0" loading="lazy"><figcaption>Test</figcaption></figure><p>就这样，持续集成就 OK 了，是不是很简单，然后点击 passing 图标，选择 Markdown 写到 readme 里面就可以在 GitHub 上看到了。</p><h2 id="测试覆盖率" tabindex="-1">测试覆盖率 <a class="header-anchor" href="#测试覆盖率" aria-label="Permalink to &quot;测试覆盖率&quot;">​</a></h2><p>同样的，跟着<a href="https://coveralls.zendesk.com/hc/en-us/articles/201769715-Javascript-Node" target="_blank" rel="noreferrer">官方文档</a>上的第一个 <a href="https://github.com/nickmerwin/node-coveralls" target="_blank" rel="noreferrer">node-coveralls</a> 走。项目还是上面那个测试项目。</p><p>测试项目的目录：</p><figure><img src="'+c+`" alt="测试项目" tabindex="0" loading="lazy"><figcaption>测试项目</figcaption></figure><p>在 <a href="https://github.com/nickmerwin/node-coveralls" target="_blank" rel="noreferrer">node-coveralls</a> 里面有很多钟方式，我选择 <a href="https://github.com/gotwarlost/istanbul" target="_blank" rel="noreferrer">Istanbul</a> + <a href="https://github.com/mochajs/mocha" target="_blank" rel="noreferrer">mocha</a>。</p><p>那么，第一步，当然是安装 <a href="https://github.com/gotwarlost/istanbul" target="_blank" rel="noreferrer">Istanbul</a> + <a href="https://github.com/mochajs/mocha" target="_blank" rel="noreferrer">mocha</a> 啦，当然还要安装 <a href="https://coveralls.io/" target="_blank" rel="noreferrer">coveralls</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes vitesse-dark vitesse-light vp-code" tabindex="0"><code><span class="line"><span>npm install mocha --save-dev #安装 mohca</span></span>
<span class="line"><span>npm install istanbul --save-dev #安装 istanbul</span></span>
<span class="line"><span>npm install coveralls --save-dev #安装 coveralls</span></span></code></pre></div><p>为了不把 node_module 上传到 GitHub ，所以还需要创建 \`.gitignore&#39; ，在里面添加 node_module 文件夹。</p><p>然后写测试，测试为：</p><figure><img src="`+h+'" alt="测试项目" tabindex="0" loading="lazy"><figcaption>测试项目</figcaption></figure><p>修改 <code>package.json</code> 里面的 <code>test</code> 脚本为</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes vitesse-dark vitesse-light vp-code" tabindex="0"><code><span class="line"><span style="--shiki-dark:#80A665;--shiki-light:#59873A;">istanbul</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;"> cover</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;"> ./node_modules/mocha/bin/_mocha</span><span style="--shiki-dark:#C99076;--shiki-light:#A65E2B;"> --report</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;"> lcovonly</span><span style="--shiki-dark:#C99076;--shiki-light:#A65E2B;"> --</span><span style="--shiki-dark:#C99076;--shiki-light:#A65E2B;"> -R</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;"> spec</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> &amp;&amp;</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;"> cat</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;"> ./coverage/lcov.info</span><span style="--shiki-dark:#CB7676;--shiki-light:#AB5959;"> |</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;"> ./node_modules/coveralls/bin/coveralls.js</span><span style="--shiki-dark:#666666;--shiki-light:#999999;"> &amp;&amp;</span><span style="--shiki-dark:#80A665;--shiki-light:#59873A;"> rm</span><span style="--shiki-dark:#C99076;--shiki-light:#A65E2B;"> -rf</span><span style="--shiki-dark:#C98A7D;--shiki-light:#B56959;"> ./coverage</span></span></code></pre></div><p>然后运行 <code>npm test</code> 命令，会提示一个错误，那个是因为没有在 `package.json&#39; 里面添加 repository 地址，可以忽略。</p><figure><img src="'+d+'" alt="测试结果" tabindex="0" loading="lazy"><figcaption>测试结果</figcaption></figure><p>到这一步，就可以把项目 push 到 GitHub 上去了。然后刷新在 <a href="https://coveralls.io/" target="_blank" rel="noreferrer">COVERALLS</a> 上的项目的网页。</p><figure><img src="'+g+'" alt="测试覆盖率" tabindex="0" loading="lazy"><figcaption>测试覆盖率</figcaption></figure><p>就可以看到成功了！然后点击 EMBED 图标，选择 Markdown 复制到 readme 里面，就可以显示在 GitHub 上了。</p><p>关于 <a href="https://docs.travis-ci.com/user/languages/javascript-with-nodejs/" target="_blank" rel="noreferrer">Travis CI</a> 和 <a href="https://coveralls.zendesk.com/hc/en-us/articles/201769715-Javascript-Node" target="_blank" rel="noreferrer">COVERALLS</a> 的具体的配置。请参考相应的官网的说明。</p><h2 id="项目地址" tabindex="-1">项目地址 <a class="header-anchor" href="#项目地址" aria-label="Permalink to &quot;项目地址&quot;">​</a></h2><p>本篇文章的项目的 GitHub 地址 ：<a href="https://github.com/cwxyz007/TravisTest" target="_blank" rel="noreferrer">Travis Test</a></p><p>到这里还不赶紧去 GitHub 上配置一波～。 如果本篇文章对你有帮助，为什么不点一波喜欢在走呢～</p>',35)]))}const A=s(k,[["render",u]]);export{C as __pageData,A as default};
