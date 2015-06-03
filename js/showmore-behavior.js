(function($) {

  Drupal.behaviors.behaviorsExampleShowMore = {
    attach: function(context, settings) {
      $(context).find('.show-moreable').once('show-moreable', function() {
        // Allow strings to come from server.
        var strings = settings.behaviors_examples,
          show_more_text = strings.show_more_text || Drupal.t('Show more'),
          show_less_text = strings.show_less_text || Drupal.t('Show less');
        // Make the magic happen.
        apply_show_more($(this), show_more_text, show_less_text);
      });
    }
  };



  var apply_show_more = function($el, show_more_text, show_less_text) {
    var visible = true;
    var $show_more_link = $('<a href="javascript:void(0)"></a>');
    $show_more_link.click(function() {
      if ($el.is(':visible')) {
        $el.hide();
        $show_more_link.text(show_more_text);
      }
      else {
        $el.show();
        $show_more_link.text(show_less_text);
      }
    });
    $el.after($show_more_link);
    $show_more_link.click();
  };

})(jQuery);