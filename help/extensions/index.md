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
```


### Abbreviations

A description of markdown abbreviations can be found [here](https://www.npmjs.com/package/markdown-it-abbr).

To disable abbreviations, set the file property `ext:markdown:abbr` to `false`.

### Breaks

A description of markdown breaks can be found [here](https://help.github.com/articles/writing-on-github/#newlines). To disable breaks, set the file property `ext:markdown:breaks` to `false`.

### Definition lists

A description of markdown definition lists can be found [here](http://pandoc.org/README.html#definition-lists). To disable definition lists, set the file property `ext:markdown:deflist` to `false`.

### Strikethrough

A description of markdown strikethrough can be found [here](https://help.github.com/articles/github-flavored-markdown/#strikethrough). To disable definition lists, set the file property `ext:markdown:del` to `false`.

### Fenced code blocks

A description of markdown fenced blocks can be found [here](https://help.github.com/articles/github-flavored-markdown/#fenced-code-blocks). To disable definition lists, set the file property `ext:markdown:fence` to `false`.



