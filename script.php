<?php 

	$band = $_POST['band'];

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://rest.bandsintown.com/artists/'.$band.'?app_id=quiklyApp');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$parsed_json = curl_exec($ch);

	echo $parsed_json;
	return false;
 ?>