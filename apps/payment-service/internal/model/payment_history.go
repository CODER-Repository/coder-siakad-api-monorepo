package model

import (
	"context"
	"database/sql"
	"log"
	"payment-service/internal/utils"
	"time"
)

type PaymentStatus string

const (
	Pending  PaymentStatus = "pending"
	Verified PaymentStatus = "verified"
	Rejected PaymentStatus = "rejected"
)

type PaymentHistory struct {
	PaymentHistoryID      *string        `json:"payment_history_id"`
	InvoiceURL            *string        `json:"invoice_url"`
	UktID                 *string        `json:"ukt_id"`
	StudentNIM            *string        `json:"student_nim"`
	Amount                *int64         `json:"amount"`
	Description           *string        `json:"description"`
	PaymentDate           *string        `json:"payment_date"`
	PaymentVerifiedAt     *string        `json:"payment_verified_at"`
	PaymentMethod         *string        `json:"payment_method"`
	PaymentStatus         *PaymentStatus `json:"payment_status"`
	ProofOfPaymentURL     *string        `json:"proof_of_payment_url"`
	PaymentRejectedReason *string        `json:"payment_rejected_reason"`
	CreatedAt             *string        `json:"created_at,omitempty"`
	UpdatedAt             *string        `json:"updated_at,omitempty"`
}
type PaymentHistoryModel struct {
	DB *sql.DB
}

func (m *PaymentHistoryModel) FindByNIM(nim string, filter utils.Filters) ([]*PaymentHistory, utils.PaginationMetadata, error) {
	query := `select count(*) over(), * from payment_history where student_nim = $1 limit $2 offset $3`
	log.Println(filter)
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	args := []interface{}{nim, filter.Limit(), filter.Offset()}
	rows, err := m.DB.QueryContext(ctx, query, args...)

	if err != nil {
		return nil, utils.PaginationMetadata{}, err
	}

	defer rows.Close()

	var totalRows int
	var payments []*PaymentHistory

	for rows.Next() {
		var payment PaymentHistory

		err := rows.Scan(
			&totalRows,
			&payment.PaymentHistoryID,
			&payment.InvoiceURL,
			&payment.UktID,
			&payment.StudentNIM,
			&payment.Amount,
			&payment.Description,
			&payment.PaymentDate,
			&payment.PaymentVerifiedAt,
			&payment.PaymentMethod,
			&payment.PaymentStatus,
			&payment.ProofOfPaymentURL,
			&payment.PaymentRejectedReason,
			&payment.CreatedAt,
			&payment.UpdatedAt,
		)

		if err != nil {
			return nil, utils.PaginationMetadata{}, err
		}

		payments = append(payments, &payment)
	}

	if rows.Err() != nil {
		return nil, utils.PaginationMetadata{}, err
	}


	paginationMetadata := utils.CalculatePaginationMetadata(totalRows, filter.Page, filter.PageSize)

	return payments, paginationMetadata, nil
}

func (m *PaymentHistoryModel) Insert(payment *PaymentHistory) error {
	query := `insert into payment_history (
                             invoice_url, 
                             ukt_id, 
                             student_nim, 
                             amount, 
                             description, 
                             payment_date, 
                             payment_verified_at, 
                             payment_method, 
                             payment_status, 
                             proof_of_payment_url, 
                             payment_rejected_reason
                )
			  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
			  returning payment_history_id, payment_status, created_at`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	args := []interface{}{
		payment.InvoiceURL,
		payment.UktID,
		payment.StudentNIM,
		payment.Amount,
		payment.Description,
		payment.PaymentDate,
		payment.PaymentVerifiedAt,
		payment.PaymentMethod,
		payment.PaymentStatus,
		payment.ProofOfPaymentURL,
		payment.PaymentRejectedReason,
	}

	return m.DB.QueryRowContext(ctx, query, args...).Scan(&payment.PaymentHistoryID, &payment.PaymentStatus, &payment.CreatedAt)
}
