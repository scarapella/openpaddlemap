# Installation Via Docker

PaddleMap can be run as a Docker container, making it easy for continous deployment or running locally
without having to install any build tools or for deploying on a container system of your choice.

_For information on how to deploy in debug mode see [CONTRIBUTING.md](CONTRIBUTING.md)._

The `Dockerfile` builds the application inside a NodeJS container and copies the built application into a
separate Nginx based image. The application runs from a webserver only container serving only static files.

## Prerequisites

-   Docker installed
-   working directory is this repository

## Setup Local Configuration

Instantiate `config/config.js` and `config/keys.js` files:

```sh
mkdir -p config
cp config.template.js config/config.js
cp keys.template.js config/keys.js
```

Modify the files:

-   `config/config.js`-> cofirm URL of Brouter server, see `BR.conf.host`
-   `config/keys.js` add your API keys

## Get Brouter Profiles

This step is optional, but if you skip it you will not be able to see or modify the routing profiles in the UI.

Create a `profiles2/` directory:

```sh
mkdir -p profiles2
```

Copy the Brouter profiles ( `*.brf` files) in to the `profiles2/` - Default profiles for PaddleMap can be found here: https://github.com/scarapella/openpaddlemap-profiles

## Building Docker image

_NB: docker commands are shown by default, but podman will work equally well._

To build the Docker container run:

```sh
docker build -t paddlemap .
```

This creates a Docker image with the name `paddlemap`. If you previously copied profiles into `profiles2/` these will be included in the docker image. Otherwise, the image will contain the default profiles from https://github.com/scarapella/openpaddlemap-profiles/

## Running Docker container

To run the previously build Docker image run:

```sh
docker run --rm --name paddlemap \
      -p 127.0.0.1:8080:80 \
      paddlemap
```

This command does the following:

1. Runs a container with the name `paddlemap` and removes it automatically after stopping
1. Binds port 80 of the container to the host interface 127.0.0.1 on port 8080
1. Uses the image `paddlemap` to run as a container

To substitute different `config.js`, `keys.js`, and `profiles2/` at runtime use the follow (with the paths updated as appropriate):

```sh
docker run --rm --name paddlemap \
      -p 127.0.0.1:8080:80 \
      -v "`pwd`/config/config.js:/usr/share/nginx/html/config/config.js" \
      -v "`pwd`/config/keys.js:/usr/share/nginx/html/config/keys.js" \
      -v "`pwd`/../brouter/misc/profiles2:/usr/share/nginx/html/profiles2" \
      paddlemap
```

This command additionally does the following:

1. Takes the absolute paths of `config.js`, `keys.js` and `profiles2` and mounts them inside the container

PaddleMap should be accessible at http://127.0.0.1:8080.
