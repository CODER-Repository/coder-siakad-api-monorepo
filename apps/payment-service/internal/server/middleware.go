package server

import (
	"github.com/gofiber/fiber/v2"
)

func GetUserProfile() fiber.Handler {
	return func(c *fiber.Ctx) error {
		profile := c.Get("X-User-Profile")
		if profile == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"status":     false,
				"statusCode": fiber.StatusUnauthorized,
				"message":    "Unauthorized",
			})
		}
		c.Locals("user", profile)
		return c.Next()
	}
}
