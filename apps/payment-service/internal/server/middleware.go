package server

import (
	"github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"payment-service/internal/config"
)

func VerifyAuth() fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(config.JWTSecret)},
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			if err != nil {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"status":     false,
					"statusCode": fiber.StatusUnauthorized,
					"message":    "Unauthorized",
				})
			}
			return c.Next()
		},
		ContextKey: "user",
	})
}
