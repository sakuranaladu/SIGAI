$(function () {
    login();

    var upsSwiper = new Swiper('.swiper-container', {
        speed: 1000,
        longSwipes: false,
        loop: true,
        autoplay: {
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            autoplayStop: function() {
                this.$el.find(".ups-icon-videoplay").addClass('stop-status');
            },
            autoplayStart: function() {
                this.$el.find(".ups-icon-videoplay").removeClass('stop-status');
            },

        }
    });

    upsSwiper.$el.find(".ups-icon-videoplay").on('click', function() {
        if (upsSwiper.autoplay.running) {
            upsSwiper.autoplay.stop();
        } else {
            upsSwiper.autoplay.start();
        }
    });

    swiperHeight = upsSwiper.height;

    window.onscroll = function scroll() {
        if (window.pageYOffset / upsSwiper.height < 1) {
            scrollScale = window.pageYOffset / swiperHeight;
        } else {
            scrollScale = 1;
        }

        upsSwiper.slides.find(".img").transform('translateY(-' + 18 * scrollScale + '%)') //滚动一屏swiper高度则图片向上18%（范围0-40）

    }
});

function login(){
    $('.J_login').on('click', 'li', function () {
        var $self = $(this),
            index = $self.index();
        $self.addClass('cur').siblings('li').removeClass('cur');
        if(index === 0) {
            $('.model').removeClass('hidden').find('.register').removeClass('hidden').siblings('div').addClass('hidden');
        } else {
            $('.model').removeClass('hidden').find('.login').removeClass('hidden').siblings('div').addClass('hidden');
        }
        console.log(index, 'index');
    });

    //去注册
    $('.J_to_register').on('click', function () {
        $('.J_login li:eq(0)').addClass('cur').siblings('li').removeClass('cur');
        $('.model').removeClass('hidden').find('.register').removeClass('hidden').siblings('div').addClass('hidden');
    });

    //去登录
    $('.J_to_login').on('click', function () {
        $('.J_login li:eq(1)').addClass('cur').siblings('li').removeClass('cur');
        $('.model').removeClass('hidden').find('.login').removeClass('hidden').siblings('div').addClass('hidden');
    });

    //忘记密码
    $('.J_forget_pass').on('click', function () {
        $('.J_login li:eq(1)').addClass('cur').siblings('li').removeClass('cur');
        $('.model').removeClass('hidden').find('.forget-password').removeClass('hidden').siblings('div').addClass('hidden');
    });
}