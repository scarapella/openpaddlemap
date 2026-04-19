FROM node:lts AS build
RUN mkdir /tmp/paddlemap
WORKDIR /tmp/paddlemap
COPY . .
#if profiles were not copied into ./profiles2/ clone them from the interwebs
RUN if [ ! -f /tmp/paddlemap/profiles2/paddle.brf ]; then \
    mkdir -p /tmp/paddlemap/profiles2; \
    git clone https://github.com/scarapella/paddlemap-profiles.git /tmp/paddlemap-profiles/; \
    mv /tmp/paddlemap-profiles/profiles2/*.brf /tmp/paddlemap/profiles2/; \
fi
#make sure we have a config.js
RUN if [ ! -f /tmp/paddlemap/config/config.js ]; then \
    mkdir -p /tmp/paddlemap/config; \
    cp /tmp/paddlemap/config.template.js /tmp/paddlemap/config/config.js; \
fi
#make sure we have a keys.js
RUN if [ ! -f /tmp/paddlemap/config/keys.js ]; then \
    mkdir -p /tmp/paddlemap/config; \
    cp /tmp/paddlemap/keys.template.js /tmp/paddlemap/config/keys.js; \
fi
RUN yarn install
RUN yarn run build

FROM docker.io/library/nginx:alpine
COPY --from=build /tmp/paddlemap/index.html /usr/share/nginx/html
COPY --from=build /tmp/paddlemap/taginfo.json /usr/share/nginx/html
COPY --from=build /tmp/paddlemap/*.png /usr/share/nginx/html
COPY --from=build /tmp/paddlemap/*.ico /usr/share/nginx/html
COPY --from=build /tmp/paddlemap/site.webmanifest /usr/share/nginx/html
COPY --from=build /tmp/paddlemap/dist /usr/share/nginx/html/dist
#config.js, keys.js, and profiles2/ are copied into the image, but can be overridden at run time by mounting local volumes
COPY --from=build /tmp/paddlemap/config/config.js /usr/share/nginx/html/config/config.js
COPY --from=build /tmp/paddlemap/config/keys.js /usr/share/nginx/html/config/keys.js
COPY --from=build /tmp/paddlemap/profiles2 /usr/share/nginx/html/profiles2