var username = document.querySelector("#inputEmail3")
var password = document.querySelector("#inputPassword3")

var login = document.querySelector("#login")
var enroll = document.querySelector("#enroll")
login.onclick =function(){
    AJAX.post("../php/login.php",{name:username.value,score:password.value},function(data){
        console.log(data);
    
        if(data.erron){
            var ser = location.search.split("=")[1]
            console.log(ser)
            if(ser){
                location.href = decodeURIComponent(ser)
            }
            else{
                location.href = "1.html"
            }
        
        }
        else{
            alert("该用户不存在")
            location.href =" ./login.html"
        }
})
}
enroll.onclick = function(){
    AJAX.post("../php/enroll.php",{name:username.value,score:password.value},function(data){
        
        if(data.erron){
            
            location.href = "1.html"
            
        }else{
            alert("该用户已存在")
        }
        })
}