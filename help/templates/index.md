---
layout: help
title: Templates

---

Classeur uses [Handlebars](http://handlebarsjs.com/), a Mustache compatible template engine, when exporting files to your disk or when publishing blog posts. Classeur lets you modify existing templates or create your own one, and have full control over the data you export.


# File context

When processing a file, Handlebars receives the following context along with the template:

```javascript
{
  "file": {
    "name": "The filename",
    "content": {
      "properties": {
        "key1": "value1",
        "key2": "value2"
      },
      "text": "The content of your file",
      "html": "<p>The content of your file</p>"
    }
  }
}
```

So, for example, the following template:

```
<html>
<head>
<title>{{file.name}}</title>
<body>{{{file.content.html}}}</body>
</html>
```

will be transformed by the template engine into:

```
<html>
<head>
<title>The filename</title>
<body><p>The content of your file</p></body>
</html>
```


# Helpers

In addition to the default Handlebars helpers, Classeur adds its own ones.

## toYaml

The `toYaml` helper allows you to convert an object into YAML. Typically, to generate a YAML front matter from your file properties, you can prefix your template with:

```
---
{{#toYaml file.content.properties}}{{/toYaml}}
---
```


## Custom helpers

If you need more control, you can always create your own helpers in the settings. For example:

```javascript
Handlebars.registerHelper('transform', function (options) {
  var result = options.fn(this)
  return new Handlebars.SafeString(
    result.replace(/<pre[^>]*>/g, '<pre class="prettyprint">')
  )
})
```



