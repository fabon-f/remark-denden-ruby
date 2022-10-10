import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import remarkDendenRuby from './index.js'

function md2html(md) {
  return unified().use(remarkParse).use(remarkDendenRuby).use(remarkHtml).processSync(md).toString().replace(/\n$/, "")
}

test('inline code', () => {
  assert.is(md2html('`{a|b}`'), '<p><code>{a|b}</code></p>')
})

test('ruby', () => {
  assert.is(md2html('今日は{学校|がっこう}に行った。'), '<p>今日は<ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby>に行った。</p>')
  assert.is(md2html('{学校|がっこう}{行事|ぎょうじ}'), '<p><ruby>学校<rp>(</rp><rt>がっこう</rt><rp>)</rp></ruby><ruby>行事<rp>(</rp><rt>ぎょうじ</rt><rp>)</rp></ruby></p>')
})

test('monoruby', () => {
  assert.is(md2html('{修学旅行|しゅう|がく|りょ|こう}'), '<p><ruby>修<rp>(</rp><rt>しゅう</rt><rp>)</rp>学<rp>(</rp><rt>がく</rt><rp>)</rp>旅<rp>(</rp><rt>りょ</rt><rp>)</rp>行<rp>(</rp><rt>こう</rt><rp>)</rp></ruby></p>')
})

test('invalid monoruby', () => {
  assert.is(md2html('{体育祭|たいいく|さい}'), '<p><ruby>体育祭<rp>(</rp><rt>たいいくさい</rt><rp>)</rp></ruby></p>')
})

test('surrogate pair', () => {
  assert.is(md2html('{𠮷野家|よし|の|や}'), '<p><ruby>𠮷<rp>(</rp><rt>よし</rt><rp>)</rp>野<rp>(</rp><rt>の</rt><rp>)</rp>家<rp>(</rp><rt>や</rt><rp>)</rp></ruby></p>')
})

test('inside other elements', () => {
  assert.is(md2html('* {鳥|とり}かご'), '<ul>\n<li><ruby>鳥<rp>(</rp><rt>とり</rt><rp>)</rp></ruby>かご</li>\n</ul>')
  assert.is(md2html('**{鳥|とり}かご**'), '<p><strong><ruby>鳥<rp>(</rp><rt>とり</rt><rp>)</rp></ruby>かご</strong></p>')
})

test.run()
