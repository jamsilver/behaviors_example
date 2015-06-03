(function() {

  /**
   * Drupal 7 behaviors syntax.
   */
  Drupal.behaviors.behaviorsExampleBasicSyntax = {

    /**
     * Gets called:
     *  - On the whole document on document ready,
     *  - When new content has just been added to the DOM,
     *  - When content has just been moved within the DOM.
     */
    attach: function(context, settings) {
    },

    /**
     * Gets called:
     *  - When content is about to be removed from the DOM (unload),
     *  - When content is about to be moved within the DOM (move),
     *  - On a form when it is about to be submitted (serialize).
     */
    detach: function(context, settings, trigger) {
    }
  };




  /**
   * Drupal 6 behaviors syntax.
   */
  Drupal.behaviors.behaviorsExampleBasicSyntax = function(context) {
    var settings = Drupal.settings.module_name;
  };

})(jQuery);