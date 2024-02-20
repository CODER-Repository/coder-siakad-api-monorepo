include .env

DATABASE_URL ?= ${DB_URL}
MIGRATION_PATH ?= ./migrations
NAME ?= new_migration

migrate-up:
	migrate -path=$(MIGRATION_PATH) -database=$(DATABASE_URL) -verbose up

migrate-down:
	migrate -path=$(MIGRATION_PATH) -database=$(DATABASE_URL) -verbose down

migrate-create:
	migrate create -ext=.sql -dir=$(MIGRATION_PATH) -seq $(NAME)

.PHONY: migrate-up migrate-down migrate-create
