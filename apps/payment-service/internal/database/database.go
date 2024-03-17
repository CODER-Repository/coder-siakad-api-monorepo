package database

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/gofiber/fiber/v2/log"
	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/zerolog"
	sqldblogger "github.com/simukti/sqldb-logger"
	"github.com/simukti/sqldb-logger/logadapter/zerologadapter"
	"os"
	"time"
)

var (
	database = os.Getenv("DB_DATABASE")
	password = os.Getenv("DB_PASSWORD")
	username = os.Getenv("DB_USERNAME")
	port     = os.Getenv("DB_PORT")
	host    = os.Getenv("DB_HOST")
	sslmode = os.Getenv("DB_SSL_MODE")
)

func New() (*sql.DB, error) {
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s", username, password, host, port, database, sslmode)
	db, err := sql.Open("pgx", connStr)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	loggerConfig := zerolog.New(os.Stdout).With().Timestamp().Logger().Output(zerolog.ConsoleWriter{Out: os.Stdout})

	loggerAdapter := zerologadapter.New(loggerConfig)
	db = sqldblogger.OpenDriver(
		connStr,
		db.Driver(),
		loggerAdapter,
		sqldblogger.WithErrorFieldname("sql_error"),
		sqldblogger.WithTransactionIDFieldname("trx_id"),
		sqldblogger.WithMinimumLevel(sqldblogger.LevelDebug),
		sqldblogger.WithTimeFormat(sqldblogger.TimeFormatRFC3339),
	)

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)
	db.SetConnMaxIdleTime(4 * time.Hour)

	ctx, cancel := context.WithTimeout(context.Background(), 5 * time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return db, nil
}
