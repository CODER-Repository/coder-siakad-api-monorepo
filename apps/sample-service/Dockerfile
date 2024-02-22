FROM  --platform=linux/amd64 node:18-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm i -g turbo@1.6.3
COPY . .
RUN turbo prune --scope=sample-service --docker

# Add lockfile and package.json's of isolated subworkspace
FROM builder AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN npm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npm turbo build --filter=sample-service

FROM builder as runner
WORKDIR /app
CMD ["node","apps/sample-service/dist/index.js"]