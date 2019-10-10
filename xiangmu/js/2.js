// function fun(){
//     return new Promise(function(resolve,reject){
//        AJAX.get("../php/2.php",{},function(data){
//            if(data.num){
//                resolve(data)
//            }else{
//                reject("报错了")
//            }
//        })

//     })
// }
// async function se(){
//     var a = new fun()
// }
// var p = se()
// p.then(function(){
//     console.log("执行完毕")
// }).catch(function(){
//     console.log("报错")
// })

const pag = function(){
    return new Promise(function(resolve,reject){
        AJAX.get("../php/2.php",{},function(data){
            if(!data.error){
                    resolve(data)
            }
            else{reject("报错了")}
            
        })
        
    });
} 
async function fun(){
    let data = await pag()
    let con = document.querySelector(".container")
    let p = new Pagination(con,{
        pageInfo:{
            currentPage: 1,
            totalSize: data.data.length,
            pageSize: 8,
            totalPage: Math.ceil(data.data.length / 8)
        },
        textInfo: {
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "末页"
        },
        data: data.data
    })
}
let p = fun()
p.then(function(){
    console.log("执行完毕")
})
.catch(function(err){
    console.log(err)
    console.log("报错了") 
})