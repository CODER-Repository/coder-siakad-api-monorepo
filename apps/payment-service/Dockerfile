FROM golang:alpine3.19 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY cmd/api ./cmd/api
COPY internal ./internal

ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN go build -o main ./cmd/api/main.go

FROM alpine:3.14

WORKDIR /app

COPY --from=builder /app/main .

CMD ["./main"]