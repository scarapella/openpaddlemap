ENGINE=podman

rm -rf ./profiles2
cp -r ../brouter/misc/profiles2 ./profiles2
$ENGINE build --no-cache -t  brouter-web .
rm -rf ./profiles2
