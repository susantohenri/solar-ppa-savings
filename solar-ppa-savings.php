<?php
/*
Plugin Name: Solar PPA Savings
*/

add_shortcode('solar-ppa-savings-calculator', function () {
    wp_register_style(
        'solar-ppa-savings',
        plugins_url('/solar-ppa-savings.css', __FILE__),
        [],
        6
    );
    wp_enqueue_style('solar-ppa-savings');

    wp_register_script(
        'numeral',
        plugins_url('/numeral.min.js', __FILE__)
    );
    wp_enqueue_script('numeral');

    wp_register_script(
        'jquery-flot',
        plugins_url('/jquery.flot.min.js', __FILE__)
    );
    wp_enqueue_script('jquery-flot');

    wp_register_script(
        'jquery-calx',
        plugins_url('/jquery-calx-2.2.6.min.js', __FILE__)
    );
    wp_enqueue_script('jquery-calx');

    wp_register_script(
        'html2pdf',
        plugins_url('/html2pdf.bundle.js', __FILE__)
    );
    wp_enqueue_script('html2pdf');

    wp_register_script(
        'solar-ppa-savings',
        plugins_url('/solar-ppa-savings.js', __FILE__),
        [],
        9
    );
    wp_enqueue_script('solar-ppa-savings');

    ob_start();
    include('tabs.php');
    return ob_get_clean();
});
