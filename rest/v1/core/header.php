<?php 

error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset:UTF-8");
header("WWW-AUTHENTICATE: BASIC realm='Protected zone'");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-type,Authorization");
header("Access-Control-Allow-Method: PUT,POST,GET,OPTIONS,DELETE");
