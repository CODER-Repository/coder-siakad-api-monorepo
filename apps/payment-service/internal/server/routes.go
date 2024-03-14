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
	s.App.Get("/api/v1/payment/history", verifyAuth, s.ShowPaymentHistory)
	//s.App.Post("/generate", s.TestGenerateJWT)
	//s.App.Get("/protected", verifyAuth, Protected)
}

func (s *FiberServer) HealthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "ok",
	})
}

//func Protected(c *fiber.Ctx) error {
//	user, err := getUserFromContext(c)
//
//	if err != nil {
//		log.Error("Error Fetching User from Context", err)
//		return internalServerErrorResponse(c)
//	}
//
//	return c.JSON(user)
//}
