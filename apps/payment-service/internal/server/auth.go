package server

import (
	"encoding/json"
	"errors"
	"github.com/gofiber/fiber/v2"
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
	userProfile := c.Locals("user")

	var user User
	err := json.Unmarshal([]byte(userProfile.(string)), &user)
	if err != nil {
		return nil, errors.New("error parsing user profile")
	}

	return &user, nil
}
