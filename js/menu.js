$(document).ready(function () {

    let login = 'login';
    let uploadForm = 'upload-form';

    // Menu behavior
    $('#login').on('click', function () {
        $('#upload-form').removeClass('item-menu-ativo');
        $(this).addClass('item-menu-ativo');

        $('.upload-form').fadeOut('fast');
        $('.login').removeClass('hidden').fadeIn('slow');
    });

    $('#upload-form').on('click', function () {
        $('#login').removeClass('item-menu-ativo');
        $(this).addClass('item-menu-ativo');

        $('.login').fadeOut('fast');
        $('.upload-form, #form-content').removeClass('hidden').fadeIn('slow');
    });

    $('#' + login).on('mouseover', function () {
        $('#upload-form').removeClass('mouseOverMenu');
        $(this).addClass('mouseOverMenu');
    });

    $('#' + uploadForm).on('mouseover', function () {
        $('#login').removeClass('mouseOverMenu');
        $(this).addClass('mouseOverMenu');
    });
});
