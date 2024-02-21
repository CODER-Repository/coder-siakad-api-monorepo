FROM migrate/migrate

WORKDIR /migrations

COPY ./migrations .

ENTRYPOINT ["sh", "-c", "until nc -zv postgres 5432; do echo 'Waiting for PostgreSQL to become available...'; sleep 1; done && migrate -path /migrations -database postgres://postgres:postgres@postgres:5432/coder-siakad?sslmode=disable -verbose up"]
