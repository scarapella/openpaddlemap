ENGINE=podman

$ENGINE run --rm \
    -v "`pwd`/config/config.js:/usr/share/nginx/html/config/config.js" \
    -v "`pwd`/../brouter/misc/profiles2:/usr/share/nginx/html/profiles2" \
    --name openpaddlemap \
    -p 8080:80 \
    openpaddlemap
