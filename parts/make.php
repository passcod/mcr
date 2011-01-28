<?php

$version = chop(file_get_contents('../VERSION'));

header('Content-type: text/plain');

ob_start();

include("jquery.js");
include("json2.js");

$js = ob_get_clean();

ob_start();

include("head.js");
include("body.js");

$script = ob_get_clean();
$js .= $script;

file_put_contents('../lintd.js', $script);
file_put_contents('../index.js', $js);

system('jsmin <../index.js >../index.min.js');

echo file_get_contents('../index.min.js');

?>
