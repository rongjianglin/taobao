<?php
$name = $_POST["name"];
$score = $_POST["score"];

mysql_connect("localhost","root","root");
mysql_select_db("test");
$a = mysql_query("select * from enroll where name = '$name' and score = '$score'");
$row = mysql_fetch_assoc($a);
if($row){
    setcookie("global","12555",time() + 1000*3600*96, "/");
    echo json_encode(array(
        "erron" => 1,
        "data" =>"登陆成功"

    ));
} else{
    echo json_encode(array(
        "erron" => 0,
        "data" => "登陆失败"

    ));
}


?>