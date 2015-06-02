(function($) {

  Drupal.behaviors.behaviorsExampleRemoveRow = {

    attach: function(context, settings) {
      $(context).find('.remove-row').once('remove-row').bind('click.removerow', function(e) {
        var $link = $(this);
        $tr = $link.closest('tr');
        Drupal.detachBehaviors($tr.get(0));
        $tr.remove();
        e.stopPropagation();
        e.preventDefault();
        return false;
      });
    }
  };

})(jQuery);