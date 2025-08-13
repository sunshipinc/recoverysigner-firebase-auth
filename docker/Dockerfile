FROM ubuntu:22.04 as build

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install --no-install-recommends -y gpg curl git ca-certificates apt-transport-https && \
    curl -sSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key|gpg --dearmor >/etc/apt/trusted.gpg.d/nodesource-key.gpg && \
    echo "deb https://deb.nodesource.com/node_22.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg |gpg --dearmor >/etc/apt/trusted.gpg.d/yarnpkg.gpg && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y nodejs yarn

ADD . /app/src

WORKDIR /app/src

RUN yarn install --production
RUN yarn build

FROM nginx:1.17

COPY --from=build /app/src/docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/src/build/ /usr/share/nginx/html/

# Reset env-config.js
RUN rm -rf /usr/share/nginx/html/config/env-config.js
