<?php
mysql_connect('localhost',"root","root");
$a  = mysql_select_db("test");
$b = "select * from goods where goods_id <= 840";
$c  = mysql_query($b);
$arr = array();
$i = 0;
while($row = mysql_fetch_assoc($c)){
array_push($arr,$row);
$i++;
}
$arr1 = array(
            "error" => 0,
            "data" =>$arr,
            "count" => $i
);
echo json_encode($arr1);


?>