---
layout: help
title: Extensions

---

Extensions can be enabled/disabled via file properties. For example, to enable emojies in your file, create a property with the key `ext:emoji` and the value `true`.

![enter image description here](https://i.imgur.com/v5WRILY.png)

You can also enable/disable extensions by modifying the default properties in the settings.

# Markdown

All the following Markdown extensions are enabled by default.

```
ext:markdown:abbr
ext:markdown:breaks
ext:markdown:deflist
ext:markdown:del
ext:markdown:fence
ext:markdown:footnote
ext:markdown:linkify
ext:markdown:sub
ext:markdown:sup
ext:markdown:table
ext:markdown:typographer
```

For example, to enable strict CommonMark compliance:

```
ext:markdown:abbr           false
ext:markdown:breaks         false
ext:markdown:deflist        false
ext:markdown:del            false
ext:markdown:footnote       false
ext:markdown:linkify        false
ext:markdown:sub            false
ext:markdown:sup            false
ext:markdown:table          false
ext:markdown:typographer    false
```


## Abbreviations

A description of Markdown abbreviations can be found [here](https://www.npmjs.com/package/markdown-it-abbr).

To disable abbreviations, set the property `ext:markdown:abbr` to `false`.

## Breaks

A description of Markdown breaks can be found [here](https://help.github.com/articles/writing-on-github/#newlines).

To disable breaks, set the property `ext:markdown:breaks` to `false`.

## Definition lists

A description of Markdown definition lists can be found [here](http://pandoc.org/README.html#definition-lists).

To disable definition lists, set the property `ext:markdown:deflist` to `false`.

## Strikethrough

A description of Markdown strikethrough can be found [here](https://help.github.com/articles/github-flavored-markdown/#strikethrough).

To disable definition lists, set the property `ext:markdown:del` to `false`.

## Fenced code blocks

A description of Markdown fenced blocks can be found [here](https://help.github.com/articles/github-flavored-markdown/#fenced-code-blocks).

To disable definition lists, set the property `ext:markdown:fence` to `false`.

## Footnotes

A description of Markdown footnotes can be found [here](http://pandoc.org/README.html#footnotes).

To disable footnotes, set the property `ext:markdown:footnote` to `false`.

## Linkify

The linkify extension auto-converts URL-like text to links.

To disable linkify, set the property `ext:markdown:linkify` to `false`.

## Subscripts, superscripts

A description of Markdown subscripts and superscripts can be found [here](http://pandoc.org/README.html#superscripts-and-subscripts).

To disable subscripts, set the property `ext:markdown:sub` to `false`.
To disable superscripts, set the property `ext:markdown:sup` to `false`.

## Tables

A description of Markdown tables can be found [here](https://help.github.com/articles/github-flavored-markdown/#tables).

To disable tables, set the property `ext:markdown:table` to `false`.

## Typographer

The typographer extension enables some language-neutral replacement and quotes beautification.

To disable typographer, set the property `ext:markdown:typographer` to `false`.


# MathJax

The MathJax extension is enabled by default. The TeX delimiters are [those used by pandoc](http://pandoc.org/README.html#math).

To configure MathJax, you can specify JSON values as properties `ext:mathjax:tex` and `ext:mathjax:tex2jax`.
To disable MathJax, set the property `ext:mathjax` to `false`.


# Emoji

To enable emoticons, set the property `ext:emoji` to `true`.
By default, it will enable shortcuts like `:)` and `:-(`. To disable shortcuts, set the property `ext:emoji:shortcuts` to `false`.

