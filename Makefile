VERSION   = `cat VERSION`
BUILD_DIR = build/
UJS_DIR   = userjs/
SRC_DIR   = core/
TOOLS_DIR = lib/
RES_DIR   = ui/

ADAPTER   = adapters/mrnet/

FILES     = ${BUILD_DIR}jquery.js\
            ${BUILD_DIR}yek.js\
						${BUILD_DIR}storage.js\
						${BUILD_DIR}resources.js\
						${SRC_DIR}domparser.js\
						${SRC_DIR}init.js

RESOURCES = ${RES_DIR}home.png\
						${RES_DIR}options.png\
						${RES_DIR}info.png\
						${RES_DIR}previous.png\
						${RES_DIR}next.png\
						${RES_DIR}hotkeys.png\
						${RES_DIR}favs.png

all: prepare_env mcr.js mcr.min.js mcr.user.js


help:
	#	make         -- Build all
	#	make dev     -- Build uncompressed bare mcr.js
	#	make devmin  -- Build compressed bare mcr.min.js

dev: prepare_env mcr.js

devmin: dev mcr.min.js

prepare_env:
	# Clear the build dir
	rm -rf ${BUILD_DIR}
	mkdir -p ${BUILD_DIR}
	
	# Create resources.js
	echo "window.MCResources = {" > ${BUILD_DIR}resources.js
	
	# Base64 encode all icons
	$(foreach file,${RESOURCES},echo -n "\"" >> ${BUILD_DIR}resources.js;\
													echo -n ${file} | perl -p -e 's/\.png//g' | perl -p -e 's/ui(\/|\.)//g' >> ${BUILD_DIR}resources.js;\
													echo -n "\":\"" >> ${BUILD_DIR}resources.js;\
													base64 ${file} | tr -d '\n' >> ${BUILD_DIR}resources.js;\
													echo "\"," >> ${BUILD_DIR}resources.js;)
	
	# Generate compressed CSS from SCSS and JSON encode
	sass --style compressed ${RES_DIR}style.scss:${BUILD_DIR}style.css
	echo -n "\"css\":" >> ${BUILD_DIR}resources.js
	php ${TOOLS_DIR}json.php ${BUILD_DIR}style.css >> ${BUILD_DIR}resources.js
	echo "," >> ${BUILD_DIR}resources.js
	
	# Compress the HTML and JSON encode
	echo -n "\"html\":" >> ${BUILD_DIR}resources.js
	cat ${RES_DIR}ui.html | perl -p -e 's/^[ \t\n]*//g' | tr -d '\n' > ${BUILD_DIR}ui.html
	php ${TOOLS_DIR}json.php ${BUILD_DIR}ui.html >> ${BUILD_DIR}resources.js
	echo -n ",\n" >> ${BUILD_DIR}resources.js
	
	# Include version
	echo -n "\"version\":\"" >> ${BUILD_DIR}resources.js
	echo -n ${VERSION} >> ${BUILD_DIR}resources.js
	echo "\"" >> ${BUILD_DIR}resources.js
	
	# Close hash
	echo "};" >> ${BUILD_DIR}resources.js
	
	# Download jQuery
	wget -O ${BUILD_DIR}jquery.js http://code.jquery.com/jquery-latest.js
	
	# Download Yek.js
	wget -O ${BUILD_DIR}yek.js https://github.com/passcod/yek.js/raw/master/yek.js
	
	# Download Storage.js
	wget -O ${BUILD_DIR}storage.js https://github.com/passcod/storage.js/raw/master/storage.js


mcr.js: ${FILES}
	cat > ${BUILD_DIR}$@ $^

mcr.min.js: ${BUILD_DIR}mcr.js
	java -jar ${TOOLS_DIR}compiler.jar --js $^ --js_output_file ${BUILD_DIR}$@

mcr.user.js: ${BUILD_DIR}mcr.min.js
	cat > ${BUILD_DIR}$@ ${UJS_DIR}meta.js
	echo -n "// @version        " >> ${BUILD_DIR}$@
	echo ${VERSION}  >> ${BUILD_DIR}$@
	echo "// ==/UserScript==" >> ${BUILD_DIR}$@
	cat >> ${BUILD_DIR}$@ ${UJS_DIR}body.js
	echo -n "function mcr(){return " >> ${BUILD_DIR}$@
	php ${TOOLS_DIR}json.php $^ >> ${BUILD_DIR}$@
	echo ";}" >> ${BUILD_DIR}$@
