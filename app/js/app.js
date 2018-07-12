var KTO = window.KTO || (window.KTO = {logs: '', version: '1.0.0'});

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

KTO.slider = function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: false,
                margin: 20
            }
        }
    });
};

KTO.higher = function () {
    var $higher = $('.details'),
        $text = $higher.find('h3'),
        hasLink = $text.find('a').length > 0,
        _str = '', high = 0;

    if (hasLink) {
        _str = $text.find('a').text();
    }
    else {
        _str = $text.text();
    }

    $higher.each(function (idx, elem) {
        var $text_list = $(elem).find('h3');
        high = 0;

        $text_list.each(function (idx, elem) {
            var $el = $(elem),
                cur_high = $el.outerHeight();

            if (cur_high > high) {
                high = cur_high;
            }
        });

        $text_list.each(function (idx, elem) {
            var $el = $(elem);

            if (high > 0) {
                $el.css('min-height', high)
                    .closest('.item').siblings().find('.details').find('h3').css('min-height', high);
            }
        });
    });

};

KTO.Datepicker = function () {
    if (isMobile.any()) {
        //$('.kto_datepicker').attr('type', 'date');
        $(".kto_datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy',
            yearRange: '1970:2020',
        });
    }
    else {
        $('.kto_datepicker').attr('type', 'text');
        $(".kto_datepicker").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy',
            yearRange: '1970:2020',
        });
    }
};

KTO.CheckBox = function () {
    var $check = $('.join-program form label.check'),
        hasCheck = $check.hasClass('checked');

    console.log('check');

    var num_check = 0;
    var enable_check = false;
    $check.on('click', function (evt) {
        var data_answer = $(this).attr('data-answer') === 'yes' ? true : false;
        console.log(data_answer);
        if (!enable_check) {
            $check.removeClass('checked')
            $(this).addClass('checked');
            console.log('check in');
        }
        data_answer = false;
        if (data_answer) {
            $('.join-program .answer').removeClass('selected_answer');
            $('.join-program .answer.answer-yes').addClass('selected_answer');
        }
        num_check++;
        if (num_check > 1) {
            num_check = 0;
        }
        console.log('check out: ', num_check);
    });
};

KTO.ValidateForm = function () {
    $('#frm_join').validator({
        disable: false
    });
    $('#frm_travel').validator({
        disable: false
    });
};

KTO.Loading = function () {
    if ($('body').hasClass('is_loading')) {
        $('body').removeClass('is_loading');
    }
};

KTO.Chosen = function () {
    $(".chosen-select").chosen({
        disable_search_threshold: 10
    });
}

KTO.Init = function () {
    KTO.higher();
    KTO.slider();
    KTO.Datepicker();
    KTO.CheckBox();
    KTO.ValidateForm();
    KTO.Loading();
    KTO.Chosen();
};

KTO.Resize = function () {
    KTO.Datepicker();
}


window.addEventListener('load', KTO.Init(), false);


$(window).resize(function () {
    KTO.Resize();
});



