(function($) {

  $(function() {
    var footnotes = collect_footnotes();
    render_footnotes(footnotes);
  });

  /**
   * Scan the DOM & build ordered list of all footnotes.
   */
  var collect_footnotes = function() {
    var footnotes = [];
    var i = 0;
    $('.footnote').each(function() {
      var $footnote_trigger = $(this);
      var footnote = $footnote_trigger.text();
      if (footnote) {
        footnotes.push({
          trigger_id: $footnote_trigger.attr('id'),
          footnote_id: $footnote_trigger.attr('id') + '-footnote',
          note: footnote,
          symbol: '[' + (i++ + 1) + ']'
        });
      }
    });
    return footnotes;
  };

  /**
   * Render all footnotes.
   *
   * This renders the appropriate symbol next to each footnote link
   * and the footnote list itself.
   */
  var render_footnotes = function(footnotes) {
    var $content = $('#content');
    if ($content) {
      $('.footnote-link').remove();
      // Hide original footnote span & add link.
      for (var i = 0; i < footnotes.length; i++) {
        if (footnotes[i]) {
          var footnote = footnotes[i];
          var $footnote_trigger = $('#' + footnote.trigger_id);
          $footnote_trigger
            .hide()
            .after(Drupal.theme('behaviors_example_footnote_link', footnote.symbol, footnote.footnote_id));
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
  Drupal.theme.prototype.behaviors_example_footnote_link = function(symbol, footnote_id) {
    var output = '';
    output += '<a href="#' + footnote_id + '" class="footnote-link">';
    output += symbol;
    output += '</a>';
    return output;
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
          output += Drupal.theme('behaviors_example_footnote', footnote.footnote_id, footnote.note);
          output += '</dt>';
        }
      }
      output += '</dl>';
      output += '</div>';
    }
    return output;
  };


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
  };

})(jQuery);