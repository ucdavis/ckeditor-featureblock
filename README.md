# ckeditor-featureblock

The Feature Block (labeled "Feature Box" in the UI) is a custom CKEditor plugin
for the CKEditor WYSIWYG. The output is basically a [title
with a content body](http://ucd-one-patternlab.s3-website-us-west-1.amazonaws.com/?p=molecules-feature-block).
This makes it useful for highlighting some content in the main body of text.

It also provides an option for alignment within the page.

Markup output:
```
<aside class="wysiwyg-feature-block u-align--right u-width--half">
  <h3 class="wysiwyg-feature-block__title">Title</h3>
  <div class="wysiwyg-feature-block__body">
    <p>Content</p>
  </div>
</aside>

```
