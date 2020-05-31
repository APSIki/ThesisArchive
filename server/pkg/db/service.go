package db

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/lib/pq"
	"github.com/spf13/viper"
)

type Service struct {
	DB *sql.DB
}

func NewService() (*Service, error) {
	sqlDB, err := ConnectDB()
	if err != nil {
		return nil, fmt.Errorf("init DB failed: %v", err)
	}
	return &Service{
		DB: sqlDB,
	}, nil
}

func ConnectDB() (*sql.DB, error) {
	host := viper.GetString("database.host")
	port := viper.GetInt("database.port")
	user := viper.GetString("database.user_name")
	password := viper.GetString("database.password")
	dbName := viper.GetString("database.db_name")
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbName)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}

	maxConn := viper.GetInt("database.max_open_conn")
	db.SetMaxOpenConns(maxConn)
	db.SetMaxIdleConns(maxConn)

	retries, period := viper.GetInt("database.connection_retries"), viper.GetDuration("database.retry_period")
	for i := 0; i < retries; i++ {
		err = db.Ping()
		if err == nil {
			log.Print("connected to DB")
			return db, nil
		}
		time.Sleep(period)
		log.Printf("could not connect to DB, retrying.. (%s)", err)
	}
	defer db.Close() // TODO move it

	return db, nil
}
