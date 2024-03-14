package config

import (
	_ "github.com/joho/godotenv/autoload"
	"os"
)

var JWTSecret = os.Getenv("JWT_SECRET")
