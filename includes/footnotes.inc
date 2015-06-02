<?php

/**
 * @file
 * Show more example form.
 */

/**
 * Form constructor for the show more example form.
 */
function behaviors_example_footnotes($form, &$form_state, $variant = NULL, $table_sort = TRUE) {

  $number_of_rows = 10;

  $form['table_sort'] = array(
    '#type' => 'value',
    '#value' => $table_sort,
  );

  for ($item_id = 0; $item_id < $number_of_rows; $item_id++) {
    $form['items'][$item_id] = array(
      'copy' => array(
        '#prefix' => '<p>',
        '#markup' => _behaviors_example_generate_footnotey_copy(),
        '#suffix' => '</p>',
      ),
      'weight' => array(
        '#type' => 'weight',
        '#delta' => 50,
        '#default_value' => $item_id,
        '#title_display' => 'invisible',
        '#title' => t('Weight for @title', array('@title' => "item {$item_id}")),
      ),
      '#attributes' => array(),
    );
  }

  $module_path = drupal_get_path('module', 'behaviors_example');
  if (isset($variant)) {
    $form['#attached']['js'][] = "{$module_path}/js/{$variant}.js";
  }
  $form['#attached']['css'][] = "{$module_path}/behaviors_example.css";

  $form['actions'] = array(
    '#type' => 'actions',
    '#attributes' => array(
      'class' => array(
        'examples-nav',
      ),
    ),
  );
  if ($prev_step_uri = behaviors_example_get_previous_step_uri()) {
    $prev_step_uri['options']['attributes']['class'][] = 'button';
    $form['actions']['prev_step'] = array(
      '#type' => 'link',
      '#title' => t('Previous example'),
      '#href' => $prev_step_uri['path'],
      '#options' => $prev_step_uri['options'],
    );
  }
  if ($next_step_uri = behaviors_example_get_next_step_uri()) {
    $next_step_uri['options']['attributes']['class'][] = 'button';
    $form['actions']['next_step'] = array(
      '#type' => 'link',
      '#title' => t('Next example'),
      '#href' => $next_step_uri['path'],
      '#options' => $next_step_uri['options'],
    );
  }

  return $form;
}

/**
 * Return markup for the example footnote form.
 */
function theme_behaviors_example_footnotes($variables) {
  $form = $variables['form'];

  $enable_tablesort_mode = !empty($form['table_sort']['#value']);

  if ($enable_tablesort_mode) {
    drupal_add_tabledrag('footnotes-table', 'order', 'sibling', 'item-weight');
  }

  $header = array(
    t('Item'),
  );
  if ($enable_tablesort_mode) {
    $header[] = t('Weight');
  }
  $rows = array();
  foreach (element_children($form['items']) as $item_id) {
    $element = &$form['items'][$item_id];

    // Add special classes to be used for tabledrag.
    $element['weight']['#attributes']['class'] = array('item-weight');

    $row = array();
    $row[] = drupal_render($element['copy']);
    if ($enable_tablesort_mode) {
      $row[] = drupal_render($element['weight']);
    }
    else {
      hide($element['weight']);
    }

    $row = array_merge(array('data' => $row), $element['#attributes']);
    $row['class'][] = 'draggable';
    $rows[] = $row;
  }
  $output = '';
  $output .= theme('table', array('header' => $header, 'rows' => $rows, 'attributes' => array('id' => 'footnotes-table')));
  $output .= drupal_render_children($form['items']);
  $output .= drupal_render_children($form);
  return $output;
}

/**
 * Randomly generate a paragraph which may contain footnoted copy.
 */
function _behaviors_example_generate_footnotey_copy($word_count = 20) {
  module_load_include('inc', 'devel_generate');
  $copy = devel_create_greeking($word_count);
  // Randomly position some footnotes.
  $number_of_footnotes = mt_rand(0, 3);
  $positions = array();
  for ($i = 0; $i < $number_of_footnotes; $i++) {
    $positions[] = mt_rand(0, strlen($copy));
  }
  sort($positions);
  foreach (array_reverse($positions) as $pos) {
    $copy = substr_replace($copy, ' ' . _behaviors_example_generate_footnote() . ' ', $pos, 0);
  }
  return $copy;
}

/**
 * Randomly generate some footnoted copy.
 */
function _behaviors_example_generate_footnote() {
  $output = array();
  $output[] = '<span id="' . drupal_html_id('foot') . '" class="footnote">';
  $output[] = devel_create_greeking(40);
  $output[] = '</span>';
  return implode('', $output);
}
