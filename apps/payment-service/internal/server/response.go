package server

type PaginationMetadata struct {
	TotalRows   int `json:"total_rows,omitempty"`
	TotalPage   int `json:"total_page,omitempty"`
	PageSize    int `json:"page_size,omitempty"`
	CurrentPage int `json:"current_page,omitempty"`
}

type Response struct {
	Status     bool                `json:"status"`
	StatusCode int                 `json:"statusCode"`
	Data       interface{}         `json:"result"`
	Message    string              `json:"message"`
	Pagination *PaginationMetadata `json:"pagination,omitempty"`
}

func NewResponse() Response {
	return Response{
		Status:     true,
		StatusCode: 200,
		Data:       nil,
		Message:    "",
	}
}
