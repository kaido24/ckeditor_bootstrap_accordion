<?php

/**
 * @file
 * Contains \Drupal\ckeditor_bootstrap_accordion\Plugin\CKEditorPlugin\CKEditorBootstrapAccordion.
 */

namespace Drupal\ckeditor_bootstrap_accordion\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "CKEditorBootstrapAccordion" plugin.
 *
 * @CKEditorPlugin (
 *   id = "bootstrap_accordion",
 *   label = @Translation("CKEditorBootstrapAccordion"),
 *   module = "ckeditor_bootstrap_accordion"
 * )
 */
class CKEditorBootstrapAccordion extends CKEditorPluginBase {
  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $config = array();
    return $config;
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return array(
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
	return drupal_get_path('module', 'ckeditor_bootstrap_accordion') . '/js/plugins/bootstrap_accordion/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
	$path = drupal_get_path('module', 'ckeditor_bootstrap_accordion') . '/js/plugins/bootstrap_accordion/icons';
    return array(
      'BootstrapAccordion' => array(
        'label' => t('Add Accordion'),
		'image' => $path . '/bootstrap_accordion.png',
      ),
    );
  }
}
