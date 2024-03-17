package server

import (
	"context"
	"database/sql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"os"
	"os/signal"
	"payment-service/internal/database"
	"payment-service/internal/model"
	"sync"
	"syscall"
	"time"
)

type FiberServer struct {
	*fiber.App
	db     *sql.DB
	models model.Models
	wg     sync.WaitGroup
}

func New() (*FiberServer, error) {
	db, err := database.New()
	if err != nil {
		log.Fatalf("Failed to initialize database: %s", err)
	}

	server := &FiberServer{
		App: fiber.New(fiber.Config{
			AppName:      "siakad-payment-service",
			ReadTimeout:  15 * time.Second,
			WriteTimeout: 30 * time.Second,
		}),
		db:     db,
		models: model.NewModels(db),
	}

	shutdownError := make(chan error)

	go func() {
		quitSignal := make(chan os.Signal, 1)

		signal.Notify(quitSignal, syscall.SIGINT, syscall.SIGTERM)
		// Read the signal from the quit channel.
		// This code will block until signal received
		s := <-quitSignal
		log.Info("starting graceful shutting down ", map[string]string{"signal": s.String()})

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		log.Info("completing background task")

		err = db.Close()
		if err != nil {
			shutdownError <- err
		}

		server.wg.Wait()

		err := server.ShutdownWithContext(ctx)
		if err != nil {
			shutdownError <- err
		}
		shutdownError <- nil
	}()

	return server, nil
}
