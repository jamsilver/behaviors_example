(function($) {

  /*
   * Standard jQuery document ready callback.
   */
  $(function() {
    $('.show-moreable').each(function() {
      apply_show_more($(this));
    });
  });




  var show_more_text = Drupal.t('Show more');
  var show_less_text = Drupal.t('Show less');

  var apply_show_more = function($el) {
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