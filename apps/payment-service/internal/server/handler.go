package server

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"payment-service/internal/config"
	"payment-service/internal/validator"
)

func (s *FiberServer) ShowPaymentHistory(c *fiber.Ctx) error {
	var requestQuery struct {
		config.Filters
	}

	if err := c.QueryParser(&requestQuery); err != nil {
		log.Error("Error Parsing Request Query", err)
		return badRequestResponse(c)
	}

	user, err := getUserFromContext(c)
	if err != nil {
		log.Error("Error Getting User From Context", err)
		return internalServerErrorResponse(c)
	}

	// If no filters provided, set default filters
	requestQuery.Filters.SetDefault()

	nim := user.NIM
	validation := validator.New()

	if config.ValidateFilters(validation, &requestQuery.Filters); !validation.Valid() {
		log.Error("Error Validating Request Query", validation.Errors)
		return failedValidationResponse(c, &validation.Errors)
	}

	log.Info("Fetching Payment History For NIM ", *nim)
	data, pagination, err := s.models.PaymentHistory.FindByNIM(nim, requestQuery.Filters)

	if data == nil {
		log.Info("Payment History Not Found")
		return notFoundResponse(c)
	}

	response := NewResponse()

	if err != nil {
		log.Error("Error Fetching Payment History", err)
		return internalServerErrorResponse(c)
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