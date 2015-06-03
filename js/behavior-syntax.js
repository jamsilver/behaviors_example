(function() {

  /**
   * Drupal 7 behaviors syntax.
   */
  Drupal.behaviors.behaviorsExampleBasicSyntax = {

    attach: function(context, settings) {

    },

    detach: function(context, settings, trigger) {
      // trigger is one of:
      //  unload
      //  move
      //  serialize
    }
  };




  /**
   * Drupal 6 behaviors syntax.
   */
  Drupal.behaviors.behaviorsExampleBasicSyntax = function(context) {
    var settings = Drupal.settings.module_name;
  };

})(jQuery);