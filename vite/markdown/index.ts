import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
// @ts-ignore
import toc from 'markdown-it-table-of-contents'
import { linkPlugin } from './link'
import { preWrapperPlugin } from './preWrapper'
import { lineNumberPlugin } from './lineNumber'
import { highlightLinePlugin } from './highlightLines'
import prism from 'markdown-it-prism'

export function setupMarkdownIt(md: MarkdownIt) {
  md.use(anchor, {
    permalink: anchor.permalink.ariaHidden({
      placement: 'after',
    }),
  })
    .use(prism, {
      defaultLanguageForUnspecified: 'markup',
    })
    .use(toc, {
      includeLevel: [2, 3],
    })
    .use(linkPlugin, {
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  // .use(highlightLinePlugin)
  // .use(preWrapperPlugin)
  // .use(lineNumberPlugin)
}
