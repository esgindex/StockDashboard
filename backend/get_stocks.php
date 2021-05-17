<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');


$db_host = "localhost";
$db_name = "esgindex_db1";
$db_user = "esgindex_viacheslav";
$db_password = "cp4^oRaI7DA1";
$db_conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if ( $db_conn->connect_error ){
    die("DB connection failed:" . $db_conn->connect_error);
}

$stock = "";
if ( isset($_GET['stock'])){
    $stock = $_GET['stock'];
}

$result_data = array();
$result_data["esg"] = array();
$result_data["esg_list"] = array();

$total_count = 0;
$query = "Select Count(*) From ESGScore";
$result = mysqli_query($db_conn, $query);
if ( $result ){
    $row = mysqli_fetch_array($result);
    if ( $row ){
        $total_count = $row[0];
        $total_count = intval($total_count);
    }
}


$query = "Select ESGScore.* , FIND_IN_SET( ESGScores_Total, (SELECT GROUP_CONCAT(ESGScores_Total  ORDER BY ESGScores_Total desc) FROM ESGScore) ) AS rank From ESGScore left join securitymaster as sm on sm.SecId=ESGScore.Secid Where sm.Symbol='".$stock."' limit 1";
$result = mysqli_query($db_conn, $query);


if ( $result ){
    $index = 0;
    while($row=mysqli_fetch_array($result)){
        $result_data["esg"][$index] = $row;
        $result_data['esg'][$index]["rank_priority"] = "High";
        
        $rank = intval($row["rank"]);
        if ( $rank >= ($total_count * 2 / 3) ){
            $result_data['esg'][$index]["rank_priority"] = "Low";    
        }
        else if ( $rank >= ($total_count * 1 / 3) ){
            $result_data['esg'][$index]["rank_priority"] = "Medium";    
        }
        
        $result_data["esg"][$index]["esg_total"] = $esg_total;
        
        $index++;
    }
}


$query = "Select ESGScore.ESGScores_Total, ESGScore.ESGScores_Environmental, ESGScore.ESGScoresSocial, ESGScore.ESGScores_Governance, securitymaster.Symbol From ESGScore left join securitymaster on securitymaster.SecId=ESGScore.Secid Order by ESGScore.ESGScores_Total desc limit 5";
$result = mysqli_query($db_conn, $query);
if ( $result ){
    $index = 0;
    while($row=mysqli_fetch_array($result)){
        $result_data["esg_list"][$index] = $row;
        $index++;
    }
}

echo json_encode($result_data);
?>