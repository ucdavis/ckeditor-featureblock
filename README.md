# ckeditor-featureblock

The Feature Block (labeled "Feature Box" in the UI) is a custom CKEditor plugin
for the CKEditor WYSIWYG. The output is basically a [title
with a content body](http://ucd-one-patternlab.s3-website-us-west-1.amazonaws.com/?p=molecules-feature-block).
This makes it useful for highlighting some content in the main body of text.

It also provides an option for alignment within the page.

Markup output:
```
<feature-block class="u-width--half u-align--right">
  <div slot="title">Title</div>
  <div slot="body"><p>Content</p></div>
</feature-block>
```

This markup can be used as a web component or filtered on output to display any
desired markup. The advantage of this data model is that it is now based on a
standard web component.
