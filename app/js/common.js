$(function(){
    $('.mobilemenutoggle').bind('click', function(){
        $(this).toggleClass('active');
        $('.main-menu:not(.others)').fadeToggle(300);
    });
});


$('.select2-search__field').on('focus', function () {
    // $(this).siblings('label').addClass('focused-label');
    $('.lable_optima-text').addClass('focused-labels');

});


//$('.input_focus-el.input_country').bind('focusout', function () {
// $('form input').bind('focusout', function () {
//     if ($(this).val() == '') {
//         $(this).siblings('label').removeClass('focused-label');
//         $(this).parent().removeClass("flat_before");
//     }
// });

$('.input_focus-el').bind('focus', function () {
    $(this).parent().css('border-bottom', '2px solid #d0ca55');
});

$('.input_focus-el.input_country').bind('focus', function () {
    $(this).parent().addClass("flat_before");
});

// Тут липкая шапка

$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }
});

