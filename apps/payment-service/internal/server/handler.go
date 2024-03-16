package server

import (
	"context"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"payment-service/internal/model"
	"payment-service/internal/utils"
	"payment-service/internal/validator"
	"strconv"
	"time"
)

func (s *FiberServer) AddPayment(c *fiber.Ctx) error {
	user, err := getUserFromContext(c)
	nim := user.NIM

	if err != nil {
		log.Error("Error Getting User From Context ", err)
		return internalServerErrorResponse(c)
	}

	amount, err := strconv.Atoi(c.FormValue("amount"))
	if err != nil {
		log.Error("Error Parsing Amount", err)
		return c.Status(400).JSON(&ErrorResponse{
			Status:     false,
			StatusCode: 400,
			Error:      "Invalid Request Parameter",
			Errors: &[]validator.ValidationResponse{
				{
					Msg:  "amount is not valid",
					Path: "amount",
				},
			},
		})
	}

	proofOfPaymentFile, err := c.FormFile("proof_of_payment")
	if err != nil {
		log.Error("Error Parsing Proof Of Payment File", err)
		return c.Status(400).JSON(&ErrorResponse{
			Status:     false,
			StatusCode: 400,
			Error:      "Invalid Request Parameter",
			Errors: &[]validator.ValidationResponse{
				{
					Msg:  "proof_of_payment is required",
					Path: "proof_of_payment",
				},
			},
		})
	}

	paymentDTO := utils.PaymentRequestDTO{
		Amount:         amount,
		Description:    c.FormValue("description"),
		PaymentMethod:  c.FormValue("payment_method"),
		UktID:          c.FormValue("ukt_id"),
		ProofOfPayment: proofOfPaymentFile,
	}

	validation := validator.New()
	if utils.ValidateAddPayment(paymentDTO, validation); !validation.Valid() {
		log.Error("Error Validating Proof Of Payment", validation.Errors)
		return failedValidationResponse(c, &validation.Errors)
	}

	sanitizedFileName := utils.SanitizeFilename(proofOfPaymentFile.Filename, "payment")

	// Initialize Cloudinary Client
	cld, err := utils.CloudinaryUpload()
	if err != nil {
		log.Error("Error Initializing Cloudinary Client ", err)
		return internalServerErrorResponse(c)
	}

	resp, err := cld.Upload.Upload(context.Background(), proofOfPaymentFile, uploader.UploadParams{
		Folder:   "proof_of_payment",
		PublicID: sanitizedFileName,
	})

	if err != nil {
		log.Error("Error Uploading Proof Of Payment To Cloudinary ", err)
		return internalServerErrorResponse(c)
	}

	log.Info("Proof Of Payment Uploaded To Cloudinary ", resp.SecureURL)

	// Generate Invoice ID, soon to be replaced with actual invoice url
	invoiceUrl := utils.GenerateInvoiceID(*nim)
	paymentData := model.PaymentHistory{
		StudentNIM:        *nim,
		Amount:            paymentDTO.Amount,
		Description:       paymentDTO.Description,
		PaymentMethod:     &paymentDTO.PaymentMethod,
		ProofOfPaymentURL: &resp.SecureURL,
		InvoiceURL:        &invoiceUrl,
		UktID:             &paymentDTO.UktID,
		PaymentStatus:     "pending",
		PaymentDate:       time.Now(),
	}

	err = s.models.PaymentHistory.Insert(&paymentData)
	if err != nil {
		log.Error("Error Inserting Payment Data To Database ", err)
		return internalServerErrorResponse(c)
	}

	respData := map[string]interface{}{
		"invoice_url":      paymentData.InvoiceURL,
		"proof_of_payment": resp.SecureURL,
	}

	response := NewResponse()

	response.StatusCode = 201
	response.Data = respData
	response.Message = "Payment Request Successfully Created"

	return c.Status(201).JSON(response)
}

func (s *FiberServer) ShowPaymentHistory(c *fiber.Ctx) error {
	var requestQuery struct {
		utils.Filters
		PaymentStatus *string `query:"status"`
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

	if requestQuery.PaymentStatus != nil {
		utils.ValidatePaymentStatusQuery(requestQuery.PaymentStatus, validation)
		if !validation.Valid() {
			log.Error("Error Validating Request Query", validation.Errors)
			return failedValidationResponse(c, &validation.Errors)
		}
	}

	if utils.ValidateFilters(validation, &requestQuery.Filters); !validation.Valid() {
		log.Error("Error Validating Request Query", validation.Errors)
		return failedValidationResponse(c, &validation.Errors)
	}

	log.Info("Fetching Payment History For NIM ", *nim)
	data, pagination, err := s.models.PaymentHistory.FindByNIM(nim, requestQuery.PaymentStatus, requestQuery.Filters)

	if data == nil {
		log.Info("Payment History Not Found")
		return notFoundResponse(c)
	}

	if err != nil {
		log.Error("Error Fetching Payment History", err)
		return internalServerErrorResponse(c)
	}

	response := NewResponse()

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
