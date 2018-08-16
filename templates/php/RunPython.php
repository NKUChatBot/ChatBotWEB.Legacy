<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/8/14
 * Time: 20:58
 */
function test($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

//$python = "D:/mine/program/git/NKUQA/WorkPlace/chenjie-de-WorkPlace/chatbot-UI/python/ask.py ";
$python = "../python/ask.py";
//$python = "/Users/MacBook/Desktop/nku_project/NKU-Q-A/WrokPlace/chenjie-de-WorkPlace/py3_who/main/p3_test.py ";
$question = $_POST['input'];
$stripQ = str_replace('"','', test($question));

exec("python ".$python.'"'.$question.'"' , $answer,$status);

$answer = implode("\n",$answer);
$answer = test($answer);

echo json_encode($answer);
