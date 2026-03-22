FROM node:lts AS build
RUN mkdir /tmp/brouter-web
WORKDIR /tmp/brouter-web
COPY . .
RUN yarn install
RUN yarn run build

FROM nginx:alpine
COPY --from=build /tmp/brouter-web/index.html /usr/share/nginx/html
COPY --from=build /tmp/brouter-web/dist /usr/share/nginx/html/dist
COPY --from=build /tmp/brouter-web/config.js /usr/share/nginx/html/config.js
COPY --from=build /tmp/brouter-web/keys.js /usr/share/nginx/html/keys.js
COPY --from=build /tmp/brouter-web/profiles2 /usr/share/nginx/html/profiles2