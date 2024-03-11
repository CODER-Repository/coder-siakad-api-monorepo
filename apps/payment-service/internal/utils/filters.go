package utils

import "math"

type Filters struct {
	Page     int `json:"page"`
	PageSize int `json:"pageSize"`
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
	return f.PageSize
}

func (f Filters) Offset() int {
	return (f.Page - 1) * f.PageSize
}
