package server

import "payment-service/internal/utils"

type Response struct {
	Status     bool                      `json:"status"`
	StatusCode int                       `json:"statusCode"`
	Data       interface{}               `json:"result"`
	Message    string                    `json:"message"`
	Pagination *utils.PaginationMetadata `json:"pagination,omitempty"`
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
