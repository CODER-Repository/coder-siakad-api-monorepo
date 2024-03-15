package config

import (
	_ "github.com/joho/godotenv/autoload"
	"os"
)

var JWTSecret = os.Getenv("JWT_SECRET")
var CLOUDINARY_CLOUD_NAME = os.Getenv("CLOUDINARY_CLOUD_NAME")
var CLOUDINARY_API_KEY = os.Getenv("CLOUDINARY_API_KEY")
var CLOUDINARY_API_SECRET = os.Getenv("CLOUDINARY_API_SECRET")
