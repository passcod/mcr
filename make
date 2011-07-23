<?php

$sopts  = "v:c:hq";
$lopts = array(
  "version:",
  "help",
  "quiet",
  "copy:"
);

$args = getopt($sopts, $lopts);
$vals = $args;
$args = array_keys($args);

date_default_timezone_set('Pacific/Auckland');

include "lib/htmlmin.php";
include "lib/rest_helper.php";

$makefile = json_decode(file_get_contents('Makefile'), true);
$internal = date('yz');
$version  = $makefile['version'];

if (!empty($vals['v'])) {
  $version = $vals['v'];
} if (!empty($vals['version'])) {
  $version = $vals['version'];
}

if ( in_array('w', $args) || in_array('write', $args) ) {
  file_put_contents('VERSION', "$version ($internal)");
}

if ( in_array('h', $args) || in_array('help', $args) ) {
  ?>
Compiles the script according to the rules defined in Makefile
Usage: php <?php echo $argv[0]; ?> [OPTIONS]

    -h, --help
       Display this message
    
    -v, --version=VERSION
       Specify the version number.
    
    -c, --copy=PATH
      Copies the resulting mcr.min.js to the given PATH.
    
    -q, --quiet
       Outputs nothing.
<?php exit;
}

ob_start();
passthru('sass --style compressed ui.scss');
$css = ob_get_clean();

$data = array(
  'html' => Minify_HTML::minify(file_get_contents('ui.html')),
  'css'  => $css,
  
  'home'      => base64_encode(file_get_contents('icons/home.png')),
  'info'      => base64_encode(file_get_contents('icons/info.png')),
  'options'   => base64_encode(file_get_contents('icons/options.png')),
  'permalink' => base64_encode(file_get_contents('icons/permalink.png')),
  'hotkeys'   => base64_encode(file_get_contents('icons/hotkeys.png')),
  'previous'  => base64_encode(file_get_contents('icons/previous.png')),
  'reload'    => base64_encode(file_get_contents('icons/reload.png')),
  'next'      => base64_encode(file_get_contents('icons/next.png')),
  'loading'   => base64_encode(file_get_contents('icons/loading.png')),
  
  'version' => "$version"
);

$js = "";
foreach ( $makefile['script'] as $file ) {
  if ( $file == 'nl' ) {
    $js .= "\n\n";
  } elseif ($file == 'namespace.js') {
    $js .= str_replace('$data', json_encode($data), file_get_contents('namespace.js'));
  } else {
    $js .= file_get_contents($file);
  }
}

file_put_contents('build/mcr.js', $js);

$gcl = rest_helper('http://closure-compiler.appspot.com/compile', array(
    'code_url' => 'http://code.jquery.com/jquery-latest.js',
    'js_code'  => $js,
    'compilation_level' => 'SIMPLE_OPTIMIZATIONS',
    'output_format' => 'json',
    'output_info'   => 'compiled_code',
    'warning_level' => 'QUIET'
  ), 'POST', 'json');

$jsm = $gcl['compiledCode'];

file_put_contents('build/mcr.min.js', $jsm);

$jse = json_encode(file_get_contents('build/mcr.min.js'));

$userjs = "";

foreach ( $makefile['userjs'] as $file ) {
  if ( $file == 'nl' ) {
    $userjs .= "\n\n";
  } elseif ( $file == 'ver' ) {
    $userjs .= "// @version        ".$version."\n";
  } elseif ( $file == 'int' ) {
    $userjs .= "// Internal: v. $version ($internal)\n";
  } elseif ( $file == 'userjs/body.js' ) {
    $userjs .= str_replace('$scrfile', $jse, file_get_contents($file));
  } else {
    $userjs .= file_get_contents($file);
  }
}

file_put_contents('build/mcr.user.js', $userjs);

if ( in_array('q', $args) || in_array('quiet', $args) ) {
  exit(0);
} elseif ( in_array('b', $args) || in_array('brief', $args) ) {
  echo $version;
  exit(0);
}

$dateAndTime = date('H:i:s a');

$jsp = $js;
$jsm = $jsm;
$jsu = $userjs;

$sizeJtot = size(strlen($jsp));
$sizeJmin = size(strlen($jsm));
$sizeJstr = size(strlen($jse));
$sizeJuso = size(strlen($jsu));

echo "\n          MCR: v. $version         $dateAndTime  \n";
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
  $r = sprintf("%6.2f", $l); //round($l, 2);
  switch($s) {
    case 2: $r .= "MiB"; break;
    case 1: $r .= "KiB"; break;
    case 0: default: $r .= "Bts"; break;
  }
  return $r;
}

if (!empty($vals['copy'])) {
  file_put_contents(realpath($vals['copy']), $jsm);
  echo "     Copied to ".$vals['copy'];
}

if (!empty($vals['c'])) {
  file_put_contents(realpath($vals['c']), $jsm);
  echo "     Copied to ".$vals['c'];
}

echo "\n";

?>
