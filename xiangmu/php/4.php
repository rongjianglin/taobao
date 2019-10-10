<?php
$id = $_GET["id"];

mysql_connect("localhost","root","root");
mysql_select_db("test");
$a = mysql_query("select * from goods where goods_id = '$id'");
$row = mysql_fetch_row($a);

if($row){
    echo json_encode(array(
        "error" => 0,
        "data" => $row
    ));

}else{
    echo json_encode(array(
        "error" => 1,
        "data" => ""
    ));
};


?>