---
layout: help

---

# Extensions

Extensions can be enabled/disabled via file properties. For example, to enable Emoji, create a property with key `ext:emoji` and value `true`:

![enter image description here](https://i.imgur.com/v5WRILY.png)


## Markdown

All the following markdown extensions are enabled by default.

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
ext:markdown:toc
```


### Abbreviations

A description of markdown abbreviations can be found [here](https://www.npmjs.com/package/markdown-it-abbr).

To disable abbreviations, set the property `ext:markdown:abbr` to `false`.

### Breaks

A description of markdown breaks can be found [here](https://help.github.com/articles/writing-on-github/#newlines).

To disable breaks, set the property `ext:markdown:breaks` to `false`.

### Definition lists

A description of markdown definition lists can be found [here](http://pandoc.org/README.html#definition-lists).

To disable definition lists, set the property `ext:markdown:deflist` to `false`.

### Strikethrough

A description of markdown strikethrough can be found [here](https://help.github.com/articles/github-flavored-markdown/#strikethrough).

To disable definition lists, set the property `ext:markdown:del` to `false`.

### Fenced code blocks

A description of markdown fenced blocks can be found [here](https://help.github.com/articles/github-flavored-markdown/#fenced-code-blocks).

To disable definition lists, set the property `ext:markdown:fence` to `false`.

### Footnotes

A description of markdown footnotes can be found [here](http://pandoc.org/README.html#footnotes).

To disable footnotes, set the property `ext:markdown:footnote` to `false`.

### Linkify

The linkify extension auto-converts URL-like text to links.

To disable linkify, set the property `ext:markdown:linkify` to `false`.

### Subscripts, superscripts

A description of markdown subscripts and superscripts can be found [here](http://pandoc.org/README.html#superscripts-and-subscripts).

To disable subscripts, set the property `ext:markdown:sub` to `false`.
To disable superscripts, set the property `ext:markdown:sup` to `false`.

### Tables

A description of markdown tables can be found [here](https://help.github.com/articles/github-flavored-markdown/#tables).

To disable tables, set the property `ext:markdown:table` to `false`.

### Typographer

The linkify extension enables some language-neutral replacement and quotes beautification.

To disable typographer, set the property `ext:markdown:typographer` to `false`.

### Table Of Contents

A description of markdown table of contents can be found [here](https://pythonhosted.org/Markdown/extensions/toc.html).

To specify the depth of the table of contents, set a number value in the property `ext:markdown:tocdepth` (default is 6).
To disable table of contents, set the property `ext:markdown:toc` to `false`.



