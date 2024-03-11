package model

import "database/sql"

type Models struct {
	PaymentHistory *PaymentHistoryModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		PaymentHistory: &PaymentHistoryModel{DB: db},
	}
}
