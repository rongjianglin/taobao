

var global = getCookie("global")
var list = document.querySelector(".list-group")
if (global) {

}
else {
    location.href = "./login.html?target=" + location.href;

}

var local = JSON.parse(localStorage.getItem("local")) || []
console.log(localStorage.getItem("local"))
console.log(local.length)
if (local.length) {
    list.innerHTML = "";
    local.forEach(function (item) {
        list.innerHTML += `
            <li class="list-group-item">
            <div class="item">
               <input type="checkbox">
            </div>
            <div class="item">
                    <img src=${item[8]}>
            </div>
            <div class="item ">
                <span class="info">${item[1]}</span>

            </div>
            <div class="item">
                <span>￥${item[2]}</span>
            </div>
            <div class="operate">
                    <div class="btn-group" role="group" aria-label="..."> 
                            <button type="button" class="btn btn-default" name = "decrease" data-id ="${item[0]}">-</button>
                            <button type="button" class="btn btn-default" disabled>${item[16]}</button>
                            <button type="button" class="btn btn-default" name = "increase" data-id ="${item[0]}">+</button>
                        </div>
            </div>
        </li>
        
        `

    }

    );
}
else {

    list.innerHTML = `
        <h1>你的购物车空空如也,<a href = "./2.html">请去选购商品</a></h1>
    
    `
}
//用事件委托改变数量
list.onclick = function (e) {
    var e = e || window.event;
    var target = e.target
    if (target.name === "decrease") {
        var data = target.getAttribute("data-id")
        var p = local.find(function (item) {
            return item[0] == data
        })
        if (p[16] > 1) {
            p[16]--;
            target.nextElementSibling.innerHTML--
            localStorage.setItem("local", JSON.stringify(local))



        }

        else {
            var json = JSON.parse(localStorage.getItem("local"))
            for (var i = 0; i < json.length; i++) {
                if (json[i][0] === data) {
                    json.splice(i, 1)
                    break;
                }
            }
            localStorage.setItem("local", JSON.stringify(json))
            target.parentNode.parentNode.parentNode.innerHTML = ""
            console.log(local.length)
            console.log(list)
            //购物车为空
            if(local.length == 1){
                list.innerHTML = `
                <h1>你的购物车空空如也,<a href = "./2.html">请去选购商品</a></h1>
    
                        `
            }




        }



    }
    else if (target.name === "increase") {
        var data = target.getAttribute("data-id")
        var p = local.find(function (item) {
            return item[0] == data
        })
        console.log(p)
        console.log(p[16])
        if (p) {
            p[16]++;
            console.log(p[16])
            target.previousElementSibling.innerHTML++;
        }
        localStorage.setItem("local", JSON.stringify(local))

    }

}

