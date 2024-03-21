package server

import (
	"github.com/gofiber/fiber/v2"
	"payment-service/internal/validator"
)

func internalServerErrorResponse(c *fiber.Ctx) error {
	return c.Status(500).JSON(ErrorResponse{
		Status:     false,
		StatusCode: 500,
		Error:      "Internal Server Error",
	})
}

func failedValidationResponse(c *fiber.Ctx, errors *[]validator.ValidationResponse) error {
	return c.Status(fiber.StatusBadRequest).JSON(ErrorResponse{
		Status:     false,
		StatusCode: fiber.StatusBadRequest,
		Error:      "Invalid Request Parameter",
		Errors:     errors,
	})
}

func badRequestResponse(c *fiber.Ctx) error {
	return c.Status(fiber.StatusBadRequest).JSON(ErrorResponse{
		Status:     false,
		StatusCode: fiber.StatusBadRequest,
		Error:      "Invalid Request Parameter",
	})
}

func notFoundResponse(c *fiber.Ctx) error {
	return c.Status(fiber.StatusNotFound).JSON(ErrorResponse{
		Status:     false,
		StatusCode: fiber.StatusNotFound,
		Error:      "Resource Not Found",
	})
}
