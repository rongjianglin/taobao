<?php
    $name = $_POST["name"];
    $score = $_POST["score"];
    
    mysql_connect("localhost","root","root");
    mysql_select_db("test");
    $a = mysql_query("select * from enroll where name = '$name' and score = '$score'");
   
    $row = mysql_fetch_assoc($a);
    if($row){
        
        echo json_encode(array(
            "erron" => 0,
            "data" =>"注册失败"
    
        ));
    } else{
        $b = mysql_query("insert into enroll (name,score) values ('$name','$score')");
        echo json_encode(array(
            "erron" => 1,
            "data" =>"注册成功"
    
        ));
        
    }
    


?>