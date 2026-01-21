<!DOCTYPE html>
<html>
<head>
	<title>PHP AsciiMath Test</title>
</head>
<body>
<?php

require("ASCIIMath2TeX.php");

$AMT = new AMtoTeX;

$imgurl = 'http://localhost/cgi-bin/mimetex.exe';

function makeimg($AMstring) {
	global $AMT, $imgurl;
	$tex = $AMT->convert($AMstring); //convert ASCIIMath string to TeX
	$url = $imgurl.'?'.rawurlencode($tex);
	return '<img src="'.$url.'" />';
}

echo '<p>'.makeimg('3 !sup A').'</p>';
echo '<p>'.makeimg('3 \\not\\supset A').'</p>';
echo '<p>'.makeimg('3 notsupset A').'</p>';
?>
</body>
</html>
