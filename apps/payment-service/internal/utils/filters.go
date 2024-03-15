package utils

import (
	"math"
	"payment-service/internal/validator"
)

type Filters struct {
	Page     *int `query:"page"`
	PageSize *int `query:"page_size"`
}

type PaginationMetadata struct {
	TotalRows   int `json:"total_rows,omitempty"`
	TotalPage   int `json:"total_page,omitempty"`
	PageSize    int `json:"page_size,omitempty"`
	CurrentPage int `json:"current_page,omitempty"`
}

func CalculatePaginationMetadata(totalRecords, page, pageSize int) PaginationMetadata {
	if totalRecords == 0 {
		return PaginationMetadata{}
	}

	return PaginationMetadata{
		PageSize:    pageSize,
		CurrentPage: page,
		TotalPage:   int(math.Ceil(float64(totalRecords) / float64(pageSize))),
		TotalRows:   totalRecords,
	}
}

func (f Filters) Limit() int {
	return *f.PageSize
}

func (f Filters) Offset() int {
	return (*f.Page - 1) * *f.PageSize
}

func ValidateFilters(validate *validator.Validator, filter *Filters) {
	validate.Check(filter.Page != nil && *filter.Page > 0, "page", "page must be greater than zero")
	validate.Check(filter.Page != nil && *filter.Page <= 10_000, "page", "page exceeds maximum")

	validate.Check(filter.PageSize != nil && *filter.PageSize > 0, "pageSize", "pageSize must be greater than zero")
	validate.Check(filter.PageSize != nil && *filter.PageSize <= 50, "pageSize", "pageSize must be a maximum of 50")
}

func (f *Filters) SetDefault() {
	if f.Page == nil {
		defaultPage := 1
		f.Page = &defaultPage
	}

	if f.PageSize == nil {
		defaultPageSize := 5
		f.PageSize = &defaultPageSize
	}
}
