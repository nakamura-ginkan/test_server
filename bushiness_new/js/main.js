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




      }
      setMV();
});
