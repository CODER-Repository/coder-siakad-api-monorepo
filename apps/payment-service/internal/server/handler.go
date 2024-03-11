package server

import "github.com/gofiber/fiber/v2"

func (s *FiberServer) ShowPayment(c *fiber.Ctx) error {
	return c.JSON(map[string]string{
		"message": "show payment",
	})
}
