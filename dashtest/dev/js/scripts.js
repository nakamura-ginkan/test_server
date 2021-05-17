var app = app || {};

var spBreak = 767.98;
var mdBreak = 1199.98;
var offsetY;

app.init = function () {

  app.showMenu();
  app.btnTop();
  app.dateSelect();
  app.detectBrowserDevices();
  app.customScrollbar();
  app.listTabs();
  app.loadMore();
  app.modal();
  app.lightbox();
  app.tooltip();
  app.showCalendar();
  app.preloadImages();
  app.toggleActive();

};

app.isMobile = function () {

  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;

};

app.isDesktop = function () {

  return window.matchMedia('(min-width: ' + mdBreak + 'px)').matches;

};

app.dateSelect = function () {
  var element = $('.js-date-select');
  var items = element.find('.term-item');

  element.on('click', '.term-item', function (e) {
    var currentTarget = $(e.currentTarget);
    items.not(currentTarget).removeClass('is-active');
    currentTarget.addClass('is-active');
    if (currentTarget.hasClass('is-custom') && !app.isDesktop()) {
      var content = currentTarget.find('.js-content');
      content.slideDown('fast');
    } else {
      element.find('.js-content').slideUp();
    }
  });
};

app.btnTop = function () {

  var btnTop = $('.js-button-to-top');

  btnTop.click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  btnTopFade();

  $(window).on('load scroll resize', function () {
    btnTopFade();
  });

  function btnTopFade () {
    if ($(window).scrollTop() > $(window).height() * 0.01) {
      btnTop.addClass('is-show');
    } else {
      btnTop.removeClass('is-show');
    }
  }
};

app.detectBrowserDevices = function () {
  var html = $('html');
  var ua = navigator.userAgent;
  var userAgentLowerCase = ua.toLowerCase();

  if (navigator.platform.toLowerCase().indexOf('mac') >= 0) {
    html.addClass('is-mac');
  }
  if (userAgentLowerCase.indexOf('safari') != -1) {
    if (userAgentLowerCase.indexOf('chrome') > -1) {
      html.addClass('is-chrome');
    } else {
      html.addClass('is-safari');
    }
  }
  if(ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1) {
    html.addClass('is-ie');
  }
  if(userAgentLowerCase.indexOf('firefox') > -1){
    html.addClass('is-firefox');
  }

  if (userAgentLowerCase.indexOf('android') > -1) {
    html.addClass('is-android');
  }

  if (userAgentLowerCase.match(/(iphone|ipod|ipad)/)) {
    html.addClass('is-iphone');
  }
};

app.lightbox = function () {

  var lightbox = $('.js-lightbox-popup'),
    button = $('.js-open-lightbox');

  var init = function () {

    button.click(function () {
      open($(this).attr('data-lightbox'));
    });

    lightbox.find('.js-popup-close').click(function () {
      close($(this).parents('.js-lightbox-popup'));
    });

    lightbox.on('click', function (e) {
      if ($(e.target).parents('.lightbox-window').length == 0) {
        close($(this));
      }
    });

  };

  var open = function (lightboxID) {
    offsetY = window.pageYOffset;

    $('.js-lightbox-popup[data-lightbox="' + lightboxID + '"]').fadeIn('fast', function () {
      $('body').css({
        position: 'fixed',
        top: -offsetY + 'px',
        width: '100%'
      });

      $(document).on('touchmove', function (e) {
        if ($(e.target).parents('.window').length == 0) return false;
      });
    });

  };

  var close = function (target) {
    $(window).scrollTop(offsetY);
    target.fadeOut('fast');
    $(document).off('touchmove');
    $('body').css({
      position: 'static',
      top: 'auto'
    });
  };

  if (lightbox.length) init();
};

