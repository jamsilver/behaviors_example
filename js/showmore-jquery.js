(function($) {

  $(function() {
    $('.show-moreable').each(function() {
      var show_more_text = 'Show more';
      var show_less_text = 'Show less';
      apply_show_more($(this), show_more_text, show_less_text);
    });
  });



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