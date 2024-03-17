package server

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	ID     string  `json:"userId"`
	Email  string  `json:"email"`
	Role   string  `json:"role"`
	RoleID string  `json:"roleId"`
	NIP    *string `json:"nip,omitempty"`
	NIM    *string `json:"nim,omitempty"`
}

func getUserFromContext(c *fiber.Ctx) (*User, error) {
	userToken := c.Locals("user").(*jwt.Token)
	claims, ok := userToken.Claims.(jwt.MapClaims)

	if !ok {
		return nil, errors.New("failed to get user from context")
	}

	user := &User{
		ID:     claims["userId"].(string),
		Email:  claims["email"].(string),
		Role:   claims["role"].(string),
		RoleID: claims["roleId"].(string),
	}

	if nim, ok := claims["nim"].(string); ok {
		user.NIM = &nim
	}

	if nip, ok := claims["nip"].(string); ok {
		user.NIP = &nip
	}

	return user, nil
}
