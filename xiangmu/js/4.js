var search = window.location.search;
var id = search.split("=")[1];
var media = document.querySelector(".media");
var transfer = null;
if (id) {
    AJAX.get("../php/4.php", { id: id }, function (data) {
        console.log(data.data)
         transfer = data.data
        if (!data.error) {
            
            media.innerHTML = "";
            media.innerHTML = `
    <div class="media-left">
      
      <div class="big">
           <div class="movebig">
           </div>
           <img src="${data.data[8]}" alt="">
      </div>
   
      <div class="bigbox" style="background:url('${data.data[7]}') no-repeat 0 0;">
        

    </div>
   
    
  </div>
  <div class="media-body">
      <h4 class="media-heading">${data.data[1]}</h4>
      <div class="price">
          <span class="glyphicon glyphicon-yen"></span>
          <span class="text">${data.data[2]}</span>
      </div>
      <div>
          <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">XL</button>
          <button type="button" class="btn btn-default">XXL</button>
          <button type="button" class="btn btn-default">XXXL</button>
      </div>
      </div>
      <div>
          <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-default" name="shop" id="shop">立即购买</button>
              <button type="button" class="btn btn-default" name= "add" id="add">加入购物车</button>
              
            </div>
      </div>

       `//放大镜
            var big = document.querySelector(".big")
            var movebig = document.querySelector(".movebig")
            var bigbox = document.querySelector(".bigbox")
            //鼠标进入，

            big.onmouseenter = function (e) {
                console.log(data.data[7])

                movebig.style.display = "block"
                bigbox.style.display = "block"
                //进入时鼠标位置
                var left1 = e.pageX
                var top1 = e.pageY
                //元素距页面距离
                var left2 = big.parentNode.offsetLeft
                var top2 = big.parentNode.offsetTop
                
                big.onmousemove = function (e) {
                    //鼠标移动后鼠标位置
                    var left3 = e.pageX
                    var top3 = e.pageY
                    //鼠标移动距离
                    var left4 = left1 - left2
                    var top4 = top1 - top2
                    //进入时bigmove定位距离
                    var left5 = left3 - left1
                    var top5 = top3 - top1
                    //移动后bigmove定位距离
                    var left6 = left5 + left4 - 1 / 2 * (movebig.clientWidth)
                    var top6 = top5 + top4 - 1 / 2 * (movebig.clientHeight)
                    //限定movebig只在big中移动
                    if (left6 < 0) {
                        left6 = 0
                    }
                    if (left6 > (big.clientWidth - movebig.clientWidth)) {
                        left6 = big.clientWidth - movebig.clientWidth
                    }
                    if (top6 < 0) {
                        top6 = 0
                    }
                    if (top6 > (big.clientHeight - movebig.clientHeight)) {
                        top6 = big.clientHeight - movebig.clientHeight
                    }
                    //属性赋值
                    movebig.style.left = left6 + "px";
                    movebig.style.top = top6 + "px";
                    //定义比例，当元素没在页面上显示时，得不到元素的属性
                    var r = (800 - 200) / (big.clientHeight - movebig.clientHeight)
                    //当movebig移动时，bigbox的背景图向外移动
                    bigbox.style.backgroundPositionX = -left6 * r + "px"
                    bigbox.style.backgroundPositionY = -top6 * r + "px"


                }
            }
            //鼠标离开
            big.onmouseleave = function () {
                movebig.style.display = "none"
                bigbox.style.display = "none"
            }
            var home = document.querySelector("#home")
            home.innerHTML = `${data.data[6]}`
        }

    })
    
    media.onclick = function (e) {
        var e = e || window.event;
        console.log(e.target)
        console.log(transfer)
        if (e.target.name === "add") {

            var global = getCookie("global")
            if (global) {
                var local = JSON.parse(localStorage.getItem("local")) || [];
                console.log(local)
                console.log(local[0])
           
                if(local.length){
                    console.log(local.length)
                 
                    console.log(transfer[0])
                    console.log(local[0])
                   var p =  local.find(function(item){
                       return item[0]  == transfer[0]
                   })
                   console.log(p)
                   if(p){
                      
                      p[16]++
                   }
                   else{
                        transfer[16] = 1
                        local.push(transfer)
                   }
                   localStorage.setItem("local",JSON.stringify(local))
                }
                
                else{
                    transfer[16] = 1
                    local.push(transfer)
                    console.log(local[4])
                    localStorage.setItem("local",JSON.stringify(local))
                }
             }

               
            } 

        
        if (e.target.name === "shop") {
            var global = getCookie("global")
            if (global) {
                location.href = "./3.html"
            } else {
                location.href = "./login.html?target=" + encodeURIComponent(location.href)
            }
        }
    }
} else {
    media.innerHTML = `
    <h1>你没有欣赏商品，请去<a href = "./2.html">页面</a></h1

    `
}




