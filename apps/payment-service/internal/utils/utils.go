package utils

import (
	"fmt"
	"github.com/cloudinary/cloudinary-go/v2"
	"path/filepath"
	"payment-service/internal/config"
	"strings"
	"time"
)

func SanitizeFilename(filename string, prefix string) string {
	// Remove the file extension since cloudinary automatically assign .jpg
	ext := filepath.Ext(filename)
	sanitized := strings.TrimSuffix(filename, ext)

	sanitized = strings.ReplaceAll(sanitized, " ", "_")

	dateTimeFormat := time.Now().Format("020106150405") // DDMMYYHHMMSS format

	newFilename := fmt.Sprintf("%s-%s-%s", prefix, dateTimeFormat, sanitized)

	return newFilename
}

func CloudinaryUpload() (*cloudinary.Cloudinary, error) {
	client, err := cloudinary.NewFromParams(config.CLOUDINARY_CLOUD_NAME, config.CLOUDINARY_API_KEY, config.CLOUDINARY_API_SECRET)
	if err != nil {
		return nil, err
	}
	return client, nil
}
