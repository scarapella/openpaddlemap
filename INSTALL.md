## Running as Docker container (client only)

openpaddlemap can be run as a Docker container, making it easy for continous deployment or running locally
without having to install any build tools.

The `Dockerfile` builds the application inside a NodeJS container and copies the built application into a
separate Nginx based image. The application runs from a webserver only container serving only static files.

### Prerequisites

-   Docker installed
-   working directory is this repository
-   `config.template.js` copied to `config/config.js` and modified with a Brouter server, see `BR.conf.host`
-   `keys.template.js` to `config/keys.js` and add your API keys
-   Optionally create `profiles` directory with `brf` profile files and add path to `config.js`:
    BR.conf.profilesUrl = 'profiles/';

### Building Docker image

To build the Docker container run:

      docker build -t openpaddlemap .

This creates a Docker image with the name `openpaddlemap`.

### Running Docker container

To run the previously build Docker image run:

      docker run --rm --name openpaddlemap \
        -p 127.0.0.1:8080:80 \
        -v "`pwd`/config/config.js:/usr/share/nginx/html/config/config.js" \
        -v "`pwd`/config/keys.js:/usr/share/nginx/html/config/keys.js" \
        -v "`pwd`/profiles:/usr/share/nginx/html/profiles" \
        openpaddlemap

This command does the following:

1. Runs a container with the name `openpaddlemap` and removes it automatically after stopping
1. Binds port 80 of the container to the host interface 127.0.0.1 on port 8080
1. Takes the absolute paths of `config.js`, `keys.js` and `profiles` and mounts them inside the container
1. Uses the image `config` to run as a container

openpaddlemap should be accessible at http://127.0.0.1:8080.
