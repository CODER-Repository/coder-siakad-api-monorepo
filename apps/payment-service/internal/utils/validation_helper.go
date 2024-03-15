package utils

import (
	"mime/multipart"
	"payment-service/internal/validator"
)

func ValidatePaymentStatusQuery(paymentStatus *string, validate *validator.Validator) {
	allowedStatus := map[string]bool{
		"pending":  true,
		"unpaid":   true,
		"rejected": true,
		"verified": true,
	}

	errMessage := "payment_status must be either pending, unpaid, verified, or rejected"
	if !allowedStatus[*paymentStatus] {
		validate.Check(false, "payment_status", errMessage)
	}
}

func ValidateAddPayment(payload PaymentRequestDTO, proofOfPayment *multipart.FileHeader, validate *validator.Validator) {
	validate.Check(payload.Amount >= 0, "amount", "amount cannot be negative or zero")
	validate.Check(payload.Description != "", "description", "description is required")
	validate.Check(payload.PaymentMethod != "", "payment_method", "payment_method is required")

	// Validate proof of payment
	mimeType := proofOfPayment.Header.Get("Content-Type")
	const maxFileSize = 1 << 20
	validMimeTypes := map[string]bool{
		"image/jpeg": true,
		"image/jpg":  true,
		"image/png":  true,
	}

	validate.Check(proofOfPayment != nil, "proof_of_payment", "proof_of_payment is required")
	validate.Check(validMimeTypes[mimeType], "proof_of_payment", "invalid file type")
	validate.Check(proofOfPayment.Size <= maxFileSize, "proof_of_payment", "file size exceeds maximum")
}
