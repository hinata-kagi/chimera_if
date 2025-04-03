<?php

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// google apiのロード
require_once(__DIR__."/vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$client = new Google\Client();
$client->setAuthConfig($_ENV["CONFIG_NAME"]);
$client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);

$service = new Google_Service_Sheets($client);

$spreadsheetId = $_ENV["SPREADSHEETS_ID"];

$response = $service->spreadsheets_values->get($spreadsheetId, "data!A:A");

echo json_encode($response);

?>