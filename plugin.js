(function ($) {
  'use strict';

  CKEDITOR.plugins.add('feature_block', {
    requires: 'widget',

    // Register the icon used for the toolbar button. It must be the same
    // as the name of the widget.
    icons: 'feature_block',
    hidpi: true,

    // Configure CKEditor DTD for custom drupal-entity element.
    // @see https://www.drupal.org/node/2448449#comment-9717735
    beforeInit: function (editor) {
      var dtd = CKEDITOR.dtd;

      dtd['feature-block'] = {'div': 1};
      for (var tagName in dtd) {
        if (dtd[tagName].p) {
          dtd[tagName]['feature-block'] = 1;
        }
      }
    },

    init: function (editor) {
      // Register the editing dialog.
      CKEDITOR.dialog.add('feature_block', this.path + 'dialogs/feature_block.js');

      // Add our plugin-specific CSS to style the widget within CKEditor.
      editor.addContentsCss(this.path + 'css/feature-block.css');

      // Add toolbar button for this plugin.
      editor.ui.addButton('feature_block', {
        label: 'Feature Box',
        command: 'feature_block',
        toolbar: 'insert,10',
        icon: this.path + 'icons/' + (CKEDITOR.env.hidpi ? 'hidpi/' : '') + 'feature_block.png'
      });

      // Register the widget.
      editor.widgets.add('feature_block', {
        // Create the HTML template
        template:
          '<feature-block class="u-width--half u-align--right">' +
            '<div slot="title">Title</div>' +
            '<div slot="body"><p>Content</p></div>' +
          '</feature-block>',

        editables: {
          title: {
            selector: '[slot="title"]',
            allowedContent: 'span'
          },
          content: {
            selector: '[slot="body"]'
          }
        },

        // Prevent the editor from removing these elements
        allowedContent: 'feature-block(u-align--right, u-align--left, u-width--half); div(!slot)',

        // The minimum required for this to work
        requiredContent: 'feature-block',

        // Convert any feature-block element into this widget
        upcast: function (element) {
          return element.name === 'feature-block' || element.hasClass('wysiwyg-feature-block');
        },

        // Set the widget dialog window name. This enables the automatic widget-dialog binding.
        // This dialog window will be opened when creating a new widget or editing an existing one.
        dialog: 'feature_block',

        // When a widget is being initialized, we need to read the data ("align")
        // from DOM and set it by using the widget.setData() method.
        // More code which needs to be executed when DOM is available may go here.
        init: function () {
          if (this.element.hasClass('u-align--left')) {
            this.setData('align', 'left');
          }
          else if (this.element.hasClass('u-align--right')) {
            this.setData('align', 'right');
          }
          else {
            this.setData('align', 'none');
          }

          // Convert legacy markup to the new web component markup.
          convertLegacyMarkup(this.element);
        },

        // Listen on the widget#data event which is fired every time the widget data changes
        // and updates the widget's view.
        // Data may be changed by using the widget.setData() method
        data: function () {
          // Remove all align classes and set a new one if "align" widget data is set.
          this.element.removeClass('u-width--half');
          this.element.removeClass('u-align--left');
          this.element.removeClass('u-align--right');
          this.element.removeClass('u-align--center');
          if (this.data.align && this.data.align !== 'none') {
            this.element.addClass('u-width--half');
            this.element.addClass('u-align--' + this.data.align);
          }
        }

      });

    }

  });

  /**
   * Convert any old markup into the newer web component markup.
   *
   * @param {CKEDITOR.dom.element} element
   */
  function convertLegacyMarkup(element) {
    if (element.hasClass('wysiwyg-feature-block')) {
      // Pull out the old data.
      var title = element.findOne('.wysiwyg-feature-block__title').getHtml();
      var content = element.findOne('.wysiwyg-feature-block__body').getHtml();

      // Insert the old data into the new template markup.
      var newMarkup = '<div slot="title">' + title + '</div>' +
        '<div slot="body">' + content + '</div>';

      element.removeClass('wysiwyg-feature-block');
      element.renameNode('feature-block');
      element.setHtml(newMarkup);
    }
  }

})(jQuery);
