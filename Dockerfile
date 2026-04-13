FROM node:lts AS build
RUN mkdir /tmp/openpaddlemap
WORKDIR /tmp/openpaddlemap
COPY . .
#if profiles were not copied into ./profiles2/ clone them from the interwebs
RUN if [ ! -f /tmp/openpaddlemap/profiles2/paddle.brf ]; then \
    mkdir -p /tmp/openpaddlemap/profiles2; \
    git clone https://github.com/scarapella/openpaddlemap-profiles.git /tmp/openpaddlemap-profiles/; \
    mv /tmp/openpaddlemap-profiles/profiles2/*.brf /tmp/openpaddlemap/profiles2/; \
fi
#make sure we have a config.js
RUN if [ ! -f /tmp/openpaddlemap/config/config.js ]; then \
    mkdir -p /tmp/openpaddlemap/config; \
    cp /tmp/openpaddlemap/config.template.js /tmp/openpaddlemap/config/config.js; \
fi
#make sure we have a keys.js
RUN if [ ! -f /tmp/openpaddlemap/config/keys.js ]; then \
    mkdir -p /tmp/openpaddlemap/config; \
    cp /tmp/openpaddlemap/keys.template.js /tmp/openpaddlemap/config/keys.js; \
fi
RUN yarn install
RUN yarn run build

FROM docker.io/library/nginx:alpine
COPY --from=build /tmp/openpaddlemap/index.html /usr/share/nginx/html
COPY --from=build /tmp/openpaddlemap/taginfo.json /usr/share/nginx/html
COPY --from=build /tmp/openpaddlemap/*.png /usr/share/nginx/html
COPY --from=build /tmp/openpaddlemap/*.ico /usr/share/nginx/html
COPY --from=build /tmp/openpaddlemap/site.webmanifest /usr/share/nginx/html
COPY --from=build /tmp/openpaddlemap/dist /usr/share/nginx/html/dist
#config.js, keys.js, and profiles2/ are copied into the image, but can be overridden at run time by mounting local volumes
COPY --from=build /tmp/openpaddlemap/config/config.js /usr/share/nginx/html/config/config.js
COPY --from=build /tmp/openpaddlemap/config/keys.js /usr/share/nginx/html/config/keys.js
COPY --from=build /tmp/openpaddlemap/profiles2 /usr/share/nginx/html/profiles2