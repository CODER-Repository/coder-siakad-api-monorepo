package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

func (s *FiberServer) ShowPaymentHistory(c *fiber.Ctx) error {
	data, err := s.models.PaymentHistory.FindByNIM("Lz5pCGMKCyaaA8vHgRMqEUJXPMcYdO")
	response := NewResponse()

	//responseData := map[string]interface{}{
	//	"id":                    &data.PaymentHistoryID,
	//	"payment_date":          &data.PaymentDate,
	//	"payment_verified_date": &data.PaymentVerifiedAt,
	//	"invoice_url":           &data.InvoiceURL,
	//	"payment_amount":        &data.Amount,
	//	"payment_method":        &data.PaymentMethod,
	//	"payment_status":        &data.PaymentStatus,
	//	"description":           &data.Description,
	//}

	response.Message = "Success Fetching Payment History"
	response.Data = data

	if err != nil {
		log.Error("Error Fetching Payment History", err)
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	log.Info("Success Fetching Payment History")
	return c.JSON(response)
}
