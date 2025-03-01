import{_ as a,b as t,o as r,a5 as l}from"./chunks/framework.CAaOUjTN.js";const u=JSON.parse('{"title":"尝试设计一个高度复用的系统","description":"","frontmatter":{"title":"尝试设计一个高度复用的系统","date":"2021-09-28T11:10:46.000Z","tags":["System Design"],"read":{"text":"8 min read","minutes":7.665,"time":459900,"words":1533}},"headers":[{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"怎么解决问题","slug":"怎么解决问题","link":"#怎么解决问题","children":[{"level":3,"title":"组合方式","slug":"组合方式","link":"#组合方式","children":[]},{"level":3,"title":"哪些点需要规范","slug":"哪些点需要规范","link":"#哪些点需要规范","children":[]}]},{"level":2,"title":"尝试设计一个方案","slug":"尝试设计一个方案","link":"#尝试设计一个方案","children":[]},{"level":2,"title":"其它问题","slug":"其它问题","link":"#其它问题","children":[]},{"level":2,"title":"结语","slug":"结语","link":"#结语","children":[]}],"relativePath":"posts/design-reuse-system.md","filePath":"posts/design-reuse-system.md"}'),i={name:"posts/design-reuse-system.md"};function p(o,e,n,s,d,c){return r(),t("div",null,e[0]||(e[0]=[l('<p>哎，接手公司的项目接的有点烦了，唠嗑两句，随便看看就行啦。</p><p>目前在公司负责一个组合项目，有点像个是大杂烩，把各种各样的功能从其它团队那里直接拿过来用。</p><p>做 <a href="https://www.wikiwand.com/en/Software_as_a_service" target="_blank" rel="noreferrer">SaaS</a> 服务的公司，大概都会遇到这个问题吧。为了节省开发成本，就想直接从其它团队那里，把一个功能直接拿过来，稍稍兼容一下，然后直接上线。</p><p>这合理吗？这当然合理的不得了。</p><p>无容置疑，这是一个非常合理的想法，但是呢，在执行的过程中，没有统一的框架来协调每个模块之间的工作方式，这就像硬是要把两个脚的插头插到三个孔的插板上。</p><p>你说插不上去吧，使点劲也不是不能插上去。</p><p>吐槽吐的差不多了，怎么解决呢？</p><h2 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h2><p>要解决问题，首先肯定是找找问题是啥。<strong>复用</strong> 的想法肯定是好，那么问题是什么呢？</p><p>讲讲我遇到的问题吧。</p><p>我遇到的最主要的问题就是，对接的过程中没有统一的规范。每个项目拿过来之后，都需要单独出一套对接方案。我们还只是第一个接的，后面也许还会有第二个，第三个（如果能坚持下去话，但我觉得不太可能）。</p><p>想到后面对接的人还要经历一遍我们这样的痛苦，光是想想，我就想替他们流两滴眼泪。</p><h2 id="怎么解决问题" tabindex="-1">怎么解决问题 <a class="header-anchor" href="#怎么解决问题" aria-label="Permalink to &quot;怎么解决问题&quot;">​</a></h2><p>上面提到了问题是没有规范。具体点是什么呢？是哪些对接的点需要规范呢？</p><p>在回答这个问题之前，先简单介绍一下我们的对接方式。</p><h3 id="组合方式" tabindex="-1">组合方式 <a class="header-anchor" href="#组合方式" aria-label="Permalink to &quot;组合方式&quot;">​</a></h3><p>我们多个产品，例如 A、B、C 三个产品，每个产品呢，都提供了 X、Y、Z 三个功能。之前的做法就是三个团队，维护三套代码，虽然功能相似，但是因为服务的平台不一样，所以还是有一点点的差别， 例如一个是服务于淘宝的，另外一个是服务于拼多多的。接口参数啥的肯定都是不一样的。</p><p>现在呢，我们要做一个 D 产品，这个产品呢，是服务于另外一个平台的，例如抖音。但是这个产品提供的功能呢，和 X、Y、Z 差不多。</p><p>所以，就有之前 <strong>复用</strong> 的想法了。想法没问题，但是做法呢，感觉有点蠢。</p><p>现在的做法，是以现成的产品 A 作为参考，提取其中的 X、Y、Z 功能，单独独立出来，给 D 这个新产品用。</p><h3 id="哪些点需要规范" tabindex="-1">哪些点需要规范 <a class="header-anchor" href="#哪些点需要规范" aria-label="Permalink to &quot;哪些点需要规范&quot;">​</a></h3><p>理想是丰满的，现实是骨感的。就上面的做法，我认为就有很大的问题，本来 A 平台就是特定的，以 A 平台为标准提取出来的组件，太具个性化了。如果不磨平个性化的菱角。势必是没办法复用的。</p><p>实现也证实了这一点。现在就回答一下上面的问题，我们需要哪些对接的困难点呢？</p><p>我们遇到的第一个问题，就是技术栈不统一。这个倒也是可以解决，<a href="https://github.com/umijs/qiankun" target="_blank" rel="noreferrer">qiankun</a> 或者 <code>iframe</code> 都是可行方案。最终权衡下来，我们选择了 <code>iframe</code>。</p><p>然后是第二个问题，授权，因为是 iframe，所以需要把授权信息传递进去。但是每个提取出来功能的授权方式不一样。 例如 X 功能的授权方式是通过后端跳转，然后把授权信息放在 <code>cookie</code> 里， Y 功能的授权却又是前端直接把 <code>token</code> 通过 <code>query</code> 的方式，传递到 <code>iframe</code> 过去。</p><p>然后是第三个问题，细节，因为 A 产品和 D 产品，不是服务于同一个平台，所以，在 D 产品中，需要修改一些特殊的细节点，例如某些文案以及某些表单选项等。</p><p>先记一记这三个问题，那么这些能通过规范来解决吗？</p><h2 id="尝试设计一个方案" tabindex="-1">尝试设计一个方案 <a class="header-anchor" href="#尝试设计一个方案" aria-label="Permalink to &quot;尝试设计一个方案&quot;">​</a></h2><p>问题有了，怎么解决呢？</p><p>针对第一个问题，统一技术栈。理由到也是很充分，因为这并不是一个简单的功能，需要涉及到一些细节的修改，如果技术栈不统一，那么修改起来，成本维护就相对比较高。 对应的，针对开发规范，也需要对应的定制几套规范。</p><p>第二个问题，授权，这个通过规范，即可解决，规定一套授权方式，都按这个实现即可解决。</p><p>第三个问题，细节的修改，这个从产品的角度来讲，是肯定存在的，而且无法避免的。那么怎么解决呢？ 这个问题也是目前遇到的最棘手的问题。</p><p>目前针对第三个问题，并没有太好的方案，能想到大概是组件颗粒度更细一点，通过细化组件，让这种修改影响的范围尽可能的减少。</p><h2 id="其它问题" tabindex="-1">其它问题 <a class="header-anchor" href="#其它问题" aria-label="Permalink to &quot;其它问题&quot;">​</a></h2><p>除了上述记录的三个问题，还有一些后端的问题。</p><p>目前有一个问题，就是数据不一致，D 平台和 A 平台的数据源提供的数据格式不一致。在我们接手 X、Y、Z 功能的同时，还需要处理一遍数据。真是心疼后端一秒钟。</p><p>针对这个问题，可以在设计的时候，设计一个标准的数据层，然后通过适配器模式，把 D 平台和 A 平台的数据适配成标准数据格式。</p><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p>大概就是这些吧，貌似也没有一个完整的方案。算了，懒得改标题了。针对遇到的第三个问题「功能的细节需要特殊化」这个问题上，应该还能有更好的方案。大概吧 😃</p>',39)]))}const m=a(i,[["render",p]]);export{u as __pageData,m as default};
