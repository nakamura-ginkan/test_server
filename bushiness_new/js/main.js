$(document).ready(function() {


      function setMV() {
        var minus = 0
        var mainID = 'mv'

        //mv
        function heightSetting() {
          windowH = $(window).height();
          mainH = windowH - minus;
          $('#' + mainID).height(mainH + 'px');
        }
        heightSetting();

        //header scroll
        function headSet() {
          //header scroll
          window.addEventListener("scroll", function () {
            // ヘッダーを変数の中に格納する
            const header = document.querySelector("header");
            // XXXpx以上スクロールしたらヘッダーに「scroll-nav」クラスをつける
            header.classList.toggle("scroll-nav", window.scrollY > windowH - 440);
          });
          //logo scroll
            $(window).on("scroll", function () {
              const sliderHeight = $("#mv").height();
              if (windowH - 440 < $(this).scrollTop()) {
                $(".js-header").addClass("headerLogoScroll");
              } else {
                $(".js-header").removeClass("headerLogoScroll");
              }
          });//logo scroll
        }
        headSet();

        function spmenu() {
          $('.menu-trigger').on('click', function() {
            $(this).toggleClass('active');
            return false;
          });
        }
        spmenu();

        //resize
        $(window).resize(function() {
          heightSetting();
          headSet();



        });//resize

        //特定要素の高さを揃えて横幅が小さい場合は解除させる
        if( $('.listheight').length ){
              var w = $(window).width();
              if( w > 767 ){
                  $('.listheight').matchHeight();
              }else{
                  $('.listheight').matchHeight({remove: true});
              }
              $(window).resize(function(){
                  if( w <= 768 && $(window).width() > 767 ){
                      $('.listheight').matchHeight();
                  }
                  if( w > 767 && $(window).width() <= 768 ){
                      $('.listheight').matchHeight({remove: true});
                  }
                  w = $(window).width();
              })
          }

          //導入事例左右高さ
          if( $('.sideHeight').length ){
                var w = $(window).width();
                if( w > 767 ){
                    $('.sideHeight').matchHeight();
                }else{
                    $('.sideHeight').matchHeight({remove: true});
                }
                $(window).resize(function(){
                    if( w <= 768 && $(window).width() > 767 ){
                        $('.sideHeight').matchHeight();
                    }
                    if( w > 767 && $(window).width() <= 768 ){
                        $('.sideHeight').matchHeight({remove: true});
                    }
                    w = $(window).width();
                })
            }

      }
      setMV();

      //sp menu
      function setSmartMenu(){
        $('.hamburger').click(function() {
          $(this).toggleClass('active');

          if ($(this).hasClass('active')) {
              $('.globalMenuSp').addClass('active');
          } else {
              $('.globalMenuSp').removeClass('active');
          }

        });

        //メニュー内を閉じておく
        $('.globalMenuSp a[href]').click(function() {
          $('.globalMenuSp').removeClass('active');
          $('.hamburger').removeClass('active');
        });
      }
      setSmartMenu();

});
