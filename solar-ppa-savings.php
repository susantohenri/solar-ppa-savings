<?php
/*
Plugin Name: Solar PPA Savings
*/

add_shortcode('solar-ppa-savings-calculator', function () {
    wp_register_style(
        'solar-ppa-savings',
        plugins_url('/solar-ppa-savings.css', __FILE__)
    );
    wp_enqueue_style('solar-ppa-savings', 999);

    wp_register_script(
        'numeral',
        plugins_url('/numeral.min.js', __FILE__)
    );
    wp_enqueue_script('numeral', 999);

    wp_register_script(
        'jquery-calx',
        plugins_url('/jquery-calx-2.2.6.min.js', __FILE__)
    );
    wp_enqueue_script('jquery-calx', 999);

    wp_register_script(
        'solar-ppa-savings',
        plugins_url('/solar-ppa-savings.js', __FILE__)
    );
    wp_enqueue_script('solar-ppa-savings', 999);

    ob_start();
    include('sheet-1.php');
    return ob_get_clean();
});
