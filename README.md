# remark-denden-ruby

[remark](https://github.com/remarkjs/remark) plugin to support ruby syntax of [denden markdown](https://conv.denshochan.com/markdown).

## Installation

```sh
# Of course you can use npm, yarn or other tools.
pnpm add remark-denden-ruby
```

## Usage

ESM only.

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkRuby from "remark-denden-ruby";

const md2html = (md) => {
  const result = unified()
    .use(remarkParse)
    .use(remarkRuby)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(md);
  return result.toString();
};

const markdown = `
{幻想殺し|イマジンブレイカー}
`;

console.log(md2html(markdown));
```

The result is:

```html
<!-- formatted HTML -->
<p>
  <ruby>幻想殺し<rp>(</rp><rt>イマジンブレイカー</rt><rp>)</rp></ruby>
</p>
```

## Restrictions

Escaping like `\{Info\|Warning\}` is not supported due to **technical reason**. You can use inline code instead.
