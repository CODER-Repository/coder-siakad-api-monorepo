package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2/log"
	"os"
	"payment-service/internal/server"
	"strconv"

	_ "github.com/joho/godotenv/autoload"
)

func main() {

	app, err := server.New()

	if err != nil {
		log.Fatal("cannot start app", err)
	}
	app.RegisterFiberRoutes()
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	err = app.Listen(fmt.Sprintf(":%d", port))
	if err != nil {
		panic(fmt.Sprintf("cannot start app: %s", err))
	}
}
