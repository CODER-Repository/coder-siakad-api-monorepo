package server

import (
	"database/sql"
	"github.com/gofiber/fiber/v2"
	"payment-service/internal/database"
	"payment-service/internal/model"
)

type FiberServer struct {
	*fiber.App
	db     *sql.DB
	models model.Models
}

func New() *FiberServer {
	db, err := database.New()
	if err != nil {
		panic(err)
	}

	server := &FiberServer{
		App: fiber.New(),
		db:  db,
		models: model.NewModels(db),
	}

	return server
}
