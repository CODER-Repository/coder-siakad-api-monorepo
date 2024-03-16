package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func (s *FiberServer) RegisterFiberRoutes() {
	s.App.Use(logger.New(logger.Config{
		TimeZone: "Asia/Jakarta",
	}))

	verifyAuth := VerifyAuth()

	s.App.Get("/", s.HealthCheck)
	s.App.Post("/api/v1/payment", verifyAuth, s.AddPayment)
	s.App.Get("/api/v1/payment/history", verifyAuth, s.ShowPaymentHistory)
}

func (s *FiberServer) HealthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "ok",
	})
}
