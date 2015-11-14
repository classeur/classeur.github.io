---
layout: help

---

# Templates

Classeur uses [Handlebars](http://handlebarsjs.com/) (a Mustache template engine) when exporting files to your disk or when publishing blog posts. You can modify existing templates or create your own one, and have full control over the data you export.


## File context

When processing a file, Handlebars receives the following context along with the template:

```json
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

So, for example:

- the expression `{% raw  %}{{ file.name }}{% endraw %}` will be replaced by `The filename` (HTML-escaped),
- the expression `{% raw  %}{{{ file.content.html }}}{% endraw %}` will be replace by `<p>The content of your file</p>`.


## Default helpers

In addition to the default Handlebars helpers, Classeur adds its own ones.

### toYaml

The `toYaml` helper allows you to convert an object into YAML. Typically, to generate a YAML front matter from your file properties, you can prefix your template with:

```
---{% raw  %}
{{#toYaml file.content.properties}}{{/toYaml}}
---{% endraw %}
```


## Custom helpers

If you need more control, you can always create your own helpers in the settings. For example:

```js
Handlebars.registerHelper('transform', function(options) {
    var result = options.fn(this);
    return new Handlebars.SafeString(
        result.replace(/<pre[^>]*>/g, '<pre class="prettyprint">')
    );
});
```



