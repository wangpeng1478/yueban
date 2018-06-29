/**
 *
 * @authors 王朋朋 (wang760635994@outlook.com)
 * @date    2017-08-18 14:58:35
 * @version $地图看房$
 * @company $上海德御地产$
 */
$(document).ready(function () {
    $("#regi-box1").hover(function () {
        $("#box-li").show();
    }, function () {
        $("#box-li").hide();
        $("#box-lis").hide();
    })
    $("#box-lis>a").hide();
    $("#box-li>a").hover(function () {
        $("#box-lis").show();
        var da = $(this).attr('data-flag');
        $("#box-lis>a[data-flag=" + da + "]").show();
        $("#box-lis a").not("#box-lis>a[data-flag=" + da + "]").hide();
        $(this).addClass("moren").siblings().removeClass('moren')
    }, function () {
        var da = $(this).attr('data-flag');
        $("#box-lis a").not("#box-lis>a[data-flag=" + da + "]").hide();
    });

    $("#box-lis").mouseleave(function () {
        $("#box-lis").hide();
    });
    $("#box-li a,#box-lis a").click(function () {
        var t = $(this).text();
        $("#box-input1").val(t);
    });
    // ============区域结束
    $("#regi-box2").hover(function () {
        $("#box-li2").show();
    }, function () {
        $("#box-li2").hide();
        $("#box-lis2").hide();
    })
    $("#box-lis2>a").hide();
    $("#box-li2>a").hover(function () {
        $("#box-lis2").show();
        var da = $(this).attr('data-flag');
        $("#box-lis2>a[data-flag=" + da + "]").show();
        $("#box-lis2 a").not("#box-lis2>a[data-flag=" + da + "]").hide();
        $(this).addClass("moren").siblings().removeClass('moren')
    }, function () {
        var da = $(this).attr('data-flag');
        $("#box-lis2 a").not("#box-lis2>a[data-flag=" + da + "]").hide();
    });

    $("#box-lis2").mouseleave(function () {
        $("#box-lis2").hide();
    });
    $("#box-li2 a,#box-lis2 a").click(function () {
        var t = $(this).text();
        $("#box-input2").val(t);
    });
    // ============地铁结束
    $("#regi-box3").hover(function () {
        $("#box-li3").show();
    }, function () {
        $("#box-li3").hide();
        $("#box-lis3").hide();
    });
    $("#box-lis3>a").hide();
    $("#box-li3>a").hover(function () {
        $("#box-lis3").show();
        var da = $(this).attr('data-flag');
        $("#box-lis3>a[data-flag=" + da + "]").show();
        $("#box-lis3 a").not("#box-lis3>a[data-flag=" + da + "]").hide();
        $(this).addClass("moren").siblings().removeClass('moren')
    }, function () {
        var da = $(this).attr('data-flag');
        $("#box-lis3 a").not("#box-lis3>a[data-flag=" + da + "]").hide();
    });

    $("#box-lis3").mouseleave(function () {
        $("#box-lis3").hide();
    });
    $("#box-lis3 a").click(function () {
        var t = $(this).text();
        $("#box-input3").val(t);
    });
    // ============价格结束
    $("#regi-box4").hover(function () {
        $("#box-li4").show();
    }, function () {
        $("#box-li4").hide();
    });
    $("#box-li4 a").click(function () {
        var t = $(this).text();
        $("#box-input4").val(t);
    });
    // =========
    $("#regi-box5").hover(function () {
        $("#box-li5").show();
    }, function () {
        $("#box-li5").hide();
    });
    $("#box-li5 a").click(function () {
        var t = $(this).text();
        $("#box-input5").val(t);
    });
    // ==========
    $("#regi-box6").hover(function () {
        $("#box-li6").show();
    }, function () {
        $("#box-li6").hide();
    });
    $("#box-li6 a").click(function () {
        var t = $(this).text();
        $("#box-input6").val(t);
    });

    // =========侧边高度
    function addheig() {
        var ks = $(window).height();
        var h = ks - 200;
        $(".mapFind-list").css('height', h + 'px');
    };
    addheig(); //执行
    $(window).resize(function () {
        addheig();
    });
    $(".mapFind-list").scroll(function () {
        var a = $(this).scrollTop(),
            t = $(".mapFind-list")[0].scrollHeight,
            e = $(this).height();
        a + e + 150 >= t && (g());
        a + e + 0 >= t && (c());
        g = function () {
            console.log("小于150");
        };

        c = function () {
            console.log("到底了")
        };
    });
    // 筛选
    $(".mapssxx>span").click(function () {
        $(this).addClass('map-moren').siblings().removeClass('map-moren');
    });




}); //页面加载结束


function toogmap() { //关闭
    $("#map-ul").animate({
        width: '0'
    });
    $(".map-ifra").css('margin-left', '0');
    $(".map-bar-filter").css('margin', 'auto');
    $(".toogcs").show();
    $(".toogc").hide();
}

function toogmaps() { //展开
    $("#map-ul").animate({
        width: '480px'
    });
    $(".map-ifra").css('margin-left', '480px');
    $(".map-bar-filter").css('margin', '0 0 0 480px');
    $(".toogcs").hide();
    $(".toogc").show();
    $("#map-ul").attr('style', 'width: 27%');

}

function rease() { //清空
    var a = $("#box-input1");
    var b = $("#box-input2");
    var c = $("#box-input3");
    var d = $("#box-input4");
    var e = $("#box-input5");
    var f = $("#box-input6");
    $(a).val("全部");
    $(b).val("全部");
    $(c).val("全部");
    $(d).val("全部");
    $(e).val("全部");
    $(f).val("全部");
}