# Contributing

BRouter is heavily based on the following libraries:

-   [Leaflet](leafletjs.com/) maps library, used in conjuction with many plugins.
-   [Bootstrap](https://getbootstrap.com/) design library.
-   [JQuery](https://jquery.com) javascript library.
-   [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/en/).

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

Copy the Brouter profiles ( `*.brf` files) in to the `profiles2/` - Default profiles for PaddleMap can be found here: https://github.com/scarapella/paddlemap-profiles

## Install dependencies

```sh
yarn
```

## Build

```sh
#for development
yarn build debug

#for release
yarn build
```

## Develop

```sh
yarn serve
```

<!--
### Develop with Docker

```sh
#to install dependencies
docker-compose run --rm install

#to serve for development
docker-compose run --rm -p 3000:3000 serve

#or
docker-compose up serve
```
-->
<!--### How internationalization works

BRouter is translated using [i18next](https://www.i18next.com/) library, via command `gulp i18next`. It extracts translatable elements into `locales/en.json` file (English version). (Note that unused translation keys or keys not referenced in `keys.js` might get removed automatically. Make sure to commit any changes first before running this, and only amend the previous commit after checking the diff carefully.)

As soon as this file is modified, it must be uploaded by the maintainers to Transifex (manually) with the command `yarn push-transifex` (maintainers need to install the new [cli client](https://github.com/transifex/cli)).

Anyone can then translate BRouter directly on [Transifex](https://www.transifex.com/openstreetmap/brouter-web/) platform.

From time to time (eg. when preparing releases), we can update translated content with the command `yarn pull-transifex`. **It will overwrite all JSON files in `locales` directory**.-->

## License

PaddleMap is licensed under [MIT](LICENSE). Please make sure before adding any library that it is compatible with that. (GPL licenses are incompatible for instance).

## Tests

[Jest](https://jestjs.io/) is used for unit tests.

Tests are located in the `tests` directory in the project root. The idea is to mirror the structure in the `js` directory and to have a test file for each file there with the same name, but with a `.test.js` suffix (which is how tests are found).

Examples for running tests (see [CLI Options](https://jestjs.io/docs/cli)):

```sh
# run all tests
yarn test

# watch to run affected tests for changed files while developing
yarn test --watch

# run specific test file only (while watching or without)
yarn test --watch tests/format/Gpx.test.js

# run a single test by name (regex for name passed to describe/test functions)
yarn test --verbose -t="2-locus"
```

## Layers

### Vector Tiles / DEM

[MapLibre GL JS](https://maplibre.org/projects/maplibre-gl-js/) and [MapLibre GL Leaflet](https://github.com/maplibre/maplibre-gl-leaflet) are used to render vector tile layers. Their bundles are [only loaded](https://github.com/scarapella/openpaddlemap/blob/master/js/util/MaplibreGlLazyLoader.js) if the first mvt layer is actually added to the map.

-   [layers/mvt](https://github.com/scarapella/openpaddlemap/tree/master/layers/mvt) folder for layer descriptions (\*.geojson) and local styles (not a requirement)
-   `"type": "mvt"` in layer description
-   `"url": ` is for style.json (instead of tile URL), either as:
    -   file name of local style file without `.json` (= key in dist/layers.js bundle),
        -   suggested file naming convention: `<layer-id>-style.json`  
            (stored next to description `<layer-id>.geojson`)
    -   URL to remote style
-   access token for tile URLs
    -   configure in `config/keys.js` / `keys.template.js`:  
        `<provider>: 'mykey'`
    -   add template to tile url in style source, e.g.:  
        `...?access_token={keys_<provider>}`
    -   when also appended after `?` to local style url, the layer is not added when key is not defined:  
        `"url": "<layer-id>-style?{keys_<provider>}"`
