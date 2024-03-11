package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

func (s *FiberServer) ShowPaymentHistory(c *fiber.Ctx) error {
	var requestQuery struct {
		Page     int `json:"page"`
		PageSize int `json:"pageSize"`
	}

	if err := c.QueryParser(&requestQuery); err != nil {
		log.Error("Error Parsing Request Query", err)
		return c.Status(400).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	nim := "Lz5pCGMKCyaaA8vHgRMqEUJXPMcYdO"
	data, pagination, err := s.models.PaymentHistory.FindByNIM(nim, requestQuery)
	response := NewResponse()

	if err != nil {
		log.Error("Error Fetching Payment History", err)
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	var responseData []map[string]interface{}

	for _, payment := range data {
		paymentData := map[string]interface{}{
			"id":                    payment.PaymentHistoryID,
			"payment_date":          payment.PaymentDate,
			"payment_verified_date": payment.PaymentVerifiedAt,
			"invoice_url":           payment.InvoiceURL,
			"payment_amount":        payment.Amount,
			"payment_method":        payment.PaymentMethod,
			"payment_status":        payment.PaymentStatus,
			"description":           payment.Description,
		}

		responseData = append(responseData, paymentData)
	}

	response.Message = "Success Fetching Payment History"
	response.Data = responseData
	response.Pagination = &pagination

	log.Info("Success Fetching Payment History")
	return c.JSON(response)
}