app.modal = function () {
  var modal = $('.js-modal-popup'),
    button = $('.js-open-modal');

  modal.css({'top': '0', 'left': '0'});

  $(window).on('click', function (e) {
    var target = $(e.target);
    if (!target.hasClass('js-open-modal') && !target.parents('.js-modal-popup').length) {
      modal.removeClass('is-show');
      button.removeClass('is-active');
    }
  });

  var init = function () {
    button.on('click', function (e) {
      e.preventDefault();
      offsetY = window.pageYOffset;

      var currentButton = $(e.currentTarget);
      var wrapper = currentButton;
      var modalId = currentButton.attr('data-modal');

      if (!app.isDesktop()) {
        currentButton.blur();
      }

      if (currentButton.hasClass('is-toggle') && currentButton.hasClass('is-active')) {
        modal.removeClass('is-show');
        button.removeClass('is-active');
        return;
      }

      if (currentButton.hasClass('has-wrapper')) {
        wrapper = currentButton.parents('.calendar-input-group');
      }

      if (app.isDesktop() && currentButton.attr('data-modal-desktop')) {
        modalId = currentButton.attr('data-modal-desktop');
      }

      var currentModal = $('.js-modal-popup[data-modal="' + modalId + '"]');
      modal.removeClass('is-show');
      button.removeClass('is-active');

      if( app.isDesktop()) {
        var x = wrapper.offset().left;
        var y = wrapper.offset().top + wrapper.height();
        currentModal.css({'top': '' + y + 'px', 'left': '' + x + 'px'});
      } else {
        $('body').css({
          position: 'fixed',
          top: -offsetY + 'px',
          width: '100%'
        });
      }

      currentButton.addClass('is-active');
      currentModal.addClass('is-show');

    });

    $('.js-modal-close').on('click', function () {
      $(this).parents('.js-modal-popup').removeClass('is-show');
      $('.js-open-modal').removeClass('is-active');
      $('body').css({
        position: 'static',
        top: 'auto'
      });

      if (!app.isDesktop()) {
        $(window).scrollTop(offsetY);
      }

      setTimeout(function () {
        modal.css({'top': '0', 'left': '0'});
      }, 300);
    });
  };

  if (modal.length) init();
};



app.showMenu = function () {
  var buttonMenu = $('.js-button-menu');
  var menu = $('.js-menu');
  offsetY = window.pageYOffset;

  var closeMenu = function () {
    $('.HeaderNavigation').scrollTop(0);
    $('body').css({
      position: 'static',
      top: 'auto'
    });
    $(window).scrollTop(offsetY);
    menu.removeClass('is-show');
  };

  buttonMenu.on('click', function (e) {
    e.preventDefault();
    if (app.isDesktop()) {
      menu.toggleClass('is-hidden');
      return;
    }

    menu.toggleClass('is-show');
    if (menu.hasClass('is-show')) {
      offsetY = window.pageYOffset;
      $('body').css({
        position: 'fixed',
        top: -offsetY + 'px',
        width: '100%'
      });
    } else {
      closeMenu();
    }
    return false;
  });

  $('.js-overlay').on('click', function () {
    closeMenu();
  });
};

app.customScrollbar = function () {
  $(window).on('load resize', function () {
    if (app.isDesktop()) {
      $('.js-menu').mCustomScrollbar({
        axis: 'y',
        autoHideScrollbar: true,
        theme: 'nav-theme',
        scrollInertia: 100
      });
    }
  });

  $('.js-menu').on('DOMMouseScroll mousewheel', function(ev) {
    var $this = $(this),
      scrollTop = this.scrollTop,
      scrollHeight = this.scrollHeight,
      height = $this.innerHeight(),
      delta = ev.originalEvent.wheelDelta,
      up = delta > 0;

    var prevent = function() {
      ev.stopPropagation();
      ev.preventDefault();
      ev.returnValue = false;
      return false;
    }

    if (!up && -delta > scrollHeight - height - scrollTop) {
      // Scrolling down, but this will take us past the bottom.
      $this.scrollTop(scrollHeight);
      return prevent();
    } else if (up && delta > scrollTop) {
      // Scrolling up, but this will take us past the top.
      $this.scrollTop(0);
      return prevent();
    }
    return prevent();
  });
};

app.listTabs = function () {
  if ($('.js-list-tabs').length) {
    var element = $('.js-list-tabs');
    var init = function () {
      element.on('click', 'li', function () {
        var tabId = $(this).attr('data-tab');
        var wrapper = $(this).parents('.js-list-tabs');
        var contentClass = wrapper.data('selector');
        var listTarget = wrapper.find('li');

        $('.' + contentClass).removeClass('is-active');
        $(listTarget).not($(this)).removeClass('is-active');
        $(this).addClass('is-active');
        $('#' + tabId).addClass('is-active');
      });
    };
    if ($(element).length) {
      init();
    }
  }
};

app.loadMore = function () {
  var element = $('.js-show-more');

  element.on('click', '.button-read-more', function () {
    var currentTarget = $(this).parents('.js-show-more');
    currentTarget.addClass('is-show');
  });
};

