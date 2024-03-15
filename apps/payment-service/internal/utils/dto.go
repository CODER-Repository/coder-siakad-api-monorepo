package utils

import "mime/multipart"

type PaymentRequestDTO struct {
	Amount         int
	Description    string
	PaymentMethod  string
	UktID          string
	ProofOfPayment *multipart.FileHeader
}
