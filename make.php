<?php

date_default_timezone_set('Pacific/Auckland');

include "lib/jsmin.php";

$version = chop(file_get_contents('VERSION'));
$compile = json_decode(file_get_contents('Make.json'), true);

if ( in_array('-V', $argv) ) {
  $version = date('y.z');
}
if ( in_array('-r', $argv) ) {
  file_put_contents('VERSION', $version);
}
if ( in_array('-h', $argv) ) {
  ?>
Compiles the script according to the rules defined in Make.json.
Usage: php <?php echo $argv[0]; ?> [-h] [-V [-r]]

    -h, Display this message
    
    -V, Redefine the scripts version [ = date('y.z') ]
    
    -r, Overwrites the VERSION file

Running with no arguments uses the version in the VERSION file.
<?php exit;
}

$js = "var MCR_VERSION = '".$version."';\n";

foreach ( $compile['script'] as $file ) {
  if ( $file == 'nl' ) {
    $js .= "\n\n";
  } else {
    $js .= file_get_contents($file);
  }
}

file_put_contents('bin/mcr.js', $js);

file_put_contents('bin/mcr.min.js', JSMin::minify($js));

$jse = json_encode(file_get_contents('bin/mcr.min.js'));

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

$userjs .= "\n\nfunction GetIt() { return ".$jse."; }";

file_put_contents('bin/mcr.user.js', $userjs);

echo "OK: Compiled v. ".$version." at ".date(DATE_ATOM)."\n";

?>
