ENGINE=podman

#run against brouter old
#$ENGINE run --rm --name brouter-web  \
#-p 127.0.0.1:8080:80 \
#-v "`pwd`/config.js:/usr/share/nginx/html/config.js" \
#-v "`pwd`/keys.js:/usr/share/nginx/html/keys.js" \
#-v "`pwd`/../brouter/misc/profiles2:/usr/share/nginx/html/profiles2" \
#brouter-web

#$ENGINE run --rm -p 8080:80 brouter-web 
$ENGINE run --rm -p 8080:80  \
    -v "`pwd`/config.js:/usr/share/nginx/html/config/config.js" \
    -v "`pwd`/../brouter/misc/profiles2:/usr/share/nginx/html/profiles2" \
    --name brouter-web
    brouter-web
#    -v "/home/scarapella/dev/brouter/brouter/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf" \
