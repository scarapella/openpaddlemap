FROM node:lts AS build
RUN mkdir /tmp/openpaddlemap
WORKDIR /tmp/openpaddlemap
COPY . .
RUN yarn install
RUN yarn run build

FROM docker.io/library/nginx:alpine
COPY --from=build /tmp/openpaddlemap/index.html /usr/share/nginx/html
COPY --from=build /tmp/openpaddlemap/dist /usr/share/nginx/html/dist
COPY --from=build /tmp/openpaddlemap/config.js /usr/share/nginx/html/config/config.js
COPY --from=build /tmp/openpaddlemap/keys.js /usr/share/nginx/html/config/keys.js
COPY --from=build /tmp/openpaddlemap/profiles2 /usr/share/nginx/html/profiles2