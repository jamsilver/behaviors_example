<?php

/**
 * @file
 * Show more example form.
 */

/**
 * Form constructor for the show more example form.
 */
function behaviors_example_show_more($form, &$form_state, $variant = NULL, $no_js_use = FALSE) {

  $form['#tree'] = TRUE;
  $form['items_fieldset'] = array(
    '#type' => 'fieldset',
    '#title' => t('A variable list of things'),
    // Set up the wrapper so that AJAX will be able to replace the fieldset.
    '#prefix' => '<div id="items-fieldset-wrapper">',
    '#suffix' => '</div>',
  );

  // Build the fieldset with the proper number of items. We'll use
  // $form_state['num_items'] to determine the number of textfields to build.
  if (empty($form_state['num_items'])) {
    $form_state['num_items'] = 1;
  }
  for ($i = 0; $i < $form_state['num_items']; $i++) {
    $form['items_fieldset']['items'][$i] = array(
      'copy' => array(
        '#markup' => '<p>Lorem ipsum dolor sit amet...</p>',
      ),
      'more' => array(
        '#prefix' => '<div class="show-moreable messages warning">',
        '#suffix' => '</div>',
        '#markup' => '<p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet </p>',
      ),
    );
  }
  $form['items_fieldset']['buttons'] = array(
    '#type' => 'actions',
  );
  $form['items_fieldset']['buttons']['add_item'] = array(
    '#type' => 'submit',
    '#value' => t('Add one more'),
    '#submit' => array('behaviors_example_show_more_add_one'),
    // See the examples in behaviors_example.module for more details on the
    // properties of #ajax.
    '#ajax' => array(
      'callback' => 'behaviors_example_show_more_callback',
      'wrapper' => 'items-fieldset-wrapper',
    ),
  );
  if ($form_state['num_items'] > 1) {
    $form['items_fieldset']['buttons']['remove_item'] = array(
      '#type' => 'submit',
      '#value' => t('Remove one'),
      '#submit' => array('behaviors_example_show_more_remove_one'),
      '#ajax' => array(
        'callback' => 'behaviors_example_show_more_callback',
        'wrapper' => 'items-fieldset-wrapper',
      ),
    );
  }

  if ($no_js_use) {
    // Remove the #ajax from the above, so ajax.js won't be loaded.
    if (!empty($form['items_fieldset']['buttons']['remove_item']['#ajax'])) {
      unset($form['items_fieldset']['buttons']['remove_item']['#ajax']);
    }
    unset($form['items_fieldset']['buttons']['add_item']['#ajax']);
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
 * Callback for both ajax-enabled buttons.
 *
 * Selects and returns the fieldset with the items in it.
 */
function behaviors_example_show_more_callback($form, $form_state) {
  sleep(1);
  return $form['items_fieldset'];
}

/**
 * Submit handler for the "add-one-more" button.
 *
 * Increments the max counter and causes a rebuild.
 */
function behaviors_example_show_more_add_one($form, &$form_state) {
  $form_state['num_items']++;
  $form_state['rebuild'] = TRUE;
}

/**
 * Submit handler for the "remove one" button.
 *
 * Decrements the max counter and causes a form rebuild.
 */
function behaviors_example_show_more_remove_one($form, &$form_state) {
  if ($form_state['num_items'] > 1) {
    $form_state['num_items']--;
  }
  $form_state['rebuild'] = TRUE;
}