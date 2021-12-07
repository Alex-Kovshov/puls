
$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 700,
      dots: false,
      //adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/slick/chevron-left-solid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/slick/chevron-right-solid.png"</button>',
      responsive: [
        {
          breakpoint: 950,
          settings: {
            dots: true,
            arrows: false,
        }
      }
    ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
      $(this)
        .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
        })
      })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('fast')
    });

    $('.btn--item').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('fast');
      });
    });




      function validateForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 4,

            },
            phone: {

              required: true,


            },
            email: {
              required: true,
              email: true
            }
          },
          messages: {

            name: "Пожалуйста, введите свое имя",
            email: {
              required: "Пожалуйста, введите свой email",
              email: "Пожалуйста, введите свой email"
            },
            phone: {
              required: "Пожалуйста, введите свой номер телефона",
              email: "Пожалуйста, введите свой номер"
            }
          }
      });
      };
      validateForms('#consultation-form');
      validateForms('#order form');
      validateForms('#consultation form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "../../mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
        });
          return false;
      });

      //Smooth scroll and page up

      $(window).scroll(function() {
        if ($(this).scrollTop() > 900) {
          $('.pageup').fadeIn();
        
        } else {
          $('.pageup').fadeOut();
        }
      });

      $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      })

      new WOW().init();
  });

