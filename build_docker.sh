rm -rf ./profiles2
cp -r ../brouter/misc/profiles2 ./profiles2
docker build -t brouter-web .
rm -rf ./profiles2
