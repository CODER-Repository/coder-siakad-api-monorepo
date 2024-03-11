package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func (s *FiberServer) RegisterFiberRoutes() {
	s.App.Use(logger.New(logger.Config{
		TimeZone: "Asia/Jakarta",
	}))
	s.App.Get("/", s.HelloWorldHandler)
	s.App.Get("/payment/v1/history", s.ShowPaymentHistory)
}

func (s *FiberServer) HelloWorldHandler(c *fiber.Ctx) error {
	resp := map[string]string{
		"message": "Hello World",
	}
	return c.JSON(resp)
}
