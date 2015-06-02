(function($) {

  var footnotes = [];

  Drupal.behaviors.behaviorsExampleFootnotes = {

    attach: function(context, settings) {
      if ($(context).find('.footnote').length) {
        footnotes = collect_footnotes();
        index_footnotes(footnotes);
        render_footnotes(footnotes);
      }
    },

    detach: function(context, settings, trigger) {
      if (trigger === 'unload') {
        var $footnote_links = $(context).find('.footnote-link');
        if ($footnote_links.length) {
          // Remove all trace of footnotes linked to in the removed content.
          $footnote_links.each(function () {
            var $footnote_link = $(this);
            for (var i = 0; i < footnotes.length; i++) {
              if (footnotes[i]) {
                var footnote = footnotes[i];
                if (('#' + footnote.footnote_id) === $footnote_link.attr('href')) {
                  remove_footnote(i);
                  break;
                }
              }
            }
          });
          // Need to reset numbering.
          index_footnotes(footnotes);
          render_footnotes(footnotes);
        }
      }
    }
  };

  /**
   * Scan the DOM & build ordered list of all footnotes.
   */
  var collect_footnotes = function() {
    var footnotes = [];
    var i = 0;
    $('.footnote').each(function() {
      var $footnote_trigger = $(this);
      footnotes.push({
        trigger_id: $footnote_trigger.attr('id'),
        footnote_id: $footnote_trigger.attr('id') + '-footnote',
        note: $footnote_trigger.html()
      });
    });
    return footnotes;
  };

  /**
   * Assign symbols to footnotes.
   */
  var index_footnotes = function(footnotes) {
    var footnote_index = 1;
    for (var i = 0; i < footnotes.length; i++) {
      if (footnotes[i]) {
        var footnote = footnotes[i];
        footnote.symbol = '[' + (footnote_index++) + ']';
      }
    }
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
      var at_least_one_footnote = false;
      $('.footnote-link').remove();
      // Hide original footnote span & add link.
      for (var i = 0; i < footnotes.length; i++) {
        if (footnotes[i]) {
          var footnote = footnotes[i];
          at_least_one_footnote = true;
          var $footnote_trigger = $('#' + footnote.trigger_id);
          $footnote_trigger
            .hide()
            .after(Drupal.theme('behaviors_example_footnote_link', footnote.symbol, footnote.footnote_id));
        }
      }
      // Render the footnote list at the foot of the page.
      $content.find('.footnotes-wrapper').remove();
      if (at_least_one_footnote) {
        $content.append(Drupal.theme('behaviors_example_footnotes', footnotes));
      }
    }
  };

  /**
   * Remove the footnote at the given index of our array.
   */
  var remove_footnote = function(footnote_index) {
    if (footnotes[footnote_index]) {
      var footnote = footnotes[footnote_index],
        $footnote_link = $('#' + footnote.trigger_id),
        $footnote_target = $('#' + footnote.footnote_id),
        $footnote = $footnote_target.closest('dt').prev().addBack();
      $footnote.remove();
      $footnote_link.remove();
      delete footnotes[footnote_index];
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
      output += '<p>';
      output += 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.';
      output += '</p>';
      output += '<div class="show-moreable message warning">';
      output += 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.';
      output += '</div>';
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
    output += note;
    output += '</span>';
    return output;
  };

})(jQuery);