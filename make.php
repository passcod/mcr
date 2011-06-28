<?php

$sopts  = "v:";
$sopts .= "s:";
$sopts .= "hwbq";

$lopts = array(
  "version:",
  "suffix:",
  "help",
  "write",
  "brief",
  "quiet"
);

$args = getopt($sopts, $lopts);
$vals = $args;
$args = array_keys($args);

date_default_timezone_set('Pacific/Auckland');

include "lib/jsmin.php";
include "lib/htmlmin.php";

$version = chop(file_get_contents('VERSION'));
$compile = json_decode(file_get_contents('Make.json'), true);

$version = date('y.z');

if (!empty($vals['v'])) {
  $version = $vals['v'];
} if (!empty($vals['version'])) {
  $version = $vals['version'];
}

if (!empty($vals['s'])) {
  $version .= $vals['s'];
} if (!empty($vals['suffix'])) {
  $version .= $vals['suffix'];
}

if ( in_array('w', $args) || in_array('write', $args) ) {
  file_put_contents('VERSION', $version);
}

if ( in_array('h', $args) || in_array('help', $args) ) {
  ?>
Compiles the script according to the rules defined in Make.json.
Usage: php <?php echo $argv[0]; ?> [OPTIONS]

    -h, --help
       Display this message
    
    -v=VERSION, --version=VERSION
       Specify the version number.
        
    -s=SUFFIX, --suffix=SUFFIX
       Appends SUFFIX to the version number.
    
    -w, --write
       Overwrites the VERSION file
    
    -b, --brief
       Only output the version.
    
    -q, --quiet
       No output.


Running with no arguments uses `date("y.z")` for the version.
<?php exit;
}

$data = array(
  'html' => Minify_HTML::minify(file_get_contents('ui.html')),
  'css'  => JSMin::minify(file_get_contents('ui.css')),
  
  'home'      => base64_encode(file_get_contents('img/home.png')),
  'info'      => base64_encode(file_get_contents('img/info.png')),
  'options'   => base64_encode(file_get_contents('img/options.png')),
  'permalink' => base64_encode(file_get_contents('img/permalink.png')),
  'hotkeys'   => base64_encode(file_get_contents('img/hotkeys.png')),
  'previous'  => base64_encode(file_get_contents('img/previous.png')),
  'reload'    => base64_encode(file_get_contents('img/reload.png')),
  'next'      => base64_encode(file_get_contents('img/next.png')),
  'loading'   => base64_encode(file_get_contents('img/loading.png')),
  
  'version' => "$version"
);

$js = "";
foreach ( $compile['script'] as $file ) {
  if ( $file == 'nl' ) {
    $js .= "\n\n";
  } elseif ($file == 'namespace.js') {
    $js .= str_replace('$data', json_encode($data), file_get_contents('namespace.js'));
  } else {
    $js .= file_get_contents($file);
  }
}

file_put_contents('bin/mcr.js', $js);
$jsm = JSMin::minify($js);
file_put_contents('bin/mcr.min.js', $jsm);

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

if ( in_array('q', $args) || in_array('quiet', $args) ) {
  exit(0);
} elseif ( in_array('b', $args) || in_array('brief', $args) ) {
  echo $version;
  exit(0);
}

$dateAndTime = date('H:i:s a');

$sizeJtot = size(strlen(  $js  ));
$sizeJmin = size(strlen(  $jsm ));
$sizeJstr = size(strlen(  $jse ));
$sizeJuso = size(strlen($userjs));

echo "\n        MCR 3: v. $version       $dateAndTime    \n";
echo "**===============================================**\n";
echo "||   Total   |   Min'd   |   Str'd   |   Uso'd   ||\n";
echo "++-----------+-----------+-----------+-----------++\n";
echo "|| $sizeJtot | $sizeJmin | $sizeJstr | $sizeJuso ||\n";
echo "**===============================================**\n";

function size($l) {
  $s = 0;
  for ($i=0;$i<2;$i++) {
    if ($l > 1000) {
      $s++;
      $l /= 1024;
    }
  }
  $r = ""+round($l, 2);
  switch($s) {
    case 2: $r .= "MiB"; break;
    case 1: $r .= "KiB"; break;
    case 0: default: $r .= "Bts"; break;
  }
  return $r;
}

?>
