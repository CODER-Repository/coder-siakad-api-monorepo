package utils

import "mime/multipart"

type PaymentRequestDTO struct {
	Amount         int
	Description    string
	PaymentMethod  string
	ProofOfPayment *multipart.FileHeader
}
