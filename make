#!/usr/bin/env ruby

require 'json/add/core'
require 'fileutils'
require 'optparse'
require 'base64'
require 'jsmin'
require 'sass'
require 'date'

def fwrite(file, data)
  File.open(file, "w") do |f|
    f.write(data)
  end
end

$makefile = JSON.parse(IO.binread("Makefile"))
$internal = Date.today.strftime("%y%j")

generated = {
  :plain       => "",
  :minified    => "",
  :stringified => "",
  :userscript  => ""
};

options = {
  :quiet => false,
  :copy  => "bin/mcr.js"
};

optparse = OptionParser.new do |opts|
  
  opts.on('-v', '--version STRING', "Specify the version string") do |v|
    $makefile["version"] = v
  end
  
  opts.on('-c', '--copy PATH', "Copy `mcr.js' to PATH") do |file|
    options[:copy] = file
  end
  
  opts.on( '-w', '--write', "Overwrite the VERSION file" ) do
    fwrite('VERSION', "#{$makefile["version"]} (#{$internal})");
  end
  
  opts.on( '-q', '--quiet', "Output nothing" ) do
    options[:quiet] = true
  end
  
  opts.on( '-h', '--help', 'Display this screen' ) do
    puts opts
    exit
  end
end

optparse.parse!

engine = Sass::Engine.for_file('ui.scss', {
  :style  => :compressed,
  :syntax => :scss
});

data = {
  :html      => IO.binread('ui.html'),
  :css       => engine.render,
  
  :home      => Base64.strict_encode64(IO.binread('img/home.png')),
  :info      => Base64.strict_encode64(IO.binread('img/info.png')),
  :options   => Base64.strict_encode64(IO.binread('img/options.png')),
  :permalink => Base64.strict_encode64(IO.binread('img/permalink.png')),
  :hotkeys   => Base64.strict_encode64(IO.binread('img/hotkeys.png')),
  :theme     => Base64.strict_encode64(IO.binread('img/theme.png')),
  :previous  => Base64.strict_encode64(IO.binread('img/previous.png')),
  :reload    => Base64.strict_encode64(IO.binread('img/reload.png')),
  :next      => Base64.strict_encode64(IO.binread('img/next.png')),
  :loading   => Base64.strict_encode64(IO.binread('img/loading.png')),
  
  :version   => "#{$makefile["version"]}"
};

$makefile["script"].each { |file|
  if file == 'nl'
    generated[:plain] += "\n\n"
  elsif file == 'namespace.js'
    generated[:plain] += IO.binread('namespace.js').gsub('$data', JSON.generate(data))
  else
    generated[:plain] += IO.binread(file)
  end
}

generated[:minified] = JSMin.minify(generated[:plain])
generated[:stringified] = generated[:minified].inspect

$makefile["userjs"].each { |file|
  if file == 'nl'
    generated[:userscript] += "\n\n"
  elsif file == 'ver'
    generated[:userscript] += "// @version        #{$makefile["version"]}\n"
  elsif file == 'int'
    generated[:userscript] += "// Internal: v. #{$makefile["version"]} (#{$internal})\n"
  else
    generated[:userscript] += IO.binread(file)
  end
}

generated[:userscript] += "\n\nfunction GetIt() { return #{generated[:stringified]}; }";


fwrite("bin/mcr.js", generated[:plain])
fwrite("bin/mcr.min.js", generated[:minified])
fwrite("bin/mcr.user.js", generated[:userscript])
fwrite(options[:copy], generated[:plain])

if options[:quiet]
  exit
end

def size(l)
  size = 0
  sizes = [" bytes"," KiB"," MiB"]
  
  2.times { |i|
    if l > 1000
      size += 1
      l /= 1024.0
    end
  }
  
  sprintf("%.2f", l) + sizes[size]
end

date = Time.new.strftime("%H:%M:%S %P")

printf("\n      MCR %22s %22s \n", "v. #{$makefile["version"]} (#{$internal})", date)
puts   "**===============================================================**\n"
puts   "||     Total     |     Min'd     |     Str'd     |     Uso'd     ||\n"
puts   "++---------------+---------------+---------------+---------------++\n"
printf("|| %13s | %13s | %13s | %13s ||\n", size(generated[:plain].length), size(generated[:minified].length), size(generated[:stringified].length), size(generated[:userscript].length))
puts   "**===============================================================**\n"
puts   "      Copied to #{options[:copy]}\n"