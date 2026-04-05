FROM node:lts AS build
RUN mkdir /tmp/openpaddlemap
WORKDIR /tmp/openpaddlemap
COPY . .
RUN mkdir -p /tmp/openpaddlemap/profiles2
RUN yarn install
RUN yarn run build

FROM docker.io/library/nginx:alpine
COPY --from=build /tmp/openpaddlemap/index.html /usr/share/nginx/html
COPY --from=build /tmp/openpaddlemap/dist /usr/share/nginx/html/dist
COPY --from=build /tmp/openpaddlemap/config/config.js /usr/share/nginx/html/config/config.js
COPY --from=build /tmp/openpaddlemap/config/keys.js /usr/share/nginx/html/config/keys.js
#if you already copied your brouter profiles into the profiles2 directory they will be included automatically in the image
#otherwise you can mount the profiles2 directory as a volume when running the container to include your custom profiles 
COPY --from=build /tmp/openpaddlemap/profiles2 /usr/share/nginx/html/profiles2