package server

import (
	"payment-service/internal/utils"
	"payment-service/internal/validator"
)

type Response struct {
	Status     bool                      `json:"status"`
	StatusCode int                       `json:"statusCode"`
	Data       interface{}               `json:"data"`
	Message    string                    `json:"message"`
	Pagination *utils.PaginationMetadata `json:"pagination,omitempty"`
}

type ErrorResponse struct {
	Status     bool                            `json:"status"`
	StatusCode int                             `json:"statusCode"`
	Error      string                          `json:"error"`
	Errors     *[]validator.ValidationResponse `json:"errors,omitempty"`
}

func NewResponse() Response {
	return Response{
		Status:     true,
		StatusCode: 200,
		Data:       nil,
		Message:    "",
		Pagination: nil,
	}
}
