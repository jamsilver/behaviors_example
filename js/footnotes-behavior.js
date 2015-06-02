(function($) {

  var footnotes = [];

  /*
   * Standard Drupal 7 behavior.
   */
  Drupal.behaviors.behaviorsExampleFootnotes = {
    attach: function(context, settings) {
      footnotes = [];
      // Build list of footnotes.
      $('.footnote').each(function() {
        var $footnote_trigger = $(this);
        var footnote = $footnote_trigger.data('footnote');
        if (footnote) {
          var footnote_link_id = $footnote_trigger.attr('id') + '-footnote';
          footnotes.push({
            id: footnote_link_id,
            '$footnote_trigger': $footnote_trigger,
            note: footnote
          });
        }
      });
      render_footnotes();
    }
  };

  var render_footnotes = function() {
    var $content = $('#content');
    if ($content) {
      // Update symbols & hrefs of inline footnote links.
      for (var i = 0; i < footnotes.length; i++) {
        if (footnotes[i]) {
          var footnote = footnotes[i];
          footnote['$footnote_trigger'].attr('href', '#' + footnote.id);
          footnote.symbol = '[' + (i + 1) + ']';
          footnote['$footnote_trigger'].text(footnote.symbol);
        }
      }
      // Render the footnote list at the foot of the page.
      $content.find('.footnotes-wrapper').remove();
      $content.append(Drupal.theme('behaviors_example_footnotes', footnotes));
    }
  };


  /**
   * Provide markup for the page footnotes.
   *
   * @param footnotes
   *
   * @returns {string}
   */
  Drupal.theme.prototype.behaviors_example_footnotes = function(footnotes) {
    var output = '';
    if (footnotes.length) {
      output += '<div class="footnotes-wrapper">';
      output += '<h3>';
      output += Drupal.t('Footnotes');
      output += '</h3>';
      output += '<dl class="footnotes">';
      for (var i = 0; i < footnotes.length; i++) {
        if (footnotes[i]) {
          var footnote = footnotes[i];
          output += '<dd>';
          output += footnote.symbol;
          output += '</dd>';
          output += '<dt>';
          output += Drupal.theme('behaviors_example_footnote', footnote.id, footnote.note);
          output += '</dt>';
        }
      }
      output += '</dl>';
      output += '</div>';
    }
    return output;
  }


  /**
   * Provide markup for the page footnotes.
   *
   * @param id
   * @param note
   *
   * @returns {string}
   */
  Drupal.theme.prototype.behaviors_example_footnote = function(id, note) {
    var output = '';
    output += '<a id="' + id + '" class="footnote-anchor"></a>';
    output += '</a>';
    output += '<span class="footnote-note">';
    output += Drupal.checkPlain(note);
    output += '</span>';
    return output;
  }

})(jQuery);