app.tooltip = function () {
  var buttonTooltip = $('.js-button-tooltip');
  buttonTooltip.each(function (index, item) {
    var currentButton = $(item);
    currentButton.on('click', function () {
      var tooltipId = $(this).attr('data-tooltip');
      var currentTooltip = $('#' + tooltipId);
      var xValue = currentButton.offset().left + (currentButton.width() / 2) - (currentTooltip.width() / 2);
      var x = xValue + 'px';
      var y = currentButton.offset().top + currentButton.height() + 'px';

      if ($(this).hasClass('is-active')) {
        $('.tooltip-wrapper').removeClass('is-active');
        buttonTooltip.removeClass('is-active');
        return;
      }

      $('.tooltip-wrapper').not(currentTooltip).removeClass('is-active');
      buttonTooltip.not(currentButton).removeClass('is-active');

      if (app.isMobile()) {
        currentButton.addClass('is-bottom');
        y = currentButton.offset().top - currentTooltip.height();
        if (y < 200) {
          currentButton.removeClass('is-bottom');
          y = currentButton.offset().top + currentButton.height();
        }
      }

      if (app.isDesktop() && xValue < 280) {
        x = $('.main-content').css('padding-left');
      }

      currentTooltip.addClass('is-active');
      $(this).addClass('is-active');
      currentTooltip.css({'top': y, 'left': x});

      if (app.isDesktop() && xValue + currentTooltip.width() > $(window).width()) {
        currentTooltip.css({'top': y, 'left': 'auto', 'right': '40px'});
      }

    });
  });

  $('.tooltip-wrapper').on('click', '.tooltip-close',   function () {
    $('.tooltip-wrapper').removeClass('is-active');
    buttonTooltip.removeClass('is-active');
  });

  $(window).on('click', function (e) {
    var target = $(e.target);
    if (!target.hasClass('js-button-tooltip') && !target.parents('.tooltip-wrapper').length) {
      $('.tooltip-wrapper').removeClass('is-active');
      buttonTooltip.removeClass('is-active');
    }
  });

  $(window).on('resize', function () {
    $('.tooltip-wrapper').removeClass('is-active');
    buttonTooltip.removeClass('is-active');
  });
};

app.showCalendar = function () {
  var wrapper = $('.js-show-calendar');
  wrapper.each(function (i, item) {
    var currentElement = $(item);
    var items = currentElement.find('.js-calendar-item');
    var index = 1;
    $(items[index]).addClass('is-show');

    currentElement.on('click', '.button-prev', function (e) {
      e.preventDefault();
      index -= 1;
      if (index < 0) {
        index = 0;
        return;
      }
      var currentItem = $(items[index]);
      items.not(currentItem).removeClass('is-show');
      currentItem.addClass('is-show');
    });

    currentElement.on('click', '.button-next', function (e) {
      e.preventDefault();
      index += 1;
      if (index > items.length - 1){
        index = items.length - 1;
        return;
      }
      var currentItem = $(items[index]);
      items.not(currentItem).removeClass('is-show');
      currentItem.addClass('is-show');
    });
  });
};

app.preloadImages = function () {
  var images = [];
  function preload () {
    var i;
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
    }
  }
  preload(
    '../img/common/ico_home_hover.png',
    '../img/common/ico_accumulation_hover.png',
    '../img/common/ico_new_people_hover.png',
    '../img/common/ico_visit_hover.png',
    '../img/common/ico_qr_hover.png',
    '../img/common/ico_customer_sales_hover.png',
    '../img/common/ico_number_customers_hover.png',
    '../img/common/ico_fav_hover.png',
    '../img/common/ico_comment_hover.png',
    '../img/common/ico_average_hover.png',
    '../img/common/ico_time_hover.png',
    '../img/common/ico_repeat_hover.png',
    '../img/common/ico_continue_hover.png',
    '../img/common/ico_treatment_hover.png',
    '../img/common/ico_logout_hover.png',
    '../img/common/logo_hover.png',
    '../img/common/ico_question_hover.png',
    '../img/common/ico_arrow_next_hover.png'
  );
};

app.toggleActive = function () {
  var element = $('.js-toggle-active');
  element.on('click', function () {
    $(this).toggleClass('is-active');
  });

  element.on('click', 'a',  function (e) {
    e.stopPropagation();
  });

  $(document).on('click', function (e) {
    var target = $(e.target);
    if (!target.hasClass('js-toggle-active') && !target.parents('.js-toggle-active').length) {
      element.removeClass('is-active');
    }
  });
};

$(function () {

  app.init();

});
