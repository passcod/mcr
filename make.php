<?php

$version = chop(file_get_contents('VERSION'));
$compile = json_decode(file_get_contents('Make.json'), true);

$js = "var MCR_VERSION = ".$version.";\n";

foreach ( $compile['script'] as $file ) {
  if ( $file == 'nl' ) {
    $js .= "\n\n";
  } else {
    $js .= file_get_contents($file);
  }
}

file_put_contents('bin/mcr.js', $js);

system('jsmin <bin/mcr.js >bin/mcr.min.js');

$b64 = base64_encode(file_get_contents('bin/mcr.min.js'));

$userjs = "";

foreach ( $compile['userjs'] as $file ) {
  if ( $file == 'nl' ) {
    $userjs .= "\n\n";
  } elseif ( $file == 'ver' ) {
    $userjs .= "// @version        ".$version."\n";
  } else {
    $userjs .= file_get_contents($file);
  }
}

$userjs .= "\n\nfunction GetIt() { return '".$b64."'; }";

file_put_contents('bin/mcr.user.js', $userjs);


$lintage = "var MCR_VERSION = ".$version.";\n";

foreach ( $compile['lintage'] as $file ) {
  if ( $file == 'nl' ) {
    $lintage .= "\n\n";
  } else {
    $lintage .= file_get_contents($file);
  }
}

file_put_contents('bin/mcr.lint.js', $lintage);


?>
