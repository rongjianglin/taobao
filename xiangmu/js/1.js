var $banner = $(".banner")
console.log($banner)
var $ul1 = $(".clearFix")
console.log($ul1)
var $ul2 = $(".cirs")
console.log($ul2)
var $leftBtn = $("#leftBtn")
console.log($banner)
var $rightBtn = $("#rightBtn")
console.log($rightBtn)
var x = $banner.width()
console.log(x)
var idx = 0;
var s = true;
$rightBtn.click(function () {
    if (s === false) {
        return
    }
    s = false
    idx++;
    $ul1.stop().animate({ left: -idx * x }, 1000, function () {
        s = true
        if (idx == $ul1.children().length - 1) {

            idx = 0;
            $ul1.css("left", 0)

        }
        $ul2.children().eq(idx).addClass("active").siblings().removeClass("active")

    })
})

$leftBtn.click(function () {
    if (s === false) {
        return;
    }
    s = false
    idx--;
    if (idx < 0) {
        idx = $ul1.children().length - 1;
        $ul1.css("left", idx * -x)
        idx--;
    }
    $ul1.stop().animate({ left: -idx * x }, 1000, function () {
        s = true
        $ul2.children().eq(idx).addClass("active").siblings().removeClass("active")

    })


})


var timer = setInterval(function () {
    $rightBtn.trigger("click")
}, 2000)

$banner.hover(function () {
    clearInterval(timer)
}, function () {
    timer = setInterval(function () {
        $rightBtn.trigger("click")
    }, 2000)

})
var global = getCookie("global")
var login = document.querySelector(".header #login")
var enroll = document.querySelector(".header #enroll")
if (global) {
    login.innerHTML = "登出";
    enroll.innerHTML = ""
    login.onclick = function () {
        var exp = new Date();
        exp.setTime(exp.getTime() + -1 * 1000);
        console.log(exp.toGMTString())
        document.cookie = "global='';path=/;domain=localhost;expires=" + exp.toGMTString()
        login.innerHTML = "亲,请先登录";
        enroll.innerHTML = "注册"
        login.onclick = function () {
            location.href = "./login.html"
        }
        enroll.onclick = function () {
            location.href = "./login.html"
        }
    }
}
else {
    login.onclick = function () {
        location.href = "./login.html"
    }
    enroll.onclick = function () {
        location.href = "./login.html"
    }

}
var row = document.querySelector("#row")
const pag = function () {
    return new Promise(function (resolve, reject) {
        AJAX.get("../php/shop.php", {}, function (data) {
            if (!data.error) {
                resolve(data)
            }
            else { reject("报错了") }

        })

    });
}
async function fun() {
    let data = await pag()
    console.log(data.data)
    row.innerHTML = ""
    for (var i = 0; i < data.data.length; i++) {

        row.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <img src="${data.data[i].goods_big_logo}"
                    class="img-responsive" alt="Responsive image">
                <div class="desc">
                    ${data.data[i].goods_name}
                </div>
                <div class="price">
                    <i class="glyphicon glyphicon-yen"></i>
                    <span class="">${data.data[i].goods_price}</span>
                </div>
                <div class="clearfix">
                    <a href="./3.html" class="pull-left">去购物车</a>
                    <a href="./4.html?id=${data.data[i].goods_id}" class="pull-right">查看详情</a>
                </div>
            </div>
        `

    }

}

let p = fun()
p.then(function () {
    console.log("执行完毕")
})
    .catch(function (err) {
        console.log(err)
        console.log("报错了")
    })

