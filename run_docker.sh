ENGINE=podman

#    -v "`pwd`/config/config.js:/usr/share/nginx/html/config/config.js" \
#    -v "`pwd`/../brouter/misc/profiles2:/usr/share/nginx/html/profiles2" \

$ENGINE run --rm \
    --name openpaddlemap \
    -p 8080:80 \
    openpaddlemap
