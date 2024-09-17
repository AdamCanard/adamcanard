FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8090

EXPOSE 8090

RUN npm run build

CMD [ "npm","start" ]

# FROM alpine:latest

# ARG PB_VERSION=0.22.17

# RUN apk add --no-cache \
#     unzip \
#     ca-certificates

# # download and unzip PocketBase
# ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
# RUN unzip /tmp/pb.zip -d /pb/

# EXPOSE 8090

# # start PocketBase
# CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
